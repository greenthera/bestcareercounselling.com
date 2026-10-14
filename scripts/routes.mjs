// Single source of truth for every route that gets a sitemap entry and its own
// prerendered static HTML file, shared by scripts/generate-seo-files.mjs (sitemap/
// robots/404) and scripts/prerender.mjs (static HTML generation). One list means a
// new page can't end up in the sitemap but missing from prerendering, or vice versa.
//
// `component` is the page's lazy-loaded chunk from src/App.tsx's route table — used
// by scripts/prerender.mjs to find that route's own JS chunk in the Vite manifest, so
// it can be preloaded alongside the shared entry bundle instead of costing a second
// round trip once the entry bundle runs.

import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export const STATIC_ROUTES = [
  { path: '/', component: 'src/pages/Home.tsx', priority: '1.0', changefreq: 'weekly' },
  { path: '/who-we-are', component: 'src/pages/WhoWeAre.tsx', priority: '0.8', changefreq: 'monthly' },
  { path: '/what-we-do', component: 'src/pages/WhatWeDo.tsx', priority: '0.8', changefreq: 'monthly' },
  { path: '/admission-consulting', component: 'src/pages/AdmissionConsulting.tsx', priority: '0.8', changefreq: 'monthly' },
  {
    path: '/admission-consulting/online-admissions',
    component: 'src/pages/OnlineAdmissions.tsx',
    priority: '0.8',
    changefreq: 'monthly',
  },
  { path: '/career-counselling', component: 'src/pages/CareerCounselling.tsx', priority: '0.8', changefreq: 'monthly' },
  { path: '/mba-admission-counselling', component: 'src/pages/MbaAdmissionCounselling.tsx', priority: '0.8', changefreq: 'monthly' },
  { path: '/ug-admission-counselling', component: 'src/pages/UgAdmissionCounselling.tsx', priority: '0.8', changefreq: 'monthly' },
  {
    path: '/school-student-career-assessment',
    component: 'src/pages/SchoolStudentCareerAssessment.tsx',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/parent-career-clarity-assessment',
    component: 'src/pages/ParentCareerClarityAssessment.tsx',
    priority: '0.7',
    changefreq: 'monthly',
  },
  { path: '/blogs', component: 'src/pages/Blogs.tsx', priority: '0.7', changefreq: 'weekly' },
  { path: '/contact-us', component: 'src/pages/ContactUs.tsx', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy-policy', component: 'src/pages/PrivacyPolicy.tsx', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', component: 'src/pages/Terms.tsx', priority: '0.3', changefreq: 'yearly' },
]

// Prerendered (so a shared link paints instantly) but left out of the sitemap — it's
// a post-conversion confirmation page, not a landing page worth surfacing in search.
export const UNLISTED_ROUTES = [{ path: '/thank-you', component: 'src/pages/ThankYou.tsx' }]

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
      return { path: `/blogs/${slug}`, component: 'src/pages/BlogPost.tsx', priority: '0.6', changefreq: 'monthly', lastmod: data.date }
    })
}
