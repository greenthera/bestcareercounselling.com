#!/usr/bin/env node
// Bakes every route's rendered HTML into its own static file under dist/ after the
// build (see the "build" script in package.json) — dist/index.html for "/",
// dist/<path>/index.html for everything else, dist/404.html for the NotFound page.
// GitHub Pages serves a directory's index.html for a request to that directory, so
// every real route gets its real content and <title>/meta tags in the raw HTTP
// response — no "wait for JS, then hydrate an empty page" gap, which matters both for
// crawlers and for link-preview bots (WhatsApp, Twitter, ...) that never execute JS.
// A genuinely unmatched path has no generated file, so GitHub Pages serves dist/404.html
// (status 404) with the real, fully-rendered NotFound page instead of a redirect trick.
//
// React hoists <title>, <meta> and <link> tags rendered anywhere in the component tree
// (see src/components/seo/PageSeo.tsx) to the very front of the server-rendered output,
// even without an <html>/<head> ancestor in the tree — confirmed directly against
// react-dom/static's `prerender()` output. That's what lets this script lift a route's
// real title/description/OG tags out of its rendered HTML and splice them into this
// file's <head>, alongside the app markup itself.
//
// Only the home route gets the LCP-deferred script-loading treatment (see further
// down): it's tuned around home's specific hero photo being the LCP element, so it
// doesn't generalize cleanly to every page. Every other prerendered route keeps Vite's
// normal <script type="module"> + modulepreload tags, which already work fine today —
// the only change for those routes is that the HTML arrives with real content instead
// of an empty #root, not how soon the bundle starts loading.

import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import { STATIC_ROUTES, UNLISTED_ROUTES, getBlogRoutes } from './routes.mjs'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')
const distDir = path.join(rootDir, 'dist')
const ssrDir = path.join(rootDir, 'dist-ssr')

// Must match vite.config.ts's `base` — the browser pathname the site is served under.
const BASE_PATH = process.env.DEPLOY_BASE_PATH || '/'

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const routes = [
  ...STATIC_ROUTES,
  ...UNLISTED_ROUTES,
  ...getBlogRoutes(rootDir),
  { path: '/404', component: 'src/pages/NotFound.tsx', isNotFound: true },
]

const pristineIndexPath = path.join(distDir, 'index.html')
const pristineIndexHtml = readFileSync(pristineIndexPath, 'utf8')

// Inline the site's single stylesheet (~10 KB gzipped) once, shared by every route.
// As a <link> it's a render-blocking round trip after the HTML; inlined, a prerendered
// page can paint as soon as the HTML arrives. Its url()s are absolute (/assets/...),
// so they resolve the same from any route's nested directory as from the CSS file.
const stylesheetTag = pristineIndexHtml.match(/<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/)
if (!stylesheetTag) {
  throw new Error('prerender: stylesheet <link> not found in dist/index.html')
}
const cssFile = path.join(distDir, stylesheetTag[1].slice(BASE_PATH.length))
const css = readFileSync(cssFile, 'utf8')
const baseHtml = pristineIndexHtml.replace(stylesheetTag[0], () => `<style>${css}</style>`)

const entryScriptMatch = pristineIndexHtml.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/)
if (!entryScriptMatch) {
  throw new Error('prerender: entry <script type="module"> not found in dist/index.html')
}
const [entryScriptTag, entryScriptSrc] = entryScriptMatch
const modulePreloadTags = [...pristineIndexHtml.matchAll(/<link rel="modulepreload" crossorigin href="([^"]+)">/g)]

const manifest = JSON.parse(readFileSync(path.join(distDir, '.vite/manifest.json'), 'utf8'))
const entryFiles = new Set([entryScriptSrc, ...modulePreloadTags.map((m) => m[1])])

function collectChunks(key, into) {
  const chunk = manifest[key]
  const href = chunk && BASE_PATH + chunk.file
  if (!chunk || into.has(href) || entryFiles.has(href)) return
  into.add(href)
  for (const dep of chunk.imports ?? []) collectChunks(dep, into)
}

function outputPathFor(route) {
  if (route.path === '/') return path.join(distDir, 'index.html')
  if (route.isNotFound) return path.join(distDir, '404.html')
  return path.join(distDir, route.path.replace(/^\//, ''), 'index.html')
}

function urlPathFor(routePath) {
  const trimmedBase = BASE_PATH.replace(/\/$/, '')
  return routePath === '/' ? trimmedBase || '/' : trimmedBase + routePath
}

const rootTag = '<div id="root"></div>'
if (!baseHtml.includes(rootTag)) {
  throw new Error(`prerender: ${rootTag} not found in dist/index.html`)
}

for (const route of routes) {
  const renderedHtml = await render(route.path)

  // Everything hoisted (title, meta, link) comes before the app's own root <div> in
  // the output — see this file's header comment.
  const leadingMatch = renderedHtml.match(/^(?:<title>[\s\S]*?<\/title>|<meta [^>]*\/?>|<link [^>]*\/?>)*/)
  const leadingHints = leadingMatch ? leadingMatch[0] : ''
  const appHtml = renderedHtml.slice(leadingHints.length)

  const titleTag = leadingHints.match(/<title>[\s\S]*?<\/title>/)?.[0]
  const metaTags = [...leadingHints.matchAll(/<meta [^>]*\/?>/g)].map((m) => m[0])
  const linkTags = [...leadingHints.matchAll(/<link [^>]*\/?>/g)].map((m) => m[0])
  // Keep the canonical link (from PageSeo) and any high-priority resource hint (e.g. a
  // hero image's auto-discovered preload); drop any other discovered link as noise
  // this page doesn't need in <head>.
  const keptLinkTags = linkTags.filter((tag) => tag.includes('rel="canonical"') || /fetchPriority="high"/i.test(tag))
  const headTags = [titleTag, ...metaTags, ...keptLinkTags].filter(Boolean)

  const prerenderedPath = urlPathFor(route.path)
  let html = baseHtml
    .replace(/\n\s*\n(\s*<\/head>)/, '\n$1')
    .replace('</head>', `${headTags.map((tag) => `    ${tag}`).join('\n')}\n  </head>`)
    .replace(rootTag, `<div id="root" data-prerendered="${prerenderedPath}">${appHtml}</div>`)

  if (route.path === '/') {
    // Home only: defer loading the JS bundle until the hero photo (the LCP element)
    // has painted or is off-screen, so the bundle never competes with it for
    // bandwidth on a slow connection. See the inline script below for the full
    // heuristic (LCP observer, hero-load fallback, interaction, 3s timeout).
    const routeChunks = new Set()
    collectChunks(route.component, routeChunks)
    html = [entryScriptTag, ...modulePreloadTags.map((m) => m[0])].reduce((acc, tag) => acc.replace(tag, ''), html)
    const loaderScript = `<script>
      (function (root, entry, preloads, routeChunks) {
        var started = false
        function load() {
          if (started) return
          started = true
          preloads.concat(routeChunks).forEach(function (href) {
            var link = document.createElement('link')
            link.rel = 'modulepreload'
            link.crossOrigin = ''
            link.href = href
            document.head.appendChild(link)
          })
          var script = document.createElement('script')
          script.type = 'module'
          script.crossOrigin = ''
          script.src = entry
          document.head.appendChild(script)
        }
        // Start once the largest paint has settled, so the bundle never competes with
        // the hero photo: the photo has painted as the LCP, or it's below the fold on
        // this screen, or it has loaded without being the largest element. The first
        // interaction starts it at once; the timeout covers browsers without LCP
        // timing and tabs opened in the background.
        var hero = document.querySelector('img[fetchpriority="high"]')
        var painted = false
        function heroOffscreen() {
          return !hero || hero.getBoundingClientRect().top >= innerHeight
        }
        // A loaded photo that isn't the LCP paints within a frame or two of loading.
        function soonAfterHeroPaints() {
          if (painted && hero && hero.complete) setTimeout(load, 500)
        }
        try {
          new PerformanceObserver(function (list) {
            painted = true
            if (heroOffscreen() || list.getEntries().some(function (entry) { return entry.url })) load()
            else soonAfterHeroPaints()
          }).observe({ type: 'largest-contentful-paint', buffered: true })
        } catch (e) {}
        if (hero) hero.addEventListener('load', soonAfterHeroPaints)
        ;['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (type) {
          addEventListener(type, load, { once: true, passive: true })
        })
        setTimeout(load, 3000)
      })(document.getElementById('root'), ${JSON.stringify(entryScriptSrc)}, ${JSON.stringify(modulePreloadTags.map((m) => m[1]))}, ${JSON.stringify([...routeChunks])})
    </script>`
    html = html.replace(`<div id="root" data-prerendered="${prerenderedPath}">${appHtml}</div>`, `<div id="root" data-prerendered="${prerenderedPath}">${appHtml}</div>\n    ${loaderScript}`)
  }

  const outputPath = outputPathFor(route)
  mkdirSync(path.dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, html)
  console.log(`Prerendered ${route.path} -> ${path.relative(distDir, outputPath)} (${Math.round(appHtml.length / 1024)} KB)`)
}

// Build-only artifacts; nothing at runtime needs them.
rmSync(ssrDir, { recursive: true, force: true })
rmSync(path.join(distDir, '.vite'), { recursive: true, force: true })
