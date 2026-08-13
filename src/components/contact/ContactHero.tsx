import { Clock, Gift, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

const HIGHLIGHTS: { label: string; icon: LucideIcon }[] = [
  { label: '15-minute call', icon: Clock },
  { label: 'Completely free', icon: Gift },
  { label: 'No obligation', icon: ShieldCheck },
]

export function ContactHero() {
  return (
    <section className="px-4 pb-4 pt-10 text-center md:px-8 md:pb-6 md:pt-14">
      <Reveal className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold leading-tight text-ink md:text-6xl">Book your free consultation</h1>
        <p className="mt-4 text-lg text-muted-ink">
          15 minutes with Kishan or Meeta. No cost, no obligation, no sales pitch.
        </p>
      </Reveal>
      <Reveal delay={120} className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-3">
        {HIGHLIGHTS.map((highlight) => {
          const Icon = highlight.icon
          return (
            <span
              key={highlight.label}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-border bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm"
            >
              <Icon className="h-4 w-4 text-brand-green" aria-hidden="true" />
              {highlight.label}
            </span>
          )
        })}
      </Reveal>
    </section>
  )
}
