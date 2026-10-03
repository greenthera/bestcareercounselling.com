#!/usr/bin/env node
// Bakes the home page's rendered HTML into dist/index.html after the build (see the
// "build" script in package.json), so the hero text and LCP image paint as soon as
// the HTML and CSS arrive instead of waiting for the JS bundle to download and run.
// src/main.tsx then hydrates that markup rather than rendering from scratch.
//
// Only "/" is prerendered. GitHub Pages serves every other route through 404.html,
// which redirects back to index.html — so the markup baked in here would briefly be
// the wrong page for those. The inline script injected after #root clears it before
// first paint whenever the URL isn't the prerendered one, and main.tsx renders that
// route client-side as before.

import { readFileSync, readdirSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')
const distDir = path.join(rootDir, 'dist')
const ssrDir = path.join(rootDir, 'dist-ssr')

// Must match vite.config.ts's `base` — the browser pathname of the home page.
const BASE_PATH = process.env.DEPLOY_BASE_PATH || '/'
const ROUTE = '/'

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const renderedHtml = await render(ROUTE)

// React emits resource hints it discovered (e.g. preloads for the eager, above-the-
// fold images like the hero portrait) at the start of the output. They belong in
// <head>, not inside #root where hydration would have to step over them.
const leadingHints = renderedHtml.match(/^(?:<link [^>]*\/?>)*/)[0]
const appHtml = renderedHtml.slice(leadingHints.length)
const headTags = leadingHints.match(/<link [^>]*\/?>/g) ?? []

// Preload the Latin Inter file (the only subset the page's text uses) so it arrives
// alongside the CSS instead of after it, keeping the font swap close to first paint.
const interLatin = readdirSync(path.join(distDir, 'assets')).find((file) =>
  /^inter-latin-wght-normal-.*\.woff2$/.test(file),
)
if (!interLatin) {
  throw new Error('prerender: Inter latin font file not found in dist/assets')
}
headTags.unshift(`<link rel="preload" as="font" type="font/woff2" crossorigin href="${BASE_PATH}assets/${interLatin}">`)

const indexPath = path.join(distDir, 'index.html')
let indexHtml = readFileSync(indexPath, 'utf8')
const rootTag = '<div id="root"></div>'
if (!indexHtml.includes(rootTag)) {
  throw new Error(`prerender: ${rootTag} not found in dist/index.html`)
}

// Inline the site's single stylesheet (~10 KB gzipped). As a <link> it's a render-
// blocking round trip after the HTML; inlined, the prerendered page can paint as
// soon as the HTML arrives. Its url()s are absolute (/assets/...), so they resolve
// the same from the page as from the CSS file.
const stylesheetTag = indexHtml.match(/<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/)
if (!stylesheetTag) {
  throw new Error('prerender: stylesheet <link> not found in dist/index.html')
}
const cssFile = path.join(distDir, stylesheetTag[1].slice(BASE_PATH.length))
const css = readFileSync(cssFile, 'utf8')
indexHtml = indexHtml.replace(stylesheetTag[0], () => `<style>${css}</style>`)

// Take over loading the app bundle from Vite's <script type="module"> (and the
// modulepreloads for its imports). On the prerendered page the bundle is only needed
// to hydrate markup that's already visible, so it's fetched after the first frame
// paints instead of competing with the HTML, hero image and font for bandwidth on a
// slow connection. Every other route has nothing to show until it runs, so it loads
// immediately, as before.
const entryScript = indexHtml.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/)
if (!entryScript) {
  throw new Error('prerender: entry <script type="module"> not found in dist/index.html')
}
const modulePreloads = [...indexHtml.matchAll(/<link rel="modulepreload" crossorigin href="([^"]+)">/g)]
for (const tag of [entryScript, ...modulePreloads]) {
  indexHtml = indexHtml.replace(tag[0], '')
}

const prerenderedPath = BASE_PATH + ROUTE.slice(1)
const loaderScript = `<script>
      (function (root, entry, preloads) {
        var started = false
        function load() {
          if (started) return
          started = true
          preloads.forEach(function (href) {
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
        if (location.pathname !== root.dataset.prerendered) {
          // Deep link served via 404.html: drop the home markup before it paints.
          root.replaceChildren()
          load()
        } else {
          // Start once the prerendered page has actually painted. The timeout covers
          // browsers without paint timing and tabs opened in the background.
          try {
            new PerformanceObserver(function (list) {
              if (list.getEntriesByName('first-contentful-paint').length) load()
            }).observe({ type: 'paint', buffered: true })
          } catch (e) {}
          setTimeout(load, 1500)
        }
      })(document.getElementById('root'), ${JSON.stringify(entryScript[1])}, ${JSON.stringify(modulePreloads.map((m) => m[1]))})
    </script>`

indexHtml = indexHtml
  .replace(/\n\s*\n(\s*<\/head>)/, '\n$1')
  .replace('</head>', `${headTags.map((tag) => `    ${tag}`).join('\n')}\n  </head>`)
  .replace(rootTag, `<div id="root" data-prerendered="${prerenderedPath}">${appHtml}</div>\n    ${loaderScript}`)
writeFileSync(indexPath, indexHtml)

// Build-only artifact; nothing at runtime needs it.
rmSync(ssrDir, { recursive: true, force: true })

console.log(`Prerendered ${ROUTE} into dist/index.html (${Math.round(appHtml.length / 1024)} KB)`)
