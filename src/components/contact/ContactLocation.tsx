import { MapPin, Clock, Phone } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { locations } from '@/data/locations'

export function ContactLocation() {
  const surat = locations.find((location) => location.city === 'Surat') ?? locations[0]

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
          <p className="mt-2 text-muted-ink">{surat.address}</p>
          <p className="text-muted-ink">{surat.landmark}</p>

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
          className="relative min-h-[280px] overflow-hidden rounded-[1.6rem] border border-neutral-border bg-green-tint"
        >
          <div
            role="img"
            aria-label={`Map showing our ${surat.city} office location`}
            className="relative h-full w-full"
          >
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(1,73,36,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(1,73,36,0.12) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
              aria-hidden="true"
            />
            <svg
              className="absolute inset-0 h-full w-full text-brand-green/25"
              viewBox="0 0 400 280"
              fill="none"
              aria-hidden="true"
            >
              <path d="M-20 200 C 80 160, 140 220, 220 140 S 380 60, 440 90" stroke="currentColor" strokeWidth="10" />
              <path d="M40 -20 C 90 60, 60 140, 160 180 S 320 260, 360 320" stroke="currentColor" strokeWidth="7" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="flex h-14 w-14 animate-glow-pulse items-center justify-center rounded-full bg-brand-green text-warm-white shadow-lg motion-reduce:animate-none">
                <MapPin className="h-7 w-7" aria-hidden="true" />
              </span>
              <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-ink shadow-sm">
                {surat.city}, Gujarat
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
