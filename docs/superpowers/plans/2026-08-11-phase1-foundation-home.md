# Career Counselling Website — Phase 1: Foundation + Home Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the `career-counselling` Vite/React/TypeScript/Tailwind/shadcn project with brand theming, the shared site chrome (announcement bar, header, footer, floating WhatsApp button, mobile bottom bar), the WhatsApp-first form/message system, seed content data, and a fully built Home page (all 14 sections from the design spec).

**Architecture:** Vite + React 19 + TypeScript, Tailwind CSS v3 with brand tokens layered on top of shadcn/ui's CSS-variable theme, React Router v6 with lazy-loaded routes, Vitest + React Testing Library for tests (mirrors the `education/` sibling project's tooling in this monorepo). Content lives in typed `src/data/*.ts` files, kept separate from presentation. No animation library — a hand-rolled `useInView` hook (IntersectionObserver) drives scroll reveals and counters.

**Tech Stack:** Vite 8, React 19, TypeScript 6, Tailwind CSS 3.4, shadcn/ui (new-york style), React Router 6, lucide-react, Vitest 4 + @testing-library/react + jest-dom + user-event, ESLint 10 (flat config).

**Note on git commits:** Per the user's standing preference, this plan does **not** include automatic `git commit` steps. Each task ends with "verify tests pass" instead. Commits (including the initial one) are made only when the user explicitly asks.

---

## File Structure

```text
career-counselling/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── components.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── vite-env.d.ts
│   ├── test/setup.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── whatsapp.ts
│   │   └── whatsapp.test.ts
│   ├── data/
│   │   ├── services.ts
│   │   ├── testimonials.ts
│   │   ├── stories.ts
│   │   └── locations.ts
│   ├── hooks/
│   │   ├── useInView.ts
│   │   ├── useInView.test.tsx
│   │   ├── useCountUp.ts
│   │   └── useCountUp.test.tsx
│   ├── components/
│   │   ├── ui/                      (shadcn primitives — generated)
│   │   ├── layout/
│   │   │   ├── seasonalMessage.ts
│   │   │   ├── seasonalMessage.test.ts
│   │   │   ├── AnnouncementBar.tsx
│   │   │   ├── AnnouncementBar.test.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Header.test.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Footer.test.tsx
│   │   │   ├── MobileBottomBar.tsx
│   │   │   ├── MobileBottomBar.test.tsx
│   │   │   └── Layout.tsx
│   │   ├── navigation/
│   │   │   ├── DesktopNav.tsx
│   │   │   ├── DesktopNav.test.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── MobileNav.test.tsx
│   │   ├── whatsapp/
│   │   │   ├── whatsappMessages.ts
│   │   │   ├── whatsappMessages.test.ts
│   │   │   ├── WhatsAppButton.tsx
│   │   │   └── WhatsAppButton.test.tsx
│   │   ├── forms/
│   │   │   ├── ConsultationForm.tsx
│   │   │   ├── ConsultationForm.test.tsx
│   │   │   ├── AssessmentForm.tsx
│   │   │   └── AssessmentForm.test.tsx
│   │   ├── trust/
│   │   │   ├── TrustStrip.tsx
│   │   │   ├── TrustStrip.test.tsx
│   │   │   ├── GoogleReviews.tsx
│   │   │   └── GoogleReviews.test.tsx
│   │   └── home/
│   │       ├── Hero.tsx / .test.tsx
│   │       ├── ProblemSection.tsx / .test.tsx
│   │       ├── WhoWeHelp.tsx / .test.tsx
│   │       ├── HowItWorks.tsx / .test.tsx
│   │       ├── ReportSection.tsx / .test.tsx
│   │       ├── FreeAssessmentSection.tsx / .test.tsx
│   │       ├── MeetFounders.tsx / .test.tsx
│   │       ├── VideoTestimonials.tsx / .test.tsx
│   │       ├── SuccessStoriesPreview.tsx / .test.tsx
│   │       ├── LocationsSection.tsx / .test.tsx
│   │       ├── FAQSection.tsx / .test.tsx
│   │       └── FinalCTA.tsx / .test.tsx
│   └── pages/
│       ├── Home.tsx / .test.tsx
│       ├── WhoWeAre.tsx
│       ├── WhatWeDo.tsx
│       ├── SuccessStories.tsx
│       ├── Blogs.tsx
│       ├── BlogDetail.tsx
│       ├── ContactUs.tsx
│       └── ThankYou.tsx
```

---

### Task 1: Scaffold the Vite + React + TypeScript project

**Files:**
- Create: `career-counselling/` (entire scaffold via Vite template)

- [ ] **Step 1: Run the Vite scaffold command**

Run from `/Users/work/Desktop/Projects`:

```bash
npm create vite@latest career-counselling -- --template react-ts
```

Expected: creates `career-counselling/` with `index.html`, `package.json`, `src/App.tsx`, `src/main.tsx`, `vite.config.ts`, `tsconfig*.json`.

- [ ] **Step 2: Install base dependencies**

```bash
cd career-counselling
npm install react-router-dom lucide-react clsx tailwind-merge class-variance-authority
npm install -D tailwindcss@^3.4.19 postcss autoprefixer @types/node
```

Expected: `package.json` `dependencies` includes `react-router-dom`, `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`; `devDependencies` includes `tailwindcss`, `postcss`, `autoprefixer`, `@types/node`.

- [ ] **Step 3: Verify the dev server boots**

```bash
npm run dev -- --port 5183 &
sleep 3
curl -s http://localhost:5183 | grep -q "<div id=\"root\">" && echo OK
kill %1
```

Expected: prints `OK`.

- [ ] **Step 4: Verify tests pass**

No tests yet — skip. Move to Task 2.

---

### Task 2: Configure Tailwind CSS with brand tokens

**Files:**
- Create: `career-counselling/tailwind.config.js`
- Create: `career-counselling/postcss.config.js`
- Modify: `career-counselling/src/index.css`
- Modify: `career-counselling/index.html`

- [ ] **Step 1: Write `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 2: Write `tailwind.config.js` with brand tokens**

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'brand-yellow': '#FFCC01',
        'brand-green': '#014924',
        ink: '#111513',
        'warm-white': '#FFFDF5',
        'soft-cream': '#FFF9E6',
        'green-tint': '#F1F7F3',
        'muted-ink': '#66706A',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

- [ ] **Step 3: Install `tailwindcss-animate` (used by shadcn primitives)**

```bash
npm install -D tailwindcss-animate
```

- [ ] **Step 4: Replace `src/index.css` with Tailwind layers + brand CSS variables**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 60 60% 99%;
    --foreground: 160 40% 6%;
    --primary: 51 100% 50%;
    --primary-foreground: 160 40% 6%;
    --secondary: 154 96% 15%;
    --secondary-foreground: 60 60% 99%;
    --muted: 130 20% 95%;
    --muted-foreground: 150 6% 43%;
    --accent: 51 100% 50%;
    --accent-foreground: 160 40% 6%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 60 60% 99%;
    --border: 110 8% 90%;
    --input: 110 8% 90%;
    --ring: 154 96% 15%;
    --card: 0 0% 100%;
    --card-foreground: 160 40% 6%;
    --popover: 0 0% 100%;
    --popover-foreground: 160 40% 6%;
    --radius: 0.75rem;
  }

  body {
    @apply bg-warm-white text-ink font-sans antialiased;
  }
}
```

- [ ] **Step 5: Delete the default Vite `src/App.css`**

```bash
rm -f src/App.css
```

- [ ] **Step 6: Add Inter font + meta tags to `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Career counselling and stream selection guidance from Kishan & Meeta Patel — Surat, Navsari, Ankleshwar, Valsad." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <title>Career Counselling in Surat | Kishan & Meeta Patel</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Verify build succeeds**

```bash
npm run build
```

Expected: exits 0, produces `dist/`.

---

### Task 3: Configure Vitest + React Testing Library

**Files:**
- Modify: `career-counselling/vite.config.ts`
- Create: `career-counselling/src/test/setup.ts`
- Modify: `career-counselling/package.json`

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Write `vite.config.ts`**

```ts
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

- [ ] **Step 3: Write `src/test/setup.ts`**

```ts
import '@testing-library/jest-dom'

window.IntersectionObserver = class {
  readonly root: Element | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
} as unknown as typeof IntersectionObserver
```

- [ ] **Step 4: Add `test` script to `package.json`**

Add to `"scripts"`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Add path alias to `tsconfig.app.json`**

Add inside `"compilerOptions"`:

```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

- [ ] **Step 6: Verify Vitest runs (no tests yet, should report 0 tests, exit 0)**

```bash
npm run test
```

Expected: `No test files found` or exits 0 (no failures).

---

### Task 4: Initialize shadcn/ui and add required primitives

**Files:**
- Create: `career-counselling/components.json`
- Create: `career-counselling/src/lib/utils.ts`
- Create: `career-counselling/src/components/ui/*.tsx` (button, card, input, select, dialog, accordion, badge, separator, sheet, tabs, avatar, tooltip)

- [ ] **Step 1: Run shadcn init**

```bash
npx shadcn@latest init -d --base-color neutral
```

If prompted interactively, choose: style `new-york`, base color `neutral`, CSS variables `yes`, tsx `yes`. Expected: creates `components.json` and `src/lib/utils.ts` with a `cn()` helper.

- [ ] **Step 2: Verify `src/lib/utils.ts` contains the `cn` helper**

Expected content:

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

If the CLI produced something different, replace it with the above.

- [ ] **Step 3: Add required primitives**

```bash
npx shadcn@latest add button card input select dialog accordion badge separator sheet tabs avatar tooltip
```

Expected: creates `src/components/ui/button.tsx`, `card.tsx`, `input.tsx`, `select.tsx`, `dialog.tsx`, `accordion.tsx`, `badge.tsx`, `separator.tsx`, `sheet.tsx`, `tabs.tsx`, `avatar.tsx`, `tooltip.tsx`.

- [ ] **Step 4: Re-apply brand tokens if the CLI overwrote `tailwind.config.js` or `index.css`**

Diff against Task 2 Steps 2 and 4; restore the `brand-yellow`, `brand-green`, `ink`, `warm-white`, `soft-cream`, `green-tint`, `muted-ink` entries and the `:root` CSS variables if the CLI reset them.

- [ ] **Step 5: Verify build still succeeds**

```bash
npm run build
```

Expected: exits 0.

---

### Task 5: `lib/whatsapp.ts` — phone validation and URL builder (TDD)

**Files:**
- Create: `career-counselling/src/lib/whatsapp.ts`
- Test: `career-counselling/src/lib/whatsapp.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest'
import { isValidIndianPhone, buildWhatsAppUrl } from './whatsapp'

describe('isValidIndianPhone', () => {
  it('accepts a valid 10-digit number', () => {
    expect(isValidIndianPhone('9876543210')).toBe(true)
  })

  it('accepts a valid number with +91 prefix', () => {
    expect(isValidIndianPhone('+919876543210')).toBe(true)
  })

  it('rejects a number that is too short', () => {
    expect(isValidIndianPhone('98765')).toBe(false)
  })

  it('rejects a number starting with 0-5', () => {
    expect(isValidIndianPhone('4876543210')).toBe(false)
  })

  it('rejects non-numeric input', () => {
    expect(isValidIndianPhone('98765abcde')).toBe(false)
  })
})

describe('buildWhatsAppUrl', () => {
  it('builds a wa.me URL with the encoded message', () => {
    const url = buildWhatsAppUrl('Hi, I need help & advice')
    expect(url).toBe('https://wa.me/918758175187?text=Hi%2C%20I%20need%20help%20%26%20advice')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/lib/whatsapp.test.ts
```

Expected: FAIL — `Cannot find module './whatsapp'`.

- [ ] **Step 3: Write the implementation**

```ts
const WHATSAPP_NUMBER = '918758175187'

export function isValidIndianPhone(phone: string): boolean {
  const digitsOnly = phone.replace(/^\+?91/, '').replace(/\D/g, '')
  return /^[6-9]\d{9}$/.test(digitsOnly)
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/lib/whatsapp.test.ts
```

Expected: PASS, 6 tests.

---

### Task 6: `components/whatsapp/whatsappMessages.ts` — contextual message templates (TDD)

**Files:**
- Create: `career-counselling/src/components/whatsapp/whatsappMessages.ts`
- Test: `career-counselling/src/components/whatsapp/whatsappMessages.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest'
import { buildContextualMessage, type WhatsAppContext } from './whatsappMessages'

describe('buildContextualMessage', () => {
  it('builds the home context message with interpolated fields', () => {
    const msg = buildContextualMessage('home', {
      name: 'Aarav Shah',
      currentClass: 'Class 9–10',
      phone: '9876543210',
    })
    expect(msg).toContain('Student Name: Aarav Shah')
    expect(msg).toContain('Current Class: Class 9–10')
    expect(msg).toContain('Phone: 9876543210')
    expect(msg).toContain('book a free career counselling consultation')
  })

  it('builds the after-10th context message', () => {
    const msg = buildContextualMessage('after-10th', {
      name: 'Priya Patel',
      currentClass: 'Class 9–10',
      phone: '9876543211',
    })
    expect(msg).toContain('career counselling after Class 10')
    expect(msg).toContain('stream selection and career options')
  })

  it('builds the career-change context message without a class field', () => {
    const msg = buildContextualMessage('career-change', {
      name: 'Rohan Mehta',
      phone: '9876543212',
    })
    expect(msg).toContain('career change counselling')
    expect(msg).not.toContain('Current Class')
  })

  it('builds the assessment context message including email', () => {
    const msg = buildContextualMessage('assessment', {
      name: 'Diya Shah',
      currentClass: 'Class 11–12',
      phone: '9876543213',
      email: 'diya@example.com',
    })
    expect(msg).toContain('free assessment')
    expect(msg).toContain('Email: diya@example.com')
  })

  it('covers every context key defined in the type', () => {
    const contexts: WhatsAppContext[] = [
      'home',
      'after-10th',
      'after-12th',
      'ug-pg-admission',
      'mba',
      'study-abroad',
      'career-change',
      'assessment',
    ]
    for (const ctx of contexts) {
      const msg = buildContextualMessage(ctx, { name: 'Test', phone: '9876543210' })
      expect(msg.length).toBeGreaterThan(0)
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/components/whatsapp/whatsappMessages.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```ts
export type WhatsAppContext =
  | 'home'
  | 'after-10th'
  | 'after-12th'
  | 'ug-pg-admission'
  | 'mba'
  | 'study-abroad'
  | 'career-change'
  | 'assessment'

export interface WhatsAppFields {
  name: string
  phone: string
  currentClass?: string
  email?: string
}

function line(label: string, value?: string): string {
  return value ? `${label}: ${value}\n` : ''
}

const templates: Record<WhatsAppContext, (f: WhatsAppFields) => string> = {
  home: (f) =>
    `Hi, I would like to book a free career counselling consultation.\n\n` +
    `Student Name: ${f.name}\n${line('Current Class', f.currentClass)}Phone: ${f.phone}\n\n` +
    `I found you through the website.`,
  'after-10th': (f) =>
    `Hi, I am looking for career counselling after Class 10.\n\n` +
    `Student Name: ${f.name}\n${line('Current Class', f.currentClass)}Phone: ${f.phone}\n\n` +
    `I would like to know more about stream selection and career options.`,
  'after-12th': (f) =>
    `Hi, I am looking for career guidance after Class 12.\n\n` +
    `Student Name: ${f.name}\n${line('Current Class', f.currentClass)}Phone: ${f.phone}\n\n` +
    `I would like to know more about course and college selection.`,
  'ug-pg-admission': (f) =>
    `Hi, I would like to know more about UG/PG admission guidance.\n\n` +
    `Student Name: ${f.name}\n${line('Current Class', f.currentClass)}Phone: ${f.phone}\n\n` +
    `I would like help with course and college selection.`,
  mba: (f) =>
    `Hi, I would like to know more about MBA and professional career guidance.\n\n` +
    `Student Name: ${f.name}\n${line('Current Class', f.currentClass)}Phone: ${f.phone}`,
  'study-abroad': (f) =>
    `Hi, I am interested in study abroad counselling.\n\n` +
    `Student Name: ${f.name}\n${line('Current Class', f.currentClass)}Phone: ${f.phone}\n\n` +
    `I would like to know more about countries, universities and the admission process.`,
  'career-change': (f) =>
    `Hi, I am looking for career change counselling.\n\n` +
    `Name: ${f.name}\nPhone: ${f.phone}\n\n` +
    `I would like to discuss my career options and possible transition.`,
  assessment: (f) =>
    `Hi, I would like to take the free assessment.\n\n` +
    `Student Name: ${f.name}\n${line('Current Class', f.currentClass)}Phone: ${f.phone}\n${line('Email', f.email)}`,
}

export function buildContextualMessage(context: WhatsAppContext, fields: WhatsAppFields): string {
  return templates[context](fields).trim()
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/components/whatsapp/whatsappMessages.test.ts
```

Expected: PASS, 5 tests.

---

### Task 7: Seed content data files

**Files:**
- Create: `career-counselling/src/data/services.ts`
- Create: `career-counselling/src/data/testimonials.ts`
- Create: `career-counselling/src/data/stories.ts`
- Create: `career-counselling/src/data/locations.ts`

All figures below are the client-supplied facts from the design spec (30+ years, 5,000+ students, 900+ reviews, 5.0★, Edumilestones). Anything not supplied by the client is a bracketed placeholder, per spec §30.

- [ ] **Step 1: Write `src/data/services.ts`**

```ts
import type { WhatsAppContext } from '@/components/whatsapp/whatsappMessages'

export interface Service {
  id: WhatsAppContext
  title: string
  description: string
  ctaLabel: string
}

export const services: Service[] = [
  {
    id: 'after-10th',
    title: 'After 10th',
    description: 'Science, Commerce or Arts? Decide with data, not pressure.',
    ctaLabel: 'Book After 10th Counselling',
  },
  {
    id: 'after-12th',
    title: 'After 12th',
    description: 'Degree, course, college — before deadlines close.',
    ctaLabel: 'Book After 12th Counselling',
  },
  {
    id: 'ug-pg-admission',
    title: 'UG & PG Admission',
    description: 'Shortlists, applications, forms, follow-up. Handled.',
    ctaLabel: 'Get Admission Guidance',
  },
  {
    id: 'mba',
    title: 'MBA & Professional',
    description: 'CAT, entrances, specialisation. Pick the right one.',
    ctaLabel: 'Discuss Your MBA Options',
  },
  {
    id: 'study-abroad',
    title: 'Study Abroad',
    description: 'Country, university, budget, visa. Mapped out.',
    ctaLabel: 'Plan Your Study Abroad Journey',
  },
  {
    id: 'career-change',
    title: 'Career Change',
    description: "Stuck in the wrong job? It's not too late.",
    ctaLabel: 'Discuss Your Career Change',
  },
]
```

- [ ] **Step 2: Write `src/data/testimonials.ts`**

```ts
export interface VideoTestimonial {
  id: string
  name: string
  relationship: string
  city: string
  thumbnailAlt: string
}

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: 'testimonial-1',
    name: '[CLIENT TO PROVIDE NAME]',
    relationship: 'Parent',
    city: 'Surat',
    thumbnailAlt: '[REAL VIDEO TESTIMONIAL — PARENT, SURAT]',
  },
  {
    id: 'testimonial-2',
    name: '[CLIENT TO PROVIDE NAME]',
    relationship: 'Parent',
    city: 'Navsari',
    thumbnailAlt: '[REAL VIDEO TESTIMONIAL — PARENT, NAVSARI]',
  },
  {
    id: 'testimonial-3',
    name: '[CLIENT TO PROVIDE NAME]',
    relationship: 'Student',
    city: 'Ankleshwar',
    thumbnailAlt: '[REAL VIDEO TESTIMONIAL — STUDENT, ANKLESHWAR]',
  },
]
```

- [ ] **Step 3: Write `src/data/stories.ts`**

```ts
export interface SuccessStory {
  slug: string
  studentInitial: string
  studentClass: string
  city: string
  service: string
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
    was: '[CLIENT TO PROVIDE: original situation before counselling]',
    found: '[CLIENT TO PROVIDE: what assessment/counselling revealed]',
    chose: '[CLIENT TO PROVIDE: the final decision]',
    now: '[CLIENT TO PROVIDE: the outcome]',
  },
]
```

- [ ] **Step 4: Write `src/data/locations.ts`**

```ts
export interface Location {
  city: string
  address: string
  landmark: string
  timings: string
  phone: string
  hasMap: boolean
}

export const locations: Location[] = [
  {
    city: 'Surat',
    address: '[CLIENT TO PROVIDE ADDRESS]',
    landmark: '[CLIENT TO PROVIDE LANDMARK]',
    timings: '[CLIENT TO PROVIDE TIMINGS]',
    phone: '+91 87581 75187',
    hasMap: true,
  },
  {
    city: 'Navsari',
    address: '[CLIENT TO PROVIDE ADDRESS]',
    landmark: '[CLIENT TO PROVIDE LANDMARK]',
    timings: '[CLIENT TO PROVIDE TIMINGS]',
    phone: '+91 87581 75187',
    hasMap: false,
  },
  {
    city: 'Ankleshwar',
    address: '[CLIENT TO PROVIDE ADDRESS]',
    landmark: '[CLIENT TO PROVIDE LANDMARK]',
    timings: '[CLIENT TO PROVIDE TIMINGS]',
    phone: '+91 87581 75187',
    hasMap: false,
  },
  {
    city: 'Valsad',
    address: '[CLIENT TO PROVIDE ADDRESS]',
    landmark: '[CLIENT TO PROVIDE LANDMARK]',
    timings: '[CLIENT TO PROVIDE TIMINGS]',
    phone: '+91 87581 75187',
    hasMap: false,
  },
]
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors (Task 6 must be complete first, since `services.ts` imports `WhatsAppContext`).

---

### Task 8: `hooks/useInView.ts` and `hooks/useCountUp.ts` (TDD)

**Files:**
- Create: `career-counselling/src/hooks/useInView.ts`
- Test: `career-counselling/src/hooks/useInView.test.tsx`
- Create: `career-counselling/src/hooks/useCountUp.ts`
- Test: `career-counselling/src/hooks/useCountUp.test.tsx`

- [ ] **Step 1: Write the failing test for `useInView`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useInView } from './useInView'

function Probe() {
  const { ref, isInView } = useInView<HTMLDivElement>()
  return (
    <div ref={ref} data-testid="probe">
      {isInView ? 'visible' : 'hidden'}
    </div>
  )
}

describe('useInView', () => {
  it('starts hidden before the observer fires', () => {
    render(<Probe />)
    expect(screen.getByTestId('probe')).toHaveTextContent('hidden')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/hooks/useInView.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```ts
import { useEffect, useRef, useState } from 'react'

export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/hooks/useInView.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Write the failing test for `useCountUp`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useCountUp } from './useCountUp'

function Probe() {
  const value = useCountUp(900, { start: true, durationMs: 0 })
  return <span data-testid="value">{value}</span>
}

describe('useCountUp', () => {
  it('jumps straight to target when durationMs is 0', () => {
    render(<Probe />)
    expect(screen.getByTestId('value')).toHaveTextContent('900')
  })

  it('starts at 0 when start is false', () => {
    function Idle() {
      const value = useCountUp(900, { start: false, durationMs: 0 })
      return <span data-testid="idle">{value}</span>
    }
    render(<Idle />)
    expect(screen.getByTestId('idle')).toHaveTextContent('0')
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npm run test -- src/hooks/useCountUp.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 7: Write the implementation**

```ts
import { useEffect, useState } from 'react'

interface UseCountUpOptions {
  start: boolean
  durationMs?: number
}

export function useCountUp(target: number, { start, durationMs = 1200 }: UseCountUpOptions): number {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    if (durationMs === 0) {
      setValue(target)
      return
    }

    const startTime = performance.now()
    let frame: number

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1)
      setValue(Math.round(target * progress))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, target, durationMs])

  return value
}
```

- [ ] **Step 8: Run test to verify it passes**

```bash
npm run test -- src/hooks/useCountUp.test.tsx
```

Expected: PASS.

---

### Task 9: `AnnouncementBar` with seasonal messaging (TDD)

**Files:**
- Create: `career-counselling/src/components/layout/seasonalMessage.ts`
- Test: `career-counselling/src/components/layout/seasonalMessage.test.ts`
- Create: `career-counselling/src/components/layout/AnnouncementBar.tsx`
- Test: `career-counselling/src/components/layout/AnnouncementBar.test.tsx`

- [ ] **Step 1: Write the failing test for `seasonalMessage`**

```ts
import { describe, it, expect } from 'vitest'
import { getSeasonalMessage } from './seasonalMessage'

describe('getSeasonalMessage', () => {
  it('returns the Jan–Mar message for February', () => {
    expect(getSeasonalMessage(new Date('2026-02-15'))).toMatch(/stream selection session/)
  })

  it('returns the Apr–Jun message for May', () => {
    expect(getSeasonalMessage(new Date('2026-05-15'))).toMatch(/Admission deadlines approaching/)
  })

  it('returns the Jul–Sep message for August', () => {
    expect(getSeasonalMessage(new Date('2026-08-11'))).toMatch(/Late admissions still open/)
  })

  it('returns the Oct–Dec message for November', () => {
    expect(getSeasonalMessage(new Date('2026-11-01'))).toMatch(/Early birds get better college options/)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/components/layout/seasonalMessage.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```ts
export function getSeasonalMessage(date: Date = new Date()): string {
  const month = date.getMonth() + 1

  if (month >= 1 && month <= 3) {
    return 'Board exams done? Book your stream selection session before results.'
  }
  if (month >= 4 && month <= 6) {
    return 'Results are out. Admission deadlines approaching — book now.'
  }
  if (month >= 7 && month <= 9) {
    return 'Late admissions still open. Talk to a counsellor today.'
  }
  return 'Planning for next year? Early birds get better college options.'
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/components/layout/seasonalMessage.test.ts
```

Expected: PASS, 4 tests.

- [ ] **Step 5: Write the failing test for `AnnouncementBar`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AnnouncementBar } from './AnnouncementBar'

describe('AnnouncementBar', () => {
  it('renders the seasonal message', () => {
    render(<AnnouncementBar />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('dismisses when the close button is clicked', async () => {
    render(<AnnouncementBar />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /dismiss/i }))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npm run test -- src/components/layout/AnnouncementBar.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 7: Write the implementation**

```tsx
import { useState } from 'react'
import { X } from 'lucide-react'
import { getSeasonalMessage } from './seasonalMessage'

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="flex items-center justify-center gap-3 bg-brand-green px-4 py-2 text-center text-sm text-warm-white" role="status">
      <span>{getSeasonalMessage()}</span>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setDismissed(true)}
        className="shrink-0 rounded p-1 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-yellow"
      >
        <X size={14} />
      </button>
    </div>
  )
}
```

- [ ] **Step 8: Run test to verify it passes**

```bash
npm run test -- src/components/layout/AnnouncementBar.test.tsx
```

Expected: PASS, 2 tests.

---

### Task 10: `ConsultationForm` and `AssessmentForm` (TDD)

**Files:**
- Create: `career-counselling/src/components/forms/ConsultationForm.tsx`
- Test: `career-counselling/src/components/forms/ConsultationForm.test.tsx`
- Create: `career-counselling/src/components/forms/AssessmentForm.tsx`
- Test: `career-counselling/src/components/forms/AssessmentForm.test.tsx`

- [ ] **Step 1: Write the failing test for `ConsultationForm`**

```tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConsultationForm } from './ConsultationForm'

describe('ConsultationForm', () => {
  let openSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
  })

  afterEach(() => {
    openSpy.mockRestore()
  })

  it('shows validation errors when submitted empty', async () => {
    render(<ConsultationForm context="home" />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /book free session/i }))

    expect(await screen.findByText(/student name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/phone number is required/i)).toBeInTheDocument()
    expect(screen.getByText(/select the current class/i)).toBeInTheDocument()
    expect(openSpy).not.toHaveBeenCalled()
  })

  it('rejects an invalid phone number', async () => {
    render(<ConsultationForm context="home" />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/student name/i), 'Aarav Shah')
    await user.type(screen.getByLabelText(/phone/i), '12345')
    await user.selectOptions(screen.getByLabelText(/current class/i), 'Class 9–10')
    await user.click(screen.getByRole('button', { name: /book free session/i }))

    expect(await screen.findByText(/enter a valid 10-digit phone number/i)).toBeInTheDocument()
    expect(openSpy).not.toHaveBeenCalled()
  })

  it('opens WhatsApp with the contextual message on valid submit', async () => {
    render(<ConsultationForm context="after-10th" />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/student name/i), 'Aarav Shah')
    await user.type(screen.getByLabelText(/phone/i), '9876543210')
    await user.selectOptions(screen.getByLabelText(/current class/i), 'Class 9–10')
    await user.click(screen.getByRole('button', { name: /book free session/i }))

    expect(openSpy).toHaveBeenCalledTimes(1)
    const [url] = openSpy.mock.calls[0]
    expect(String(url)).toContain('https://wa.me/918758175187?text=')
    expect(decodeURIComponent(String(url))).toContain('stream selection and career options')
    expect(decodeURIComponent(String(url))).toContain('Aarav Shah')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/components/forms/ConsultationForm.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```tsx
import { useId, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { isValidIndianPhone, buildWhatsAppUrl } from '@/lib/whatsapp'
import { buildContextualMessage, type WhatsAppContext } from '@/components/whatsapp/whatsappMessages'

const CLASS_OPTIONS = [
  'Class 9–10',
  'Class 11–12',
  'UG Student',
  'PG / MBA',
  'Working Professional',
  'Parent Enquiring',
]

interface ConsultationFormProps {
  context: WhatsAppContext
  className?: string
}

interface Errors {
  name?: string
  phone?: string
  currentClass?: string
}

export function ConsultationForm({ context, className }: ConsultationFormProps) {
  const formId = useId()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [currentClass, setCurrentClass] = useState('')
  const [errors, setErrors] = useState<Errors>({})

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors: Errors = {}

    if (!name.trim()) nextErrors.name = 'Student name is required.'
    if (!phone.trim()) nextErrors.phone = 'Phone number is required.'
    else if (!isValidIndianPhone(phone)) nextErrors.phone = 'Enter a valid 10-digit phone number.'
    if (!currentClass) nextErrors.currentClass = 'Select the current class.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const message = buildContextualMessage(context, { name, phone, currentClass })
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className="mb-3">
        <label htmlFor={`${formId}-name`} className="mb-1 block text-sm font-medium text-ink">
          Student Name
        </label>
        <input
          id={`${formId}-name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-phone`} className="mb-1 block text-sm font-medium text-ink">
          Phone / WhatsApp
        </label>
        <input
          id={`${formId}-phone`}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          inputMode="numeric"
          className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor={`${formId}-class`} className="mb-1 block text-sm font-medium text-ink">
          Current Class
        </label>
        <select
          id={`${formId}-class`}
          value={currentClass}
          onChange={(e) => setCurrentClass(e.target.value)}
          className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
        >
          <option value="">Select current class</option>
          {CLASS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.currentClass && <p className="mt-1 text-sm text-red-600">{errors.currentClass}</p>}
      </div>

      <Button type="submit" className="w-full bg-brand-yellow text-ink hover:bg-brand-yellow/90">
        Book Free Session
      </Button>
    </form>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/components/forms/ConsultationForm.test.tsx
```

Expected: PASS, 3 tests. (Note: `tailwind.config.js` uses `neutral-border` per Task 2 — the test file above references it via className only, not asserted directly, so no config change is needed here; verify the class name matches `neutral-border` as defined. If Task 2 used a different key, align this file to it.)

- [ ] **Step 5: Write the failing test for `AssessmentForm`**

```tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AssessmentForm } from './AssessmentForm'

describe('AssessmentForm', () => {
  let openSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
  })

  afterEach(() => {
    openSpy.mockRestore()
  })

  it('includes an optional email field', () => {
    render(<AssessmentForm />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('submits successfully without an email (email is optional)', async () => {
    render(<AssessmentForm />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/student name/i), 'Diya Shah')
    await user.type(screen.getByLabelText(/phone/i), '9876543210')
    await user.selectOptions(screen.getByLabelText(/current class/i), 'Class 11–12')
    await user.click(screen.getByRole('button', { name: /take the free assessment/i }))

    expect(openSpy).toHaveBeenCalledTimes(1)
  })

  it('includes the email in the WhatsApp message when provided', async () => {
    render(<AssessmentForm />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/student name/i), 'Diya Shah')
    await user.type(screen.getByLabelText(/phone/i), '9876543210')
    await user.selectOptions(screen.getByLabelText(/current class/i), 'Class 11–12')
    await user.type(screen.getByLabelText(/email/i), 'diya@example.com')
    await user.click(screen.getByRole('button', { name: /take the free assessment/i }))

    const [url] = openSpy.mock.calls[0]
    expect(decodeURIComponent(String(url))).toContain('Email: diya@example.com')
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npm run test -- src/components/forms/AssessmentForm.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 7: Write the implementation**

```tsx
import { useId, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { isValidIndianPhone, buildWhatsAppUrl } from '@/lib/whatsapp'
import { buildContextualMessage } from '@/components/whatsapp/whatsappMessages'

const CLASS_OPTIONS = [
  'Class 9–10',
  'Class 11–12',
  'UG Student',
  'PG / MBA',
  'Working Professional',
  'Parent Enquiring',
]

interface Errors {
  name?: string
  phone?: string
  currentClass?: string
}

export function AssessmentForm() {
  const formId = useId()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [currentClass, setCurrentClass] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Errors>({})

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors: Errors = {}

    if (!name.trim()) nextErrors.name = 'Student name is required.'
    if (!phone.trim()) nextErrors.phone = 'Phone number is required.'
    else if (!isValidIndianPhone(phone)) nextErrors.phone = 'Enter a valid 10-digit phone number.'
    if (!currentClass) nextErrors.currentClass = 'Select the current class.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const message = buildContextualMessage('assessment', {
      name,
      phone,
      currentClass,
      email: email.trim() || undefined,
    })
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label htmlFor={`${formId}-name`} className="mb-1 block text-sm font-medium text-ink">
          Student Name
        </label>
        <input
          id={`${formId}-name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-phone`} className="mb-1 block text-sm font-medium text-ink">
          Phone
        </label>
        <input
          id={`${formId}-phone`}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          inputMode="numeric"
          className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor={`${formId}-class`} className="mb-1 block text-sm font-medium text-ink">
          Current Class
        </label>
        <select
          id={`${formId}-class`}
          value={currentClass}
          onChange={(e) => setCurrentClass(e.target.value)}
          className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
        >
          <option value="">Select current class</option>
          {CLASS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.currentClass && <p className="mt-1 text-sm text-red-600">{errors.currentClass}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor={`${formId}-email`} className="mb-1 block text-sm font-medium text-ink">
          Email <span className="text-muted-ink font-normal">(optional)</span>
        </label>
        <input
          id={`${formId}-email`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-neutral-border bg-white px-3 py-2 text-sm"
        />
      </div>

      <Button type="submit" className="w-full bg-brand-yellow text-ink hover:bg-brand-yellow/90">
        Take the Free Assessment
      </Button>
    </form>
  )
}
```

- [ ] **Step 8: Run test to verify it passes**

```bash
npm run test -- src/components/forms/AssessmentForm.test.tsx
```

Expected: PASS, 3 tests.

- [ ] **Step 9: Add `neutral-border` to `tailwind.config.js`**

Add to the `colors` object from Task 2 Step 2:

```js
'neutral-border': '#E6E8E5',
```

- [ ] **Step 10: Run the full test suite so far**

```bash
npm run test
```

Expected: all tests passing.

---

### Task 11: `WhatsAppButton` (floating button)

**Files:**
- Create: `career-counselling/src/components/whatsapp/WhatsAppButton.tsx`
- Test: `career-counselling/src/components/whatsapp/WhatsAppButton.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WhatsAppButton } from './WhatsAppButton'

describe('WhatsAppButton', () => {
  it('renders an accessible link to WhatsApp with the default message', () => {
    render(<WhatsAppButton />)
    const link = screen.getByRole('link', { name: /chat on whatsapp/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('https://wa.me/918758175187?text='))
    expect(decodeURIComponent(link.getAttribute('href') ?? '')).toContain(
      'Hi, I want to know about career counselling for my child in Class',
    )
  })

  it('opens in a new tab safely', () => {
    render(<WhatsAppButton />)
    const link = screen.getByRole('link', { name: /chat on whatsapp/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/components/whatsapp/WhatsAppButton.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```tsx
import { MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const DEFAULT_MESSAGE = 'Hi, I want to know about career counselling for my child in Class ___'

export function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppUrl(DEFAULT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-yellow md:bottom-6"
    >
      <MessageCircle size={28} aria-hidden="true" />
    </a>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/components/whatsapp/WhatsAppButton.test.tsx
```

Expected: PASS, 2 tests.

---

### Task 12: `MobileBottomBar`

**Files:**
- Create: `career-counselling/src/components/layout/MobileBottomBar.tsx`
- Test: `career-counselling/src/components/layout/MobileBottomBar.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MobileBottomBar } from './MobileBottomBar'

describe('MobileBottomBar', () => {
  it('renders Call, WhatsApp and Book actions', () => {
    render(
      <MemoryRouter>
        <MobileBottomBar />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /call/i })).toHaveAttribute('href', 'tel:+918758175187')
    expect(screen.getByRole('link', { name: /whatsapp/i })).toHaveAttribute(
      'href',
      expect.stringContaining('https://wa.me/918758175187'),
    )
    expect(screen.getByRole('link', { name: /^book$/i })).toHaveAttribute('href', '/contact-us')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/components/layout/MobileBottomBar.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```tsx
import { Phone, MessageCircle, CalendarCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const DEFAULT_MESSAGE = 'Hi, I want to know about career counselling for my child in Class ___'

export function MobileBottomBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-neutral-border bg-white md:hidden"
    >
      <a href="tel:+918758175187" className="flex flex-col items-center gap-0.5 py-2 text-xs text-ink">
        <Phone size={18} aria-hidden="true" />
        Call
      </a>
      <a
        href={buildWhatsAppUrl(DEFAULT_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 py-2 text-xs text-ink"
      >
        <MessageCircle size={18} aria-hidden="true" />
        WhatsApp
      </a>
      <Link to="/contact-us" className="flex flex-col items-center gap-0.5 bg-brand-yellow py-2 text-xs font-medium text-ink">
        <CalendarCheck size={18} aria-hidden="true" />
        Book
      </Link>
    </nav>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/components/layout/MobileBottomBar.test.tsx
```

Expected: PASS.

---

### Task 13: `DesktopNav` and `MobileNav`

**Files:**
- Create: `career-counselling/src/components/navigation/DesktopNav.tsx`
- Test: `career-counselling/src/components/navigation/DesktopNav.test.tsx`
- Create: `career-counselling/src/components/navigation/MobileNav.tsx`
- Test: `career-counselling/src/components/navigation/MobileNav.test.tsx`

- [ ] **Step 1: Write the failing test for `DesktopNav`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DesktopNav } from './DesktopNav'

describe('DesktopNav', () => {
  it('renders all six primary nav links', () => {
    render(
      <MemoryRouter>
        <DesktopNav />
      </MemoryRouter>,
    )
    ;['Home', 'Who We Are', 'What We Do', 'Success Stories', 'Blogs', 'Contact Us'].forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/components/navigation/DesktopNav.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```tsx
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/who-we-are', label: 'Who We Are' },
  { to: '/what-we-do', label: 'What We Do' },
  { to: '/success-stories', label: 'Success Stories' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/contact-us', label: 'Contact Us' },
]

export function DesktopNav() {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `text-sm font-medium transition-colors ${isActive ? 'text-brand-green' : 'text-ink hover:text-brand-green'}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/components/navigation/DesktopNav.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Write the failing test for `MobileNav`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { MobileNav } from './MobileNav'

describe('MobileNav', () => {
  it('opens the menu and shows nav links when the hamburger is clicked', async () => {
    render(
      <MemoryRouter>
        <MobileNav />
      </MemoryRouter>,
    )
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /open menu/i }))
    expect(await screen.findByRole('link', { name: 'Success Stories' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npm run test -- src/components/navigation/MobileNav.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 7: Write the implementation**

```tsx
import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/who-we-are', label: 'Who We Are' },
  { to: '/what-we-do', label: 'What We Do' },
  { to: '/success-stories', label: 'Success Stories' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/contact-us', label: 'Contact Us' },
]

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-md text-ink md:hidden"
        >
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetTitle>Menu</SheetTitle>
        <nav aria-label="Primary" className="mt-6 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <Link key={item.to} to={item.to} className="text-base font-medium text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
```

- [ ] **Step 8: Run test to verify it passes**

```bash
npm run test -- src/components/navigation/MobileNav.test.tsx
```

Expected: PASS.

---

### Task 14: `Header`, `Footer`, `Layout`

**Files:**
- Create: `career-counselling/src/components/layout/Header.tsx`
- Test: `career-counselling/src/components/layout/Header.test.tsx`
- Create: `career-counselling/src/components/layout/Footer.tsx`
- Test: `career-counselling/src/components/layout/Footer.test.tsx`
- Create: `career-counselling/src/components/layout/Layout.tsx`

- [ ] **Step 1: Write the failing test for `Header`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Header } from './Header'

describe('Header', () => {
  it('renders the logo and the primary Book Free Session CTA', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )
    expect(screen.getByText(/kishan & meeta patel/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /book free session/i })).toHaveAttribute('href', '/contact-us')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/components/layout/Header.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DesktopNav } from '@/components/navigation/DesktopNav'
import { MobileNav } from '@/components/navigation/MobileNav'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled ? 'border-b border-neutral-border bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="text-lg font-bold text-brand-green">
          Kishan & Meeta Patel
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-2">
          <Link
            to="/contact-us"
            className="hidden rounded-full bg-brand-yellow px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-yellow/90 md:inline-block"
          >
            Book Free Session
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/components/layout/Header.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Write the failing test for `Footer`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders the brand name and Google rating', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
    expect(screen.getByText(/kishan & meeta patel/i)).toBeInTheDocument()
    expect(screen.getByText(/5\.0★/)).toBeInTheDocument()
    expect(screen.getByText(/900\+ reviews/i)).toBeInTheDocument()
  })

  it('renders the four city names', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
    ;['Surat', 'Navsari', 'Ankleshwar', 'Valsad'].forEach((city) => {
      expect(screen.getByText(new RegExp(city))).toBeInTheDocument()
    })
  })

  it('renders all six service links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'After 10th' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Career Change' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npm run test -- src/components/layout/Footer.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 7: Write the implementation**

```tsx
import { Link } from 'react-router-dom'
import { services } from '@/data/services'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/who-we-are', label: 'Who We Are' },
  { to: '/what-we-do', label: 'What We Do' },
  { to: '/success-stories', label: 'Success Stories' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/contact-us', label: 'Contact Us' },
]

export function Footer() {
  return (
    <footer className="bg-brand-green text-warm-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-8">
        <div>
          <p className="text-lg font-bold">Kishan & Meeta Patel</p>
          <p className="mt-2 text-sm text-warm-white/80">
            Career counselling and guidance for students, parents and working professionals across Gujarat.
          </p>
          <p className="mt-4 text-sm font-medium text-brand-yellow">Google 5.0★ · 900+ Reviews</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-warm-white/60">Navigation</p>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-brand-yellow">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-warm-white/60">Services</p>
          <ul className="space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.id}>
                <Link to={`/what-we-do#${service.id}`} className="hover:text-brand-yellow">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-warm-white/60">Contact</p>
          <p className="text-sm">+91 87581 75187</p>
          <p className="text-sm">kishan@bestcareercounselling.com</p>
          <p className="mt-2 text-sm">Surat · Navsari · Ankleshwar · Valsad</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-warm-white/60 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Kishan & Meeta Patel. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <span>Privacy Policy</span>
            <span>Terms</span>
            <span>Refund Policy</span>
            <span>Student Dashboard</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 8: Run test to verify it passes**

```bash
npm run test -- src/components/layout/Footer.test.tsx
```

Expected: PASS, 3 tests.

- [ ] **Step 9: Write `Layout.tsx` (no test — pure composition, covered by App routing test in Task 16)**

```tsx
import { Outlet } from 'react-router-dom'
import { AnnouncementBar } from './AnnouncementBar'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileBottomBar } from './MobileBottomBar'
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
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

---

### Task 15: Page stubs for the seven non-Home routes

**Files:**
- Create: `career-counselling/src/pages/WhoWeAre.tsx`
- Create: `career-counselling/src/pages/WhatWeDo.tsx`
- Create: `career-counselling/src/pages/SuccessStories.tsx`
- Create: `career-counselling/src/pages/Blogs.tsx`
- Create: `career-counselling/src/pages/BlogDetail.tsx`
- Create: `career-counselling/src/pages/ContactUs.tsx`
- Create: `career-counselling/src/pages/ThankYou.tsx`

These are intentionally minimal — full content is built in Phase 2 and Phase 3. Each stub renders a real, accessible `<h1>` so routing tests can assert against it.

- [ ] **Step 1: Write `src/pages/WhoWeAre.tsx`**

```tsx
export default function WhoWeAre() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-brand-green">Who We Are</h1>
      <p className="mt-4 text-muted-ink">Full page coming in Phase 2.</p>
    </div>
  )
}
```

- [ ] **Step 2: Write `src/pages/WhatWeDo.tsx`**

```tsx
export default function WhatWeDo() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-brand-green">What We Do</h1>
      <p className="mt-4 text-muted-ink">Full page coming in Phase 2.</p>
    </div>
  )
}
```

- [ ] **Step 3: Write `src/pages/SuccessStories.tsx`**

```tsx
export default function SuccessStories() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-brand-green">Success Stories</h1>
      <p className="mt-4 text-muted-ink">Full page coming in Phase 3.</p>
    </div>
  )
}
```

- [ ] **Step 4: Write `src/pages/Blogs.tsx`**

```tsx
export default function Blogs() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-brand-green">Blogs</h1>
      <p className="mt-4 text-muted-ink">Full page coming in Phase 3.</p>
    </div>
  )
}
```

- [ ] **Step 5: Write `src/pages/BlogDetail.tsx`**

```tsx
import { useParams } from 'react-router-dom'

export default function BlogDetail() {
  const { slug } = useParams()
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-brand-green">Blog Post: {slug}</h1>
      <p className="mt-4 text-muted-ink">Full page coming in Phase 3.</p>
    </div>
  )
}
```

- [ ] **Step 6: Write `src/pages/ContactUs.tsx`**

```tsx
import { ConsultationForm } from '@/components/forms/ConsultationForm'

export default function ContactUs() {
  return (
    <div className="mx-auto max-w-md px-4 py-24">
      <h1 className="text-center text-3xl font-bold text-brand-green">Book your free consultation</h1>
      <p className="mt-2 text-center text-muted-ink">15 minutes with Kishan or Meeta. No cost, no obligation.</p>
      <div className="mt-8 rounded-xl border border-neutral-border bg-white p-6">
        <ConsultationForm context="home" />
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Write `src/pages/ThankYou.tsx`**

```tsx
export default function ThankYou() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-brand-green">Thank you</h1>
      <p className="mt-4 text-muted-ink">Your WhatsApp message is ready to send.</p>
    </div>
  )
}
```

- [ ] **Step 8: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

---

### Task 16: `App.tsx` router wiring

**Files:**
- Modify: `career-counselling/src/App.tsx`
- Test: `career-counselling/src/App.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('App routing', () => {
  it('renders the Home page at "/"', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )
    expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the Contact Us page at "/contact-us"', async () => {
    render(
      <MemoryRouter initialEntries={['/contact-us']}>
        <App />
      </MemoryRouter>,
    )
    expect(await screen.findByText(/book your free consultation/i)).toBeInTheDocument()
  })
})
```

Note: `App.tsx` normally wraps itself in a `BrowserRouter`, which conflicts with the `MemoryRouter` used in tests. To keep `App` testable, `main.tsx` owns the `BrowserRouter` and `App.tsx` only defines `<Routes>`.

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/App.test.tsx
```

Expected: FAIL — current `App.tsx` is still the Vite default counter demo.

- [ ] **Step 3: Write `src/App.tsx`**

```tsx
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'

const Home = lazy(() => import('@/pages/Home'))
const WhoWeAre = lazy(() => import('@/pages/WhoWeAre'))
const WhatWeDo = lazy(() => import('@/pages/WhatWeDo'))
const SuccessStories = lazy(() => import('@/pages/SuccessStories'))
const Blogs = lazy(() => import('@/pages/Blogs'))
const BlogDetail = lazy(() => import('@/pages/BlogDetail'))
const ContactUs = lazy(() => import('@/pages/ContactUs'))
const ThankYou = lazy(() => import('@/pages/ThankYou'))

export default function App() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-muted-ink">Loading…</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
```

- [ ] **Step 4: Write `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm run test -- src/App.test.tsx
```

Expected: PASS (once `Home` exists from Task 21 — if run before Task 21, this will fail on the first assertion only; re-run after Task 21 to confirm green).

---

### Task 17: `TrustStrip`

**Files:**
- Create: `career-counselling/src/components/trust/TrustStrip.tsx`
- Test: `career-counselling/src/components/trust/TrustStrip.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TrustStrip } from './TrustStrip'

describe('TrustStrip', () => {
  it('renders all six credibility indicators', () => {
    render(<TrustStrip />)
    expect(screen.getByText('5.0★')).toBeInTheDocument()
    expect(screen.getByText('Google Rating')).toBeInTheDocument()
    expect(screen.getByText('30+')).toBeInTheDocument()
    expect(screen.getByText('Years')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('Edumilestones')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/components/trust/TrustStrip.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```tsx
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'

interface Stat {
  value: string
  label: string
  numeric?: number
}

const STATS: Stat[] = [
  { value: '5.0★', label: 'Google Rating' },
  { value: '900+', label: 'Reviews', numeric: 900 },
  { value: '30+', label: 'Years', numeric: 30 },
  { value: '5,000+', label: 'Students Guided', numeric: 5000 },
  { value: '4', label: 'Cities', numeric: 4 },
  { value: 'Edumilestones', label: 'Certified' },
]

function StatItem({ stat, isInView }: { stat: Stat; isInView: boolean }) {
  const count = useCountUp(stat.numeric ?? 0, { start: isInView && stat.numeric !== undefined })
  const display = stat.numeric !== undefined ? `${count}${stat.value.replace(/[0-9,]/g, '')}` : stat.value

  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-brand-green md:text-3xl">{display}</p>
      <p className="text-xs text-muted-ink md:text-sm">{stat.label}</p>
    </div>
  )
}

export function TrustStrip() {
  const { ref, isInView } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className="grid grid-cols-2 gap-6 bg-green-tint px-4 py-8 md:grid-cols-6 md:px-8">
      {STATS.map((stat) => (
        <StatItem key={stat.label} stat={stat} isInView={isInView} />
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/components/trust/TrustStrip.test.tsx
```

Expected: PASS.

---

### Task 18: `GoogleReviews`

**Files:**
- Create: `career-counselling/src/components/trust/GoogleReviews.tsx`
- Test: `career-counselling/src/components/trust/GoogleReviews.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GoogleReviews } from './GoogleReviews'

describe('GoogleReviews', () => {
  it('renders the aggregate rating summary', () => {
    render(<GoogleReviews />)
    expect(screen.getByText(/5\.0/)).toBeInTheDocument()
    expect(screen.getByText(/900\+ google reviews/i)).toBeInTheDocument()
  })

  it('marks itself as a placeholder pending live integration', () => {
    render(<GoogleReviews />)
    expect(screen.getByText(/\[LIVE GOOGLE REVIEWS WIDGET/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/components/trust/GoogleReviews.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```tsx
import { Star } from 'lucide-react'

export function GoogleReviews() {
  return (
    <section className="rounded-xl border border-neutral-border bg-white p-6 text-center">
      <div className="flex items-center justify-center gap-1 text-brand-yellow">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={20} fill="currentColor" stroke="none" />
        ))}
      </div>
      <p className="mt-2 text-2xl font-bold text-ink">5.0</p>
      <p className="text-sm text-muted-ink">900+ Google Reviews</p>
      <p className="mt-4 text-xs text-muted-ink">[LIVE GOOGLE REVIEWS WIDGET — replace with the client's Google Business Profile embed]</p>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/components/trust/GoogleReviews.test.tsx
```

Expected: PASS.

---

### Task 19: Home sections — `Hero`, `ProblemSection`, `WhoWeHelp`

**Files:**
- Create: `career-counselling/src/components/home/Hero.tsx` + test
- Create: `career-counselling/src/components/home/ProblemSection.tsx` + test
- Create: `career-counselling/src/components/home/WhoWeHelp.tsx` + test

- [ ] **Step 1: Write the failing test for `Hero`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders the H1, eyebrow, and consultation form', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1, name: /stop guessing which stream is right/i })).toBeInTheDocument()
    expect(screen.getByText(/google's highest-rated career counsellors in surat/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/student name/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/components/home/Hero.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```tsx
import { ConsultationForm } from '@/components/forms/ConsultationForm'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { buildContextualMessage } from '@/components/whatsapp/whatsappMessages'

export function Hero() {
  const directWhatsAppUrl = buildWhatsAppUrl(
    buildContextualMessage('home', { name: '', phone: '' }).replace('Student Name: \n', '').replace('Phone: \n', ''),
  )

  return (
    <section className="relative overflow-hidden bg-soft-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-green">
            Google's highest-rated career counsellors in Surat
          </p>
          <h1 className="text-4xl font-bold leading-tight text-ink md:text-6xl">
            Stop guessing which stream is right for your child.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-ink">
            Aptitude testing and one-on-one counselling from Kishan & Meeta Patel — 30 years, 5,000+ students, 900+
            five-star reviews.
          </p>

          <div className="mt-8 max-w-sm rounded-xl border border-neutral-border bg-white p-6 shadow-sm">
            <ConsultationForm context="home" />
          </div>

          <a href={directWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium text-brand-green hover:underline">
            Or WhatsApp us directly →
          </a>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] w-full rounded-2xl border-2 border-brand-green bg-green-tint" role="img" aria-label="[REAL PHOTO — KISHAN OR MEETA COUNSELLING A STUDENT]">
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-ink">
              [REAL PHOTO — KISHAN OR MEETA COUNSELLING A STUDENT]
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-xl bg-brand-yellow" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/components/home/Hero.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Write the failing test for `ProblemSection`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProblemSection } from './ProblemSection'

describe('ProblemSection', () => {
  it('renders the heading and all four problems', () => {
    render(<ProblemSection />)
    expect(screen.getByRole('heading', { name: /sound familiar/i })).toBeInTheDocument()
    expect(screen.getByText(/science, commerce or arts/i)).toBeInTheDocument()
    expect(screen.getByText(/wrong stream chosen/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npm run test -- src/components/home/ProblemSection.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 7: Write the implementation**

```tsx
const PROBLEMS = [
  'Science, Commerce or Arts — and no way to decide',
  'You and your child want different things',
  'Wrong stream chosen. Now what?',
  'No idea which colleges to even apply to',
]

export function ProblemSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Sound familiar?</h2>
      <p className="mt-2 text-center text-muted-ink">Most families we meet are stuck on one of these.</p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {PROBLEMS.map((problem) => (
          <div key={problem} className="rounded-xl border border-neutral-border bg-white p-5 text-ink">
            {problem}
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 8: Run test to verify it passes**

```bash
npm run test -- src/components/home/ProblemSection.test.tsx
```

Expected: PASS.

- [ ] **Step 9: Write the failing test for `WhoWeHelp`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { WhoWeHelp } from './WhoWeHelp'

describe('WhoWeHelp', () => {
  it('renders all six service cards linking to /what-we-do anchors', () => {
    render(
      <MemoryRouter>
        <WhoWeHelp />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: /after 10th/i })
    expect(link).toHaveAttribute('href', '/what-we-do#after-10th')
    expect(screen.getAllByRole('link')).toHaveLength(6)
  })
})
```

- [ ] **Step 10: Run test to verify it fails**

```bash
npm run test -- src/components/home/WhoWeHelp.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 11: Write the implementation**

```tsx
import { Link } from 'react-router-dom'
import { services } from '@/data/services'

export function WhoWeHelp() {
  return (
    <section className="bg-green-tint px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Where are you right now?</h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/what-we-do#${service.id}`}
              className="block rounded-xl border border-neutral-border bg-white p-5 transition-shadow hover:shadow-md"
            >
              <p className="font-semibold text-brand-green">{service.title}</p>
              <p className="mt-1 text-sm text-muted-ink">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 12: Run test to verify it passes**

```bash
npm run test -- src/components/home/WhoWeHelp.test.tsx
```

Expected: PASS.

---

### Task 20: Home sections — `HowItWorks`, `ReportSection`, `FreeAssessmentSection`

**Files:**
- Create: `career-counselling/src/components/home/HowItWorks.tsx` + test
- Create: `career-counselling/src/components/home/ReportSection.tsx` + test
- Create: `career-counselling/src/components/home/FreeAssessmentSection.tsx` + test

- [ ] **Step 1: Write the failing test for `HowItWorks`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HowItWorks } from './HowItWorks'

describe('HowItWorks', () => {
  it('renders all four steps in order', () => {
    render(<HowItWorks />)
    const steps = screen.getAllByRole('listitem')
    expect(steps).toHaveLength(4)
    expect(steps[0]).toHaveTextContent('Free consultation call')
    expect(steps[3]).toHaveTextContent('Roadmap and admission support')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/components/home/HowItWorks.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```tsx
const STEPS = [
  { number: '01', title: 'Free consultation call', description: '15 minutes. We understand the situation.' },
  { number: '02', title: 'Psychometric assessment', description: 'Aptitude, interest, personality and EQ.' },
  { number: '03', title: 'One-on-one session + report', description: 'Detailed counselling session with Kishan or Meeta.' },
  { number: '04', title: 'Roadmap and admission support', description: 'Course shortlist, college list, timeline and application help.' },
]

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">How it works</h2>
      <p className="mt-2 text-center text-muted-ink">Four steps. Complete clarity.</p>

      <ol className="mt-10 grid gap-6 md:grid-cols-4">
        {STEPS.map((step) => (
          <li key={step.number} className="border-t-4 border-brand-yellow pt-4">
            <span className="text-3xl font-bold text-brand-green">{step.number}</span>
            <p className="mt-2 font-semibold text-ink">{step.title}</p>
            <p className="mt-1 text-sm text-muted-ink">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/components/home/HowItWorks.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Write the failing test for `ReportSection`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ReportSection } from './ReportSection'

describe('ReportSection', () => {
  it('renders the heading and all five deliverables', () => {
    render(<ReportSection />)
    expect(screen.getByRole('heading', { name: /what you walk away with/i })).toBeInTheDocument()
    expect(screen.getByText(/32-page career report/i)).toBeInTheDocument()
    expect(screen.getByText(/college and course list/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npm run test -- src/components/home/ReportSection.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 7: Write the implementation**

```tsx
const DELIVERABLES = [
  '32-page career report',
  'Aptitude and interest profile',
  'SWOT analysis worksheet',
  'Shortlist of 8–12 careers',
  'College and course list',
]

export function ReportSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="aspect-[4/3] rounded-2xl border border-neutral-border bg-soft-cream" role="img" aria-label="[REAL PHOTO — SAMPLE CAREER REPORT]">
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-ink">
            [REAL PHOTO — SAMPLE CAREER REPORT]
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
    </section>
  )
}
```

- [ ] **Step 8: Run test to verify it passes**

```bash
npm run test -- src/components/home/ReportSection.test.tsx
```

Expected: PASS.

- [ ] **Step 9: Write the failing test for `FreeAssessmentSection`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FreeAssessmentSection } from './FreeAssessmentSection'

describe('FreeAssessmentSection', () => {
  it('renders the heading and opens the assessment form in a dialog', async () => {
    render(<FreeAssessmentSection />)
    expect(screen.getByRole('heading', { name: /not ready to book/i })).toBeInTheDocument()

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /take the free assessment/i }))
    expect(await screen.findByLabelText(/email/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 10: Run test to verify it fails**

```bash
npm run test -- src/components/home/FreeAssessmentSection.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 11: Write the implementation**

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AssessmentForm } from '@/components/forms/AssessmentForm'

export function FreeAssessmentSection() {
  return (
    <section className="bg-brand-green px-4 py-16 text-warm-white md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Not ready to book? Start with the free assessment.</h2>
        <p className="mt-3 text-warm-white/80">
          10 minutes. No payment. Get a snapshot of your child's aptitude and interest profile.
        </p>

        <div className="mx-auto mt-8 aspect-[3/2] max-w-md rounded-xl border border-white/20 bg-white/5 blur-[1px]" role="img" aria-label="[SAMPLE REPORT PREVIEW — PARTIALLY BLURRED]">
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-warm-white/70">
            [SAMPLE REPORT PREVIEW — PARTIALLY BLURRED]
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="mt-8 rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-ink hover:bg-brand-yellow/90"
            >
              Take the Free Assessment
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
    </section>
  )
}
```

- [ ] **Step 12: Run test to verify it passes**

```bash
npm run test -- src/components/home/FreeAssessmentSection.test.tsx
```

Expected: PASS.

---

### Task 21: Home sections — `MeetFounders`, `VideoTestimonials`, `SuccessStoriesPreview`

**Files:**
- Create: `career-counselling/src/components/home/MeetFounders.tsx` + test
- Create: `career-counselling/src/components/home/VideoTestimonials.tsx` + test
- Create: `career-counselling/src/components/home/SuccessStoriesPreview.tsx` + test

- [ ] **Step 1: Write the failing test for `MeetFounders`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MeetFounders } from './MeetFounders'

describe('MeetFounders', () => {
  it('renders both founders and a link to the full story', () => {
    render(
      <MemoryRouter>
        <MeetFounders />
      </MemoryRouter>,
    )
    expect(screen.getByText('Kishan Patel')).toBeInTheDocument()
    expect(screen.getByText('Meeta Patel')).toBeInTheDocument()
    expect(screen.getByText(/edumilestones/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /read our full story/i })).toHaveAttribute('href', '/who-we-are')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/components/home/MeetFounders.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```tsx
import { Link } from 'react-router-dom'

export function MeetFounders() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Meet Kishan & Meeta</h2>

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
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/who-we-are" className="font-medium text-brand-green hover:underline">
          Read Our Full Story →
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/components/home/MeetFounders.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Write the failing test for `VideoTestimonials`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VideoTestimonials } from './VideoTestimonials'

describe('VideoTestimonials', () => {
  it('renders a card for each video testimonial', () => {
    render(<VideoTestimonials />)
    expect(screen.getByRole('heading', { name: /hear it from parents/i })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /play testimonial/i })).toHaveLength(3)
  })

  it('opens a modal with the testimonial details when played', async () => {
    render(<VideoTestimonials />)
    const user = userEvent.setup()
    await user.click(screen.getAllByRole('button', { name: /play testimonial/i })[0])
    expect(await screen.findByText(/parent · surat/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npm run test -- src/components/home/VideoTestimonials.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 7: Write the implementation**

```tsx
import { Play } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'
import { videoTestimonials, type VideoTestimonial } from '@/data/testimonials'

export function VideoTestimonials() {
  const [active, setActive] = useState<VideoTestimonial | null>(null)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Hear it from parents</h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {videoTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="overflow-hidden rounded-xl border border-neutral-border bg-white">
            <div className="relative aspect-video bg-soft-cream">
              <div className="flex h-full items-center justify-center p-4 text-center text-xs text-muted-ink">
                {testimonial.thumbnailAlt}
              </div>
              <button
                type="button"
                aria-label="Play testimonial"
                onClick={() => setActive(testimonial)}
                className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow text-ink">
                  <Play size={20} fill="currentColor" />
                </span>
              </button>
            </div>
            <div className="p-4 text-sm text-ink">
              {testimonial.name} · {testimonial.relationship} · {testimonial.city}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {active?.name} · {active?.relationship} · {active?.city}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded-lg bg-soft-cream" role="img" aria-label={active?.thumbnailAlt}>
            <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-ink">
              {active?.thumbnailAlt}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
```

- [ ] **Step 8: Run test to verify it passes**

```bash
npm run test -- src/components/home/VideoTestimonials.test.tsx
```

Expected: PASS.

- [ ] **Step 9: Write the failing test for `SuccessStoriesPreview`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SuccessStoriesPreview } from './SuccessStoriesPreview'

describe('SuccessStoriesPreview', () => {
  it('renders a Was/Found/Chose/Now card for each story', () => {
    render(
      <MemoryRouter>
        <SuccessStoriesPreview />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: /real students\. real decisions\./i })).toBeInTheDocument()
    expect(screen.getAllByText('Was')).toHaveLength(3)
    expect(screen.getAllByText('Now')).toHaveLength(3)
  })

  it('links to the full success stories page', () => {
    render(
      <MemoryRouter>
        <SuccessStoriesPreview />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /view all success stories/i })).toHaveAttribute('href', '/success-stories')
  })
})
```

- [ ] **Step 10: Run test to verify it fails**

```bash
npm run test -- src/components/home/SuccessStoriesPreview.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 11: Write the implementation**

```tsx
import { Link } from 'react-router-dom'
import { successStories } from '@/data/stories'

export function SuccessStoriesPreview() {
  return (
    <section className="bg-green-tint px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Real students. Real decisions.</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {successStories.slice(0, 3).map((story) => (
            <div key={`${story.studentInitial}-${story.city}`} className="rounded-xl border border-neutral-border bg-white p-5">
              <p className="text-sm font-semibold text-brand-green">
                {story.studentInitial} · {story.studentClass} · {story.city}
              </p>
              <dl className="mt-3 space-y-2 text-sm">
                <div>
                  <dt className="font-semibold text-ink">Was</dt>
                  <dd className="text-muted-ink">{story.was}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Found</dt>
                  <dd className="text-muted-ink">{story.found}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Chose</dt>
                  <dd className="text-muted-ink">{story.chose}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Now</dt>
                  <dd className="text-muted-ink">{story.now}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/success-stories" className="font-medium text-brand-green hover:underline">
            View All Success Stories →
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 12: Run test to verify it passes**

```bash
npm run test -- src/components/home/SuccessStoriesPreview.test.tsx
```

Expected: PASS.

---

### Task 22: Home sections — `LocationsSection`, `FAQSection`, `FinalCTA`

**Files:**
- Create: `career-counselling/src/components/home/LocationsSection.tsx` + test
- Create: `career-counselling/src/components/home/FAQSection.tsx` + test
- Create: `career-counselling/src/components/home/FinalCTA.tsx` + test

- [ ] **Step 1: Write the failing test for `LocationsSection`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LocationsSection } from './LocationsSection'

describe('LocationsSection', () => {
  it('renders a card for each of the four cities', () => {
    render(<LocationsSection />)
    expect(screen.getByRole('heading', { name: /meet us in person/i })).toBeInTheDocument()
    ;['Surat', 'Navsari', 'Ankleshwar', 'Valsad'].forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument()
    })
  })

  it('shows a map placeholder only for Surat', () => {
    render(<LocationsSection />)
    expect(screen.getByText(/\[MAP — SURAT\]/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/components/home/LocationsSection.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```tsx
import { locations } from '@/data/locations'

export function LocationsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Meet us in person</h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {locations.map((location) => (
          <div key={location.city} className="rounded-xl border border-neutral-border bg-white p-5">
            <p className="text-lg font-semibold text-brand-green">{location.city}</p>
            <p className="mt-2 text-sm text-muted-ink">{location.address}</p>
            <p className="text-sm text-muted-ink">{location.landmark}</p>
            <p className="mt-2 text-sm text-ink">{location.timings}</p>
            <p className="text-sm text-ink">{location.phone}</p>
            {location.hasMap && (
              <div className="mt-3 aspect-video rounded-lg bg-soft-cream" role="img" aria-label={`[MAP — ${location.city.toUpperCase()}]`}>
                <div className="flex h-full items-center justify-center p-2 text-center text-xs text-muted-ink">
                  [MAP — {location.city.toUpperCase()}]
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/components/home/LocationsSection.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Write the failing test for `FAQSection`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FAQSection } from './FAQSection'

describe('FAQSection', () => {
  it('renders all eight questions', () => {
    render(<FAQSection />)
    expect(screen.getAllByRole('button', { expanded: false })).toHaveLength(8)
  })

  it('expands an answer when its question is clicked', async () => {
    render(<FAQSection />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /is the first consultation really free/i }))
    expect(await screen.findByText(/yes\. the first consultation is completely free/i)).toBeInTheDocument()
  })

  it('embeds FAQPage structured data', () => {
    render(<FAQSection />)
    const script = document.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
    expect(script?.textContent).toContain('FAQPage')
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npm run test -- src/components/home/FAQSection.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 7: Write the implementation**

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

const FAQS = [
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

export function FAQSection() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
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
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Frequently asked questions</h2>

      <Accordion type="single" collapsible className="mt-8">
        {FAQS.map((faq, index) => (
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

- [ ] **Step 8: Run test to verify it passes**

```bash
npm run test -- src/components/home/FAQSection.test.tsx
```

Expected: PASS, 3 tests.

- [ ] **Step 9: Write the failing test for `FinalCTA`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FinalCTA } from './FinalCTA'

describe('FinalCTA', () => {
  it('renders the closing heading and a consultation form', () => {
    render(<FinalCTA />)
    expect(screen.getByRole('heading', { name: /let's talk about your child's future/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/student name/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 10: Run test to verify it fails**

```bash
npm run test -- src/components/home/FinalCTA.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 11: Write the implementation**

```tsx
import { ConsultationForm } from '@/components/forms/ConsultationForm'

export function FinalCTA() {
  return (
    <section className="bg-brand-green px-4 py-16 text-warm-white md:px-8 md:py-24">
      <div className="mx-auto max-w-md text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Let's talk about your child's future</h2>
        <p className="mt-3 text-warm-white/80">
          A 15-minute call costs nothing and usually clears up more than months of guessing.
        </p>

        <div className="mt-8 rounded-xl bg-white p-6 text-left">
          <ConsultationForm context="home" />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 12: Run test to verify it passes**

```bash
npm run test -- src/components/home/FinalCTA.test.tsx
```

Expected: PASS.

---

### Task 23: `pages/Home.tsx` — compose all 14 sections

**Files:**
- Create: `career-counselling/src/pages/Home.tsx`
- Test: `career-counselling/src/pages/Home.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

describe('Home page', () => {
  it('renders every section heading in order', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    const headingNames = [
      /stop guessing which stream is right/i,
      /sound familiar/i,
      /where are you right now/i,
      /how it works/i,
      /what you walk away with/i,
      /not ready to book/i,
      /meet kishan & meeta/i,
      /hear it from parents/i,
      /real students\. real decisions\./i,
      /meet us in person/i,
      /frequently asked questions/i,
      /let's talk about your child's future/i,
    ]

    headingNames.forEach((name) => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    })
  })

  it('renders the trust strip and Google reviews', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(screen.getByText('5.0★')).toBeInTheDocument()
    expect(screen.getByText(/\[LIVE GOOGLE REVIEWS WIDGET/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- src/pages/Home.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```tsx
import { Hero } from '@/components/home/Hero'
import { TrustStrip } from '@/components/trust/TrustStrip'
import { ProblemSection } from '@/components/home/ProblemSection'
import { WhoWeHelp } from '@/components/home/WhoWeHelp'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ReportSection } from '@/components/home/ReportSection'
import { FreeAssessmentSection } from '@/components/home/FreeAssessmentSection'
import { MeetFounders } from '@/components/home/MeetFounders'
import { VideoTestimonials } from '@/components/home/VideoTestimonials'
import { SuccessStoriesPreview } from '@/components/home/SuccessStoriesPreview'
import { GoogleReviews } from '@/components/trust/GoogleReviews'
import { LocationsSection } from '@/components/home/LocationsSection'
import { FAQSection } from '@/components/home/FAQSection'
import { FinalCTA } from '@/components/home/FinalCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <WhoWeHelp />
      <HowItWorks />
      <ReportSection />
      <FreeAssessmentSection />
      <MeetFounders />
      <VideoTestimonials />
      <SuccessStoriesPreview />
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
        <GoogleReviews />
      </div>
      <LocationsSection />
      <FAQSection />
      <FinalCTA />
    </>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- src/pages/Home.test.tsx
```

Expected: PASS, 2 tests.

- [ ] **Step 5: Re-run the App routing test from Task 16 now that Home exists**

```bash
npm run test -- src/App.test.tsx
```

Expected: PASS, 2 tests.

---

### Task 24: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full test suite**

```bash
npm run test
```

Expected: all test files pass, 0 failures.

- [ ] **Step 2: Type-check the whole project**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Lint**

```bash
npm run lint
```

Expected: no errors. Fix any issues (e.g. unused imports) before proceeding.

- [ ] **Step 4: Production build**

```bash
npm run build
```

Expected: exits 0, produces `dist/`.

- [ ] **Step 5: Manual smoke test in the browser**

```bash
npm run dev
```

Open `http://localhost:5173` and verify:
- Announcement bar shows the August (Jul–Sep) seasonal message and dismisses on click.
- Header is sticky, shows all 6 nav links + "Book Free Session" on desktop, and a working hamburger menu on a narrow viewport.
- Hero form: submitting empty shows validation errors; submitting a valid Indian phone number attempts to open `wa.me` in a new tab.
- All 14 Home sections render in order down the page.
- Floating WhatsApp button appears bottom-right; mobile bottom bar (Call/WhatsApp/Book) appears only below the `md` breakpoint.
- Navigating to `/who-we-are`, `/what-we-do`, `/success-stories`, `/blogs`, `/blogs/test-slug`, `/contact-us`, `/thank-you` all render their stub headings without errors.

---

## Self-Review Notes

- **Spec coverage:** All of design-spec §7–§14 for Phase 1 scope is covered — header (§8), announcement ribbon (§9), floating WhatsApp (§10), mobile bottom bar (§11), WhatsApp-first form system (§12), contextual messages (§13, all 8 contexts), and all 14 Home sections (§14.1–§14.14). Footer (§32) is covered. SEO/structured-data is scoped to FAQPage on Home per §14.13; full per-page SEO metadata is Phase 4 per the design doc.
- **Placeholder scan:** No TBD/TODO left in code. Bracketed placeholders (`[REAL PHOTO — ...]`, `[CLIENT TO PROVIDE ...]`) are intentional per spec §30, not plan gaps.
- **Type consistency:** `WhatsAppContext` (Task 6) is imported by `services.ts` (Task 7) and `ConsultationForm` (Task 10) — same literal union used throughout. `buildContextualMessage(context, fields)` signature is identical in every call site (Tasks 10, 19).
