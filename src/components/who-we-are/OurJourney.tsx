import { Rocket, UserPlus, Award, Trophy } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

const MILESTONES = [
  { year: '[CLIENT TO PROVIDE YEAR]', text: 'Kishan Patel begins practicing career counselling.', icon: Rocket },
  { year: '[CLIENT TO PROVIDE YEAR]', text: 'Meeta Patel joins the practice.', icon: UserPlus },
  { year: '[CLIENT TO PROVIDE YEAR]', text: 'Certified as a Career Analyst with Edumilestones.', icon: Award },
  { year: 'Today', text: '30+ years of experience, 5,000+ students guided, 900+ five-star Google reviews.', icon: Trophy },
]

export function OurJourney() {
  return (
    <section className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-green-tint px-6 py-14 md:px-10 md:py-16">
        <Reveal>
          <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Our journey</h2>
        </Reveal>

        <ol className="relative mx-auto mt-14 max-w-2xl space-y-4">
          <div
            className="absolute bottom-6 left-7 top-6 w-0.5 bg-gradient-to-b from-brand-green via-brand-green to-brand-yellow"
            aria-hidden="true"
          />
          {MILESTONES.map((milestone, index) => {
            const Icon = milestone.icon
            return (
              <Reveal key={milestone.text} delay={index * 100} as="li">
                <div className="group relative flex gap-6">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-warm-white shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-brand-yellow group-hover:text-ink group-hover:shadow-xl">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1 rounded-[1.375rem] border border-neutral-border bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-green/60">
                      Milestone {String(index + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-brand-green">{milestone.year}</p>
                    <p className="mt-1 text-ink">{milestone.text}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
