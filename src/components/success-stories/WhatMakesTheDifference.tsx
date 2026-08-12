import { Reveal } from '@/components/ui/reveal'

export function WhatMakesTheDifference() {
  return (
    <section className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-green-tint px-6 py-14 md:px-10 md:py-16">
        <Reveal>
          <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">What makes the difference</h2>
        </Reveal>
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          <Reveal delay={80}>
            <div className="h-full rounded-[1.375rem] border border-neutral-border bg-white p-6 shadow-sm">
              <p className="font-semibold text-muted-ink">Generic career advice</p>
              <p className="mt-2 text-sm text-muted-ink">
                One-size-fits-all opinions, based on what worked for someone else, with no structured way to check
                whether it fits this student.
              </p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="h-full rounded-[1.375rem] border-2 border-brand-yellow bg-white p-6 shadow-sm">
              <p className="font-semibold text-brand-green">Assessment + counselling + personalised roadmap</p>
              <p className="mt-2 text-sm text-ink">
                A structured psychometric assessment, interpreted together in a one-on-one session, turned into a
                roadmap built around this specific student.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
