# Career Counselling Website — Phase 3: Success Stories + Blogs — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/success-stories` (§17), `/blogs` (§18), the `/blogs/:slug` detail route (§19) with all 12 seeded posts (§20), and the enhanced Thank You page (§22).

**Architecture:** Same stack as Phases 1–2. New content lives in `src/data/blogs.ts` (typed `BlogPost[]`, one entry per post with structured `sections` for the sticky table of contents) and an extension to `src/data/stories.ts` (adds `filterCategory` + image alt so the existing 3 Phase 1 stories can be filtered on the new Success Stories page). All new pages are client-rendered — search, category filter and pagination on `/blogs`, and the story filter on `/success-stories`, are local `useState`, no backend. `/blogs/:slug` reuses the same `blogs` dataset; an unknown slug renders an honest "not found" empty state rather than crashing.

**Tech Stack:** No new dependencies — reuses `Tabs` (already built in Phase 1) for filters, `Button`/`Card` primitives, and the same `ConsultationForm`/`FAQSection`/`FinalCTA` reuse pattern established in Phase 2.

**Content-fidelity note:** Per spec §20 ("do not fabricate factual claims") and §30/§31, all 12 blog bodies are written in general, non-committal guidance voice — no invented statistics, named college rankings, specific cutoffs, exam dates, or country-specific costs. Where a post's topic would normally need a hard fact (e.g. "Complete Admission Timeline for Gujarat Students"), the content explains the *process* and *what to track*, not fabricated specific dates. Success story filter categories reuse the 6 existing service categories from `data/services.ts`; categories with no seeded story (Admission, MBA & Professional, Study Abroad — Phase 1 only seeded 3 of 6) render an honest empty state rather than fabricated placeholder cards, consistent with the Phase 2 self-review note on the same 3-vs-6 story gap.

---

## File Structure

```text
src/
├── data/
│   ├── stories.ts   (MODIFY — add filterCategory + imageAlt)
│   └── blogs.ts     (NEW — 12 seeded posts)
├── components/
│   ├── success-stories/
│   │   ├── SuccessStoriesHero.tsx / .test.tsx
│   │   ├── FeaturedCaseStudy.tsx / .test.tsx
│   │   ├── StoryFilterGrid.tsx / .test.tsx      (filter tabs + grid, combined — shared selection state)
│   │   └── WhatMakesTheDifference.tsx / .test.tsx
│   ├── blogs/
│   │   ├── BlogHero.tsx / .test.tsx              (heading + search input)
│   │   ├── BlogCategories.tsx / .test.tsx
│   │   ├── FeaturedPost.tsx / .test.tsx
│   │   └── BlogGrid.tsx / .test.tsx              (grid + pagination, combined — shared page state)
│   └── blog-detail/
│       ├── Breadcrumb.tsx / .test.tsx
│       ├── ArticleHeader.tsx / .test.tsx
│       ├── ArticleBody.tsx / .test.tsx           (sticky TOC + content sections, combined — TOC is derived from content)
│       ├── InlineCTA.tsx / .test.tsx
│       ├── SidebarBookingForm.tsx / .test.tsx
│       ├── AuthorBio.tsx / .test.tsx
│       └── RelatedPosts.tsx / .test.tsx
└── pages/
    ├── SuccessStories.tsx / .test.tsx  (REPLACE stub)
    ├── Blogs.tsx / .test.tsx           (REPLACE stub)
    ├── BlogDetail.tsx / .test.tsx      (REPLACE stub)
    └── ThankYou.tsx / .test.tsx        (ENHANCE Phase 1 minimal version)
```

---

### Task 1: Extend `src/data/stories.ts` with filter/grid fields

**Files:** Modify `src/data/stories.ts`

- [ ] **Step 1:** Add `filterCategory` (one of the six service ids) and `imageAlt` to each of the 3 existing stories, keeping every existing field untouched (Home's `SuccessStoriesPreview` only reads the original fields, so this is additive):

```ts
import type { WhatsAppContext } from '@/components/whatsapp/whatsappMessages'

export interface SuccessStory {
  slug: string
  studentInitial: string
  studentClass: string
  city: string
  service: string
  filterCategory: WhatsAppContext
  imageAlt: string
  was: string
  found: string
  chose: string
  now: string
}

export const successStories: SuccessStory[] = [
  {
    slug: '[CLIENT TO PROVIDE CASE STUDY]',
    studentInitial: '[STUDENT INITIAL]',
    studentClass: 'Class 10',
    city: 'Surat',
    service: 'After 10th',
    filterCategory: 'after-10th',
    imageAlt: '[REAL PHOTO — STUDENT, SURAT]',
    was: '[CLIENT TO PROVIDE: original situation before counselling]',
    found: '[CLIENT TO PROVIDE: what assessment/counselling revealed]',
    chose: '[CLIENT TO PROVIDE: the final decision]',
    now: '[CLIENT TO PROVIDE: the outcome]',
  },
  {
    slug: '[CLIENT TO PROVIDE CASE STUDY]',
    studentInitial: '[STUDENT INITIAL]',
    studentClass: 'Class 12',
    city: 'Navsari',
    service: 'After 12th',
    filterCategory: 'after-12th',
    imageAlt: '[REAL PHOTO — STUDENT, NAVSARI]',
    was: '[CLIENT TO PROVIDE: original situation before counselling]',
    found: '[CLIENT TO PROVIDE: what assessment/counselling revealed]',
    chose: '[CLIENT TO PROVIDE: the final decision]',
    now: '[CLIENT TO PROVIDE: the outcome]',
  },
  {
    slug: '[CLIENT TO PROVIDE CASE STUDY]',
    studentInitial: '[STUDENT INITIAL]',
    studentClass: 'Working Professional',
    city: 'Valsad',
    service: 'Career Change',
    filterCategory: 'career-change',
    imageAlt: '[REAL PHOTO — CLIENT, VALSAD]',
    was: '[CLIENT TO PROVIDE: original situation before counselling]',
    found: '[CLIENT TO PROVIDE: what assessment/counselling revealed]',
    chose: '[CLIENT TO PROVIDE: the final decision]',
    now: '[CLIENT TO PROVIDE: the outcome]',
  },
]
```

- [ ] **Step 2:** Run `npx tsc --noEmit`. Expected: no errors.
- [ ] **Step 3:** Run `npm run test`. Expected: all existing tests still pass (Home's `SuccessStoriesPreview` only destructures the original fields).

---

### Task 2: `src/data/blogs.ts` — 12 seeded posts

**Files:** Create `src/data/blogs.ts`

- [ ] **Step 1:** Write the file. `sections` is an ordered list of `{ heading, paragraphs }` — this is the single source for both the article body and the auto-derived table of contents:

```ts
export type BlogCategory = 'After 10th' | 'After 12th' | 'Exams' | 'Colleges' | 'Careers' | 'Parenting'
export type BlogAuthor = 'kishan' | 'meeta'

export interface BlogSection {
  heading: string
  paragraphs: string[]
}

export interface BlogPost {
  slug: string
  title: string
  category: BlogCategory
  excerpt: string
  readTime: string
  date: string
  author: BlogAuthor
  sections: BlogSection[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'stream-after-10th-science-commerce-arts',
    title: 'Which Stream After 10th — Science, Commerce or Arts?',
    category: 'After 10th',
    excerpt: 'There is no universally "best" stream — only the one that fits a specific student. Here is how to think it through.',
    readTime: '6 min read',
    date: '2026-07-20',
    author: 'kishan',
    sections: [
      {
        heading: 'Start with the student, not the stream',
        paragraphs: [
          "Every year, families ask us to rank Science, Commerce and Arts. There is no ranking — each stream opens a different set of doors, and the right one depends on the student's aptitude, interests and working style, not on which stream is considered prestigious in the neighbourhood.",
        ],
      },
      {
        heading: 'What to actually look at',
        paragraphs: [
          'Aptitude (how a student naturally reasons — numerical, verbal, spatial, logical), genuine interest (not borrowed interest from a friend or relative), and comfort with the day-to-day workload of each stream all matter more than a single subject grade.',
        ],
      },
      {
        heading: 'Where an assessment helps',
        paragraphs: [
          'A structured psychometric assessment, read together in a counselling session, turns a vague "I think I like Science" into a clearer picture of where a student is actually likely to do well and stay engaged for the next two years.',
        ],
      },
    ],
  },
  {
    slug: 'commerce-with-maths-good-choice',
    title: 'Is Commerce With Maths a Good Choice?',
    category: 'After 10th',
    excerpt: "Commerce with Maths keeps more doors open than Commerce without it — but that alone shouldn't decide it.",
    readTime: '5 min read',
    date: '2026-07-05',
    author: 'meeta',
    sections: [
      {
        heading: 'What Maths adds to Commerce',
        paragraphs: [
          'Commerce with Maths generally keeps quantitative-heavy paths — like certain finance, economics and analytics routes — more accessible later, since it builds comfort with the kind of numerical reasoning those fields lean on.',
        ],
      },
      {
        heading: "But it's not right for everyone",
        paragraphs: [
          'A student who finds Maths consistently stressful rather than engaging may do better, and stay more motivated, without it — Commerce without Maths still supports a wide range of career paths.',
        ],
      },
      {
        heading: 'How we help families decide',
        paragraphs: [
          "In a session, we look at the student's numerical aptitude alongside their interest level, not just their most recent Maths grade, since grades under exam pressure don't always reflect genuine aptitude.",
        ],
      },
    ],
  },
  {
    slug: 'career-options-after-12th-science-without-neet',
    title: 'Career Options After 12th Science Without NEET',
    category: 'After 12th',
    excerpt: "Not clearing NEET, or choosing not to attempt it, doesn't close off Science — it just changes the route.",
    readTime: '7 min read',
    date: '2026-06-28',
    author: 'kishan',
    sections: [
      {
        heading: 'Science opens more than one door',
        paragraphs: [
          'Medicine is one path out of a Science background, not the only one. Engineering, pure sciences, biotechnology, paramedical and allied health fields, and data-oriented careers are all realistic continuations of a Science background.',
        ],
      },
      {
        heading: 'Matching the option to the student',
        paragraphs: [
          "The right next step depends on which parts of Science a student actually enjoyed — the biology, the physics/maths, or the lab-and-experiment side — and how that maps to their aptitude profile.",
        ],
      },
      {
        heading: 'Avoiding the "plan B" trap',
        paragraphs: [
          'A course chosen only because it wasn\'t Medicine tends to be a weak foundation for the next few years. We work through the same assessment-and-counselling process regardless of which door a student is walking through.',
        ],
      },
    ],
  },
  {
    slug: 'best-colleges-gujarat-for-bba',
    title: 'Best Colleges in Gujarat for BBA',
    category: 'Colleges',
    excerpt: "\"Best\" depends on what a family is optimising for — here's how to evaluate a BBA college shortlist properly.",
    readTime: '6 min read',
    date: '2026-06-14',
    author: 'meeta',
    sections: [
      {
        heading: 'What to check beyond the name',
        paragraphs: [
          'Accreditation, faculty background, the structure of the curriculum, internship and placement support, and the specific specialisations offered all matter more than a college\'s general reputation alone.',
        ],
      },
      {
        heading: 'Fit matters as much as ranking',
        paragraphs: [
          'A college that is a strong fit for a student\'s interests and learning style — and realistic given their marks and budget — usually serves them better than a "top" college that is a poor fit.',
        ],
      },
      {
        heading: 'How we help with shortlisting',
        paragraphs: [
          "As part of UG admission guidance, we help build and narrow a shortlist based on the student's profile, rather than starting from a generic list of names.",
        ],
      },
    ],
  },
  {
    slug: 'what-is-a-psychometric-test',
    title: 'What Is a Psychometric Test — and Does It Actually Work?',
    category: 'Careers',
    excerpt: 'A psychometric test is one input into a counselling process — not a verdict on its own. Here is what it actually measures.',
    readTime: '5 min read',
    date: '2026-06-02',
    author: 'kishan',
    sections: [
      {
        heading: 'What it measures',
        paragraphs: [
          'A well-built psychometric assessment looks at aptitude, interest, personality traits and emotional intelligence — giving a structured snapshot rather than a single test score.',
        ],
      },
      {
        heading: 'What it does not do',
        paragraphs: [
          "It does not predict the future, and it is not a pass/fail exam. It is a starting point for a conversation, not a substitute for one — which is why we always pair it with a one-on-one counselling session.",
        ],
      },
      {
        heading: 'How we use it',
        paragraphs: [
          'We use the Edumilestones framework, then interpret the results together with the student and family, connecting the data back to real, specific options rather than leaving it as an abstract report.',
        ],
      },
    ],
  },
  {
    slug: 'career-when-parents-disagree',
    title: 'How to Choose a Career When Your Parents Disagree',
    category: 'Parenting',
    excerpt: 'When a student and their parents want different things, the goal is a decision everyone can stand behind — not a winner.',
    readTime: '5 min read',
    date: '2026-05-24',
    author: 'meeta',
    sections: [
      {
        heading: 'Why this is so common',
        paragraphs: [
          'Parents are usually drawing on their own experience of what "worked," while the student is weighing their own interests and the world as it looks today. Both perspectives come from a good place.',
        ],
      },
      {
        heading: 'Get everyone looking at the same data',
        paragraphs: [
          "A shared assessment and a joint counselling session gives the family a common reference point, instead of two people arguing from two different sets of assumptions.",
        ],
      },
      {
        heading: 'Why we bring parents into the room',
        paragraphs: [
          'We generally recommend parents join the counselling conversation precisely for this reason — decisions that both the student and the family understand and support tend to stick.',
        ],
      },
    ],
  },
  {
    slug: 'career-counselling-in-surat-what-to-expect',
    title: 'Career Counselling in Surat — What to Expect',
    category: 'Careers',
    excerpt: "A walkthrough of what actually happens when a family in Surat books a session with us.",
    readTime: '4 min read',
    date: '2026-05-15',
    author: 'kishan',
    sections: [
      {
        heading: 'Before the session',
        paragraphs: [
          "It starts with a free consultation call, where we understand the student's current class, situation and the questions on the family's mind.",
        ],
      },
      {
        heading: 'The assessment and the session',
        paragraphs: [
          'Next is a psychometric assessment, followed by a one-on-one counselling session — in person at our Surat location or online — where we walk through the results together.',
        ],
      },
      {
        heading: 'What a family leaves with',
        paragraphs: [
          'A written report, a shortlist of realistic options, and a roadmap — not just a conversation that ends when the meeting does.',
        ],
      },
    ],
  },
  {
    slug: 'career-counselling-navsari-ankleshwar-valsad',
    title: 'Career Counselling in Navsari, Ankleshwar and Valsad',
    category: 'Careers',
    excerpt: 'The same counselling process, closer to home, across our Navsari, Ankleshwar and Valsad locations.',
    readTime: '4 min read',
    date: '2026-05-08',
    author: 'kishan',
    sections: [
      {
        heading: 'Local access, same process',
        paragraphs: [
          'Families in Navsari, Ankleshwar and Valsad get the same assessment-plus-counselling process available in Surat, without needing to travel further for it.',
        ],
      },
      {
        heading: 'Online is always an option too',
        paragraphs: [
          'For families who prefer it, or when schedules don\'t line up with an in-person visit, we also offer the full process online.',
        ],
      },
      {
        heading: 'Getting started',
        paragraphs: [
          'A free 15-minute consultation call is the first step, regardless of which of the four locations is closest to a family.',
        ],
      },
    ],
  },
  {
    slug: 'arts-stream-careers-that-pay-well',
    title: 'Arts Stream Careers That Actually Pay Well in India',
    category: 'Careers',
    excerpt: "Arts is often treated as a fallback stream. For the right student, it's a deliberate and financially sound choice.",
    readTime: '6 min read',
    date: '2026-04-27',
    author: 'meeta',
    sections: [
      {
        heading: 'Reframing the Arts stream',
        paragraphs: [
          "Design, law, psychology, media, public policy, the civil services and several social-science-adjacent careers all start from an Arts background — and none of them are consolation choices.",
        ],
      },
      {
        heading: "What matters isn't the stream label",
        paragraphs: [
          'Outcomes in these fields depend far more on skill-building, specialisation and consistency than on which stream a student came from in Class 11–12.',
        ],
      },
      {
        heading: 'Choosing Arts on purpose',
        paragraphs: [
          'When a student\'s aptitude and interest genuinely point toward Arts, we help the family see it as a deliberate, well-reasoned choice — not a fallback.',
        ],
      },
    ],
  },
  {
    slug: 'study-abroad-after-12th-countries-costs-timelines',
    title: 'Study Abroad After 12th — Countries, Costs and Timelines',
    category: 'After 12th',
    excerpt: 'Studying abroad after 12th is a real option for some students — and a process with a lot of moving parts to plan around.',
    readTime: '8 min read',
    date: '2026-04-15',
    author: 'kishan',
    sections: [
      {
        heading: 'Country and course come first',
        paragraphs: [
          "Before costs or timelines, the country and course need to fit the student's academic profile, budget range and long-term goals — chasing a popular destination without that fit tends to backfire.",
        ],
      },
      {
        heading: 'Budgeting realistically',
        paragraphs: [
          'Costs vary widely by country, city and institution, and change over time, so we work with families to build a realistic, current budget picture rather than relying on general assumptions.',
        ],
      },
      {
        heading: 'Timelines need a head start',
        paragraphs: [
          'Between shortlisting, applications, and visa processing, study-abroad timelines run longer than most families expect — starting the process early matters more than almost anything else.',
        ],
      },
    ],
  },
  {
    slug: 'should-my-child-take-a-drop-year',
    title: 'Should My Child Take a Drop Year?',
    category: 'Parenting',
    excerpt: "A drop year can be the right call — or the wrong one. The difference is whether it has a clear purpose.",
    readTime: '5 min read',
    date: '2026-04-02',
    author: 'meeta',
    sections: [
      {
        heading: 'When it tends to help',
        paragraphs: [
          "A drop year with a specific, well-understood purpose — a focused re-attempt at an exam, or genuinely more time to decide — can be a sound decision for the right student.",
        ],
      },
      {
        heading: 'When it tends not to',
        paragraphs: [
          'A drop year taken without a clear plan, just to delay a decision, often just delays the same uncertainty by twelve months.',
        ],
      },
      {
        heading: 'How we help families decide',
        paragraphs: [
          "We talk through the reasoning with the family before recommending either direction — the goal is a decision the family feels confident about, not a default answer.",
        ],
      },
    ],
  },
  {
    slug: 'complete-admission-timeline-gujarat-students',
    title: 'Complete Admission Timeline for Gujarat Students',
    category: 'Exams',
    excerpt: 'Admission season has a lot of moving deadlines. Here is how to think about building your own timeline.',
    readTime: '6 min read',
    date: '2026-03-20',
    author: 'kishan',
    sections: [
      {
        heading: 'Why a personal timeline matters more than a generic one',
        paragraphs: [
          'Exact dates shift year to year and vary by course, college and category, so rather than publishing fixed dates that go stale, we help each family build a timeline specific to their situation, updated as official dates are announced.',
        ],
      },
      {
        heading: 'What to track',
        paragraphs: [
          'Entrance exam registration and result windows, college application windows, document preparation, and category- or quota-specific requirements are the pieces that most often catch families off guard.',
        ],
      },
      {
        heading: 'How we help families stay on track',
        paragraphs: [
          "As part of admission guidance, we help track deadlines and follow up on applications, so nothing important slips because two important dates landed in the same week.",
        ],
      },
    ],
  },
]
```

- [ ] **Step 2:** Run `npx tsc --noEmit`. Expected: no errors.

---

### Task 3: `success-stories/SuccessStoriesHero` (TDD)

**Files:** Create `src/components/success-stories/SuccessStoriesHero.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SuccessStoriesHero } from './SuccessStoriesHero'

describe('SuccessStoriesHero', () => {
  it('renders the H1 and subheading', () => {
    render(<SuccessStoriesHero />)
    expect(
      screen.getByRole('heading', { level: 1, name: /real students\. real decisions\. real outcomes\./i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/moved from confusion to clarity/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
export function SuccessStoriesHero() {
  return (
    <section className="bg-soft-cream px-4 py-16 text-center md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold leading-tight text-ink md:text-6xl">
          Real students. Real decisions. Real outcomes.
        </h1>
        <p className="mt-4 text-lg text-muted-ink">
          See how students and families moved from confusion to clarity.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 4: `success-stories/FeaturedCaseStudy` (TDD)

**Files:** Create `src/components/success-stories/FeaturedCaseStudy.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FeaturedCaseStudy } from './FeaturedCaseStudy'

describe('FeaturedCaseStudy', () => {
  it('renders the first story with Was/Found/Chose/Now labels and student meta', () => {
    render(<FeaturedCaseStudy />)
    expect(screen.getByText('Was')).toBeInTheDocument()
    expect(screen.getByText('Found')).toBeInTheDocument()
    expect(screen.getByText('Chose')).toBeInTheDocument()
    expect(screen.getByText('Now')).toBeInTheDocument()
    expect(screen.getByText(/class 10/i)).toBeInTheDocument()
    expect(screen.getByText(/surat/i)).toBeInTheDocument()
    expect(screen.getByText('After 10th')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation — features `successStories[0]`:

```tsx
import { successStories } from '@/data/stories'

export function FeaturedCaseStudy() {
  const story = successStories[0]

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
      <div className="overflow-hidden rounded-2xl border border-neutral-border bg-white md:grid md:grid-cols-2">
        <div className="aspect-video bg-soft-cream md:aspect-auto" role="img" aria-label={story.imageAlt}>
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-ink">
            {story.imageAlt}
          </div>
        </div>

        <div className="p-6 md:p-10">
          <p className="text-sm font-semibold text-brand-green">
            {story.studentInitial} · {story.studentClass} · {story.city}
          </p>
          <p className="mt-1 text-sm text-muted-ink">{story.service}</p>

          <dl className="mt-6 space-y-4">
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-brand-green">Was</dt>
              <dd className="mt-1 text-ink">{story.was}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-brand-green">Found</dt>
              <dd className="mt-1 text-ink">{story.found}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-brand-green">Chose</dt>
              <dd className="mt-1 text-ink">{story.chose}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-brand-green">Now</dt>
              <dd className="mt-1 text-ink">{story.now}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 5: `success-stories/StoryFilterGrid` — filter tabs + grid with empty state (TDD)

**Files:** Create `src/components/success-stories/StoryFilterGrid.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StoryFilterGrid } from './StoryFilterGrid'

describe('StoryFilterGrid', () => {
  it('shows all stories by default under the "All" tab', () => {
    render(<StoryFilterGrid />)
    expect(screen.getByText(/class 10/i)).toBeInTheDocument()
    expect(screen.getByText(/class 12/i)).toBeInTheDocument()
    expect(screen.getByText(/working professional/i)).toBeInTheDocument()
  })

  it('filters to a single story when its category tab is selected', async () => {
    render(<StoryFilterGrid />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('tab', { name: 'After 12th' }))
    expect(screen.getByText(/class 12/i)).toBeInTheDocument()
    expect(screen.queryByText(/class 10/i)).not.toBeInTheDocument()
  })

  it('shows an empty state for a category with no seeded stories yet', async () => {
    render(<StoryFilterGrid />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('tab', { name: 'Study Abroad' }))
    expect(screen.getByText(/no stories in this category yet/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { successStories } from '@/data/stories'
import { services } from '@/data/services'
import type { WhatsAppContext } from '@/components/whatsapp/whatsappMessages'

type FilterValue = 'all' | WhatsAppContext

export function StoryFilterGrid() {
  const [filter, setFilter] = useState<FilterValue>('all')

  const filtered = filter === 'all' ? successStories : successStories.filter((story) => story.filterCategory === filter)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterValue)}>
        <TabsList className="h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
          <TabsTrigger value="all" className="rounded-full border border-neutral-border data-[state=active]:bg-brand-green data-[state=active]:text-warm-white">
            All
          </TabsTrigger>
          {services.map((service) => (
            <TabsTrigger
              key={service.id}
              value={service.id}
              className="rounded-full border border-neutral-border data-[state=active]:bg-brand-green data-[state=active]:text-warm-white"
            >
              {service.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-muted-ink">No stories in this category yet — check back soon.</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {filtered.map((story) => (
            <div key={`${story.studentInitial}-${story.city}`} className="rounded-xl border border-neutral-border bg-white p-5">
              <p className="text-sm font-semibold text-brand-green">
                {story.studentInitial} · {story.studentClass} · {story.city}
              </p>
              <p className="mt-1 text-xs text-muted-ink">{story.service}</p>
              <dl className="mt-3 space-y-2 text-sm">
                <div>
                  <dt className="font-semibold text-ink">Was</dt>
                  <dd className="text-muted-ink">{story.was}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Now</dt>
                  <dd className="text-muted-ink">{story.now}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS, 3 tests.

---

### Task 6: `success-stories/WhatMakesTheDifference` (TDD)

**Files:** Create `src/components/success-stories/WhatMakesTheDifference.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WhatMakesTheDifference } from './WhatMakesTheDifference'

describe('WhatMakesTheDifference', () => {
  it('contrasts generic advice with the assessment-based approach', () => {
    render(<WhatMakesTheDifference />)
    expect(screen.getByRole('heading', { name: /what makes the difference/i })).toBeInTheDocument()
    expect(screen.getByText(/generic career advice/i)).toBeInTheDocument()
    expect(screen.getByText(/assessment \+ counselling \+ personalised roadmap/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
export function WhatMakesTheDifference() {
  return (
    <section className="bg-green-tint px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">What makes the difference</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-neutral-border bg-white p-6">
            <p className="font-semibold text-muted-ink">Generic career advice</p>
            <p className="mt-2 text-sm text-muted-ink">
              One-size-fits-all opinions, based on what worked for someone else, with no structured way to check
              whether it fits this student.
            </p>
          </div>
          <div className="rounded-xl border-2 border-brand-yellow bg-white p-6">
            <p className="font-semibold text-brand-green">Assessment + counselling + personalised roadmap</p>
            <p className="mt-2 text-sm text-ink">
              A structured psychometric assessment, interpreted together in a one-on-one session, turned into a
              roadmap built around this specific student.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 7: `pages/SuccessStories.tsx` — compose the full page (TDD)

**Files:** Replace `src/pages/SuccessStories.tsx`, create `src/pages/SuccessStories.test.tsx`

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SuccessStories from './SuccessStories'

describe('SuccessStories page', () => {
  it('renders every section heading in order', () => {
    render(
      <MemoryRouter>
        <SuccessStories />
      </MemoryRouter>,
    )

    const headingNames = [
      /real students\. real decisions\. real outcomes\./i,
      /hear it from parents/i,
      /what makes the difference/i,
      /your child's story could be next/i,
    ]

    headingNames.forEach((name) => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    })
  })

  it('renders the trust strip, featured case study and Google reviews', () => {
    render(
      <MemoryRouter>
        <SuccessStories />
      </MemoryRouter>,
    )
    expect(screen.getByText('5.0★')).toBeInTheDocument()
    expect(screen.getByText('Was')).toBeInTheDocument()
    expect(screen.getByText(/\[LIVE GOOGLE REVIEWS WIDGET/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL (page is still the Phase 1 stub).
- [ ] **Step 3:** Implementation:

```tsx
import { SuccessStoriesHero } from '@/components/success-stories/SuccessStoriesHero'
import { TrustStrip } from '@/components/trust/TrustStrip'
import { FeaturedCaseStudy } from '@/components/success-stories/FeaturedCaseStudy'
import { StoryFilterGrid } from '@/components/success-stories/StoryFilterGrid'
import { VideoTestimonials } from '@/components/home/VideoTestimonials'
import { WhatMakesTheDifference } from '@/components/success-stories/WhatMakesTheDifference'
import { GoogleReviews } from '@/components/trust/GoogleReviews'
import { FinalCTA } from '@/components/home/FinalCTA'

export default function SuccessStories() {
  return (
    <>
      <SuccessStoriesHero />
      <TrustStrip />
      <FeaturedCaseStudy />
      <StoryFilterGrid />
      <VideoTestimonials />
      <WhatMakesTheDifference />
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
        <GoogleReviews />
      </div>
      <FinalCTA heading="Your child's story could be next." />
    </>
  )
}
```

- [ ] **Step 4:** Run `npm run test -- src/pages/SuccessStories.test.tsx`. Expected: PASS, 2 tests.

---

### Task 8: `blogs/BlogHero` — heading + search input (TDD)

**Files:** Create `src/components/blogs/BlogHero.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BlogHero } from './BlogHero'

describe('BlogHero', () => {
  it('renders the H1 and calls onSearchChange as the visitor types', async () => {
    const onSearchChange = vi.fn()
    render(<BlogHero searchValue="" onSearchChange={onSearchChange} />)

    expect(screen.getByRole('heading', { level: 1, name: /career guidance, explained\./i })).toBeInTheDocument()

    const user = userEvent.setup()
    await user.type(screen.getByRole('searchbox'), 'stream')
    expect(onSearchChange).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
interface BlogHeroProps {
  searchValue: string
  onSearchChange: (value: string) => void
}

export function BlogHero({ searchValue, onSearchChange }: BlogHeroProps) {
  return (
    <section className="bg-soft-cream px-4 py-16 text-center md:px-8 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold leading-tight text-ink md:text-6xl">Career guidance, explained.</h1>
        <p className="mt-4 text-lg text-muted-ink">
          Practical guidance for students and parents making important education and career decisions.
        </p>
        <input
          type="search"
          role="searchbox"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search articles…"
          aria-label="Search blog articles"
          className="mt-8 w-full rounded-full border border-neutral-border bg-white px-5 py-3 text-sm shadow-sm"
        />
      </div>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 9: `blogs/BlogCategories` (TDD)

**Files:** Create `src/components/blogs/BlogCategories.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BlogCategories } from './BlogCategories'

describe('BlogCategories', () => {
  it('renders all six categories plus All, and reports selection', async () => {
    const onSelect = vi.fn()
    render(<BlogCategories selected="All" onSelect={onSelect} />)

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Parenting' })).toBeInTheDocument()

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Exams' }))
    expect(onSelect).toHaveBeenCalledWith('Exams')
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
import type { BlogCategory } from '@/data/blogs'
import { cn } from '@/lib/utils'

const CATEGORIES: Array<BlogCategory | 'All'> = ['All', 'After 10th', 'After 12th', 'Exams', 'Colleges', 'Careers', 'Parenting']

interface BlogCategoriesProps {
  selected: BlogCategory | 'All'
  onSelect: (category: BlogCategory | 'All') => void
}

export function BlogCategories({ selected, onSelect }: BlogCategoriesProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-4">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          className={cn(
            'rounded-full border border-neutral-border px-4 py-2 text-sm font-medium',
            selected === category ? 'bg-brand-green text-warm-white' : 'bg-white text-ink hover:bg-green-tint',
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 10: `blogs/FeaturedPost` (TDD)

**Files:** Create `src/components/blogs/FeaturedPost.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { FeaturedPost } from './FeaturedPost'
import { blogPosts } from '@/data/blogs'

describe('FeaturedPost', () => {
  it('renders the given post title, category, excerpt and a link to its detail page', () => {
    render(
      <MemoryRouter>
        <FeaturedPost post={blogPosts[0]} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: blogPosts[0].title })).toBeInTheDocument()
    expect(screen.getByText(blogPosts[0].category)).toBeInTheDocument()
    expect(screen.getByText(blogPosts[0].excerpt)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: new RegExp(blogPosts[0].title) })).toHaveAttribute(
      'href',
      `/blogs/${blogPosts[0].slug}`,
    )
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
import { Link } from 'react-router-dom'
import type { BlogPost } from '@/data/blogs'

interface FeaturedPostProps {
  post: BlogPost
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link
      to={`/blogs/${post.slug}`}
      className="mx-auto block max-w-5xl overflow-hidden rounded-2xl border border-neutral-border bg-white md:grid md:grid-cols-2"
    >
      <div
        className="aspect-video bg-soft-cream md:aspect-auto"
        role="img"
        aria-label={`[FEATURED IMAGE — ${post.title.toUpperCase()}]`}
      >
        <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-ink">
          [FEATURED IMAGE]
        </div>
      </div>
      <div className="p-6 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">{post.category}</p>
        <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">{post.title}</h2>
        <p className="mt-3 text-muted-ink">{post.excerpt}</p>
        <p className="mt-4 text-xs text-muted-ink">
          {post.readTime} · {post.date}
        </p>
      </div>
    </Link>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 11: `blogs/BlogGrid` — grid + pagination (TDD)

**Files:** Create `src/components/blogs/BlogGrid.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { BlogGrid } from './BlogGrid'
import { blogPosts } from '@/data/blogs'

describe('BlogGrid', () => {
  it('paginates at 6 posts per page and shows a Next control', async () => {
    render(
      <MemoryRouter>
        <BlogGrid posts={blogPosts} />
      </MemoryRouter>,
    )
    expect(screen.getAllByRole('link', { name: /read time/i }).length).toBeLessThanOrEqual(6)

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText(blogPosts[6].title)).toBeInTheDocument()
  })

  it('shows an empty state when there are no posts to show', () => {
    render(
      <MemoryRouter>
        <BlogGrid posts={[]} />
      </MemoryRouter>,
    )
    expect(screen.getByText(/no articles match/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found. (Note: card link accessible name in the implementation below includes "Read time" text so the `/read time/i` link-name query matches.)
- [ ] **Step 3:** Implementation:

```tsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import type { BlogPost } from '@/data/blogs'

const PAGE_SIZE = 6

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [posts])

  if (posts.length === 0) {
    return <p className="mx-auto max-w-7xl px-4 py-16 text-center text-muted-ink md:px-8">No articles match your search.</p>
  }

  const totalPages = Math.ceil(posts.length / PAGE_SIZE)
  const pagePosts = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pagePosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blogs/${post.slug}`}
            className="block overflow-hidden rounded-xl border border-neutral-border bg-white"
            aria-label={`${post.title} — ${post.readTime}`}
          >
            <div className="aspect-video bg-soft-cream" role="img" aria-label={`[IMAGE — ${post.title.toUpperCase()}]`}>
              <div className="flex h-full items-center justify-center p-4 text-center text-xs text-muted-ink">
                [IMAGE]
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">{post.category}</p>
              <p className="mt-2 font-semibold text-ink">{post.title}</p>
              <p className="mt-1 text-sm text-muted-ink">{post.excerpt}</p>
              <p className="mt-3 text-xs text-muted-ink">
                {post.readTime} · {post.date}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <span className="text-sm text-muted-ink">
            Page {page} of {totalPages}
          </span>
          <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS, 2 tests.

---

### Task 12: `pages/Blogs.tsx` — compose with search + category + pagination state (TDD)

**Files:** Replace `src/pages/Blogs.tsx`, create `src/pages/Blogs.test.tsx`

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Blogs from './Blogs'
import { blogPosts } from '@/data/blogs'

describe('Blogs page', () => {
  it('renders the hero, categories and the full grid by default', () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /career guidance, explained\./i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Parenting' })).toBeInTheDocument()
  })

  it('filters the grid by category', async () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>,
    )
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Parenting' }))
    expect(screen.getByText('How to Choose a Career When Your Parents Disagree')).toBeInTheDocument()
    expect(screen.queryByText('Best Colleges in Gujarat for BBA')).not.toBeInTheDocument()
  })

  it('filters the grid by search text', async () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>,
    )
    const user = userEvent.setup()
    await user.type(screen.getByRole('searchbox'), 'drop year')
    expect(screen.getByText(blogPosts.find((p) => p.slug === 'should-my-child-take-a-drop-year')!.title)).toBeInTheDocument()
    expect(screen.queryByText('Complete Admission Timeline for Gujarat Students')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL (page is still the Phase 1 stub).
- [ ] **Step 3:** Implementation:

```tsx
import { useMemo, useState } from 'react'
import { BlogHero } from '@/components/blogs/BlogHero'
import { BlogCategories } from '@/components/blogs/BlogCategories'
import { FeaturedPost } from '@/components/blogs/FeaturedPost'
import { BlogGrid } from '@/components/blogs/BlogGrid'
import { FreeAssessmentSection } from '@/components/home/FreeAssessmentSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { blogPosts, type BlogCategory } from '@/data/blogs'

export default function Blogs() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<BlogCategory | 'All'>('All')

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return blogPosts.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category
      const matchesSearch =
        query === '' || post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [search, category])

  return (
    <>
      <BlogHero searchValue={search} onSearchChange={setSearch} />
      <div className="mt-10">
        <BlogCategories selected={category} onSelect={setCategory} />
      </div>
      <div className="mt-10">
        <FeaturedPost post={blogPosts[0]} />
      </div>
      <BlogGrid posts={filtered} />
      <FreeAssessmentSection />
      <FinalCTA />
    </>
  )
}
```

- [ ] **Step 4:** Run `npm run test -- src/pages/Blogs.test.tsx`. Expected: PASS, 3 tests.

---

### Task 13: `blog-detail/Breadcrumb` (TDD)

**Files:** Create `src/components/blog-detail/Breadcrumb.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Breadcrumb } from './Breadcrumb'

describe('Breadcrumb', () => {
  it('renders Home / Blogs / current title with the title not a link', () => {
    render(
      <MemoryRouter>
        <Breadcrumb title="Is Commerce With Maths a Good Choice?" />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Blogs' })).toHaveAttribute('href', '/blogs')
    expect(screen.getByText('Is Commerce With Maths a Good Choice?')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
import { Link } from 'react-router-dom'

interface BreadcrumbProps {
  title: string
}

export function Breadcrumb({ title }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-3xl px-4 pt-8 text-sm text-muted-ink md:px-8">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="hover:text-brand-green">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link to="/blogs" className="hover:text-brand-green">
            Blogs
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="text-ink" aria-current="page">
          {title}
        </li>
      </ol>
    </nav>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 14: `blog-detail/ArticleHeader` (TDD)

**Files:** Create `src/components/blog-detail/ArticleHeader.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ArticleHeader } from './ArticleHeader'
import { blogPosts } from '@/data/blogs'

describe('ArticleHeader', () => {
  it('renders category, H1, date, read time and author name', () => {
    const post = blogPosts[0]
    render(<ArticleHeader post={post} />)
    expect(screen.getByText(post.category)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: post.title })).toBeInTheDocument()
    expect(screen.getByText(post.readTime)).toBeInTheDocument()
    expect(screen.getByText(post.date)).toBeInTheDocument()
    expect(screen.getByText('Kishan Patel')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
import type { BlogPost } from '@/data/blogs'

const AUTHOR_NAMES = { kishan: 'Kishan Patel', meeta: 'Meeta Patel' } as const

interface ArticleHeaderProps {
  post: BlogPost
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <header className="mx-auto max-w-3xl px-4 pt-6 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">{post.category}</p>
      <h1 className="mt-2 text-3xl font-bold leading-tight text-ink md:text-5xl">{post.title}</h1>
      <p className="mt-4 text-sm text-muted-ink">
        By {AUTHOR_NAMES[post.author]} · {post.date} · {post.readTime}
      </p>
    </header>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 15: `blog-detail/ArticleBody` — sticky TOC + content sections (TDD)

**Files:** Create `src/components/blog-detail/ArticleBody.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ArticleBody } from './ArticleBody'
import { blogPosts } from '@/data/blogs'

describe('ArticleBody', () => {
  it('renders every section heading and paragraph, plus a matching table of contents', () => {
    const post = blogPosts[0]
    render(<ArticleBody sections={post.sections} />)

    post.sections.forEach((section) => {
      expect(screen.getAllByText(section.heading).length).toBeGreaterThanOrEqual(2) // TOC link + section heading
      expect(screen.getByText(section.paragraphs[0])).toBeInTheDocument()
    })

    expect(screen.getByRole('navigation', { name: /table of contents/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation — the TOC is derived directly from `sections`, so it can never drift out of sync with the article body:

```tsx
import type { BlogSection } from '@/data/blogs'

function slugify(heading: string): string {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

interface ArticleBodyProps {
  sections: BlogSection[]
}

export function ArticleBody({ sections }: ArticleBodyProps) {
  return (
    <div className="mx-auto mt-10 grid max-w-5xl gap-10 px-4 md:grid-cols-[200px_1fr] md:px-8">
      <nav aria-label="Table of contents" className="hidden md:sticky md:top-24 md:block md:h-fit">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-ink">On this page</p>
        <ul className="mt-3 space-y-2">
          {sections.map((section) => (
            <li key={section.heading}>
              <a href={`#${slugify(section.heading)}`} className="text-sm text-ink hover:text-brand-green">
                {section.heading}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <article className="max-w-2xl space-y-10">
        {sections.map((section) => (
          <section key={section.heading} id={slugify(section.heading)} className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-ink">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-ink">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </article>
    </div>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 16: `blog-detail/InlineCTA` and `blog-detail/SidebarBookingForm` (TDD)

**Files:** Create `src/components/blog-detail/InlineCTA.tsx` + test, `src/components/blog-detail/SidebarBookingForm.tsx` + test

- [ ] **Step 1:** Test for `InlineCTA`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { InlineCTA } from './InlineCTA'

describe('InlineCTA', () => {
  it('renders the mid-article prompt with a link to Contact Us', () => {
    render(<InlineCTA />)
    expect(screen.getByText(/not sure what is right for your child/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /book a free consultation/i })).toHaveAttribute('href', '/contact-us')
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
import { Link } from 'react-router-dom'

export function InlineCTA() {
  return (
    <div className="mx-auto my-10 max-w-2xl rounded-xl border border-brand-yellow bg-soft-cream p-6 text-center">
      <p className="font-semibold text-ink">Not sure what is right for your child? Book a free consultation.</p>
      <Link
        to="/contact-us"
        className="mt-4 inline-block rounded-full bg-brand-yellow px-6 py-2 text-sm font-semibold text-ink hover:bg-brand-yellow/90"
      >
        Book a Free Consultation
      </Link>
    </div>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

- [ ] **Step 5:** Test for `SidebarBookingForm`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SidebarBookingForm } from './SidebarBookingForm'

describe('SidebarBookingForm', () => {
  it('renders a sticky consultation form', () => {
    render(<SidebarBookingForm />)
    expect(screen.getByLabelText(/student name/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /book free session/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 6:** Run test. Expected: FAIL — module not found.
- [ ] **Step 7:** Implementation:

```tsx
import { ConsultationForm } from '@/components/forms/ConsultationForm'

export function SidebarBookingForm() {
  return (
    <aside className="hidden md:sticky md:top-24 md:block md:h-fit md:rounded-xl md:border md:border-neutral-border md:bg-white md:p-6">
      <p className="font-semibold text-ink">Book your free session</p>
      <div className="mt-4">
        <ConsultationForm context="home" />
      </div>
    </aside>
  )
}
```

- [ ] **Step 8:** Run test. Expected: PASS.

---

### Task 17: `blog-detail/AuthorBio` (TDD)

**Files:** Create `src/components/blog-detail/AuthorBio.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AuthorBio } from './AuthorBio'

describe('AuthorBio', () => {
  it("renders Kishan's bio card", () => {
    render(<AuthorBio author="kishan" />)
    expect(screen.getByText('Kishan Patel')).toBeInTheDocument()
    expect(screen.getByText(/edumilestones/i)).toBeInTheDocument()
  })

  it("renders Meeta's bio card", () => {
    render(<AuthorBio author="meeta" />)
    expect(screen.getByText('Meeta Patel')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation — reuses only already-established facts about each founder (no new biographical claims):

```tsx
import type { BlogAuthor } from '@/data/blogs'

const BIOS = {
  kishan: {
    name: 'Kishan Patel',
    role: 'Career Counsellor',
    credentials: '30+ years guiding students across Gujarat. Certified Career Analyst — Edumilestones.',
  },
  meeta: {
    name: 'Meeta Patel',
    role: 'Career Counsellor',
    credentials: 'Specialises in working with parents and students together, particularly around stream selection after Class 10.',
  },
} satisfies Record<BlogAuthor, { name: string; role: string; credentials: string }>

interface AuthorBioProps {
  author: BlogAuthor
}

export function AuthorBio({ author }: AuthorBioProps) {
  const bio = BIOS[author]

  return (
    <div className="mx-auto mt-16 max-w-2xl rounded-xl border border-neutral-border bg-green-tint p-6">
      <div className="flex items-center gap-4">
        <div
          className="h-14 w-14 shrink-0 rounded-full bg-soft-cream"
          role="img"
          aria-label={`[REAL PHOTO — ${bio.name.toUpperCase()}]`}
        />
        <div>
          <p className="font-bold text-brand-green">{bio.name}</p>
          <p className="text-sm text-muted-ink">{bio.role}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-ink">{bio.credentials}</p>
    </div>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS, 2 tests.

---

### Task 18: `blog-detail/RelatedPosts` (TDD)

**Files:** Create `src/components/blog-detail/RelatedPosts.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { RelatedPosts } from './RelatedPosts'
import { blogPosts } from '@/data/blogs'

describe('RelatedPosts', () => {
  it('renders up to 3 other posts from the same category, excluding the current one', () => {
    const current = blogPosts.find((p) => p.slug === 'career-counselling-in-surat-what-to-expect')!
    render(
      <MemoryRouter>
        <RelatedPosts currentSlug={current.slug} category={current.category} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: /related articles/i })).toBeInTheDocument()
    expect(screen.queryByText(current.title)).not.toBeInTheDocument()
    expect(screen.getByText('Career Counselling in Navsari, Ankleshwar and Valsad')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
import { Link } from 'react-router-dom'
import { blogPosts, type BlogCategory } from '@/data/blogs'

interface RelatedPostsProps {
  currentSlug: string
  category: BlogCategory
}

export function RelatedPosts({ currentSlug, category }: RelatedPostsProps) {
  const related = blogPosts.filter((post) => post.category === category && post.slug !== currentSlug).slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="mx-auto mt-16 max-w-5xl px-4 md:px-8">
      <h2 className="text-2xl font-bold text-ink">Related articles</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            to={`/blogs/${post.slug}`}
            className="block rounded-xl border border-neutral-border bg-white p-4 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">{post.category}</p>
            <p className="mt-2 text-sm font-semibold text-ink">{post.title}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 19: `pages/BlogDetail.tsx` — compose the full page, including not-found handling (TDD)

**Files:** Replace `src/pages/BlogDetail.tsx`, create `src/pages/BlogDetail.test.tsx`

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import BlogDetail from './BlogDetail'
import { blogPosts } from '@/data/blogs'

function renderAtSlug(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/blogs/${slug}`]}>
      <Routes>
        <Route path="/blogs/:slug" element={<BlogDetail />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('BlogDetail page', () => {
  it('renders breadcrumb, header, article body, inline CTA, sidebar form, author bio and related posts', () => {
    const post = blogPosts[0]
    renderAtSlug(post.slug)

    expect(screen.getByRole('link', { name: 'Blogs' })).toHaveAttribute('href', '/blogs')
    expect(screen.getByRole('heading', { level: 1, name: post.title })).toBeInTheDocument()
    expect(screen.getByText(post.sections[0].heading)).toBeInTheDocument()
    expect(screen.getByText(/not sure what is right for your child/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/student name/i)).toBeInTheDocument()
    expect(screen.getByText('Kishan Patel')).toBeInTheDocument()
  })

  it('renders an honest not-found state for an unknown slug', () => {
    renderAtSlug('this-slug-does-not-exist')
    expect(screen.getByRole('heading', { name: /article not found/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to blogs/i })).toHaveAttribute('href', '/blogs')
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL (page is still the Phase 1 stub).
- [ ] **Step 3:** Implementation:

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
import { blogPosts } from '@/data/blogs'

export default function BlogDetail() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

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

*Implementation note: `ArticleBody` is called twice (splitting sections before/after the inline CTA) so the TOC-derivation logic in Task 15 stays a single source of truth without a separate "insert CTA at 40%" position-calculation component — each call renders its own local TOC nav, which is visually redundant for a 3-section post. If a post's `sections.length` grows past ~4 in future content, consider passing an `insertAfter` index into a single `ArticleBody` call instead. Not required for the current 3-section posts.*

- [ ] **Step 5:** Run `npm run test -- src/App.test.tsx`. Expected: PASS (App routing test doesn't touch `/blogs/:slug`, unaffected).

---

### Task 20: Enhance `pages/ThankYou.tsx` (TDD)

**Files:** Replace `src/pages/ThankYou.tsx`, create `src/pages/ThankYou.test.tsx`

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ThankYou from './ThankYou'

describe('ThankYou page', () => {
  it('renders the heading, a WhatsApp continue link, recommended articles and contact details', () => {
    render(
      <MemoryRouter>
        <ThankYou />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: /thank you/i })).toBeInTheDocument()
    const whatsappLink = screen.getByRole('link', { name: /continue to whatsapp/i })
    expect(whatsappLink).toHaveAttribute('href', expect.stringContaining('https://wa.me/918758175187'))
    expect(screen.getByRole('heading', { name: /recommended articles/i })).toBeInTheDocument()
    expect(screen.getByText('+91 87581 75187')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL (current page has none of this).
- [ ] **Step 3:** Implementation:

```tsx
import { Link } from 'react-router-dom'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { blogPosts } from '@/data/blogs'

const DEFAULT_MESSAGE = 'Hi, I want to know about career counselling for my child in Class ___'

export default function ThankYou() {
  const recommended = blogPosts.slice(0, 3)

  return (
    <div className="mx-auto max-w-3xl px-4 py-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-green">Thank you</h1>
        <p className="mt-4 text-muted-ink">Your WhatsApp message is ready to send.</p>
        <a
          href={buildWhatsAppUrl(DEFAULT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-ink hover:bg-brand-yellow/90"
        >
          Continue to WhatsApp
        </a>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-ink">Recommended articles</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {recommended.map((post) => (
            <Link
              key={post.slug}
              to={`/blogs/${post.slug}`}
              className="block rounded-xl border border-neutral-border bg-white p-4 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">{post.category}</p>
              <p className="mt-2 text-sm font-semibold text-ink">{post.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-xl border border-neutral-border bg-green-tint p-6 text-center">
        <h2 className="text-lg font-semibold text-ink">Contact details</h2>
        <p className="mt-2 text-ink">+91 87581 75187</p>
        <p className="text-ink">kishan@bestcareercounselling.com</p>
      </section>
    </div>
  )
}
```

- [ ] **Step 4:** Run `npm run test -- src/pages/ThankYou.test.tsx`. Expected: PASS.

---

### Task 21: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1:** `npm run test`. Expected: all test files pass, 0 failures.
- [ ] **Step 2:** `npx tsc --noEmit`. Expected: no errors.
- [ ] **Step 3:** `npm run lint`. Expected: no errors.
- [ ] **Step 4:** `npm run build`. Expected: exits 0, produces `dist/`.
- [ ] **Step 5:** Smoke test: start `npm run dev`, curl `/success-stories`, `/blogs`, `/blogs/<a-real-slug>`, `/blogs/not-a-real-slug`, `/thank-you` for 200 status, confirm no server-side errors in the dev log.

---

## Self-Review Notes

- **Spec coverage:** §17 (Success Stories) — hero, trust strip, featured case study (Was/Found/Chose/Now + image/class/city/service), filters (all 6 categories + All, with honest empty state for the 3 categories not yet seeded), case study grid, video stories (reuse), "what makes the difference", Google reviews (reuse), final CTA with the exact spec copy — all covered. §18 (Blogs) — hero + search, 6 categories, featured post, 3-column grid, pagination, free assessment (reuse), final CTA (reuse) — all covered. §19 (Blog Detail) — breadcrumb, article header (category/title/date/read time/author), sticky TOC, article content, inline CTA at the midpoint, sticky sidebar form, author bio, related posts, final CTA (reuse) — all covered. §20 — all 12 titles seeded with real (non-fabricated) structural content. §22 (Thank You) — WhatsApp continue CTA, recommended articles, contact details — covered (the spec also mentions a "free guide" but supplies no actual guide asset or content for one, so per §30/§31 no fabricated placeholder file/link is added for it; flagged here rather than silently dropped).
- **Placeholder scan:** `[REAL PHOTO — ...]`, `[FEATURED IMAGE]`, `[IMAGE — ...]`, `[CLIENT TO PROVIDE ...]` placeholders are intentional, matching Phases 1–2's established pattern.
- **Type consistency:** `SuccessStory.filterCategory` and `Service.id` both type as `WhatsAppContext`, so `StoryFilterGrid`'s tab values line up with `services` without a cast. `BlogPost.category` is the single `BlogCategory` union used by `BlogCategories`, `BlogGrid`'s filtering logic in `pages/Blogs.tsx`, and `RelatedPosts`.
- **No regressions:** No Phase 1/2 component signatures change in this phase — Task 1's extension to `stories.ts` is additive only, confirmed by re-running the full suite after that task.
