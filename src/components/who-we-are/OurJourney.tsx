const MILESTONES = [
  { year: '[CLIENT TO PROVIDE YEAR]', text: 'Kishan Patel begins practicing career counselling.' },
  { year: '[CLIENT TO PROVIDE YEAR]', text: 'Meeta Patel joins the practice.' },
  { year: '[CLIENT TO PROVIDE YEAR]', text: 'Certified as a Career Analyst with Edumilestones.' },
  { year: 'Today', text: '30+ years of experience, 5,000+ students guided, 900+ five-star Google reviews.' },
]

export function OurJourney() {
  return (
    <section className="bg-green-tint px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Our journey</h2>
        <ol className="mt-10 space-y-6 border-l-2 border-brand-yellow pl-6">
          {MILESTONES.map((milestone) => (
            <li key={milestone.text}>
              <p className="text-sm font-semibold text-brand-green">{milestone.year}</p>
              <p className="text-ink">{milestone.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
