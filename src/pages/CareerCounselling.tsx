import { Compass, Brain, Users, Map, HeartHandshake, Repeat2, School, GraduationCap, Briefcase, UsersRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { HowItWorks } from '@/components/home/HowItWorks'
import { FinalCTA } from '@/components/home/FinalCTA'
import { usePageSeo } from '@/hooks/usePageSeo'
import { pageSeo } from '@/data/seo'

const INCLUDES: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Comprehensive Career Assessment',
    description: 'Aptitude, interest, personality and EQ, measured, not guessed.',
    icon: Brain,
  },
  {
    title: 'One-on-one session',
    description: 'A detailed counselling session with Kishan or Meeta to unpack the results.',
    icon: Users,
  },
  {
    title: 'Stream & course selection',
    description: 'Clear, data-backed direction on Science, Commerce, Arts or a specific course.',
    icon: Compass,
  },
  {
    title: 'Career roadmap',
    description: 'A practical, written plan from where you are to where you want to be.',
    icon: Map,
  },
  {
    title: 'Parent counselling',
    description: 'A conversation that gets parents and children aligned, not arguing.',
    icon: HeartHandshake,
  },
  {
    title: 'Ongoing support',
    description: "Follow-up check-ins as plans change (they usually do).",
    icon: Repeat2,
  },
]

const WHO_ITS_FOR: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Class 9–10 students',
    description: 'Stream selection before it gets locked in.',
    icon: School,
  },
  {
    title: 'Class 11–12 students',
    description: 'Course and career direction after boards.',
    icon: GraduationCap,
  },
  {
    title: 'Working professionals',
    description: 'Career change, thought through and planned.',
    icon: Briefcase,
  },
  {
    title: 'Parents',
    description: 'A shared, calmer way to reach a decision together.',
    icon: UsersRound,
  },
]

export default function CareerCounselling() {
  usePageSeo(pageSeo.careerCounselling)

  return (
    <>
      <section className="px-4 pb-4 pt-10 text-center md:px-8 md:pb-6 md:pt-14">
        <Reveal className="mx-auto max-w-3xl">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green text-warm-white">
            <Compass className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-ink md:text-6xl">
            Career <span className="text-brand-green">Counselling</span>
          </h1>
          <p className="mt-4 text-lg text-muted-ink">
            Understand strengths, weigh real options and leave with a plan, backed by 30 years of aptitude testing
            and one-on-one guidance from Kishan &amp; Meeta Patel.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">What's included</h2>
          <p className="mt-2 text-muted-ink">Assessment, conversation and a roadmap you can actually follow.</p>
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

      <HowItWorks />

      <section className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-brand-green px-6 py-14 text-center text-warm-white md:px-10 md:py-16">
          <Reveal className="mx-auto max-w-xl">
            <h2 className="text-3xl font-bold md:text-4xl">
              Who it's <span className="text-brand-yellow">for</span>
            </h2>
            <p className="mt-2 text-warm-white/60">Guidance at every stage, not just after 10th.</p>
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

      <FinalCTA
        variant="button"
        heading="Not sure where to start?"
        description="A 15-minute call costs nothing and usually clears up more than months of guessing."
      />
    </>
  )
}
