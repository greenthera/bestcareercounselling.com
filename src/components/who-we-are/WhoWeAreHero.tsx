import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { Reveal } from '@/components/ui/reveal'
import counselling from '@/assets/bestcareercounselling-3.webp'

export function WhoWeAreHero() {
  return (
    <section className="px-4 pb-4 pt-10 text-center md:px-8 md:pb-6 md:pt-14">
      <Reveal className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold leading-tight text-ink md:text-6xl">
          30+ years. 5,000+ students. One question we keep <span className="text-brand-green">answering</span>.
        </h1>
        <p className="mt-4 text-lg text-muted-ink">
          What should I do with my life? Here's how we help families answer it.
        </p>
      </Reveal>
      <Reveal
        delay={120}
        className="mx-auto mt-10 aspect-[16/7] max-w-4xl overflow-hidden rounded-[1.6rem] border border-neutral-border shadow-sm"
      >
        <div role="img" aria-label="Career counselling session in progress" className="h-full w-full">
          <PlaceholderVisual label="Career counselling session in progress" src={counselling} />
        </div>
      </Reveal>
    </section>
  )
}
