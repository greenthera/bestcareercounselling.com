import { locations } from '@/data/locations'

export function LocationsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Meet us in person</h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {locations.map((location) => (
          <div key={location.city} className="rounded-xl border border-neutral-border bg-white p-5">
            <p className="text-lg font-semibold text-brand-green">{location.city}</p>
            <p className="mt-2 text-sm text-muted-ink">{location.address}</p>
            <p className="text-sm text-muted-ink">{location.landmark}</p>
            <p className="mt-2 text-sm text-ink">{location.timings}</p>
            <p className="text-sm text-ink">{location.phone}</p>
            {location.hasMap && (
              <div className="mt-3 aspect-video rounded-lg bg-soft-cream" role="img" aria-label={`[MAP — ${location.city.toUpperCase()}]`}>
                <div className="flex h-full items-center justify-center p-2 text-center text-xs text-muted-ink">
                  [MAP — {location.city.toUpperCase()}]
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
