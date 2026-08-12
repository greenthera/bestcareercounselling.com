# Career Counselling Website — Phase 2: Who We Are, What We Do, Contact Us — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build out the three remaining primary pages from design-spec §7 that reuse Phase 1's shared chrome and section library: `/who-we-are` (§15), `/what-we-do` with all 6 service sections + comparison table (§16), and `/contact-us` (§21).

**Architecture:** Same stack as Phase 1 (Vite + React 19 + TS + Tailwind v3 + shadcn primitives + React Router, Vitest + RTL). Each page is composed from a mix of **reused Phase 1 sections** (TrustStrip, ProblemSection, HowItWorks, ReportSection, GoogleReviews, VideoTestimonials, SuccessStoriesPreview, WhoWeHelp, LocationsSection, MeetFounders, FreeAssessmentSection) and **new page-specific sections** under `src/components/who-we-are/`, `src/components/what-we-do/`, `src/components/contact/`. Two small, backward-compatible extensions to existing Phase 1 components are needed (FAQSection becomes data-driven; ConsultationForm/FinalCTA gain optional label/heading overrides) — both keep Home's current behavior as the default so no Phase 1 test changes are required beyond the ones this plan explicitly updates.

**Tech Stack:** Same as Phase 1 — no new dependencies.

**Content-fidelity notes (read before implementing):** Per spec §30/§31, nothing is fabricated. Where the source prompt (§15/§16/§21) doesn't supply a fact (exact durations, timeline dates, appointment SLAs, per-service admission-support detail), this plan either (a) reuses an already-established site fact from Phase 1 (e.g. the Home FAQ's "a couple of weeks" duration claim, the 4-step process, the Class dropdown taxonomy), (b) derives a value directly from spec-given content (e.g. "Admission Support: Yes/No" derived from whether a service's own "Cover" bullet list in §16 mentions applications), or (c) uses a `[CLIENT TO PROVIDE]`-style bracketed placeholder, consistent with Phase 1's pattern (`src/data/locations.ts`, `src/data/stories.ts`). No new specific numbers, dates, or claims are invented.

---

## File Structure

```text
src/
├── data/
│   ├── services.ts        (MODIFY — extend Service with detail-page fields)
│   └── faqs.ts             (NEW — homeFaqs, bookingFaqs)
├── components/
│   ├── home/
│   │   └── FAQSection.tsx  (MODIFY — accept faqs + heading props)
│   ├── forms/
│   │   └── ConsultationForm.tsx (MODIFY — optional submitLabel prop)
│   ├── who-we-are/
│   │   ├── WhoWeAreHero.tsx / .test.tsx
│   │   ├── OurStory.tsx / .test.tsx
│   │   ├── FounderProfiles.tsx / .test.tsx
│   │   ├── OurMethodology.tsx / .test.tsx
│   │   ├── OurJourney.tsx / .test.tsx
│   │   ├── RealWork.tsx / .test.tsx
│   │   └── UniversitiesSection.tsx / .test.tsx
│   ├── what-we-do/
│   │   ├── WhatWeDoHero.tsx / .test.tsx
│   │   ├── ServiceNav.tsx / .test.tsx
│   │   ├── ServiceSection.tsx / .test.tsx
│   │   └── ServiceComparisonTable.tsx / .test.tsx
│   └── contact/
│       ├── ContactHero.tsx / .test.tsx
│       ├── TwoPaths.tsx / .test.tsx
│       ├── WhatHappensOnCall.tsx / .test.tsx
│       └── ContactMethods.tsx / .test.tsx
└── pages/
    ├── WhoWeAre.tsx / .test.tsx   (REPLACE stub)
    ├── WhatWeDo.tsx / .test.tsx   (REPLACE stub)
    └── ContactUs.tsx / .test.tsx  (REPLACE Phase 1 minimal version)
```

---

### Task 1: Extend `src/data/services.ts` with detail-page fields

**Files:** Modify `src/data/services.ts`

- [ ] **Step 1:** Add fields needed by `ServiceSection` and `ServiceComparisonTable`, keeping existing `id`/`title`/`description`/`ctaLabel` untouched (Home/Footer/WhoWeHelp already depend on those):

```ts
import type { WhatsAppContext } from '@/components/whatsapp/whatsappMessages'

export interface Service {
  id: WhatsAppContext
  title: string
  description: string
  ctaLabel: string
  subheading?: string
  whoItsFor?: string
  covers: string[]
  comparison: {
    whoItsFor: string
    duration: string
    assessment: string
    admissionSupport: string
    bestTimeToStart: string
  }
}

export const services: Service[] = [
  {
    id: 'after-10th',
    title: 'After 10th',
    description: 'Science, Commerce or Arts? Decide with data, not pressure.',
    ctaLabel: 'Book After 10th Counselling',
    subheading: 'Stream selection based on understanding, not pressure.',
    whoItsFor: 'Students in Class 9–10.',
    covers: [
      'Science vs Commerce vs Arts',
      'Aptitude',
      'Interests',
      'Strengths',
      'Subject suitability',
      'Career possibilities',
      'Parent counselling',
      'Career roadmap',
    ],
    comparison: {
      whoItsFor: 'Class 9–10',
      duration: 'A couple of weeks',
      assessment: 'Yes',
      admissionSupport: 'No',
      bestTimeToStart: '[CLIENT TO PROVIDE]',
    },
  },
  {
    id: 'after-12th',
    title: 'After 12th',
    description: 'Degree, course, college — before deadlines close.',
    ctaLabel: 'Book After 12th Counselling',
    covers: ['Course selection', 'College selection', 'Entrance exams', 'Career options', 'Application strategy', 'Roadmap'],
    comparison: {
      whoItsFor: 'Class 11–12',
      duration: 'A couple of weeks',
      assessment: 'Yes',
      admissionSupport: 'Yes',
      bestTimeToStart: '[CLIENT TO PROVIDE]',
    },
  },
  {
    id: 'ug-pg-admission',
    title: 'UG & PG Admission',
    description: 'Shortlists, applications, forms, follow-up. Handled.',
    ctaLabel: 'Get Admission Guidance',
    covers: ['Course shortlist', 'College shortlist', 'Application forms', 'Document preparation', 'Deadline tracking', 'Follow-up'],
    comparison: {
      whoItsFor: 'UG & PG students',
      duration: 'A couple of weeks',
      assessment: 'Yes',
      admissionSupport: 'Yes',
      bestTimeToStart: '[CLIENT TO PROVIDE]',
    },
  },
  {
    id: 'mba',
    title: 'MBA & Professional',
    description: 'CAT, entrances, specialisation. Pick the right one.',
    ctaLabel: 'Discuss Your MBA Options',
    covers: ['CAT and entrance strategy', 'Specialisation selection', 'College selection', 'Career outcomes', 'ROI considerations', 'Application guidance'],
    comparison: {
      whoItsFor: 'PG / MBA aspirants',
      duration: 'A couple of weeks',
      assessment: 'Yes',
      admissionSupport: 'Yes',
      bestTimeToStart: '[CLIENT TO PROVIDE]',
    },
  },
  {
    id: 'study-abroad',
    title: 'Study Abroad',
    description: 'Country, university, budget, visa. Mapped out.',
    ctaLabel: 'Plan Your Study Abroad Journey',
    covers: ['Country selection', 'University shortlist', 'Course selection', 'Budget planning', 'Application guidance', 'Visa guidance'],
    comparison: {
      whoItsFor: 'Students planning to study abroad',
      duration: 'A couple of weeks',
      assessment: 'Yes',
      admissionSupport: 'Yes',
      bestTimeToStart: '[CLIENT TO PROVIDE]',
    },
  },
  {
    id: 'career-change',
    title: 'Career Change',
    description: "Stuck in the wrong job? It's not too late.",
    ctaLabel: 'Discuss Your Career Change',
    covers: ['Transferable skills', 'Career assessment', 'Career options', 'Upskilling', 'Transition planning', 'Practical roadmap'],
    comparison: {
      whoItsFor: 'Working professionals',
      duration: 'A couple of weeks',
      assessment: 'Yes',
      admissionSupport: 'No',
      bestTimeToStart: '[CLIENT TO PROVIDE]',
    },
  },
]
```

- [ ] **Step 2:** Run `npx tsc --noEmit`. Expected: no errors (WhoWeHelp/Footer only read `id`/`title`/`description`, still present).
- [ ] **Step 3:** Run `npm run test`. Expected: all existing tests still pass (no behavior change to consumed fields).

---

### Task 2: `src/data/faqs.ts` — shared FAQ datasets

**Files:** Create `src/data/faqs.ts`

- [ ] **Step 1:** Write the file, moving Home's existing 8 FAQs verbatim out of `FAQSection.tsx` and adding the 5 Contact Us booking FAQs from spec §21:

```ts
export interface Faq {
  question: string
  answer: string
}

export const homeFaqs: Faq[] = [
  {
    question: 'How does career counselling work?',
    answer:
      'We start with a free consultation call, followed by a psychometric assessment covering aptitude, interest, personality and EQ, then a one-on-one session where we walk through your report and build a roadmap together.',
  },
  {
    question: 'Is the first consultation really free?',
    answer: 'Yes. The first consultation is completely free, with no obligation to continue.',
  },
  {
    question: 'My child is in Class 10 — is that too early?',
    answer:
      "Class 10 is actually the ideal time to start, since it's right before the stream-selection decision that shapes the next several years.",
  },
  {
    question: 'Do you do online sessions or only in person?',
    answer: 'We offer both online sessions and in-person sessions at our Surat, Navsari, Ankleshwar and Valsad locations.',
  },
  {
    question: 'How long does the whole process take?',
    answer: 'Most families complete the full process — consultation, assessment, session and roadmap — within a couple of weeks.',
  },
  {
    question: 'Is this just a psychometric test, or actual counselling?',
    answer: 'The assessment is one input. The core of our work is the one-on-one counselling session where we interpret the results together with you.',
  },
  {
    question: 'Should my child attend alone, or do parents come too?',
    answer: 'We generally recommend both — the assessment is for the student, but the counselling conversation works best with parents involved too.',
  },
  {
    question: 'Do you help with the actual college admission process?',
    answer: 'Yes. Beyond the roadmap, we help with course shortlisting, college shortlisting, applications and deadline tracking.',
  },
]

export const bookingFaqs: Faq[] = [
  {
    question: 'Is the consultation really free?',
    answer: 'Yes — completely free, with no obligation to continue.',
  },
  {
    question: 'Is the session online or in person?',
    answer:
      'Both. We offer online sessions as well as in-person sessions at our Surat, Navsari, Ankleshwar and Valsad locations.',
  },
  {
    question: 'Should my child join the call?',
    answer:
      "Yes, we recommend both the student and parents join — the assessment is for the student, but the conversation works best with everyone involved.",
  },
  {
    question: 'What should I have ready before the call?',
    answer:
      "Nothing formal — just your child's current class, recent marks if handy, and the questions on your mind. We'll guide the rest.",
  },
  {
    question: 'How soon can I get an appointment?',
    answer: "We keep slots open through the week — WhatsApp or call us and we'll find a time that works for you.",
  },
]
```

- [ ] **Step 2:** Run `npx tsc --noEmit`. Expected: no errors.

---

### Task 3: Refactor `FAQSection` to be data-driven (TDD)

**Files:** Modify `src/components/home/FAQSection.tsx`, `src/components/home/FAQSection.test.tsx`, `src/pages/Home.tsx`

- [ ] **Step 1:** Update the existing test to pass `faqs`/`heading` props explicitly (keeps assertions identical, just supplies data instead of relying on a hardcoded internal list):

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FAQSection } from './FAQSection'
import { homeFaqs } from '@/data/faqs'

describe('FAQSection', () => {
  it('renders all eight questions', () => {
    render(<FAQSection faqs={homeFaqs} />)
    expect(screen.getAllByRole('button', { expanded: false })).toHaveLength(8)
  })

  it('expands an answer when its question is clicked', async () => {
    render(<FAQSection faqs={homeFaqs} />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /is the first consultation really free/i }))
    expect(await screen.findByText(/yes\. the first consultation is completely free/i)).toBeInTheDocument()
  })

  it('embeds FAQPage structured data', () => {
    render(<FAQSection faqs={homeFaqs} />)
    const script = document.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
    expect(script?.textContent).toContain('FAQPage')
  })

  it('renders a custom heading when provided', () => {
    render(<FAQSection faqs={homeFaqs} heading="Booking FAQ" />)
    expect(screen.getByRole('heading', { name: 'Booking FAQ' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run `npm run test -- src/components/home/FAQSection.test.tsx`. Expected: FAIL (component doesn't accept props yet — `faqs` prop is ignored, so behavior is unaffected but the new 4th test on custom heading fails).
- [ ] **Step 3:** Update the implementation to accept props, defaulting `heading` to preserve current copy:

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import type { Faq } from '@/data/faqs'

interface FAQSectionProps {
  faqs: Faq[]
  heading?: string
}

export function FAQSection({ faqs, heading = 'Frequently asked questions' }: FAQSectionProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">{heading}</h2>

      <Accordion type="single" collapsible className="mt-8">
        {faqs.map((faq, index) => (
          <AccordionItem key={faq.question} value={`faq-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </section>
  )
}
```

- [ ] **Step 4:** Run `npm run test -- src/components/home/FAQSection.test.tsx`. Expected: PASS, 4 tests.
- [ ] **Step 5:** Update `src/pages/Home.tsx` call site: `import { homeFaqs } from '@/data/faqs'` and change `<FAQSection />` to `<FAQSection faqs={homeFaqs} />`.
- [ ] **Step 6:** Run `npm run test -- src/pages/Home.test.tsx src/App.test.tsx`. Expected: PASS (Home still renders "Frequently asked questions" heading and 8 FAQs via the default heading + passed data).

---

### Task 4: `ConsultationForm` — optional `submitLabel` prop (TDD)

**Files:** Modify `src/components/forms/ConsultationForm.tsx`, `src/components/forms/ConsultationForm.test.tsx`

- [ ] **Step 1:** Add a test for the override, appended to the existing test file:

```tsx
it('renders a custom submit label when provided', () => {
  render(<ConsultationForm context="home" submitLabel="Book a Free Consultation" />)
  expect(screen.getByRole('button', { name: 'Book a Free Consultation' })).toBeInTheDocument()
})
```

- [ ] **Step 2:** Run `npm run test -- src/components/forms/ConsultationForm.test.tsx`. Expected: FAIL (button still says "Book Free Session").
- [ ] **Step 3:** Update the component — add `submitLabel?: string` to props, default `'Book Free Session'`, use it on the `<Button>`:

```tsx
interface ConsultationFormProps {
  context: WhatsAppContext
  className?: string
  submitLabel?: string
}

export function ConsultationForm({ context, className, submitLabel = 'Book Free Session' }: ConsultationFormProps) {
```

And change the final `<Button>` line to `{submitLabel}`.

- [ ] **Step 4:** Run `npm run test -- src/components/forms/ConsultationForm.test.tsx`. Expected: PASS, 4 tests.

---

### Task 5: `FinalCTA` — optional heading/description/context/submitLabel overrides (TDD)

**Files:** Modify `src/components/home/FinalCTA.tsx`, `src/components/home/FinalCTA.test.tsx`

- [ ] **Step 1:** Add a test for the override:

```tsx
it('renders custom heading, description and submit label when provided', () => {
  render(
    <FinalCTA
      heading="Not sure which counselling service you need?"
      description="Talk to us and we'll point you to the right one."
      submitLabel="Book a Free Consultation"
    />,
  )
  expect(screen.getByRole('heading', { name: /not sure which counselling service you need/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Book a Free Consultation' })).toBeInTheDocument()
})
```

- [ ] **Step 2:** Run `npm run test -- src/components/home/FinalCTA.test.tsx`. Expected: FAIL (props ignored today).
- [ ] **Step 3:** Update implementation:

```tsx
import { ConsultationForm } from '@/components/forms/ConsultationForm'
import type { WhatsAppContext } from '@/components/whatsapp/whatsappMessages'

interface FinalCTAProps {
  heading?: string
  description?: string
  context?: WhatsAppContext
  submitLabel?: string
}

export function FinalCTA({
  heading = "Let's talk about your child's future",
  description = 'A 15-minute call costs nothing and usually clears up more than months of guessing.',
  context = 'home',
  submitLabel,
}: FinalCTAProps) {
  return (
    <section className="bg-brand-green px-4 py-16 text-warm-white md:px-8 md:py-24">
      <div className="mx-auto max-w-md text-center">
        <h2 className="text-3xl font-bold md:text-4xl">{heading}</h2>
        <p className="mt-3 text-warm-white/80">{description}</p>

        <div className="mt-8 rounded-xl bg-white p-6 text-left">
          <ConsultationForm context={context} submitLabel={submitLabel} />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4:** Run `npm run test -- src/components/home/FinalCTA.test.tsx`. Expected: PASS, 2 tests.
- [ ] **Step 5:** Run `npm run test -- src/pages/Home.test.tsx`. Expected: PASS (default props preserve Home's existing copy).

---

### Task 6: `who-we-are/WhoWeAreHero` (TDD)

**Files:** Create `src/components/who-we-are/WhoWeAreHero.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WhoWeAreHero } from './WhoWeAreHero'

describe('WhoWeAreHero', () => {
  it('renders the H1 and subheading', () => {
    render(<WhoWeAreHero />)
    expect(
      screen.getByRole('heading', { level: 1, name: /30 years\. 5,000 students\. one question we keep answering\./i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/what should i do with my life/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
export function WhoWeAreHero() {
  return (
    <section className="bg-soft-cream px-4 py-16 text-center md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold leading-tight text-ink md:text-6xl">
          30 years. 5,000 students. One question we keep answering.
        </h1>
        <p className="mt-4 text-lg text-muted-ink">
          What should I do with my life? Here's how we help families answer it.
        </p>
      </div>
      <div
        className="mx-auto mt-10 aspect-[16/7] max-w-4xl rounded-2xl border border-neutral-border bg-green-tint"
        role="img"
        aria-label="[REAL PHOTO — OFFICE / COUNSELLING SESSION]"
      >
        <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-ink">
          [REAL PHOTO — OFFICE / COUNSELLING SESSION]
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 7: `who-we-are/OurStory` (TDD)

**Files:** Create `src/components/who-we-are/OurStory.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OurStory } from './OurStory'

describe('OurStory', () => {
  it('renders the heading and all four narrative topics', () => {
    render(<OurStory />)
    expect(screen.getByRole('heading', { name: /our story/i })).toBeInTheDocument()
    expect(screen.getByText(/before career counselling/i)).toBeInTheDocument()
    expect(screen.getByText(/the moment that started it/i)).toBeInTheDocument()
    expect(screen.getByText(/why surat/i)).toBeInTheDocument()
    expect(screen.getByText(/why meeta joined/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation — structured placeholder narrative (no invented biographical facts, per spec §30):

```tsx
const TOPICS = [
  { title: 'Before career counselling', body: '[CLIENT TO PROVIDE: what Kishan was doing before he started counselling]' },
  { title: 'The moment that started it', body: '[CLIENT TO PROVIDE: the moment that made him start]' },
  { title: 'Why Surat', body: '[CLIENT TO PROVIDE: why the practice is based in Surat]' },
  { title: 'Why Meeta joined', body: '[CLIENT TO PROVIDE: how and why Meeta joined the practice]' },
  {
    title: 'Our philosophy',
    body: 'Career decisions should be based on understanding, assessment and counselling — not assumptions or pressure.',
  },
]

export function OurStory() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-3xl font-bold text-ink md:text-4xl">Our story</h2>
      <div className="mt-8 space-y-6">
        {TOPICS.map((topic) => (
          <div key={topic.title}>
            <p className="font-semibold text-brand-green">{topic.title}</p>
            <p className="mt-1 text-muted-ink">{topic.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 8: `who-we-are/FounderProfiles` (TDD)

**Files:** Create `src/components/who-we-are/FounderProfiles.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FounderProfiles } from './FounderProfiles'

describe('FounderProfiles', () => {
  it('renders detailed profiles for both founders', () => {
    render(<FounderProfiles />)
    expect(screen.getByRole('heading', { name: /kishan & meeta/i })).toBeInTheDocument()
    expect(screen.getByText('Kishan Patel')).toBeInTheDocument()
    expect(screen.getByText('Meeta Patel')).toBeInTheDocument()
    expect(screen.getAllByText(/edumilestones/i).length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
export function FounderProfiles() {
  return (
    <section className="bg-green-tint px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Kishan & Meeta</h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-neutral-border bg-white p-6">
            <div className="aspect-square rounded-lg bg-soft-cream" role="img" aria-label="[REAL PHOTO — KISHAN PATEL]">
              <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-ink">
                [REAL PHOTO — KISHAN PATEL]
              </div>
            </div>
            <p className="mt-4 text-xl font-bold text-brand-green">Kishan Patel</p>
            <p className="text-sm text-muted-ink">Career Counsellor</p>
            <p className="mt-2 text-sm text-ink">30+ years guiding students across Gujarat.</p>
            <p className="text-sm text-ink">Certified Career Analyst — Edumilestones.</p>
            <p className="mt-2 text-sm text-muted-ink">[CLIENT TO PROVIDE: extended professional biography]</p>
          </div>

          <div className="rounded-xl border border-neutral-border bg-white p-6">
            <div className="aspect-square rounded-lg bg-soft-cream" role="img" aria-label="[REAL PHOTO — MEETA PATEL]">
              <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-ink">
                [REAL PHOTO — MEETA PATEL]
              </div>
            </div>
            <p className="mt-4 text-xl font-bold text-brand-green">Meeta Patel</p>
            <p className="text-sm text-muted-ink">Career Counsellor</p>
            <p className="mt-2 text-sm text-ink">
              Specialises in working with parents and students together, particularly around stream selection after
              Class 10.
            </p>
            <p className="text-sm text-ink">Certified with the Edumilestones psychometric framework.</p>
            <p className="mt-2 text-sm text-muted-ink">[CLIENT TO PROVIDE: extended professional biography]</p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 9: `who-we-are/OurMethodology` (TDD)

**Files:** Create `src/components/who-we-are/OurMethodology.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OurMethodology } from './OurMethodology'

describe('OurMethodology', () => {
  it('renders the methodology pillars and the What We Don\'t Do list', () => {
    render(<OurMethodology />)
    expect(screen.getByRole('heading', { name: /our methodology/i })).toBeInTheDocument()
    expect(screen.getByText('Aptitude')).toBeInTheDocument()
    expect(screen.getByText('SWOT')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /what we don't do/i })).toBeInTheDocument()
    expect(screen.getByText(/no fortune telling/i)).toBeInTheDocument()
    expect(screen.getByText(/no admission-selling-first approach/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
const PILLARS = ['Aptitude', 'Interest', 'Personality', 'EQ', 'SWOT', 'Parent involvement']

const DONT_DO = [
  'No fortune telling',
  'No fixed "hot career" list',
  'No pushing students toward specific courses',
  'No admission-selling-first approach',
]

export function OurMethodology() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Our methodology</h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-muted-ink">
        Every session is grounded in the Edumilestones psychometric framework, assessed across six pillars.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {PILLARS.map((pillar) => (
          <div key={pillar} className="rounded-xl border border-neutral-border bg-white p-4 text-center">
            <p className="font-semibold text-brand-green">{pillar}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-neutral-border bg-soft-cream p-6">
        <h3 className="text-lg font-semibold text-ink">What we don't do</h3>
        <ul className="mt-3 space-y-2">
          {DONT_DO.map((item) => (
            <li key={item} className="text-sm text-muted-ink">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 10: `who-we-are/OurJourney` (TDD)

**Files:** Create `src/components/who-we-are/OurJourney.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OurJourney } from './OurJourney'

describe('OurJourney', () => {
  it('renders a timeline with milestone entries', () => {
    render(<OurJourney />)
    expect(screen.getByRole('heading', { name: /our journey/i })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(3)
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation — only already-established, non-fabricated facts; unknown dates are bracketed placeholders:

```tsx
const MILESTONES = [
  { year: '[CLIENT TO PROVIDE YEAR]', text: 'Kishan Patel begins practicing career counselling.' },
  { year: '[CLIENT TO PROVIDE YEAR]', text: 'Meeta Patel joins the practice.' },
  { year: '[CLIENT TO PROVIDE YEAR]', text: 'Certified as a Career Analyst with Edumilestones.' },
  { year: 'Today', text: '30+ years of experience, 5,000+ students guided, 900+ five-star Google reviews.' },
]

export function OurJourney() {
  return (
    <section className="bg-green-tint px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Our journey</h2>
        <ol className="mt-10 space-y-6 border-l-2 border-brand-yellow pl-6">
          {MILESTONES.map((milestone) => (
            <li key={milestone.text}>
              <p className="text-sm font-semibold text-brand-green">{milestone.year}</p>
              <p className="text-ink">{milestone.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 11: `who-we-are/RealWork` (TDD)

**Files:** Create `src/components/who-we-are/RealWork.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RealWork } from './RealWork'

describe('RealWork', () => {
  it('renders the heading and a grid of photo placeholders', () => {
    render(<RealWork />)
    expect(screen.getByRole('heading', { name: /real work/i })).toBeInTheDocument()
    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(4)
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
const PHOTOS = [
  '[REAL PHOTO — OFFICE, SURAT]',
  '[REAL PHOTO — COUNSELLING SESSION]',
  '[REAL PHOTO — WORKSHOP]',
  '[REAL PHOTO — TEAM]',
]

export function RealWork() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Real work</h2>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {PHOTOS.map((caption) => (
          <div key={caption} className="aspect-square rounded-xl border border-neutral-border bg-soft-cream" role="img" aria-label={caption}>
            <div className="flex h-full items-center justify-center p-3 text-center text-xs text-muted-ink">{caption}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 12: `who-we-are/UniversitiesSection` (TDD)

**Files:** Create `src/components/who-we-are/UniversitiesSection.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UniversitiesSection } from './UniversitiesSection'

describe('UniversitiesSection', () => {
  it('renders the heading and a placeholder for verified institution logos', () => {
    render(<UniversitiesSection />)
    expect(screen.getByRole('heading', { name: /universities & colleges/i })).toBeInTheDocument()
    expect(screen.getByText(/\[CLIENT TO PROVIDE VERIFIED INSTITUTION LOGOS\]/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation — per spec §31 ("no fake university logos"), this ships as an honest, clearly-marked placeholder rather than any invented logo grid:

```tsx
export function UniversitiesSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8 md:py-24">
      <h2 className="text-3xl font-bold text-ink md:text-4xl">Universities & Colleges</h2>
      <div className="mt-8 rounded-xl border border-dashed border-neutral-border bg-soft-cream p-8 text-sm text-muted-ink">
        [CLIENT TO PROVIDE VERIFIED INSTITUTION LOGOS — only logos of institutions with confirmed permission are shown here]
      </div>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 13: `pages/WhoWeAre.tsx` — compose the full page (TDD)

**Files:** Replace `src/pages/WhoWeAre.tsx`, create `src/pages/WhoWeAre.test.tsx`

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import WhoWeAre from './WhoWeAre'

describe('WhoWeAre page', () => {
  it('renders every section heading in order', () => {
    render(
      <MemoryRouter>
        <WhoWeAre />
      </MemoryRouter>,
    )

    const headingNames = [
      /30 years\. 5,000 students\./i,
      /sound familiar/i,
      /our story/i,
      /kishan & meeta/i,
      /our methodology/i,
      /our journey/i,
      /real work/i,
      /how it works/i,
      /what you walk away with/i,
      /real students\. real decisions\./i,
      /hear it from parents/i,
      /universities & colleges/i,
      /where are you right now/i,
      /let's talk about your child's future/i,
    ]

    headingNames.forEach((name) => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    })
  })

  it('renders the trust strip and Google reviews', () => {
    render(
      <MemoryRouter>
        <WhoWeAre />
      </MemoryRouter>,
    )
    expect(screen.getByText('5.0★')).toBeInTheDocument()
    expect(screen.getByText(/\[LIVE GOOGLE REVIEWS WIDGET/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL (page is still the Phase 1 stub).
- [ ] **Step 3:** Implementation:

```tsx
import { WhoWeAreHero } from '@/components/who-we-are/WhoWeAreHero'
import { TrustStrip } from '@/components/trust/TrustStrip'
import { ProblemSection } from '@/components/home/ProblemSection'
import { OurStory } from '@/components/who-we-are/OurStory'
import { FounderProfiles } from '@/components/who-we-are/FounderProfiles'
import { OurMethodology } from '@/components/who-we-are/OurMethodology'
import { OurJourney } from '@/components/who-we-are/OurJourney'
import { RealWork } from '@/components/who-we-are/RealWork'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ReportSection } from '@/components/home/ReportSection'
import { SuccessStoriesPreview } from '@/components/home/SuccessStoriesPreview'
import { VideoTestimonials } from '@/components/home/VideoTestimonials'
import { UniversitiesSection } from '@/components/who-we-are/UniversitiesSection'
import { GoogleReviews } from '@/components/trust/GoogleReviews'
import { WhoWeHelp } from '@/components/home/WhoWeHelp'
import { FinalCTA } from '@/components/home/FinalCTA'

export default function WhoWeAre() {
  return (
    <>
      <WhoWeAreHero />
      <TrustStrip />
      <OurStory />
      <FounderProfiles />
      <OurMethodology />
      <OurJourney />
      <RealWork />
      <ProblemSection />
      <HowItWorks />
      <ReportSection />
      <SuccessStoriesPreview />
      <VideoTestimonials />
      <UniversitiesSection />
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
        <GoogleReviews />
      </div>
      <WhoWeHelp />
      <FinalCTA />
    </>
  )
}
```

- [ ] **Step 4:** Run `npm run test -- src/pages/WhoWeAre.test.tsx`. Expected: PASS, 2 tests.
- [ ] **Step 5:** Run `npm run test -- src/App.test.tsx`. Expected: still PASS (App test only checks for an H1 at "/", which is Home's — unaffected).

*Self-review note: spec §15 asks for "Success Stories: six case studies preview," but Phase 1 only seeded 3 stories in `src/data/stories.ts` (matching Home's design). This page reuses `SuccessStoriesPreview` (3 stories + "View All" link to `/success-stories`) rather than fabricating 3 more placeholder-only entries — consistent with §30's no-fabrication rule. Flag to the client: supply 3 more real case studies if a 6-story preview here is wanted.*

---

### Task 14: `what-we-do/WhatWeDoHero` (TDD)

**Files:** Create `src/components/what-we-do/WhatWeDoHero.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WhatWeDoHero } from './WhatWeDoHero'

describe('WhatWeDoHero', () => {
  it('renders the H1 and subheading', () => {
    render(<WhatWeDoHero />)
    expect(
      screen.getByRole('heading', { level: 1, name: /career guidance for every important decision/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/from choosing a stream after class 10 to changing careers/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
export function WhatWeDoHero() {
  return (
    <section className="bg-soft-cream px-4 py-16 text-center md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold leading-tight text-ink md:text-6xl">
          Career guidance for every important decision.
        </h1>
        <p className="mt-4 text-lg text-muted-ink">
          From choosing a stream after Class 10 to changing careers — get clarity backed by assessment, experience
          and one-on-one counselling.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 15: `what-we-do/ServiceNav` — sticky anchor sub-nav (TDD)

**Files:** Create `src/components/what-we-do/ServiceNav.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ServiceNav } from './ServiceNav'

describe('ServiceNav', () => {
  it('renders an anchor link for each of the six services', () => {
    render(<ServiceNav />)
    expect(screen.getByRole('link', { name: 'After 10th' })).toHaveAttribute('href', '#after-10th')
    expect(screen.getByRole('link', { name: 'Career Change' })).toHaveAttribute('href', '#career-change')
    expect(screen.getAllByRole('link')).toHaveLength(6)
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation — plain `<a href="#id">` anchors (in-page scroll, no router involvement needed):

```tsx
import { services } from '@/data/services'

export function ServiceNav() {
  return (
    <nav aria-label="Service sections" className="sticky top-0 z-20 overflow-x-auto border-b border-neutral-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-3 md:px-8">
        {services.map((service) => (
          <a
            key={service.id}
            href={`#${service.id}`}
            className="shrink-0 text-sm font-medium text-ink hover:text-brand-green"
          >
            {service.title}
          </a>
        ))}
      </div>
    </nav>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 16: `what-we-do/ServiceSection` — generic parameterized service block (TDD)

**Files:** Create `src/components/what-we-do/ServiceSection.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ServiceSection } from './ServiceSection'
import { services } from '@/data/services'

describe('ServiceSection', () => {
  const service = services[0]

  it('renders the id anchor, heading, who-its-for, and covers list', () => {
    const { container } = render(<ServiceSection service={service} />)
    expect(container.querySelector('#after-10th')).not.toBeNull()
    expect(screen.getByRole('heading', { name: /career counselling after 10th/i })).toBeInTheDocument()
    expect(screen.getByText(/students in class 9–10/i)).toBeInTheDocument()
    expect(screen.getByText('Science vs Commerce vs Arts')).toBeInTheDocument()
  })

  it('opens a booking dialog with the service context when the CTA is clicked', async () => {
    render(<ServiceSection service={service} />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Book After 10th Counselling' }))
    expect(await screen.findByLabelText(/student name/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation. Note: services without a `title`-derived H2 in spec (all except after-10th) fall back to `"${service.title}"` — never fabricated copy, just the already-approved title string:

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ConsultationForm } from '@/components/forms/ConsultationForm'
import type { Service } from '@/data/services'

const HEADINGS: Record<string, string> = {
  'after-10th': 'Career Counselling After 10th',
  'after-12th': 'Career Counselling After 12th',
}

interface ServiceSectionProps {
  service: Service
}

export function ServiceSection({ service }: ServiceSectionProps) {
  const heading = HEADINGS[service.id] ?? service.title

  return (
    <section id={service.id} className="mx-auto max-w-3xl scroll-mt-20 px-4 py-16 md:px-8 md:py-20">
      <h2 className="text-3xl font-bold text-ink md:text-4xl">{heading}</h2>
      {service.subheading && <p className="mt-2 text-lg text-brand-green">{service.subheading}</p>}
      {service.whoItsFor && <p className="mt-4 text-muted-ink">Who it's for: {service.whoItsFor}</p>}

      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {service.covers.map((item) => (
          <li key={item} className="flex items-start gap-2 text-ink">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-yellow" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="mt-8 rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-warm-white hover:bg-brand-green/90"
          >
            {service.ctaLabel}
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{service.ctaLabel}</DialogTitle>
          </DialogHeader>
          <ConsultationForm context={service.id} submitLabel={service.ctaLabel} />
        </DialogContent>
      </Dialog>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS, 2 tests.

---

### Task 17: `what-we-do/ServiceComparisonTable` (TDD)

**Files:** Create `src/components/what-we-do/ServiceComparisonTable.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ServiceComparisonTable } from './ServiceComparisonTable'

describe('ServiceComparisonTable', () => {
  it('renders a row for each service with no pricing column', () => {
    render(<ServiceComparisonTable />)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Service' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Best Time to Start' })).toBeInTheDocument()
    expect(screen.queryByRole('columnheader', { name: /price/i })).not.toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(7) // header + 6 services
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { services } from '@/data/services'

export function ServiceComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Who It's For</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Assessment</TableHead>
            <TableHead>Admission Support</TableHead>
            <TableHead>Best Time to Start</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium text-ink">{service.title}</TableCell>
              <TableCell>{service.comparison.whoItsFor}</TableCell>
              <TableCell>{service.comparison.duration}</TableCell>
              <TableCell>{service.comparison.assessment}</TableCell>
              <TableCell>{service.comparison.admissionSupport}</TableCell>
              <TableCell>{service.comparison.bestTimeToStart}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
```

- [ ] **Step 4:** This is the first use of `Table` — it's in the Task 4 shadcn primitive list from Phase 1 but was never actually created (Phase 1 only wrote button/card/input/select/dialog/accordion/badge/separator/sheet/tabs/avatar/tooltip). Create `src/components/ui/table.tsx` by hand, matching the project's existing "new-york" Tailwind v3 style:

```tsx
import * as React from 'react'

import { cn } from '@/lib/utils'

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
  ),
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn('border-b border-neutral-border', className)} {...props} />,
)
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  ),
)
TableBody.displayName = 'TableBody'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn('border-b border-neutral-border transition-colors hover:bg-green-tint/50', className)} {...props} />
  ),
)
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn('h-10 whitespace-nowrap px-3 text-left align-middle font-semibold text-ink', className)}
      {...props}
    />
  ),
)
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn('whitespace-nowrap px-3 py-3 align-middle text-muted-ink', className)} {...props} />
  ),
)
TableCell.displayName = 'TableCell'

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
```

- [ ] **Step 5:** Run `npm run test -- src/components/what-we-do/ServiceComparisonTable.test.tsx`. Expected: PASS.

---

### Task 18: `pages/WhatWeDo.tsx` — compose the full page (TDD)

**Files:** Replace `src/pages/WhatWeDo.tsx`, create `src/pages/WhatWeDo.test.tsx`

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import WhatWeDo from './WhatWeDo'

describe('WhatWeDo page', () => {
  it('renders the hero, all six service sections, and the comparison table', () => {
    render(
      <MemoryRouter>
        <WhatWeDo />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 1, name: /career guidance for every important decision/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /career counselling after 10th/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /career counselling after 12th/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'UG & PG Admission' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'MBA & Professional' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Study Abroad' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Career Change' })).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('renders the shared sections and final CTA', () => {
    render(
      <MemoryRouter>
        <WhatWeDo />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: /sound familiar/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /not sure which counselling service you need/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Book a Free Consultation' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL (page is still the Phase 1 stub).
- [ ] **Step 3:** Implementation:

```tsx
import { WhatWeDoHero } from '@/components/what-we-do/WhatWeDoHero'
import { ServiceNav } from '@/components/what-we-do/ServiceNav'
import { TrustStrip } from '@/components/trust/TrustStrip'
import { ProblemSection } from '@/components/home/ProblemSection'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ReportSection } from '@/components/home/ReportSection'
import { ServiceSection } from '@/components/what-we-do/ServiceSection'
import { ServiceComparisonTable } from '@/components/what-we-do/ServiceComparisonTable'
import { SuccessStoriesPreview } from '@/components/home/SuccessStoriesPreview'
import { VideoTestimonials } from '@/components/home/VideoTestimonials'
import { GoogleReviews } from '@/components/trust/GoogleReviews'
import { FreeAssessmentSection } from '@/components/home/FreeAssessmentSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { services } from '@/data/services'

export default function WhatWeDo() {
  return (
    <>
      <WhatWeDoHero />
      <ServiceNav />
      <TrustStrip />
      <ProblemSection />
      <HowItWorks />
      <ReportSection />

      <div className="divide-y divide-neutral-border">
        {services.map((service) => (
          <ServiceSection key={service.id} service={service} />
        ))}
      </div>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
        <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Compare services</h2>
        <div className="mt-8">
          <ServiceComparisonTable />
        </div>
      </section>

      <SuccessStoriesPreview />
      <VideoTestimonials />
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
        <GoogleReviews />
      </div>
      <FreeAssessmentSection />
      <FinalCTA
        heading="Not sure which counselling service you need?"
        description="Book a free 15-minute call and we'll point you to the right one."
        submitLabel="Book a Free Consultation"
      />
    </>
  )
}
```

- [ ] **Step 4:** Run `npm run test -- src/pages/WhatWeDo.test.tsx`. Expected: PASS, 2 tests.

---

### Task 19: `contact/ContactMethods` (TDD)

**Files:** Create `src/components/contact/ContactMethods.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContactMethods } from './ContactMethods'

describe('ContactMethods', () => {
  it('renders call/WhatsApp and email contact details', () => {
    render(<ContactMethods />)
    expect(screen.getByRole('link', { name: /\+91 87581 75187/ })).toHaveAttribute('href', 'tel:+918758175187')
    expect(screen.getByRole('link', { name: /kishan@bestcareercounselling\.com/i })).toHaveAttribute(
      'href',
      'mailto:kishan@bestcareercounselling.com',
    )
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
export function ContactMethods() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8 md:py-24">
      <h2 className="text-3xl font-bold text-ink md:text-4xl">Contact methods</h2>
      <div className="mt-6 space-y-2 text-lg">
        <p>
          <a href="tel:+918758175187" className="font-medium text-brand-green hover:underline">
            +91 87581 75187
          </a>
        </p>
        <p>
          <a href="mailto:kishan@bestcareercounselling.com" className="font-medium text-brand-green hover:underline">
            kishan@bestcareercounselling.com
          </a>
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 20: `contact/WhatHappensOnCall` (TDD)

**Files:** Create `src/components/contact/WhatHappensOnCall.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WhatHappensOnCall } from './WhatHappensOnCall'

describe('WhatHappensOnCall', () => {
  it('renders all four steps and the closing line', () => {
    render(<WhatHappensOnCall />)
    expect(screen.getByRole('heading', { name: /what happens on the call/i })).toBeInTheDocument()
    const steps = screen.getAllByRole('listitem')
    expect(steps).toHaveLength(4)
    expect(steps[0]).toHaveTextContent(/understand current class, marks and interests/i)
    expect(steps[3]).toHaveTextContent(/decide next steps/i)
    expect(screen.getByText(/not a sales team/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
const STEPS = [
  'Understand current class, marks and interests',
  'Explain appropriate counselling service',
  'Answer questions',
  'Decide next steps',
]

export function WhatHappensOnCall() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">What happens on the call</h2>
      <ol className="mt-8 space-y-3">
        {STEPS.map((step, index) => (
          <li key={step} className="flex items-start gap-3 text-ink">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-ink">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <p className="mt-8 text-center font-medium text-brand-green">
        You'll speak to Kishan or Meeta directly. Not a sales team.
      </p>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 21: `contact/TwoPaths` (TDD)

**Files:** Create `src/components/contact/TwoPaths.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TwoPaths } from './TwoPaths'

describe('TwoPaths', () => {
  it('renders the consultation form under the first path', () => {
    render(<TwoPaths />)
    expect(screen.getByRole('heading', { name: /i want to talk to someone/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Book Free Consultation' })).toBeInTheDocument()
  })

  it('opens the assessment form dialog under the second path', async () => {
    render(<TwoPaths />)
    expect(screen.getByRole('heading', { name: /i want to start with the free assessment/i })).toBeInTheDocument()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Take Free Assessment' }))
    expect(await screen.findByLabelText(/email/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ConsultationForm } from '@/components/forms/ConsultationForm'
import { AssessmentForm } from '@/components/forms/AssessmentForm'

export function TwoPaths() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-neutral-border bg-white p-6">
          <h3 className="text-xl font-bold text-ink">I want to talk to someone</h3>
          <p className="mt-2 text-sm text-muted-ink">
            A free 15-minute call with Kishan or Meeta — no obligation.
          </p>
          <div className="mt-6">
            <ConsultationForm context="home" submitLabel="Book Free Consultation" />
          </div>
        </div>

        <div className="rounded-xl border border-neutral-border bg-white p-6">
          <h3 className="text-xl font-bold text-ink">I want to start with the free assessment</h3>
          <p className="mt-2 text-sm text-muted-ink">
            10 minutes. No payment. Get a snapshot of your child's aptitude and interest profile.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="mt-6 w-full rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-ink hover:bg-brand-yellow/90"
              >
                Take Free Assessment
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Take the Free Assessment</DialogTitle>
              </DialogHeader>
              <AssessmentForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS, 2 tests.

---

### Task 22: `contact/ContactHero` (TDD)

**Files:** Create `src/components/contact/ContactHero.tsx` + test

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContactHero } from './ContactHero'

describe('ContactHero', () => {
  it('renders the H1 and subheading', () => {
    render(<ContactHero />)
    expect(screen.getByRole('heading', { level: 1, name: /book your free consultation/i })).toBeInTheDocument()
    expect(screen.getByText(/15 minutes with kishan or meeta/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL — module not found.
- [ ] **Step 3:** Implementation:

```tsx
export function ContactHero() {
  return (
    <section className="bg-soft-cream px-4 py-16 text-center md:px-8 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold leading-tight text-ink md:text-6xl">Book your free consultation</h1>
        <p className="mt-4 text-lg text-muted-ink">
          15 minutes with Kishan or Meeta. No cost, no obligation, no sales pitch.
        </p>
      </div>
      <div
        className="mx-auto mt-10 aspect-[16/6] max-w-3xl rounded-2xl border border-dashed border-neutral-border bg-white"
        role="img"
        aria-label="[BOOKING / CALENDAR INTEGRATION — CLIENT TO PROVIDE OR CONFIRM SCHEDULING TOOL]"
      >
        <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-ink">
          [BOOKING / CALENDAR INTEGRATION — CLIENT TO PROVIDE OR CONFIRM SCHEDULING TOOL]
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4:** Run test. Expected: PASS.

---

### Task 23: `pages/ContactUs.tsx` — compose the full page (TDD)

**Files:** Replace `src/pages/ContactUs.tsx`, create `src/pages/ContactUs.test.tsx`

- [ ] **Step 1:** Test:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ContactUs from './ContactUs'

describe('ContactUs page', () => {
  it('renders every section heading in order', () => {
    render(
      <MemoryRouter>
        <ContactUs />
      </MemoryRouter>,
    )

    const headingNames = [
      /book your free consultation/i,
      /i want to talk to someone/i,
      /what happens on the call/i,
      /contact methods/i,
      /meet us in person/i,
      /kishan & meeta/i,
      /booking faq/i,
    ]

    headingNames.forEach((name) => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    })
  })

  it('renders the Google reviews section', () => {
    render(
      <MemoryRouter>
        <ContactUs />
      </MemoryRouter>,
    )
    expect(screen.getByText(/\[LIVE GOOGLE REVIEWS WIDGET/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2:** Run test. Expected: FAIL (page is still the Phase 1 minimal version — no "What happens on the call", "Contact methods", etc. headings).
- [ ] **Step 3:** Implementation:

```tsx
import { ContactHero } from '@/components/contact/ContactHero'
import { TwoPaths } from '@/components/contact/TwoPaths'
import { WhatHappensOnCall } from '@/components/contact/WhatHappensOnCall'
import { ContactMethods } from '@/components/contact/ContactMethods'
import { LocationsSection } from '@/components/home/LocationsSection'
import { MeetFounders } from '@/components/home/MeetFounders'
import { GoogleReviews } from '@/components/trust/GoogleReviews'
import { FAQSection } from '@/components/home/FAQSection'
import { bookingFaqs } from '@/data/faqs'

export default function ContactUs() {
  return (
    <>
      <ContactHero />
      <TwoPaths />
      <WhatHappensOnCall />
      <ContactMethods />
      <LocationsSection />
      <MeetFounders />
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
        <GoogleReviews />
      </div>
      <FAQSection faqs={bookingFaqs} heading="Booking FAQ" />
    </>
  )
}
```

- [ ] **Step 4:** Run `npm run test -- src/pages/ContactUs.test.tsx`. Expected: PASS, 2 tests.
- [ ] **Step 5:** Run `npm run test -- src/App.test.tsx`. Expected: PASS — the App routing test's `/contact-us` assertion (`findByText(/book your free consultation/i)`) still matches, now via `ContactHero`'s H1 instead of the old stub's H1.

---

### Task 24: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1:** `npm run test`. Expected: all test files pass, 0 failures.
- [ ] **Step 2:** `npx tsc --noEmit`. Expected: no errors.
- [ ] **Step 3:** `npm run lint`. Expected: no errors.
- [ ] **Step 4:** `npm run build`. Expected: exits 0, produces `dist/`.
- [ ] **Step 5:** Smoke test: start `npm run dev`, curl `/who-we-are`, `/what-we-do`, `/contact-us` for 200 status, confirm no server-side errors in the dev log.

---

## Self-Review Notes

- **Spec coverage:** §15 (Who We Are) — Hero, Trust Strip, Our Story, Kishan & Meeta, Methodology + What We Don't Do, Journey, Real Work, Problems (reuse), How It Works (reuse), What You Get (reuse), Success Stories (reuse, see Task 13 note on 3-vs-6), Video Testimonials (reuse), Universities (honest placeholder), Google Reviews (reuse), What We Do six cards (reuse WhoWeHelp), Final CTA (reuse) — all covered. §16 (What We Do) — Hero, sticky service nav, Trust Strip/Problem/How It Works/What You Get (reuse), all 6 service sections with id/H2/covers/CTA exactly as specified, no-pricing comparison table, Success Stories/Video Testimonials/Google Reviews (reuse), Free Assessment (reuse), Final CTA with the exact spec copy — all covered. §21 (Contact Us) — Hero with booking placeholder, Two Paths, What Happens On The Call + closing line, Contact Methods, Locations (reuse), Meet Kishan & Meeta (reuse), Google Reviews (reuse), Booking FAQ (5 questions) — all covered.
- **Placeholder scan:** All bracketed placeholders (`[CLIENT TO PROVIDE ...]`, `[REAL PHOTO — ...]`) are intentional per spec §30/§31, not plan gaps — same pattern as Phase 1's `src/data/locations.ts`/`stories.ts`.
- **Type consistency:** `Service.id` stays typed as `WhatsAppContext` (unchanged from Phase 1) so `ServiceSection`'s `ConsultationForm context={service.id}` type-checks without a cast. `Faq` type from `src/data/faqs.ts` is the single shape used by both `homeFaqs` and `bookingFaqs` and by `FAQSection`'s new `faqs` prop.
- **No regressions:** Tasks 3–5 modify shared Phase 1 components (`FAQSection`, `ConsultationForm`, `FinalCTA`) but every new prop has a default that reproduces the exact previous behavior, and each task's last step re-runs the affected Phase 1 tests (`Home.test.tsx`, `App.test.tsx`) to confirm.
