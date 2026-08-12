const PHOTOS = [
  '[REAL PHOTO — OFFICE, SURAT]',
  '[REAL PHOTO — COUNSELLING SESSION]',
  '[REAL PHOTO — WORKSHOP]',
  '[REAL PHOTO — TEAM]',
]

export function RealWork() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Real work</h2>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {PHOTOS.map((caption) => (
          <div key={caption} className="aspect-square rounded-xl border border-neutral-border bg-soft-cream" role="img" aria-label={caption}>
            <div className="flex h-full items-center justify-center p-3 text-center text-xs text-muted-ink">{caption}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
