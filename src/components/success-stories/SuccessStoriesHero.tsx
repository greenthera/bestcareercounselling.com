import { Reveal } from '@/components/ui/reveal'

export function SuccessStoriesHero() {
  return (
    <section className="px-4 pb-4 pt-10 text-center md:px-8 md:pb-6 md:pt-14">
      <Reveal className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold leading-tight text-ink md:text-6xl">
          Real students. Real decisions. Real <span className="text-brand-green">outcomes</span>.
        </h1>
        <p className="mt-4 text-lg text-muted-ink">
          See how students and families moved from confusion to clarity.
        </p>
      </Reveal>
    </section>
  )
}
