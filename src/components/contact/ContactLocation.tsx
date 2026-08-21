import { MapPin, Clock, Phone } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { locations } from '@/data/locations'
import { buildGoogleMapsEmbedUrl, buildGoogleMapsSearchUrl } from '@/lib/maps'

export function ContactLocation() {
  const surat = locations.find((location) => location.city === 'Surat') ?? locations[0]
  const mapsUrl = surat.mapLink ?? buildGoogleMapsSearchUrl(surat.mapQuery ?? surat.address)
  const mapEmbedUrl = surat.mapEmbedUrl ?? buildGoogleMapsEmbedUrl(surat.mapQuery ?? surat.address)

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <Reveal className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-bold text-ink md:text-4xl">
          Meet us in <span className="text-brand-green">Surat</span>
        </h2>
        <p className="mt-2 text-muted-ink">Prefer to talk in person? Drop by our Surat office.</p>
      </Reveal>

      <div className="mt-9 grid gap-4 lg:grid-cols-2">
        <Reveal className="flex h-full flex-col justify-center rounded-[1.6rem] border border-neutral-border bg-white p-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green text-warm-white">
            <MapPin className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="mt-5 text-xl font-bold text-ink">{surat.city} Office</p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-muted-ink transition-colors hover:text-brand-green hover:underline"
          >
            {surat.address}
          </a>
          {surat.landmark && <p className="text-muted-ink">{surat.landmark}</p>}

          <div className="mt-5 space-y-2 border-t border-neutral-border pt-5 text-sm">
            <p className="flex items-center gap-2 text-ink">
              <Clock className="h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
              {surat.timings}
            </p>
            <a href="tel:+918758175187" className="flex items-center gap-2 text-brand-green hover:underline">
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              {surat.phone}
            </a>
          </div>
        </Reveal>

        <Reveal
          delay={100}
          className="min-h-[280px] overflow-hidden rounded-[1.6rem] border border-neutral-border"
        >
          <iframe
            title={`Map showing our ${surat.city} office location`}
            src={mapEmbedUrl}
            className="h-full min-h-[280px] w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </Reveal>
      </div>
    </section>
  )
}
