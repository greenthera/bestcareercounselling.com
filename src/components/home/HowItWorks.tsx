import { PhoneCall, Brain, Users, Map, Infinity as InfinityIcon } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

const STEPS = [
  { icon: PhoneCall, title: 'Pre Counselling', description: "15 minutes. We understand you & your current status." },
  {
    icon: Brain,
    title: 'Comprehensive Career Assessment',
    description: 'Career personality, interest & values; Skills, Abilities, Emotion Intelligence',
  },
  { icon: Users, title: 'One-on-one session', description: 'Detailed counselling session with Kishan and/or Meeta.' },
  { icon: Map, title: 'Future Roadmap & Admission', description: 'Course shortlist, college list, timeline and application help.' },
]

export function HowItWorks() {
  return (
    <section className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-soft-cream px-6 py-14 md:px-10 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <h2 className="text-3xl font-bold text-ink md:text-4xl">
              How it <span className="text-brand-green">works</span>
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <p className="text-sm text-muted-ink">Four steps. Complete clarity.</p>
          </Reveal>
        </div>

        <ol className="relative mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 bg-gradient-to-r from-brand-green via-brand-green to-brand-yellow lg:block"
            aria-hidden="true"
          />
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <Reveal key={step.title} delay={index * 100} as="li" className="h-full">
                <div className="group flex h-full flex-col items-center text-center">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-warm-white shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-brand-yellow group-hover:text-ink group-hover:shadow-xl">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="mt-5 flex w-full flex-1 flex-col rounded-[1.375rem] border border-neutral-border bg-white p-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                    <span className="text-xs font-bold uppercase tracking-wide text-brand-green/60">
                      Step {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex flex-1 flex-col justify-start">
                      <p className="mt-1 font-semibold text-ink">{step.title}</p>
                      <p className="mt-1 text-sm text-muted-ink">{step.description}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ol>

        <Reveal delay={400} className="mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-[1.375rem] border border-brand-green/15 bg-white p-5 shadow-sm">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-tint text-brand-green">
            <InfinityIcon className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-sm text-ink">
            <span className="font-semibold">And it doesn't stop there:</span> we give end-to-end support, guidance and
            help with career and professional matters until you complete your master's degree.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
