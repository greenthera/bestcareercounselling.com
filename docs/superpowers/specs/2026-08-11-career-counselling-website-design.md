# Career Counselling Website — Design Spec

Date: 2026-08-11
Client: Kishan & Meeta Patel (career counselling practice — Surat, Navsari, Ankleshwar, Valsad)

## 1. Source of Truth

The client-provided generation prompt (full text preserved below in Appendix A) is the authoritative content/UX/copy spec: business context, page structure, section-by-section content, brand colors, WhatsApp message templates, SEO/accessibility/performance rules, and content rules (no fabricated testimonials, prices, stats, etc.).

This document adds the technical architecture and delivery plan on top of that spec, decided collaboratively before implementation.

## 2. Stack

- Vite + React + TypeScript + Tailwind CSS + shadcn/ui + React Router
- Package manager: npm (matches sibling projects `creative-agency/`, `education/` in this monorepo)
- No animation library (framer-motion, etc.) — a small hand-rolled `useInView` hook (IntersectionObserver) drives fade-up-on-scroll and counter animations; shadcn/Radix primitives (Accordion, Dialog, Sheet) supply their own transitions. Chosen to keep JS payload minimal per spec §29 (performance).
- Fonts: Inter, self-hosted/bundled (no runtime CDN dependency).
- Tailwind theme extended with brand tokens as named colors: `brand-yellow #FFCC01`, `brand-green #014924`, `ink #111513`, plus the supplied neutral palette (warm white, soft cream, light green tint, neutral border, muted text).

## 3. Project Location

New sibling project: `career-counselling/` at the repo root (`/Users/work/Desktop/Projects/career-counselling/`), alongside `creative-agency/`, `education/`, etc. Not nested inside an existing project.

## 4. Content/Data Architecture

Plain typed TypeScript data files under `src/data/`: `services.ts`, `stories.ts`, `blogs.ts`, `testimonials.ts`, `locations.ts`. No MDX or CMS — matches the spec's own suggested file structure (§23) and avoids introducing tooling the client didn't ask for. All content in these files is either real client-supplied fact (30+ years, 5,000+ students, 900+ reviews, 5.0★, Edumilestones, +91 87581 75187) or a clearly-marked placeholder (e.g. `[REAL OFFICE PHOTO — SURAT]`, `[CLIENT TO PROVIDE ADDRESS]`) per spec §30/§31 — nothing fabricated.

## 5. WhatsApp Form System

- `src/lib/whatsapp.ts` exports `buildWhatsAppUrl(context, fields)`, which looks up the matching template in `src/components/whatsapp/whatsappMessages.ts` (one entry per context: home, after-10th, after-12th, ug-pg-admission, mba, study-abroad, career-change), interpolates the visitor's name/class/phone, URL-encodes, and returns a `https://wa.me/918758175187?text=...` link. Invoked only after validation passes, never rendered as visible link text (spec §12).
- Two reusable form components, each parameterized by a `context` prop rather than duplicated per page/section: `ConsultationForm` (name, phone, class) and `AssessmentForm` (adds optional email). Shared validation: name required, phone required + Indian 10-digit regex, class required.
- Layout chrome (`AnnouncementBar`, `Header`, floating `WhatsAppButton`, `MobileBottomBar`, `Footer`) mounts once in a root `Layout` component wrapping `<Outlet />` — not duplicated per page.

## 6. Routing & Code Splitting

React Router with routes: `/`, `/who-we-are`, `/what-we-do`, `/success-stories`, `/blogs`, `/blogs/:slug`, `/contact-us`, `/thank-you`. Each page component is `React.lazy`-loaded from the router config per spec §29.

## 7. Delivery Phases

Each phase produces its own implementation plan (via writing-plans) and gets a review checkpoint before the next phase starts.

**Phase 1 — Foundation + Home page**
Vite scaffold; Tailwind brand theme; shadcn init; React Router skeleton with all 8 routes stubbed; `Layout` (Header, Footer, AnnouncementBar, WhatsAppButton, MobileBottomBar); `lib/whatsapp.ts` + `whatsappMessages.ts`; `ConsultationForm`/`AssessmentForm`; all `src/data/*.ts` seed content; complete Home page (all 14 sections, spec §14).

**Phase 2 — Who We Are, What We Do, Contact Us**
Who We Are (§15); What We Do with all 6 service sections (after-10th, after-12th, ug-pg-admission, mba, study-abroad, career-change), sticky service sub-nav, and the no-pricing comparison table (§16); Contact Us with booking placeholder, two-path CTA, contact methods, locations, FAQ (§21). These reuse Phase 1's shared sections (trust strip, how-it-works, reviews, final CTA).

**Phase 3 — Success Stories + Blogs**
Success Stories page: featured case study, filters, case-study grid, video stories, comparison section (§17). Blogs listing: search, categories, featured post, grid, pagination (§18). Blog detail route `/blogs/:slug`: breadcrumb, sticky TOC, inline CTA, sticky sidebar form, author bio, related posts (§19). All 12 blog post placeholders seeded (§20). Thank You page (§22).

**Phase 4 — QA pass**
Responsive verification at 360/390/768/1024/1280/1440px; accessibility pass (focus states, alt text, keyboard nav, contrast on yellow buttons/text, accessible accordion/dialog); SEO metadata + structured data (LocalBusiness, Person, FAQPage, Article, BreadcrumbList) on every page; lightbox/accordion/carousel interaction polish.

## 8. Explicitly Out of Scope / Guardrails

Everything in the client prompt's §31 ("What Not To Do") applies: no pricing UI, no fabricated testimonials/stats/university logos/addresses, no login/register in primary nav, no glassmorphism/neon/excessive gradients/cartoon illustrations.

---

## Appendix A — Original Client Prompt (verbatim, authoritative for content/copy/UX)

Full text stored separately to keep this file navigable — see `docs/superpowers/specs/2026-08-11-career-counselling-website-source-prompt.md` for the complete verbatim original supplied by the client.
