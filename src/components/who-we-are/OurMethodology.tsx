import { Reveal } from '@/components/ui/reveal'

const PILLARS = ['Aptitude', 'Interest', 'Personality', 'EQ', 'SWOT', 'Parent involvement']

const DONT_DO = [
  'No fortune telling',
  'No fixed "hot career" list',
  'No pushing students toward specific courses',
  'No admission-selling-first approach',
]

export function OurMethodology() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <Reveal className="text-center">
        <h2 className="text-3xl font-bold text-ink md:text-4xl">Our methodology</h2>
        <p className="mx-auto mt-2 max-w-2xl text-muted-ink">
          Every session is grounded in the Edumilestones psychometric framework, assessed across six pillars.
        </p>
      </Reveal>

      <div className="mt-9 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
        {PILLARS.map((pillar, index) => (
          <Reveal key={pillar} delay={index * 70}>
            <div className="group rounded-[1.375rem] border border-neutral-border bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <p className="break-words font-semibold text-brand-green">{pillar}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200} className="mx-auto mt-8 max-w-2xl">
        <div className="rounded-[1.375rem] border border-neutral-border bg-soft-cream p-6">
          <h3 className="text-lg font-semibold text-ink">What we don't do</h3>
          <ul className="mt-3 space-y-2">
            {DONT_DO.map((item) => (
              <li key={item} className="text-sm text-muted-ink">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
