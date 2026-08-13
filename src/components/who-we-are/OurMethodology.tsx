import { ShieldCheck, Wand2, ListX, Hand, Megaphone } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

const PILLARS = ['Aptitude', 'Interest', 'Personality', 'EQ', 'SWOT', 'Parent involvement']

const DONT_DO = [
  { text: 'No fortune telling', icon: Wand2 },
  { text: 'No fixed "hot career" list', icon: ListX },
  { text: 'No pushing students toward specific courses', icon: Hand },
  { text: 'No admission-selling-first approach', icon: Megaphone },
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

      <Reveal delay={200} className="mx-auto mt-10 max-w-3xl">
        <div className="rounded-[1.6rem] bg-brand-green px-6 py-8 md:px-8 md:py-10">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-brand-yellow">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="text-lg font-semibold text-warm-white">What we don't do</h3>
          </div>
          <div className="mt-4 border-t border-white/15">
            {DONT_DO.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.text} className="border-b border-white/15">
                  <div className="group -mx-4 flex items-center gap-4 rounded-2xl px-4 py-4 transition-colors duration-300 hover:bg-white/5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-warm-white transition-colors duration-300 group-hover:bg-brand-yellow group-hover:text-ink">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <p className="text-warm-white">{item.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
