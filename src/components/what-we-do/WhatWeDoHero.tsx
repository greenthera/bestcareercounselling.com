import { Reveal } from '@/components/ui/reveal'

export function WhatWeDoHero() {
  return (
    <section className="px-4 pb-4 pt-10 text-center md:px-8 md:pb-6 md:pt-14">
      <Reveal className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold leading-tight text-ink md:text-6xl">
          Career guidance for every important <span className="text-brand-green">decision</span>.
        </h1>
        <p className="mt-4 text-lg text-muted-ink">
          From choosing a stream after Class 10 to changing careers — get clarity backed by assessment, experience
          and one-on-one counselling.
        </p>
      </Reveal>
    </section>
  )
}
