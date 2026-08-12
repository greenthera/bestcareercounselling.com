import { Reveal } from '@/components/ui/reveal'

const STEPS = [
  { number: '01', title: 'Free consultation call', description: '15 minutes. We understand the situation.' },
  { number: '02', title: 'Psychometric assessment', description: 'Aptitude, interest, personality and EQ.' },
  { number: '03', title: 'One-on-one session + report', description: 'Detailed counselling session with Kishan or Meeta.' },
  { number: '04', title: 'Roadmap and admission support', description: 'Course shortlist, college list, timeline and application help.' },
]

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
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

      <ol className="mt-9 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <Reveal key={step.number} delay={index * 100} as="li">
            <div className="group h-full rounded-[1.375rem] border border-neutral-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <span className="text-3xl font-extrabold text-brand-green/15 transition-colors duration-300 group-hover:text-brand-yellow">
                {step.number}
              </span>
              <p className="mt-2 font-semibold text-ink">{step.title}</p>
              <p className="mt-1 text-sm text-muted-ink">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
