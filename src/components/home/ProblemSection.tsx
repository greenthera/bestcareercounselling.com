const PROBLEMS = [
  'Science, Commerce or Arts — and no way to decide',
  'You and your child want different things',
  'Wrong stream chosen. Now what?',
  'No idea which colleges to even apply to',
]

export function ProblemSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Sound familiar?</h2>
      <p className="mt-2 text-center text-muted-ink">Most families we meet are stuck on one of these.</p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {PROBLEMS.map((problem) => (
          <div key={problem} className="rounded-xl border border-neutral-border bg-white p-5 text-ink">
            {problem}
          </div>
        ))}
      </div>
    </section>
  )
}
