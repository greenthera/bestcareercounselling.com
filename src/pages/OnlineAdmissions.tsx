import { Link } from 'react-router-dom'
import {
  Star,
  UserCheck,
  GitCompareArrows,
  LifeBuoy,
  MessageCircle,
  ArrowRight,
  Briefcase,
  Code,
  BarChart3,
  Laptop,
  Landmark,
  HelpCircle,
  Scale,
  Wallet,
  FileText,
  BellRing,
  ListChecks,
  CheckCircle2,
  CalendarClock,
  GraduationCap,
  ClipboardCheck,
  Route as RouteIcon,
  ScrollText,
  BadgeCheck,
  Target,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import { GoogleG } from '@/components/ui/google-g'
import { UniversityMatchForm } from '@/components/online-admissions/UniversityMatchForm'
import { GoogleReviewsCarousel } from '@/components/trust/GoogleReviewsCarousel'
import { ExploreUniversities } from '@/components/trust/ExploreUniversities'
import { FAQSection } from '@/components/home/FAQSection'
import { onlineAdmissionsFaqs } from '@/data/faqs'
import { usePageSeo } from '@/hooks/usePageSeo'
import { pageSeo } from '@/data/seo'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const counsellorWhatsApp = buildWhatsAppUrl(
  'Hi, I want help choosing the right online university. Please guide me through my options.',
)
const parentWhatsApp = buildWhatsAppUrl(
  'Hi, I would like to book a parent and student counselling call about an online degree. Please guide us.',
)

const UNIVERSITIES = ['DPU', 'NMIMS', 'Manipal', 'Amity', 'ATLAS']

const TRUST_ITEMS: { label: string; icon: LucideIcon }[] = [
  { label: '950+ 5-star Google reviews', icon: Star },
  { label: 'A personal counsellor', icon: UserCheck },
  { label: 'Real university comparison', icon: GitCompareArrows },
  { label: 'Application support', icon: LifeBuoy },
]

const PROBLEM_QUESTIONS = [
  'Which online MBA is actually worth it?',
  'NMIMS or Manipal — which is better for me?',
  'Is the university and program recognised?',
  'Which specialization should I choose?',
  'Am I eligible for the programs I want?',
  'What will the total fee be, and are there EMI options?',
  'Which university works better for working professionals?',
  'Will this degree actually help my career goals?',
]

const COURSES: { title: string; blurb: string; icon: LucideIcon }[] = [
  {
    title: 'Online MBA',
    blurb: 'Compare specializations and university options based on your career objective, eligibility and budget.',
    icon: Briefcase,
  },
  {
    title: 'Online MCA',
    blurb: 'For graduates looking to build or advance a career in technology and IT.',
    icon: Code,
  },
  {
    title: 'Online BBA',
    blurb: 'Build a foundation in management, business and entrepreneurship.',
    icon: BarChart3,
  },
  {
    title: 'Online BCA',
    blurb: 'Start or strengthen your career in computer applications and technology.',
    icon: Laptop,
  },
  {
    title: 'Online B.Com',
    blurb: 'Build your foundation in commerce, finance and business.',
    icon: Landmark,
  },
]

const COMPARE_ROWS: { what: string; why: string; icon: LucideIcon }[] = [
  { what: 'Program & specialization', why: 'Does it match your career plan?', icon: Target },
  { what: 'Eligibility', why: 'Can you actually apply?', icon: ClipboardCheck },
  { what: 'Total fees', why: "What's your real investment?", icon: Wallet },
  { what: 'Learning format', why: 'Does it fit your schedule?', icon: Laptop },
  { what: 'Examination pattern', why: 'How will assessment work?', icon: ScrollText },
  { what: 'University credentials', why: 'Is the program right for your objective?', icon: BadgeCheck },
  { what: 'Career relevance', why: 'Does it fit your next step?', icon: RouteIcon },
  { what: 'Admission process', why: 'What do you need to submit?', icon: FileText },
]

const WHY_US: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Profile evaluation',
    description: 'We understand your qualification, experience, budget and career objective.',
    icon: UserCheck,
  },
  {
    title: 'University shortlisting',
    description: 'We help narrow down the options that are relevant to your profile.',
    icon: ListChecks,
  },
  {
    title: 'Side-by-side comparison',
    description: 'Understand the real differences before you make your decision.',
    icon: Scale,
  },
  {
    title: 'Fee guidance',
    description: 'Understand the applicable fee structure and payment options.',
    icon: Wallet,
  },
  {
    title: 'Application assistance',
    description: 'Support through the admission documentation and application process.',
    icon: FileText,
  },
  {
    title: 'Admission follow-up',
    description: 'Stay informed about the next steps instead of figuring it all out alone.',
    icon: BellRing,
  },
]

const PROFILE_FLOW: { label: string; icon: LucideIcon }[] = [
  { label: 'Your profile', icon: UserCheck },
  { label: 'Your goal', icon: Target },
  { label: 'Your budget', icon: Wallet },
  { label: 'Suitable universities', icon: GraduationCap },
  { label: 'Pros and cons', icon: Scale },
  { label: 'Your next step', icon: RouteIcon },
]

const HOW_STEPS: { title: string; description: string; icon: LucideIcon }[] = [
  { title: 'Tell us about yourself', description: 'Course, qualification, experience, budget and career goal.', icon: UserCheck },
  { title: 'Get your shortlist', description: 'Your counsellor discusses relevant university and program options.', icon: ListChecks },
  { title: 'Compare before deciding', description: 'Fees, eligibility, curriculum, format and other relevant factors.', icon: Scale },
  { title: 'Choose your university', description: 'You make the final decision, with the full picture in front of you.', icon: CheckCircle2 },
  { title: 'Complete your application', description: 'Our team guides you through the admission process.', icon: FileText },
  { title: 'Start your program', description: 'Welcome to your next step.', icon: GraduationCap },
]

const PARENT_CHECKLIST = [
  'University and program suitability',
  'Total cost and payment options',
  'Eligibility',
  'Course structure',
  'Examination format',
  'Career objective',
  'Time commitment',
  'Application requirements',
]

function YellowMark({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-brand-yellow/70" aria-hidden="true" />
    </span>
  )
}

function SectionCta({
  href,
  children,
  tone = 'green',
}: {
  href: string
  children: React.ReactNode
  tone?: 'green' | 'yellow'
}) {
  const isHash = href.startsWith('#')
  const className =
    tone === 'yellow'
      ? 'group inline-flex items-center gap-2 rounded-full bg-brand-yellow py-2.5 pl-6 pr-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-yellow/90'
      : 'group inline-flex items-center gap-2 rounded-full bg-brand-green py-2.5 pl-6 pr-2 text-sm font-semibold text-warm-white transition-colors hover:bg-brand-green/90'
  const endcap = (
    <PillCtaEndcap
      tone={tone === 'yellow' ? 'dark' : 'yellow'}
      icon={ArrowRight}
      className="transition-transform duration-300 group-hover:translate-x-0.5"
    />
  )
  const props = isHash ? {} : { target: '_blank', rel: 'noopener noreferrer' }
  return (
    <a href={href} className={className} {...props}>
      {children}
      {endcap}
    </a>
  )
}

export default function OnlineAdmissions() {
  usePageSeo(pageSeo.onlineAdmissions)

  return (
    <>
      {/* Hero */}
      <section className="px-4 pt-8 md:px-8 md:pt-10">
        <div className="mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-2">
          <Reveal className="flex flex-col justify-center lg:py-6">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-green-tint px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-green">
              MBA · MCA · BBA · BCA · B.Com
            </span>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-ink md:text-5xl">
              Get into the right online university without the <YellowMark>confusion</YellowMark>
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-ink md:text-lg">
              Compare universities, fees, eligibility, specializations and career options with a dedicated admission
              counsellor before you apply. Whether you're considering NMIMS, Manipal, DPU, Amity, ATLAS or other options,
              we help you find the right fit for your profile and budget.
            </p>

            <div className="mt-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-neutral-border bg-white px-4 py-2 shadow-sm">
              <span className="flex gap-0.5 text-brand-yellow">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" stroke="none" />
                ))}
              </span>
              <span className="text-sm font-semibold text-ink">950+ 5-star Google reviews</span>
              <GoogleG className="h-4 w-4" />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#match"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-yellow py-2.5 pl-6 pr-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-yellow/90"
              >
                Check my eligibility
                <PillCtaEndcap tone="dark" icon={ArrowRight} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href={counsellorWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-green py-2.5 pl-2 pr-5 text-sm font-semibold text-warm-white transition-colors hover:bg-brand-green/90"
              >
                <PillCtaEndcap
                  tone="yellow"
                  icon={MessageCircle}
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                />
                Chat on WhatsApp
              </a>
            </div>
            <p className="mt-3 text-xs text-muted-ink">
              Free counselling • No obligation • Application assistance available
            </p>
          </Reveal>

          <div id="match" className="scroll-mt-28">
            <Reveal delay={120} className="rounded-[2rem] border border-neutral-border bg-white p-6 shadow-lg md:p-8">
              <UniversityMatchForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Highlighted trust strip */}
      <section className="px-4 pt-10 md:px-8">
        <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand-green shadow-lg">
          <div className="grid grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0">
            {TRUST_ITEMS.map(({ label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-2.5 px-4 py-6 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow text-ink">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-warm-white">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* The problem — bold green, moved above the university marquee */}
      <section className="mt-10 bg-brand-green px-4 py-16 text-warm-white md:px-8 md:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-yellow">
            The real problem
          </span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Choosing an online degree shouldn't feel like{' '}
            <span className="text-brand-yellow">gambling with your career</span>
          </h2>
          <p className="mt-3 text-warm-white/70">You're probably asking yourself questions like these:</p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
          {PROBLEM_QUESTIONS.map((q, index) => (
            <Reveal key={q} delay={index * 40}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-warm-white">
                <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" aria-hidden="true" />
                {q}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-xl font-bold md:text-2xl">
            You don't need another list of universities. You need someone to help you{' '}
            <span className="text-brand-yellow">choose between them</span>.
          </p>
          <div className="mt-7 flex justify-center">
            <SectionCta href="#match" tone="yellow">
              Get my personalized shortlist
            </SectionCta>
          </div>
        </Reveal>
      </section>

      <ExploreUniversities />

      {/* Courses — soft cream, last row centred */}
      <section className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-soft-cream px-6 py-14 md:px-10 md:py-16">
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold text-ink md:text-4xl">
              Which online <span className="text-brand-green">program</span> are you looking for?
            </h2>
            <p className="mt-2 text-muted-ink">Explore your options and get personalised guidance.</p>
          </Reveal>

          <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-4">
            {COURSES.map((course, index) => {
              const Icon = course.icon
              return (
                <Reveal
                  key={course.title}
                  delay={index * 60}
                  className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]"
                >
                  <div className="group flex h-full flex-col rounded-[1.6rem] border border-neutral-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-tint text-brand-green transition-colors duration-300 group-hover:bg-brand-yellow group-hover:text-ink">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="mt-4 text-lg font-bold text-ink">{course.title}</p>
                    <p className="mt-1 flex-1 text-sm text-muted-ink">{course.blurb}</p>
                    <a
                      href="#match"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green hover:underline"
                    >
                      Explore {course.title}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* University comparison — highlighted */}
      <section className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-green-tint px-6 py-14 md:px-10 md:py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-green px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-yellow">
              Choose on your profile, not on hearsay
            </span>
            <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
              Don't pick a university because someone told you it's <span className="text-brand-green">"best"</span>
            </h2>
            <p className="mt-3 text-muted-ink">
              Depending on your course, academic background, budget and career objective, we help you evaluate options
              including these and other suitable universities.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-7 flex flex-wrap justify-center gap-2.5">
            {UNIVERSITIES.map((u) => (
              <span
                key={u}
                className="rounded-full border border-brand-green/15 bg-white px-4 py-2 text-sm font-bold text-brand-green shadow-sm"
              >
                {u}
              </span>
            ))}
          </Reveal>

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
            {COMPARE_ROWS.map((row, index) => {
              const Icon = row.icon
              return (
                <Reveal key={row.what} delay={index * 40}>
                  <div className="flex h-full items-start gap-3.5 rounded-[1.375rem] border border-neutral-border bg-white p-5 shadow-sm">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-tint text-brand-green">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{row.what}</p>
                      <p className="mt-0.5 text-sm text-muted-ink">{row.why}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={120} className="mt-10 flex justify-center">
            <SectionCta href="#match">Help me compare universities</SectionCta>
          </Reveal>

          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-ink">
            Recognition and accreditation depend on the specific current program and university. We check these against
            the exact program you're considering rather than making blanket claims.
          </p>
        </div>
      </section>

      <GoogleReviewsCarousel />

      {/* Why us — no numbers */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">
            We don't just help you apply. We help you <span className="text-brand-green">decide</span>.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={index * 60}>
                <div className="group h-full rounded-[1.6rem] border border-neutral-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-tint text-brand-green transition-colors duration-300 group-hover:bg-brand-yellow group-hover:text-ink">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-ink">{item.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Differentiator — as a timeline */}
      <section className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-soft-cream px-6 py-14 md:px-10 md:py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-ink md:text-4xl">
              Tell us your profile. We'll tell you what we would <span className="text-brand-green">consider</span>.
            </h2>
            <p className="mt-3 text-muted-ink">
              Say you're a graduate with two years of experience, a budget of ₹1–2 lakh and a management career in mind.
              Instead of showing you 25 universities, we narrow the decision down to the options that deserve your
              attention.
            </p>
          </Reveal>

          <ol className="relative mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            <div
              className="pointer-events-none absolute left-[8%] right-[8%] top-6 hidden h-0.5 bg-gradient-to-r from-brand-green to-brand-yellow lg:block"
              aria-hidden="true"
            />
            {PROFILE_FLOW.map((step, index) => {
              const Icon = step.icon
              return (
                <Reveal key={step.label} delay={index * 70} as="li">
                  <div className="flex flex-col items-center text-center">
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-warm-white shadow-md">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-ink">{step.label}</p>
                  </div>
                </Reveal>
              )
            })}
          </ol>

          <Reveal delay={120} className="mt-12 flex justify-center">
            <SectionCta href={counsellorWhatsApp}>Talk to a counsellor</SectionCta>
          </Reveal>
        </div>
      </section>

      {/* How it works — vertical timeline */}
      <section className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-green-tint px-6 py-14 md:px-10 md:py-16">
          <Reveal className="mx-auto max-w-xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-green px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-yellow">
              Your journey with us
            </span>
            <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
              From "I'm confused" to <span className="text-brand-green">"I'm admitted"</span>
            </h2>
          </Reveal>

          <ol className="relative mx-auto mt-12 max-w-2xl space-y-5">
            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-brand-green/20" aria-hidden="true" />
            {HOW_STEPS.map((step, index) => {
              const Icon = step.icon
              return (
                <Reveal key={step.title} delay={index * 70} as="li">
                  <div className="relative flex items-start gap-5">
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-warm-white shadow-lg">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div className="flex-1 rounded-[1.375rem] border border-neutral-border bg-white p-5 shadow-sm">
                      <span className="text-xs font-bold uppercase tracking-wide text-brand-green/60">
                        Step {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="mt-1 font-semibold text-ink">{step.title}</p>
                      <p className="mt-1 text-sm text-muted-ink">{step.description}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      {/* Parents */}
      <section className="bg-brand-green px-4 py-16 text-warm-white md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-yellow">
              For parents
            </span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Have questions before your child applies?</h2>
            <p className="mt-3 text-warm-white/70">
              You should. Before committing to an online degree, it's worth discussing all of this together.
            </p>
            <div className="mt-7">
              <a
                href={parentWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-yellow py-2.5 pl-6 pr-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-yellow/90"
              >
                Book a parent + student counselling call
                <PillCtaEndcap tone="dark" icon={ArrowRight} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PARENT_CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-2.5 rounded-2xl bg-white/5 p-3 text-sm text-warm-white">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Legitimate urgency */}
      <section className="mx-auto max-w-3xl px-4 py-14 text-center md:px-8 md:py-20">
        <Reveal>
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-tint text-brand-green">
            <CalendarClock className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-3xl font-bold text-ink md:text-4xl">Admissions and intakes can change</h2>
          <p className="mt-3 text-muted-ink">
            University application windows, eligibility requirements, fees and intake timelines can change. Check the
            current availability and requirements for your preferred program before applying.
          </p>
          <div className="mt-7 flex justify-center">
            <SectionCta href="#match">Check current admission options</SectionCta>
          </div>
        </Reveal>
      </section>

      <div className="bg-soft-cream">
        <FAQSection faqs={onlineAdmissionsFaqs} />
      </div>

      {/* Final CTA */}
      <section className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-brand-green px-6 py-14 text-center text-warm-white md:px-10 md:py-16">
          <Reveal className="mx-auto max-w-xl">
            <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              <span className="flex gap-0.5 text-brand-yellow">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" stroke="none" />
                ))}
              </span>
              <span className="text-sm font-semibold text-warm-white">950+ 5-star Google reviews</span>
              <GoogleG className="h-4 w-4" />
            </div>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              Still <span className="text-brand-yellow">comparing universities?</span>
            </h2>
            <p className="mt-3 text-warm-white/70">
              Don't spend weeks jumping between websites. Tell us your course, qualification, budget and career goal, and
              get guidance on the options you should actually consider.
            </p>
            <div className="mt-7 flex justify-center">
              <a
                href="#match"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-yellow py-2.5 pl-6 pr-2 text-sm font-semibold text-ink transition-all duration-300 hover:bg-brand-yellow/90 hover:shadow-[0_10px_30px_-8px_rgba(255,204,1,0.5)]"
              >
                Get free counselling
                <PillCtaEndcap tone="dark" icon={ArrowRight} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>
            <p className="mt-4 text-xs uppercase tracking-wide text-warm-white/50">
              MBA · MCA · BBA · BCA · B.Com — no obligation to apply
            </p>
            <p className="mt-6 text-sm text-warm-white/70">
              Prefer a different service?{' '}
              <Link to="/admission-consulting" className="font-semibold text-brand-yellow underline-offset-4 hover:underline">
                See all admission consulting
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
