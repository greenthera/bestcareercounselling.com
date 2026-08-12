import { Reveal } from '@/components/ui/reveal'

const MILESTONES = [
  { year: '[CLIENT TO PROVIDE YEAR]', text: 'Kishan Patel begins practicing career counselling.' },
  { year: '[CLIENT TO PROVIDE YEAR]', text: 'Meeta Patel joins the practice.' },
  { year: '[CLIENT TO PROVIDE YEAR]', text: 'Certified as a Career Analyst with Edumilestones.' },
  { year: 'Today', text: '30+ years of experience, 5,000+ students guided, 900+ five-star Google reviews.' },
]

export function OurJourney() {
  return (
    <section className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-green-tint px-6 py-14 md:px-10 md:py-16">
        <Reveal>
          <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Our journey</h2>
        </Reveal>
        <ol className="mx-auto mt-10 max-w-2xl space-y-3">
          {MILESTONES.map((milestone, index) => (
            <Reveal key={milestone.text} delay={index * 90} as="li">
              <div className="flex gap-4 rounded-2xl border border-neutral-border bg-white p-5 shadow-sm">
                <span className="w-24 shrink-0 text-sm font-bold text-brand-green">{milestone.year}</span>
                <p className="min-w-0 text-ink">{milestone.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
