import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { Reveal } from '@/components/ui/reveal'

export function ContactHero() {
  return (
    <section className="px-4 pb-4 pt-10 text-center md:px-8 md:pb-6 md:pt-14">
      <Reveal className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold leading-tight text-ink md:text-6xl">Book your free consultation</h1>
        <p className="mt-4 text-lg text-muted-ink">
          15 minutes with Kishan or Meeta. No cost, no obligation, no sales pitch.
        </p>
      </Reveal>
      <Reveal
        delay={120}
        className="mx-auto mt-10 aspect-[16/6] max-w-3xl overflow-hidden rounded-[1.6rem] border border-dashed border-neutral-border"
      >
        <div
          role="img"
          aria-label="[BOOKING / CALENDAR INTEGRATION — CLIENT TO PROVIDE OR CONFIRM SCHEDULING TOOL]"
          className="h-full w-full"
        >
          <PlaceholderVisual label="[BOOKING / CALENDAR INTEGRATION — CLIENT TO PROVIDE OR CONFIRM SCHEDULING TOOL]" />
        </div>
      </Reveal>
    </section>
  )
}
