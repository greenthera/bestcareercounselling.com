#!/usr/bin/env node
// Regenerates public/robots.txt and public/sitemap.xml from the site's canonical
// URL and route list. Runs automatically before every build (see the "prebuild"
// script in package.json), so these two files never drift out of sync by hand.
//
// The URL comes from the repo's .env file (VITE_SITE_URL) — same as src/lib/seo.ts
// and index.html's %VITE_SITE_URL% placeholders. If the site ever moves to a new
// domain, updating that one value here is all that's needed for these files too.

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')

function readSiteUrlFromEnvFile() {
  const envPath = path.join(rootDir, '.env')
  const envText = readFileSync(envPath, 'utf8')
  const match = envText.match(/^VITE_SITE_URL=(.+)$/m)
  if (!match) {
    throw new Error('VITE_SITE_URL not found in .env')
  }
  return match[1].trim()
}

const SITE_URL = (process.env.VITE_SITE_URL || readSiteUrlFromEnvFile()).replace(/\/$/, '')

// Only routes that are actually registered in src/App.tsx. The thank-you page is
// intentionally left out — it's a post-conversion confirmation page, not a landing
// page worth surfacing in search results.
const ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/who-we-are', priority: '0.8', changefreq: 'monthly' },
  { path: '/what-we-do', priority: '0.8', changefreq: 'monthly' },
  { path: '/admission-consulting', priority: '0.8', changefreq: 'monthly' },
  { path: '/career-counselling', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact-us', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
]

const today = new Date().toISOString().slice(0, 10)

const urlEntries = ROUTES.map(
  (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
).join('\n')

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
