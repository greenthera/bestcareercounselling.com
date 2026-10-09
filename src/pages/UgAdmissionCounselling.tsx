import {
  GraduationCap,
  Compass,
  ListChecks,
  ClipboardList,
  BookOpen,
  FileText,
  CalendarClock,
  UserCheck,
  PenLine,
  CheckCircle2,
  School,
  UsersRound,
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
    title: 'Course Discovery and Career Direction',
    description:
      "Not sure whether to pursue BBA, BCA, B.Com, B.Sc, BA, or another degree? Explore different courses, understand what they involve, and consider how each option connects with your interests and future career plans.",
    icon: Compass,
  },
  {
    title: 'College Eligibility and Admission Routes',
    description:
      'Every college has its own admission criteria. Understand the required subjects, minimum marks, entrance exams, and selection methods for the undergraduate programs you want to pursue.',
    icon: ListChecks,
  },
  {
    title: 'College Shortlisting and Comparison',
    description:
      'Create a practical list of colleges worth considering. Compare course offerings, location, tuition fees, facilities, and available placement information to understand which options suit your priorities.',
    icon: ClipboardList,
  },
  {
    title: 'Entrance Exam Planning',
    description:
      'Some undergraduate programs require entrance exams, while others admit students through Class 12 marks or merit lists. Get clarity on relevant exams such as CUET, JEE, NEET, and CLAT, depending on your chosen course.',
    icon: BookOpen,
  },
  {
    title: 'Application and Document Guidance',
    description:
      'College applications can involve different forms, registration portals, and submission dates. Understand the paperwork required and organize your applications to avoid missing important steps.',
    icon: FileText,
  },
  {
    title: 'Admission Updates and Enrollment',
    description:
      'Follow the admission process from application submission to selection results. Get guidance on merit lists, counselling rounds, document verification, and seat acceptance where applicable.',
    icon: CalendarClock,
  },
]

const STEPS = [
  {
    icon: UserCheck,
    title: 'Understand Your Interests',
    description:
      'We start with your favorite subjects, academic performance, strengths, and ideas about the future. This helps narrow down the undergraduate courses worth exploring.',
  },
  {
    icon: ListChecks,
    title: 'Explore Courses and Colleges',
    description:
      'Discover relevant degree programs and compare colleges that offer them. We consider admission criteria, course structure, location, and affordability while evaluating your options.',
  },
  {
    icon: PenLine,
    title: 'Plan Your Applications',
    description:
      'Understand how to apply, which entrance exams may be required, what documents to prepare, and when registrations or applications close.',
  },
  {
    icon: CheckCircle2,
    title: 'Move Forward with Admission',
    description:
      'Review your available options after merit lists or selection results are announced. Get guidance on the next steps, from evaluating offers to completing enrolment formalities.',
  },
]

const WHO_ITS_FOR: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Students Completing Class 12',
    description:
      'Start planning your next step before school ends. Explore degree options, understand eligibility requirements, and learn which colleges offer courses that interest you.',
    icon: School,
  },
  {
    title: 'Students Preparing for Entrance Exams',
    description:
      'Connect your entrance exam plans with your college choices. Understand which universities accept CUET, JEE, NEET, CLAT, or other relevant exams for your preferred programs.',
    icon: BookOpen,
  },
  {
    title: 'Students Unsure About Their Course Choice',
    description:
      "You don't need to have your entire career mapped out before applying to college. Compare different undergraduate fields and identify courses that fit your interests, abilities, and longer-term ambitions.",
    icon: Compass,
  },
  {
    title: 'Students and Parents in Surat',
    description:
      'Make college selection easier with UG admission counselling in Surat. Explore opportunities in Surat, other cities across Gujarat, and universities throughout India while considering academic preferences and family budgets.',
    icon: UsersRound,
  },
]

export default function UgAdmissionCounselling() {
  usePageSeo(pageSeo.ugAdmissionCounselling)

  return (
    <>
      <ServiceSchema
        name="UG Admission Counselling"
        description={pageSeo.ugAdmissionCounselling.description}
        path={pageSeo.ugAdmissionCounselling.path}
      />
      <Breadcrumbs items={[{ label: 'UG Admission Counselling', path: '/ug-admission-counselling' }]} />
      <section className="px-4 pb-4 pt-10 text-center md:px-8 md:pb-6 md:pt-14">
        <Reveal className="mx-auto max-w-3xl">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green text-warm-white">
            <GraduationCap className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-ink md:text-6xl">
            UG Admission <span className="text-brand-green">Counselling</span>
          </h1>
          <p className="mt-4 text-lg text-muted-ink">
            The right undergraduate course can shape your future career. Best Career Counselling offers UG admission
            counselling in Surat to help students explore degree options after Class 12, understand college
            admission criteria, and choose a path that fits their interests, academic strengths, and career
            aspirations. Get the clarity you need before making this important decision.
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
          <p className="mt-3 font-semibold text-ink">What Our UG Admission Counselling Covers</p>
          <p className="mt-2 text-muted-ink">
            Our UG admission counselling service helps you choose suitable courses and colleges, prepare your
            application, and take the right steps to secure undergraduate admission.
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
            <p className="mt-3 font-semibold text-ink">How Our UG Admission Counselling Works</p>
            <p className="mt-2 text-muted-ink">
              From figuring out what to study to deciding where to enroll, each step helps you move closer to a
              well-informed choice.
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
            <p className="mt-3 font-semibold text-warm-white">Who Can Benefit from UG Admission Counselling?</p>
            <p className="mt-2 text-warm-white/60">
              Every student approaches college selection differently. Whether you already have a course in mind or
              are still exploring possibilities, the right guidance can help you make a more confident decision.
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

      <ExploreUniversities description="Discover universities and colleges offering undergraduate programs across different fields of study. Compare your options and find institutions worth considering for your next academic step." />

      <FinalCTA
        variant="button"
        context="ug-pg-admission"
        heading="Your Next Chapter Starts with the Right Course"
        description="Take 15 minutes to discuss your interests, explore undergraduate options, and understand the next steps towards college admission."
      />
    </>
  )
}
