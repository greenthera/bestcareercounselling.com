export function WhatMakesTheDifference() {
  return (
    <section className="bg-green-tint px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">What makes the difference</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-neutral-border bg-white p-6">
            <p className="font-semibold text-muted-ink">Generic career advice</p>
            <p className="mt-2 text-sm text-muted-ink">
              One-size-fits-all opinions, based on what worked for someone else, with no structured way to check
              whether it fits this student.
            </p>
          </div>
          <div className="rounded-xl border-2 border-brand-yellow bg-white p-6">
            <p className="font-semibold text-brand-green">Assessment + counselling + personalised roadmap</p>
            <p className="mt-2 text-sm text-ink">
              A structured psychometric assessment, interpreted together in a one-on-one session, turned into a
              roadmap built around this specific student.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
