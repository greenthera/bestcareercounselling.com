# Career Counselling Website — Phase 4: QA Pass — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close out the design spec's Phase 4 QA pass (spec §7) — per-page SEO metadata, structured data (LocalBusiness, Person, FAQPage, Article, BreadcrumbList), an accessibility pass (focus states, contrast, keyboard nav), the report-thumbnail lightbox interaction from §14.6, and a responsive audit at 360/390/768/1024/1280/1440px.

**Architecture:** A single `usePageSeo` hook (title/description/canonical/OG/Twitter) mounted once per page via `useEffect`, reading from a small `src/data/seo.ts` table for the 7 static routes and computed inline for the dynamic `/blogs/:slug` route. Structured data is JSON-LD via a shared `<JsonLd data={...} />` primitive (mirrors the pattern `FAQSection` already uses) — `LocalBusinessSchema` mounts once in `Layout` (site-wide), `PersonSchema` mounts twice on Who We Are, `ArticleSchema`/`BreadcrumbListSchema` mount on Blog Detail. A single `SITE_URL` constant (same configurable-single-source-of-truth pattern as `DEPLOY_BASE_PATH` in `vite.config.ts`) backs every absolute URL used in structured data and canonical links. Accessibility focus-visible coverage is handled once, globally, in `index.css` rather than patched component-by-component. No new dependencies.

**Tech Stack:** No new dependencies — everything here is hooks, a JSON-LD script tag, and Tailwind/CSS.

**Content-fidelity note:** LocalBusiness structured data includes only already-established, publicly-displayed facts (name, phone, service area cities, 5.0★/900+ aggregate rating) — it omits `address`/`geo`, since `src/data/locations.ts` only has `[CLIENT TO PROVIDE ADDRESS]` placeholders and encoding a placeholder string as machine-readable structured data would actively mislead search engines (worse than a human-readable placeholder). Same principle for `PersonSchema` and `ArticleSchema` — every field traces back to copy already live on the site from Phases 1–3, nothing new is invented.

**Honesty note on verification (per spec §35 and this project's verification discipline):** Responsive layout at exact breakpoints (360/390/768/1024/1280/1440px) is fundamentally a visual check. Task 11 does what's mechanically checkable — grep-audits for fixed-width/overflow-prone patterns (none found as of this plan's writing — see below) and a `run`-skill-driven visual pass on representative pages/breakpoints — and states plainly what was and wasn't actually seen rendered, rather than claiming full pixel-level QA across every page × every breakpoint combination.

---

## File Structure

```text
src/
├── lib/
│   └── seo.ts                          (NEW — SITE_URL constant)
├── data/
│   └── seo.ts                          (NEW — per-static-page title/description)
├── hooks/
│   ├── usePageSeo.ts / .test.tsx       (NEW)
├── components/
│   ├── seo/
│   │   ├── JsonLd.tsx                  (NEW — shared JSON-LD <script> wrapper)
│   │   ├── LocalBusinessSchema.tsx / .test.tsx
│   │   ├── PersonSchema.tsx / .test.tsx
│   │   ├── ArticleSchema.tsx / .test.tsx
│   │   └── BreadcrumbListSchema.tsx / .test.tsx
│   ├── layout/
│   │   └── Layout.tsx                  (MODIFY — mount LocalBusinessSchema)
│   └── home/
│       ├── ReportSection.tsx           (MODIFY — thumbnails + lightbox)
│       └── ReportSection.test.tsx      (MODIFY)
├── pages/
│   ├── Home.tsx / WhoWeAre.tsx / WhatWeDo.tsx / SuccessStories.tsx /
│   │   Blogs.tsx / ContactUs.tsx / ThankYou.tsx   (MODIFY — usePageSeo)
│   └── BlogDetail.tsx                  (MODIFY — usePageSeo + Article/BreadcrumbList schema)
└── index.css                           (MODIFY — global focus-visible rule)
```

---

### Task 1: `src/lib/seo.ts` — single-source-of-truth site URL

**Files:** Create `src/lib/seo.ts`

- [ ] **Step 1:** Write the file, following the same configurable-constant pattern as `DEPLOY_BASE_PATH` in `vite.config.ts`:

```ts
// The site's canonical absolute origin, used to build canonical links and
// structured-data URLs. Override with VITE_SITE_URL if the domain changes —
// this is the only place that needs to change.
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://bestcareercounselling.com'

export const SITE_NAME = 'Kishan & Meeta Patel — Career Counselling'
```

- [ ] **Step 2:** Run `npx tsc --noEmit`. Expected: no errors.

---

### Task 2: `usePageSeo` hook (TDD)

**Files:** Create `src/hooks/usePageSeo.ts` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { usePageSeo } from './usePageSeo'

function Probe(props: { title: string; description: string; path: string }) {
  usePageSeo(props)
  return null
}

describe('usePageSeo', () => {
  it('sets the document title and meta description', () => {
    render(<Probe title="Test Title" description="Test description" path="/test" />)
    expect(document.title).toBe('Test Title')
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Test description')
  })

  it('sets a canonical link built from SITE_URL and the given path', () => {
    render(<Probe title="Test Title" description="Test description" path="/test" />)
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://bestcareercounselling.com/test',
    )
  })

  it('sets Open Graph and Twitter Card tags', () => {
    render(<Probe title="Test Title" description="Test description" path="/test" />)
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('Test Title')
    expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe(
      'Test description',
    )
    expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe('summary_large_image')
  })

  it('updates existing tags rather than duplicating them across renders', () => {
    const { rerender } = render(<Probe title="First" description="First desc" path="/first" />)
    rerender(<Probe title="Second" description="Second desc" path="/second" />)
    expect(document.title).toBe('Second')
    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1)
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```ts
import { useEffect } from 'react'
import { SITE_URL } from '@/lib/seo'

interface PageSeoOptions {
  title: string
  description: string
  path: string
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function usePageSeo({ title, description, path }: PageSeoOptions) {
  useEffect(() => {
    document.title = title
    const canonical = `${SITE_URL}${path}`

    upsertMeta('name', 'description', description)
    upsertCanonical(canonical)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
  }, [title, description, path])
}
```

- [ ] **Step 4:** Run test. Expected: PASS, 4 tests.

---

### Task 3: `seo/JsonLd` — shared structured-data wrapper (TDD)

**Files:** Create `src/components/seo/JsonLd.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { JsonLd } from './JsonLd'

describe('JsonLd', () => {
  it('renders a script tag containing the serialized data', () => {
    render(<JsonLd data={{ '@type': 'Thing', name: 'Test' }} />)
    const script = document.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
    expect(script?.textContent).toContain('"name":"Test"')
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 4: `seo/LocalBusinessSchema` (TDD) + mount site-wide

**Files:** Create `src/components/seo/LocalBusinessSchema.tsx` + test, modify `src/components/layout/Layout.tsx`

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { LocalBusinessSchema } from './LocalBusinessSchema'

describe('LocalBusinessSchema', () => {
  it('embeds LocalBusiness structured data with only already-established facts', () => {
    render(<LocalBusinessSchema />)
    const script = document.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}')
    expect(data['@type']).toBe('LocalBusiness')
    expect(data.telephone).toBe('+91-87581-75187')
    expect(data.areaServed).toEqual(['Surat', 'Navsari', 'Ankleshwar', 'Valsad'])
    expect(data.aggregateRating.ratingValue).toBe('5.0')
    expect(data.aggregateRating.reviewCount).toBe('900')
    expect(data.address).toBeUndefined()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
import { JsonLd } from './JsonLd'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export function LocalBusinessSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: SITE_NAME,
        telephone: '+91-87581-75187',
        url: SITE_URL,
        areaServed: ['Surat', 'Navsari', 'Ankleshwar', 'Valsad'],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          reviewCount: '900',
        },
      }}
    />
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.
- [ ] **Step 5:** Mount it once, site-wide, in `Layout.tsx`:

```tsx
import { Outlet } from 'react-router-dom'
import { AnnouncementBar } from './AnnouncementBar'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileBottomBar } from './MobileBottomBar'
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
      <LocalBusinessSchema />
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBottomBar />
    </div>
  )
}
```

- [ ] **Step 6:** Run `npm run test -- src/App.test.tsx`. Expected: PASS (Layout still renders; no test asserts against absence of a script tag).

---

### Task 5: `seo/PersonSchema` (TDD) + mount on Who We Are

**Files:** Create `src/components/seo/PersonSchema.tsx` + test, modify `src/pages/WhoWeAre.tsx`

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { PersonSchema } from './PersonSchema'

describe('PersonSchema', () => {
  it("renders Kishan's Person structured data", () => {
    render(<PersonSchema person="kishan" />)
    const script = document.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}')
    expect(data['@type']).toBe('Person')
    expect(data.name).toBe('Kishan Patel')
    expect(data.jobTitle).toBe('Career Counsellor')
  })

  it("renders Meeta's Person structured data", () => {
    render(<PersonSchema person="meeta" />)
    const script = document.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}')
    expect(data.name).toBe('Meeta Patel')
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation — reuses only already-established bio copy (same facts as `FounderProfiles`):

```tsx
import { JsonLd } from './JsonLd'

const PEOPLE = {
  kishan: {
    name: 'Kishan Patel',
    jobTitle: 'Career Counsellor',
    description: '30+ years guiding students across Gujarat. Certified Career Analyst — Edumilestones.',
  },
  meeta: {
    name: 'Meeta Patel',
    jobTitle: 'Career Counsellor',
    description:
      'Specialises in working with parents and students together, particularly around stream selection after Class 10.',
  },
} as const

interface PersonSchemaProps {
  person: keyof typeof PEOPLE
}

export function PersonSchema({ person }: PersonSchemaProps) {
  const data = PEOPLE[person]
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Person',
        ...data,
      }}
    />
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS, 2 tests.
- [ ] **Step 5:** Mount both on `src/pages/WhoWeAre.tsx`, near `FounderProfiles`:

```tsx
import { PersonSchema } from '@/components/seo/PersonSchema'
// ...inside the returned JSX, alongside <FounderProfiles />:
<PersonSchema person="kishan" />
<PersonSchema person="meeta" />
```

- [ ] **Step 6:** Run `npm run test -- src/pages/WhoWeAre.test.tsx`. Expected: PASS (existing assertions unaffected — script tags aren't queried by the heading-based test).

---

### Task 6: `seo/ArticleSchema` and `seo/BreadcrumbListSchema` (TDD) + mount on Blog Detail

**Files:** Create `src/components/seo/ArticleSchema.tsx` + test, `src/components/seo/BreadcrumbListSchema.tsx` + test, modify `src/pages/BlogDetail.tsx`

- [ ] **Step 1:** Test for `ArticleSchema`:

```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ArticleSchema } from './ArticleSchema'
import { blogPosts } from '@/data/blogs'

describe('ArticleSchema', () => {
  it('embeds Article structured data for the given post', () => {
    const post = blogPosts[0]
    render(<ArticleSchema post={post} />)
    const script = document.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}')
    expect(data['@type']).toBe('Article')
    expect(data.headline).toBe(post.title)
    expect(data.datePublished).toBe(post.date)
    expect(data.author.name).toBe('Kishan Patel')
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
import { JsonLd } from './JsonLd'
import type { BlogPost } from '@/data/blogs'

const AUTHOR_NAMES = { kishan: 'Kishan Patel', meeta: 'Meeta Patel' } as const

interface ArticleSchemaProps {
  post: BlogPost
}

export function ArticleSchema({ post }: ArticleSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: {
          '@type': 'Person',
          name: AUTHOR_NAMES[post.author],
        },
      }}
    />
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

- [ ] **Step 5:** Test for `BreadcrumbListSchema`:

```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { BreadcrumbListSchema } from './BreadcrumbListSchema'

describe('BreadcrumbListSchema', () => {
  it('embeds a three-item BreadcrumbList ending at the current page', () => {
    render(<BreadcrumbListSchema title="Some Post Title" path="/blogs/some-post" />)
    const script = document.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}')
    expect(data['@type']).toBe('BreadcrumbList')
    expect(data.itemListElement).toHaveLength(3)
    expect(data.itemListElement[2].name).toBe('Some Post Title')
    expect(data.itemListElement[2].item).toBe('https://bestcareercounselling.com/blogs/some-post')
  })
})
```

- [ ] **Step 6:** Run test. Expected: FAIL — module not found.
- [ ] **Step 7:** Implementation:

```tsx
import { JsonLd } from './JsonLd'
import { SITE_URL } from '@/lib/seo'

interface BreadcrumbListSchemaProps {
  title: string
  path: string
}

export function BreadcrumbListSchema({ title, path }: BreadcrumbListSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${SITE_URL}/blogs` },
          { '@type': 'ListItem', position: 3, name: title, item: `${SITE_URL}${path}` },
        ],
      }}
    />
  )
}
```

- [ ] **Step 8:** Run test. Expected: PASS.
- [ ] **Step 9:** Mount both in `src/pages/BlogDetail.tsx`, inside the `post` found branch (add near the top of the returned fragment):

```tsx
<ArticleSchema post={post} />
<BreadcrumbListSchema title={post.title} path={`/blogs/${post.slug}`} />
```

(Full integration, including the `usePageSeo` call from Task 8, is assembled in Task 8's implementation step to avoid two separate diffs to the same file.)

---

### Task 7: Apply `usePageSeo` + `src/data/seo.ts` to the 7 static pages

**Files:** Create `src/data/seo.ts`; modify `src/pages/Home.tsx`, `WhoWeAre.tsx`, `WhatWeDo.tsx`, `SuccessStories.tsx`, `Blogs.tsx`, `ContactUs.tsx`, `ThankYou.tsx`

- [ ] **Step 1:** Write `src/data/seo.ts`:

```ts
export interface PageSeo {
  title: string
  description: string
  path: string
}

export const pageSeo = {
  home: {
    title: 'Career Counselling in Surat | Kishan & Meeta Patel',
    description:
      'Career counselling and stream selection guidance from Kishan & Meeta Patel — Surat, Navsari, Ankleshwar, Valsad.',
    path: '/',
  },
  whoWeAre: {
    title: 'Who We Are | Kishan & Meeta Patel Career Counselling',
    description:
      '30 years, 5,000+ students guided. Meet Kishan & Meeta Patel and learn how we help families make informed career decisions.',
    path: '/who-we-are',
  },
  whatWeDo: {
    title: 'What We Do | Career Counselling Services',
    description:
      'Career counselling for every stage — after 10th, after 12th, UG & PG admission, MBA, study abroad and career change.',
    path: '/what-we-do',
  },
  successStories: {
    title: 'Success Stories | Kishan & Meeta Patel',
    description: 'Real students, real decisions, real outcomes — see how families moved from confusion to clarity.',
    path: '/success-stories',
  },
  blogs: {
    title: 'Blog | Career Guidance, Explained',
    description: 'Practical guidance for students and parents making important education and career decisions.',
    path: '/blogs',
  },
  contactUs: {
    title: 'Contact Us | Book a Free Consultation',
    description: 'Book a free 15-minute consultation with Kishan or Meeta. No cost, no obligation, no sales pitch.',
    path: '/contact-us',
  },
  thankYou: {
    title: 'Thank You | Kishan & Meeta Patel',
    description: 'Thank you for reaching out. Your WhatsApp message is ready to send.',
    path: '/thank-you',
  },
} satisfies Record<string, PageSeo>
```

- [ ] **Step 2:** In each of the 7 page files, add the hook call as the first line of the component body. Example for `src/pages/Home.tsx`:

```tsx
import { usePageSeo } from '@/hooks/usePageSeo'
import { pageSeo } from '@/data/seo'
// ...other imports unchanged

export default function Home() {
  usePageSeo(pageSeo.home)
  return (
    <>
      <Hero />
      {/* ...unchanged */}
```

Repeat identically for `WhoWeAre.tsx` (`pageSeo.whoWeAre`), `WhatWeDo.tsx` (`pageSeo.whatWeDo`), `SuccessStories.tsx` (`pageSeo.successStories`), `Blogs.tsx` (`pageSeo.blogs`), `ContactUs.tsx` (`pageSeo.contactUs`), `ThankYou.tsx` (`pageSeo.thankYou`).

- [ ] **Step 3:** Add one assertion per existing page test confirming the title is set — e.g. append to `src/pages/Home.test.tsx`'s first test body:

```tsx
expect(document.title).toBe('Career Counselling in Surat | Kishan & Meeta Patel')
```

Add the equivalent single-line assertion (using each page's `pageSeo.<key>.title`) to `WhoWeAre.test.tsx`, `WhatWeDo.test.tsx`, `SuccessStories.test.tsx`, `Blogs.test.tsx`, `ContactUs.test.tsx`, `ThankYou.test.tsx`.

- [ ] **Step 4:** Run `npm run test`. Expected: all pass (each page's title assertion included).

---

### Task 8: Apply `usePageSeo` + Article/BreadcrumbList schema to Blog Detail (dynamic)

**Files:** Modify `src/pages/BlogDetail.tsx`, `src/pages/BlogDetail.test.tsx`

- [ ] **Step 1:** Add assertions to the existing "renders breadcrumb, header, ..." test:

```tsx
expect(document.title).toBe(`${post.title} | Career Counselling Blog`)
const articleScript = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).find((s) =>
  s.textContent?.includes('"@type":"Article"'),
)
expect(articleScript).toBeDefined()
```

- [ ] **Step 2:** Run `npm run test -- src/pages/BlogDetail.test.tsx`. Expected: FAIL (no SEO/schema wired up yet).
- [ ] **Step 3:** Update the implementation — full file, combining this task with Task 6 Step 9's mounting:

```tsx
import { useParams, Link } from 'react-router-dom'
import { Breadcrumb } from '@/components/blog-detail/Breadcrumb'
import { ArticleHeader } from '@/components/blog-detail/ArticleHeader'
import { ArticleBody } from '@/components/blog-detail/ArticleBody'
import { InlineCTA } from '@/components/blog-detail/InlineCTA'
import { SidebarBookingForm } from '@/components/blog-detail/SidebarBookingForm'
import { AuthorBio } from '@/components/blog-detail/AuthorBio'
import { RelatedPosts } from '@/components/blog-detail/RelatedPosts'
import { FinalCTA } from '@/components/home/FinalCTA'
import { ArticleSchema } from '@/components/seo/ArticleSchema'
import { BreadcrumbListSchema } from '@/components/seo/BreadcrumbListSchema'
import { usePageSeo } from '@/hooks/usePageSeo'
import { blogPosts } from '@/data/blogs'

export default function BlogDetail() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  usePageSeo({
    title: post ? `${post.title} | Career Counselling Blog` : 'Article Not Found | Career Counselling Blog',
    description: post ? post.excerpt : 'This article may have been moved or the link is out of date.',
    path: `/blogs/${slug ?? ''}`,
  })

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-brand-green">Article not found</h1>
        <p className="mt-4 text-muted-ink">This article may have been moved or the link is out of date.</p>
        <Link to="/blogs" className="mt-6 inline-block font-medium text-brand-green hover:underline">
          Back to Blogs →
        </Link>
      </div>
    )
  }

  return (
    <>
      <ArticleSchema post={post} />
      <BreadcrumbListSchema title={post.title} path={`/blogs/${post.slug}`} />
      <Breadcrumb title={post.title} />
      <ArticleHeader post={post} />

      <div className="mx-auto mt-10 grid max-w-5xl gap-10 px-4 md:grid-cols-[1fr_280px] md:px-8">
        <div>
          <ArticleBody sections={post.sections.slice(0, 2)} />
          <div className="mx-auto max-w-2xl">
            <InlineCTA />
          </div>
          <ArticleBody sections={post.sections.slice(2)} />
          <div className="mx-auto max-w-2xl">
            <AuthorBio author={post.author} />
          </div>
        </div>
        <SidebarBookingForm />
      </div>

      <RelatedPosts currentSlug={post.slug} category={post.category} />
      <FinalCTA />
    </>
  )
}
```

- [ ] **Step 4:** Run `npm run test -- src/pages/BlogDetail.test.tsx`. Expected: PASS, 2 tests.
- [ ] **Step 5:** Run `npm run test -- src/App.test.tsx`. Expected: PASS.

---

### Task 9: Global focus-visible styles (accessibility)

**Files:** Modify `src/index.css`

- [ ] **Step 1:** Audit findings (already checked before writing this plan): every `outline-none` usage in the codebase lives in `src/components/ui/*` and is always paired with a `focus-visible:ring`/`focus:ring` replacement — those are already accessible. Plain hand-written `<button>`/`<a>` elements elsewhere (nav links, `ServiceSection` CTA, `TwoPaths` buttons, `BlogCategories` pills, `WhatsAppButton`, `MobileBottomBar` links, `InlineCTA`) rely on the browser's default focus outline today, which is functionally present but inconsistent with the brand. Add one global rule rather than patching each component:

```css
@layer base {
  a:focus-visible,
  button:focus-visible,
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible,
  [role='button']:focus-visible,
  [tabindex]:focus-visible {
    outline: 2px solid #014924;
    outline-offset: 2px;
  }
}
```

Add this block after the existing `body { ... }` rule inside the existing `@layer base { ... }` in `src/index.css`.

- [ ] **Step 2:** Contrast audit finding (already checked): every `bg-brand-yellow` interactive element in the codebase pairs it with `text-ink` (near-black `#111513`) — `#FFCC01` background with `#111513` text comfortably passes WCAG AA for both normal and large text. No changes needed here; confirmed via `grep -rn "bg-brand-yellow" src` and manual inspection of each match.
- [ ] **Step 3:** Run `npm run build`. Expected: exits 0 (confirms the CSS is syntactically valid and Tailwind compiles it).

---

### Task 10: Report thumbnails + lightbox (TDD)

**Files:** Modify `src/components/home/ReportSection.tsx`, `src/components/home/ReportSection.test.tsx`

- [ ] **Step 1:** Add to the existing test file:

```tsx
it('opens a lightbox with an enlarged view when a thumbnail is clicked', async () => {
  render(<ReportSection />)
  const user = userEvent.setup()
  const thumbnails = screen.getAllByRole('button', { name: /view report page/i })
  expect(thumbnails).toHaveLength(3)

  await user.click(thumbnails[0])
  expect(await screen.findByRole('dialog')).toBeInTheDocument()
})
```

(Add the needed imports at the top: `import userEvent from '@testing-library/user-event'` alongside the existing `render, screen` import.)

- [ ] **Step 2:** Run `npm run test -- src/components/home/ReportSection.test.tsx`. Expected: FAIL (no thumbnails/dialog exist yet).
- [ ] **Step 3:** Implementation — adds a thumbnail row below the existing deliverables list, each opening the same placeholder image full-size in a `Dialog`:

```tsx
import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

const DELIVERABLES = [
  '32-page career report',
  'Aptitude and interest profile',
  'SWOT analysis worksheet',
  'Shortlist of 8–12 careers',
  'College and course list',
]

const REPORT_PAGES = [
  '[REAL REPORT PAGE — COVER]',
  '[REAL REPORT PAGE — APTITUDE PROFILE]',
  '[REAL REPORT PAGE — CAREER SHORTLIST]',
]

export function ReportSection() {
  const [activePage, setActivePage] = useState<string | null>(null)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <div
            className="aspect-[4/3] rounded-2xl border border-neutral-border bg-soft-cream"
            role="img"
            aria-label="[REAL PHOTO — SAMPLE CAREER REPORT]"
          >
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-ink">
              [REAL PHOTO — SAMPLE CAREER REPORT]
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {REPORT_PAGES.map((page) => (
              <button
                key={page}
                type="button"
                aria-label={`View report page: ${page}`}
                onClick={() => setActivePage(page)}
                className="aspect-[4/3] rounded-lg border border-neutral-border bg-soft-cream text-center text-xs text-muted-ink transition-shadow hover:shadow-md"
              >
                {page}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-ink md:text-4xl">What you walk away with</h2>
          <p className="mt-2 text-muted-ink">Not advice you'll forget. A document you'll use for years.</p>
          <ul className="mt-6 space-y-3">
            {DELIVERABLES.map((item) => (
              <li key={item} className="flex items-start gap-2 text-ink">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-yellow" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Dialog open={activePage !== null} onOpenChange={(open) => !open && setActivePage(null)}>
        <DialogContent>
          <DialogTitle className="sr-only">{activePage}</DialogTitle>
          <div
            className="aspect-[4/3] rounded-lg bg-soft-cream"
            role="img"
            aria-label={activePage ?? undefined}
          >
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-ink">
              {activePage}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
```

- [ ] **Step 4:** Run `npm run test -- src/components/home/ReportSection.test.tsx`. Expected: PASS, 2 tests.
- [ ] **Step 5:** Run `npm run test -- src/pages/Home.test.tsx src/pages/WhoWeAre.test.tsx src/pages/WhatWeDo.test.tsx`. Expected: PASS (all three pages reuse `ReportSection`; confirms no regression).

---

### Task 11: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1:** `npm run test`. Expected: all test files pass, 0 failures.
- [ ] **Step 2:** `npx tsc --noEmit`. Expected: no errors.
- [ ] **Step 3:** `npm run lint`. Expected: no errors.
- [ ] **Step 4:** `npm run build`. Expected: exits 0.
- [ ] **Step 5:** Start `npm run dev` and, using the `run` skill (or manual browser check) against representative pages (Home, What We Do, Blog Detail — the three widest/most content-dense layouts), visually check at least 360px, 768px and 1280px viewport widths for horizontal overflow, cut-off text, or broken card grids. Record what was actually seen, not assumed.
- [ ] **Step 6:** In the browser, verify: FAQ accordion expands/collapses with keyboard (Tab + Enter), the report lightbox from Task 10 opens/closes with Escape, and the mobile nav Sheet trips focus trap correctly (Radix defaults — confirm, don't just assume).
- [ ] **Step 7:** View source (or dev tools Elements panel) on `/`, `/who-we-are`, and a `/blogs/:slug` page to confirm the `<title>`, meta description, canonical link, and JSON-LD `<script>` tags are present and correctly populated.

---

## Self-Review Notes

- **Spec coverage:** SEO metadata (title/description/canonical/OG/Twitter) on all 8 routes — covered (Tasks 7–8). Structured data — LocalBusiness (Task 4), Person ×2 (Task 5), FAQPage (already live since Phase 1/2 via `FAQSection`, no new task needed), Article + BreadcrumbList (Task 6) — all five spec-named schema types covered. Accessibility — focus states (Task 9), alt text (already consistent since Phase 1 via the `role="img"` + `aria-label` placeholder pattern), contrast on yellow buttons (audited, Task 9), keyboard nav / accessible accordion+dialog (inherited free from Radix primitives already in use, spot-checked in Task 11 rather than re-tested). Interaction polish — report thumbnail lightbox from §14.6 (Task 10); no carousel exists in the current build (Google Reviews is a static placeholder card, not a carousel, per Phase 1's plan) so there's nothing to polish there. Responsive audit — grep-audited for fixed-width/overflow-risk patterns pre-plan (none found outside an unused primitive), visually spot-checked in Task 11.
- **Placeholder scan:** New `[REAL REPORT PAGE — ...]` placeholders in Task 10 follow the established bracketed-placeholder convention.
- **Type consistency:** `PersonSchema`'s `person` prop type is derived from the `PEOPLE` object (`keyof typeof PEOPLE`) rather than a hand-maintained union, so it can't drift out of sync with the data. `ArticleSchema`/`BreadcrumbListSchema` reuse the exact `BlogPost` type from `src/data/blogs.ts`.
- **No regressions:** `Layout.tsx` and `ReportSection.tsx` are the only two Phase 1–3 files modified beyond simple `usePageSeo` one-line additions to page components; both changes are re-verified against their existing (and already-passing) consumer tests in Tasks 4 and 10.
