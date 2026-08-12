export function ContactHero() {
  return (
    <section className="bg-soft-cream px-4 py-16 text-center md:px-8 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold leading-tight text-ink md:text-6xl">Book your free consultation</h1>
        <p className="mt-4 text-lg text-muted-ink">
          15 minutes with Kishan or Meeta. No cost, no obligation, no sales pitch.
        </p>
      </div>
      <div
        className="mx-auto mt-10 aspect-[16/6] max-w-3xl rounded-2xl border border-dashed border-neutral-border bg-white"
        role="img"
        aria-label="[BOOKING / CALENDAR INTEGRATION — CLIENT TO PROVIDE OR CONFIRM SCHEDULING TOOL]"
      >
        <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-ink">
          [BOOKING / CALENDAR INTEGRATION — CLIENT TO PROVIDE OR CONFIRM SCHEDULING TOOL]
        </div>
      </div>
    </section>
  )
}
