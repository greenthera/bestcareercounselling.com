import {
  GraduationCap,
  ClipboardList,
  FileText,
  CalendarClock,
  MessageSquare,
  Repeat,
  UserCheck,
  ListChecks,
  PenLine,
  CheckCircle2,
  School,
  Globe2,
  Briefcase,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { ExploreUniversities } from '@/components/trust/ExploreUniversities'
import { FinalCTA } from '@/components/home/FinalCTA'
import { usePageSeo } from '@/hooks/usePageSeo'
import { pageSeo } from '@/data/seo'

const INCLUDES: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Course & college shortlisting',
    description: 'A curated list matched to your profile, budget and goals, not a generic ranking list.',
    icon: ClipboardList,
  },
  {
    title: 'Application support',
    description: 'Forms, essays and profiles reviewed and strengthened before you submit.',
    icon: FileText,
  },
  {
    title: 'Document preparation',
    description: 'Transcripts, recommendation letters and certificates, organised and checked.',
    icon: GraduationCap,
  },
  {
    title: 'Deadline tracking',
    description: 'Every application deadline tracked so nothing is missed.',
    icon: CalendarClock,
  },
  {
    title: 'Interview preparation',
    description: 'Mock interviews and feedback ahead of the real thing.',
    icon: MessageSquare,
  },
  {
    title: 'Follow-up support',
    description: "Ongoing help until you're confirmed and enrolled.",
    icon: Repeat,
  },
]

const STEPS = [
  { icon: UserCheck, title: 'Profile & goals', description: 'We map your academic background, budget and target outcomes.' },
  { icon: ListChecks, title: 'Shortlist', description: 'A course and college shortlist matched to your profile.' },
  { icon: PenLine, title: 'Apply', description: 'Applications, essays and documents prepared and reviewed.' },
  { icon: CheckCircle2, title: 'Track & enrol', description: 'Deadlines tracked through to your admission letter.' },
]

const WHO_ITS_FOR: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'After 12th students',
    description: 'Course and college applications for undergraduate admission.',
    icon: School,
  },
  {
    title: 'UG & PG students',
    description: 'Shortlisting and applying for the next degree.',
    icon: GraduationCap,
  },
  {
    title: 'MBA aspirants',
    description: 'CAT-linked applications and specialisation selection.',
    icon: Briefcase,
  },
  {
    title: 'Study abroad aspirants',
    description: 'Country, university and visa-linked applications.',
    icon: Globe2,
  },
]

export default function AdmissionConsulting() {
  usePageSeo(pageSeo.admissionConsulting)

  return (
    <>
      <section className="px-4 pb-4 pt-10 text-center md:px-8 md:pb-6 md:pt-14">
        <Reveal className="mx-auto max-w-3xl">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green text-warm-white">
            <GraduationCap className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-ink md:text-6xl">
            Admission <span className="text-brand-green">Consulting</span>
          </h1>
          <p className="mt-4 text-lg text-muted-ink">
            From shortlist to enrolment, Kishan &amp; Meeta Patel handle the paperwork and the pressure so you can
            focus on making the right choice.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">What's included</h2>
          <p className="mt-2 text-muted-ink">Everything you need to get from shortlist to admission letter.</p>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INCLUDES.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={index * 80}>
                <div className="h-full rounded-[1.6rem] border border-neutral-border bg-white p-5 shadow-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-tint text-brand-green">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-3 font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-ink">{item.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-soft-cream px-6 py-14 md:px-10 md:py-16">
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold text-ink md:text-4xl">
              How it <span className="text-brand-green">works</span>
            </h2>
            <p className="mt-2 text-muted-ink">Four steps. Start to finish.</p>
          </Reveal>

          <ol className="relative mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            <div
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 bg-gradient-to-r from-brand-green via-brand-green to-brand-yellow lg:block"
              aria-hidden="true"
            />
            {STEPS.map((step, index) => {
              const Icon = step.icon
              return (
                <Reveal key={step.title} delay={index * 100} as="li">
                  <div className="group flex flex-col items-center text-center">
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-warm-white shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-brand-yellow group-hover:text-ink group-hover:shadow-xl">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div className="mt-5 w-full rounded-[1.375rem] border border-neutral-border bg-white p-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
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

      <section className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-brand-green px-6 py-14 text-center text-warm-white md:px-10 md:py-16">
          <Reveal className="mx-auto max-w-xl">
            <h2 className="text-3xl font-bold md:text-4xl">
              Who it's <span className="text-brand-yellow">for</span>
            </h2>
            <p className="mt-2 text-warm-white/60">Admission support at every stage.</p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <ExploreUniversities />

      <FinalCTA
        variant="button"
        heading="Ready to start your admission process?"
        description="A 15-minute call costs nothing and gives you a clear shortlist and timeline to work from."
      />
    </>
  )
}
