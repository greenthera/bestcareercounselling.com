export function FounderProfiles() {
  return (
    <section className="bg-green-tint px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Kishan & Meeta</h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-neutral-border bg-white p-6">
            <div className="aspect-square rounded-lg bg-soft-cream" role="img" aria-label="[REAL PHOTO — KISHAN PATEL]">
              <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-ink">
                [REAL PHOTO — KISHAN PATEL]
              </div>
            </div>
            <p className="mt-4 text-xl font-bold text-brand-green">Kishan Patel</p>
            <p className="text-sm text-muted-ink">Career Counsellor</p>
            <p className="mt-2 text-sm text-ink">30+ years guiding students across Gujarat.</p>
            <p className="text-sm text-ink">Certified Career Analyst — Edumilestones.</p>
            <p className="mt-2 text-sm text-muted-ink">[CLIENT TO PROVIDE: extended professional biography]</p>
          </div>

          <div className="rounded-xl border border-neutral-border bg-white p-6">
            <div className="aspect-square rounded-lg bg-soft-cream" role="img" aria-label="[REAL PHOTO — MEETA PATEL]">
              <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-ink">
                [REAL PHOTO — MEETA PATEL]
              </div>
            </div>
            <p className="mt-4 text-xl font-bold text-brand-green">Meeta Patel</p>
            <p className="text-sm text-muted-ink">Career Counsellor</p>
            <p className="mt-2 text-sm text-ink">
              Specialises in working with parents and students together, particularly around stream selection after
              Class 10.
            </p>
            <p className="text-sm text-ink">Certified with the Edumilestones psychometric framework.</p>
            <p className="mt-2 text-sm text-muted-ink">[CLIENT TO PROVIDE: extended professional biography]</p>
          </div>
        </div>
      </div>
    </section>
  )
}
