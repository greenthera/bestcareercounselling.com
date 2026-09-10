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
  Search,
  ListChecks,
  Scale,
  Wallet,
  FileText,
  BellRing,
  CheckCircle2,
  CalendarClock,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
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

const COMPARE_ROWS = [
  ['Program & specialization', 'Does it match your career plan?'],
  ['Eligibility', 'Can you actually apply?'],
  ['Total fees', "What's your real investment?"],
  ['Learning format', 'Does it fit your schedule?'],
  ['Examination pattern', 'How will assessment work?'],
  ['University credentials', 'Is the program appropriate for your objective?'],
  ['Career relevance', 'Does the program fit your next step?'],
  ['Admission process', 'What do you need to submit?'],
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

const HOW_STEPS = [
  { title: 'Tell us about yourself', description: 'Course, qualification, experience, budget and career goal.' },
  { title: 'Get your shortlist', description: 'Your counsellor discusses relevant university and program options.' },
  { title: 'Compare before deciding', description: 'Fees, eligibility, curriculum, format and other relevant factors.' },
  { title: 'Choose your university', description: 'You make the final decision, with the full picture in front of you.' },
  { title: 'Complete your application', description: 'Our team guides you through the admission process.' },
  { title: 'Start your program', description: 'Welcome to your next step.' },
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

function SectionCta({ href, children, tone = 'green' }: { href: string; children: React.ReactNode; tone?: 'green' | 'yellow' }) {
  const isHash = href.startsWith('#')
  const className =
    tone === 'yellow'
      ? 'group inline-flex items-center gap-2 rounded-full bg-brand-yellow py-2.5 pl-6 pr-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-yellow/90'
      : 'group inline-flex items-center gap-2 rounded-full bg-brand-green py-2.5 pl-6 pr-2 text-sm font-semibold text-warm-white transition-colors hover:bg-brand-green/90'
  const endcap = <PillCtaEndcap tone={tone === 'yellow' ? 'dark' : 'yellow'} icon={ArrowRight} className="transition-transform duration-300 group-hover:translate-x-0.5" />

  if (isHash) {
    return (
      <a href={href} className={className}>
        {children}
        {endcap}
      </a>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
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
              Get into the right online university{' '}
              <span className="text-brand-green">without the confusion</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-ink md:text-lg">
              Compare universities, fees, eligibility, specializations and career options with a dedicated admission
              counsellor before you apply. Whether you're considering NMIMS, Manipal, DPU, Amity, ATLAS or other options,
              we help you find the right fit for your profile and budget.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="flex gap-0.5 text-brand-yellow">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
              </span>
              950+ 5-star Google reviews
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#match"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-yellow py-2.5 pl-6 pr-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-yellow/90"
              >
                Check my eligibility — free
                <PillCtaEndcap tone="dark" icon={ArrowRight} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href={counsellorWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-border px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand-green hover:text-brand-green"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Talk on WhatsApp
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

      {/* Trust bar */}
      <section className="px-4 pt-8 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-neutral-border overflow-hidden rounded-[2rem] border border-neutral-border bg-white shadow-sm sm:grid-cols-4 sm:divide-y-0">
          {[
            { label: '950+ 5★ Google reviews', icon: Star },
            { label: 'Personal counsellor', icon: UserCheck },
            { label: 'University comparison', icon: GitCompareArrows },
            { label: 'Application support', icon: LifeBuoy },
          ].map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-4 text-sm font-medium text-ink">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-tint text-brand-green">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              {label}
            </div>
          ))}
        </div>
      </section>

      <ExploreUniversities />

      {/* The problem */}
      <section className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-soft-cream px-6 py-14 md:px-10 md:py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-ink md:text-4xl">
              Choosing an online degree shouldn't feel like{' '}
              <span className="text-brand-green">gambling with your career</span>
            </h2>
            <p className="mt-3 text-muted-ink">You're probably asking yourself questions like these:</p>
          </Reveal>

          <div className="mx-auto mt-9 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
            {PROBLEM_QUESTIONS.map((q, index) => (
              <Reveal key={q} delay={index * 50}>
                <div className="flex items-start gap-3 rounded-[1.375rem] border border-neutral-border bg-white p-4 text-sm text-ink shadow-sm">
                  <Search className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
                  {q}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mx-auto mt-10 max-w-2xl text-center">
            <p className="text-lg font-semibold text-ink">
              You don't need another list of universities. You need someone to help you choose between them.
            </p>
            <div className="mt-6 flex justify-center">
              <SectionCta href="#match">Get my personalized shortlist</SectionCta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Courses */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">Which online program are you looking for?</h2>
          <p className="mt-2 text-muted-ink">Explore your options and get personalised guidance.</p>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course, index) => {
            const Icon = course.icon
            return (
              <Reveal key={course.title} delay={index * 70}>
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
      </section>

      {/* University section */}
      <section className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-green-tint px-6 py-14 md:px-10 md:py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-ink md:text-4xl">
              Don't pick a university because someone told you it's "best"
            </h2>
            <p className="mt-3 text-muted-ink">
              Choose based on your profile. Depending on your course, academic background, budget and career objective,
              we can help you evaluate options including{' '}
              <span className="font-semibold text-ink">DPU, NMIMS, Manipal, Amity, ATLAS</span> and other suitable
              universities.
            </p>
          </Reveal>

          <Reveal delay={100} className="mx-auto mt-9 max-w-3xl overflow-hidden rounded-[1.6rem] border border-neutral-border bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-brand-green text-warm-white">
                  <th className="px-5 py-3 font-semibold">What you compare</th>
                  <th className="px-5 py-3 font-semibold">Why it matters</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(([what, why], index) => (
                  <tr key={what} className={index % 2 === 1 ? 'bg-soft-cream' : ''}>
                    <td className="px-5 py-3 font-medium text-ink">{what}</td>
                    <td className="px-5 py-3 text-muted-ink">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal delay={160} className="mt-8 flex justify-center">
            <SectionCta href="#match">Help me compare universities</SectionCta>
          </Reveal>

          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-ink">
            Recognition and accreditation depend on the specific current program and university. We check these against
            the exact program you're considering rather than making blanket claims.
          </p>
        </div>
      </section>

      <GoogleReviewsCarousel />

      {/* Why us */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">
            We don't just help you apply. We help you <span className="text-brand-green">decide</span>.
          </h2>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={index * 70}>
                <div className="h-full rounded-[1.6rem] border border-neutral-border bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-tint text-brand-green">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wide text-brand-green/60">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-3 font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-ink">{item.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Differentiator */}
      <section className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-soft-cream px-6 py-14 md:px-10 md:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h2 className="text-3xl font-bold text-ink md:text-4xl">
                Tell us your profile. We'll tell you what we would consider.
              </h2>
              <p className="mt-4 text-muted-ink">
                Say you're a graduate with two years of experience, a budget of ₹1–2 lakh and a management career in
                mind. Instead of showing you 25 universities, we narrow the decision down to the options that deserve
                your attention.
              </p>
              <div className="mt-6">
                <SectionCta href={counsellorWhatsApp}>Talk to a counsellor</SectionCta>
              </div>
            </Reveal>

            <Reveal delay={100} className="rounded-[1.6rem] border border-neutral-border bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-green/60">Your counselling conversation</p>
              <ol className="mt-4 space-y-3">
                {['Your profile', 'Your goal', 'Your budget', 'Suitable universities', 'Pros and cons', 'Your next step'].map(
                  (step, index) => (
                    <li key={step} className="flex items-center gap-3 text-sm font-medium text-ink">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-tint text-xs font-bold text-brand-green">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ),
                )}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">
            From "I'm confused" to <span className="text-brand-green">"I'm admitted"</span>
          </h2>
        </Reveal>

        <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HOW_STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 80} as="li" className="h-full">
              <div className="flex h-full flex-col rounded-[1.6rem] border border-neutral-border bg-white p-5 shadow-sm">
                <span className="text-sm font-bold text-brand-green/60">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-1 font-semibold text-ink">{step.title}</p>
                <p className="mt-1 text-sm text-muted-ink">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Parents */}
      <section className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-brand-green px-6 py-14 text-warm-white md:px-10 md:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h2 className="text-3xl font-bold md:text-4xl">
                Parents: have questions before your child applies?
              </h2>
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
        </div>
      </section>

      {/* Legitimate urgency */}
      <section className="mx-auto max-w-3xl px-4 py-10 text-center md:px-8 md:py-14">
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

      <FAQSection faqs={onlineAdmissionsFaqs} />

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
