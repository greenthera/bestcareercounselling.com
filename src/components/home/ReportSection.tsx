const DELIVERABLES = [
  '32-page career report',
  'Aptitude and interest profile',
  'SWOT analysis worksheet',
  'Shortlist of 8–12 careers',
  'College and course list',
]

export function ReportSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="aspect-[4/3] rounded-2xl border border-neutral-border bg-soft-cream" role="img" aria-label="[REAL PHOTO — SAMPLE CAREER REPORT]">
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-ink">
            [REAL PHOTO — SAMPLE CAREER REPORT]
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-ink md:text-4xl">What you walk away with</h2>
          <p className="mt-2 text-muted-ink">Not advice you'll forget. A document you'll use for years.</p>
          <ul className="mt-6 space-y-3">
            {DELIVERABLES.map((item) => (
              <li key={item} className="flex items-start gap-2 text-ink">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-yellow" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
