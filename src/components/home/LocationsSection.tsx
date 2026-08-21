import { cn } from '@/lib/utils'
import { locations } from '@/data/locations'
import { Reveal } from '@/components/ui/reveal'
import { buildGoogleMapsEmbedUrl, buildGoogleMapsSearchUrl } from '@/lib/maps'

export function LocationsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <Reveal>
        <h2 className="text-3xl font-bold text-ink md:text-4xl">
          Meet us <span className="text-brand-green">in person</span>
        </h2>
      </Reveal>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {locations.map((location, index) => (
          <Reveal key={location.city} delay={index * 90}>
            <div
              className={cn(
                'group h-full rounded-[1.6rem] border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
                location.hasMap ? 'border-brand-green bg-brand-green text-warm-white' : 'border-neutral-border bg-white',
              )}
            >
              <p className={cn('text-lg font-semibold', location.hasMap ? 'text-warm-white' : 'text-brand-green')}>
                {location.city}
              </p>
              <a
                href={location.mapLink ?? buildGoogleMapsSearchUrl(location.mapQuery ?? location.address)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'mt-2 block text-sm hover:underline',
                  location.hasMap ? 'text-warm-white/70 hover:text-warm-white' : 'text-muted-ink hover:text-brand-green',
                )}
              >
                {location.address}
              </a>
              {location.landmark && (
                <p className={cn('text-sm', location.hasMap ? 'text-warm-white/70' : 'text-muted-ink')}>
                  {location.landmark}
                </p>
              )}
              <div className={cn('mt-3 space-y-1 border-t pt-3 text-sm', location.hasMap ? 'border-white/15' : 'border-neutral-border')}>
                <p className={location.hasMap ? 'text-warm-white' : 'text-ink'}>{location.timings}</p>
                <p className={location.hasMap ? 'text-warm-white' : 'text-ink'}>{location.phone}</p>
              </div>
              {location.hasMap && (
                <div className="mt-3 aspect-video overflow-hidden rounded-xl">
                  <iframe
                    title={`Map showing our ${location.city} office location`}
                    src={location.mapEmbedUrl ?? buildGoogleMapsEmbedUrl(location.mapQuery ?? location.address)}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
