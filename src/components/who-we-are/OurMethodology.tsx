const PILLARS = ['Aptitude', 'Interest', 'Personality', 'EQ', 'SWOT', 'Parent involvement']

const DONT_DO = [
  'No fortune telling',
  'No fixed "hot career" list',
  'No pushing students toward specific courses',
  'No admission-selling-first approach',
]

export function OurMethodology() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Our methodology</h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-muted-ink">
        Every session is grounded in the Edumilestones psychometric framework, assessed across six pillars.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {PILLARS.map((pillar) => (
          <div key={pillar} className="rounded-xl border border-neutral-border bg-white p-4 text-center">
            <p className="font-semibold text-brand-green">{pillar}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-neutral-border bg-soft-cream p-6">
        <h3 className="text-lg font-semibold text-ink">What we don't do</h3>
        <ul className="mt-3 space-y-2">
          {DONT_DO.map((item) => (
            <li key={item} className="text-sm text-muted-ink">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
