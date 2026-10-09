import {
  Briefcase,
  ClipboardList,
  BookOpen,
  FileText,
  Scale,
  MessageSquare,
  CalendarClock,
  UserCheck,
  ListChecks,
  PenLine,
  CheckCircle2,
  GraduationCap,
  MapPin,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/reveal'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import { ExploreUniversities } from '@/components/trust/ExploreUniversities'
import { FinalCTA } from '@/components/home/FinalCTA'
import { usePageSeo } from '@/hooks/usePageSeo'
import { pageSeo } from '@/data/seo'
import { ServiceSchema } from '@/components/seo/ServiceSchema'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

const INCLUDES: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'MBA College Shortlisting',
    description:
      'Explore MBA colleges that match your academic profile, entrance exam scores, budget, preferred location, and career goals. Compare available options to build a suitable college shortlist.',
    icon: ClipboardList,
  },
  {
    title: 'MBA Entrance Exam Guidance',
    description:
      'Understand admission routes through CAT, CMAT, XAT, MAT, and other accepted entrance exams. Review college-specific eligibility criteria and score requirements to plan your applications.',
    icon: BookOpen,
  },
  {
    title: 'MBA Application Assistance',
    description:
      'Get guidance on completing application forms, arranging required documents, and meeting submission deadlines. Understand the application process and admission requirements of your shortlisted colleges.',
    icon: FileText,
  },
  {
    title: 'MBA Fees and College Comparison',
    description:
      'Compare tuition fees, MBA specializations, placement records, and course offerings across colleges. Evaluate the overall cost and available career opportunities before making your choice.',
    icon: Scale,
  },
  {
    title: 'MBA Interview Preparation',
    description:
      'Prepare for personal interviews, group discussions, and other selection rounds required by your target business schools. Understand the process and approach each stage with better preparation.',
    icon: MessageSquare,
  },
  {
    title: 'MBA Admission Process Support',
    description:
      'Stay informed about application updates, admission deadlines, selection results, and offer conditions. Get guidance on the next steps and enrollment formalities for your selected college.',
    icon: CalendarClock,
  },
]

const STEPS = [
  {
    icon: UserCheck,
    title: 'MBA Profile Assessment',
    description:
      'We review your academic qualifications, entrance exam scores, budget, and preferred specialization to understand your requirements and admission options.',
  },
  {
    icon: ListChecks,
    title: 'MBA College Shortlisting',
    description:
      'Based on your profile and preferences, we help identify suitable MBA colleges by considering eligibility criteria, fees, location, and program options.',
  },
  {
    icon: PenLine,
    title: 'MBA Application Guidance',
    description:
      'Understand application procedures, document requirements, submission deadlines, and selection rounds to keep your admission process organized.',
  },
  {
    icon: CheckCircle2,
    title: 'Final MBA Admission Support',
    description:
      'Review available admission offers, compare college options, and understand the required formalities to make your final enrollment decision.',
  },
]

const WHO_ITS_FOR: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Final-Year Graduates',
    description:
      'Plan your transition from graduation to management studies. Explore MBA eligibility, entrance exams, college options, and application timelines before completing your degree.',
    icon: GraduationCap,
  },
  {
    title: 'MBA Entrance Exam Candidates',
    description:
      'Find suitable MBA colleges based on your CAT, CMAT, XAT, MAT, or other accepted entrance exam scores, along with your academic profile and admission preferences.',
    icon: BookOpen,
  },
  {
    title: 'Working Professionals',
    description:
      'Explore MBA programs and specializations that align with your professional experience, industry interests, and long-term career goals.',
    icon: Briefcase,
  },
  {
    title: 'MBA Aspirants in Surat',
    description:
      'Access MBA admission counselling in Surat to evaluate suitable business schools in the city, across Gujarat, and throughout India based on your individual requirements.',
    icon: MapPin,
  },
]

export default function MbaAdmissionCounselling() {
  usePageSeo(pageSeo.mbaAdmissionCounselling)

  return (
    <>
      <ServiceSchema
        name="MBA Admission Counselling"
        description={pageSeo.mbaAdmissionCounselling.description}
        path={pageSeo.mbaAdmissionCounselling.path}
      />
      <Breadcrumbs items={[{ label: 'MBA Admission Counselling', path: '/mba-admission-counselling' }]} />
      <section className="px-4 pb-4 pt-10 text-center md:px-8 md:pb-6 md:pt-14">
        <Reveal className="mx-auto max-w-3xl">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green text-warm-white">
            <Briefcase className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-ink md:text-6xl">
            MBA Admission <span className="text-brand-green">Counselling</span>
          </h1>
          <p className="mt-4 text-lg text-muted-ink">
            Get expert guidance to shortlist the right MBA colleges, understand entrance exam requirements, evaluate
            admission options, and navigate the admission process. Best Career Counselling helps MBA aspirants in
            Surat make informed decisions based on their academic profile, budget, and career goals.
          </p>
          <Link
            to="/contact-us"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-brand-yellow py-2.5 pl-6 pr-2 text-sm font-semibold text-ink transition-all duration-300 hover:bg-brand-yellow/90 hover:shadow-[0_10px_30px_-8px_rgba(255,204,1,0.5)]"
          >
            Book a Free Session
            <PillCtaEndcap tone="dark" className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">What's included</h2>
          <p className="mt-3 font-semibold text-ink">What's Included in Our MBA Counselling Services</p>
          <p className="mt-2 text-muted-ink">
            Get personalized guidance at every key stage of your MBA admission journey, from selecting suitable
            colleges to completing the admission process.
          </p>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {INCLUDES.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={index * 80}>
                <div className="flex h-full gap-4 rounded-[1.6rem] border border-neutral-border bg-white p-5 shadow-sm sm:p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-tint text-brand-green">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{item.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-ink">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-soft-cream px-6 py-14 md:px-10 md:py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-ink md:text-4xl">
              How it <span className="text-brand-green">works</span>
            </h2>
            <p className="mt-3 font-semibold text-ink">How Our MBA Admission Counselling Works</p>
            <p className="mt-2 text-muted-ink">
              A structured four-step process to help you evaluate your options, plan applications, and move forward
              with your MBA admission.
            </p>
          </Reveal>

          <ol className="relative mx-auto mt-14 max-w-2xl space-y-4">
            <div
              className="absolute bottom-6 left-7 top-6 w-0.5 bg-gradient-to-b from-brand-green via-brand-green to-brand-yellow"
              aria-hidden="true"
            />
            {STEPS.map((step, index) => {
              const Icon = step.icon
              return (
                <Reveal key={step.title} delay={index * 100} as="li">
                  <div className="group relative flex gap-6">
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-warm-white shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-brand-yellow group-hover:text-ink group-hover:shadow-xl">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1 rounded-[1.375rem] border border-neutral-border bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                      <p className="text-xs font-bold uppercase tracking-wide text-brand-green/60">
                        Step {String(index + 1).padStart(2, '0')}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-ink">{step.title}</p>
                      <p className="mt-1 text-sm text-muted-ink">{step.description}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-brand-green px-6 py-14 text-center text-warm-white md:px-10 md:py-16">
          <Reveal className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold md:text-4xl">
              Who it's <span className="text-brand-yellow">for</span>
            </h2>
            <p className="mt-3 font-semibold text-warm-white">Who Can Benefit from MBA Admission Counselling?</p>
            <p className="mt-2 text-warm-white/60">
              Our MBA admission guidance supports graduates, entrance exam candidates, and working professionals at
              different stages of their management education journey.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {WHO_ITS_FOR.map((item, index) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} delay={index * 80}>
                  <div className="group h-full rounded-[1.6rem] bg-white/5 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-yellow text-ink transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <p className="mt-4 font-semibold text-warm-white">{item.title}</p>
                    <p className="mt-1 text-sm text-warm-white/60">{item.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <ExploreUniversities description="Explore leading universities and business schools to find the right options for your MBA journey." />

      <FinalCTA
        variant="button"
        context="mba"
        heading="Ready to Start Your MBA Admission Process?"
        description="A 15-minute counselling session can help you understand your options, shortlist suitable colleges, and plan your next steps."
      />
    </>
  )
}
