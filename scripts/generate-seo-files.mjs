#!/usr/bin/env node
// Regenerates public/robots.txt and public/sitemap.xml from the site's canonical URL
// and route list (scripts/routes.mjs). Runs automatically before every build (see the
// "prebuild" script in package.json), so these files never drift out of sync by hand.
// dist/404.html is generated separately, by scripts/prerender.mjs (it needs a real
// rendered NotFound page, not just a URL list).
//
// The URL preferably comes from the repo's .env file (VITE_SITE_URL) — same as
// src/lib/seo.ts — but that file is gitignored and may not exist (fresh clone, CI),
// so this falls back to the same hardcoded default src/lib/seo.ts uses. If the site
// ever moves to a new domain, update .env (and that fallback) and this picks it up
// automatically.

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { STATIC_ROUTES, getBlogRoutes } from './routes.mjs'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')
const FALLBACK_SITE_URL = 'https://bestcareercounselling.com'

function readSiteUrlFromEnvFile() {
  const envPath = path.join(rootDir, '.env')
  if (!existsSync(envPath)) {
    return undefined
  }
  const envText = readFileSync(envPath, 'utf8')
  const match = envText.match(/^VITE_SITE_URL=(.+)$/m)
  return match?.[1].trim()
}

const SITE_URL = (process.env.VITE_SITE_URL || readSiteUrlFromEnvFile() || FALLBACK_SITE_URL).replace(/\/$/, '')

const today = new Date().toISOString().slice(0, 10)

const urlEntries = [...STATIC_ROUTES, ...getBlogRoutes(rootDir)]
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${route.lastmod ?? today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

writeFileSync(path.join(rootDir, 'public/sitemap.xml'), sitemap)
writeFileSync(path.join(rootDir, 'public/robots.txt'), robots)

console.log(`Generated sitemap.xml and robots.txt for ${SITE_URL}`)
