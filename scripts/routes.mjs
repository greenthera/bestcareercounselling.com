// Single source of truth for every route that gets a sitemap entry and its own
// prerendered static HTML file, shared by scripts/generate-seo-files.mjs (sitemap/
// robots/404) and scripts/prerender.mjs (static HTML generation). One list means a
// new page can't end up in the sitemap but missing from prerendering, or vice versa.

import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/who-we-are', priority: '0.8', changefreq: 'monthly' },
  { path: '/what-we-do', priority: '0.8', changefreq: 'monthly' },
  { path: '/admission-consulting', priority: '0.8', changefreq: 'monthly' },
  { path: '/admission-consulting/online-admissions', priority: '0.8', changefreq: 'monthly' },
  { path: '/career-counselling', priority: '0.8', changefreq: 'monthly' },
  { path: '/mba-admission-counselling', priority: '0.8', changefreq: 'monthly' },
  { path: '/ug-admission-counselling', priority: '0.8', changefreq: 'monthly' },
  { path: '/school-student-career-assessment', priority: '0.7', changefreq: 'monthly' },
  { path: '/parent-career-clarity-assessment', priority: '0.7', changefreq: 'monthly' },
  { path: '/blogs', priority: '0.7', changefreq: 'weekly' },
  { path: '/contact-us', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
]

// Prerendered (so a shared link paints instantly) but left out of the sitemap — it's
// a post-conversion confirmation page, not a landing page worth surfacing in search.
export const UNLISTED_ROUTES = [{ path: '/thank-you' }]

// Each blog post in src/content/blog gets its own sitemap entry and prerendered file,
// with the post's own frontmatter date as lastmod (rather than today's date) since
// that's when the content actually last changed.
export function getBlogRoutes(rootDir) {
  const blogDir = path.join(rootDir, 'src/content/blog')
  return readdirSync(blogDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const { data } = matter(readFileSync(path.join(blogDir, file), 'utf8'))
      const slug = file.replace(/\.md$/, '')
      return { path: `/blogs/${slug}`, priority: '0.6', changefreq: 'monthly', lastmod: data.date }
    })
}
