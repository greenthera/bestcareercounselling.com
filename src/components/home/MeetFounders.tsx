import { Link } from 'react-router-dom'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { Reveal } from '@/components/ui/reveal'

export function MeetFounders() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <Reveal>
        <h2 className="text-3xl font-bold text-ink md:text-4xl">
          Meet Kishan <span className="text-brand-green">&</span> Meeta
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Reveal delay={80}>
          <div className="group h-full overflow-hidden rounded-[1.6rem] border border-neutral-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
            <div className="relative aspect-square overflow-hidden" role="img" aria-label="[REAL PHOTO — KISHAN PATEL]">
              <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                <PlaceholderVisual label="[REAL PHOTO — KISHAN PATEL]" />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden="true" />
              <p className="absolute bottom-4 left-4 text-xl font-bold text-warm-white">Kishan Patel</p>
            </div>
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-green">Career Counsellor</p>
              <p className="mt-2 text-sm text-ink">30+ years guiding students across Gujarat.</p>
              <p className="text-sm text-ink">Certified Career Analyst — Edumilestones.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="group h-full overflow-hidden rounded-[1.6rem] border border-neutral-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
            <div className="relative aspect-square overflow-hidden" role="img" aria-label="[REAL PHOTO — MEETA PATEL]">
              <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                <PlaceholderVisual label="[REAL PHOTO — MEETA PATEL]" />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden="true" />
              <p className="absolute bottom-4 left-4 text-xl font-bold text-warm-white">Meeta Patel</p>
            </div>
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-green">Career Counsellor</p>
              <p className="mt-2 text-sm text-ink">
                Specialises in working with parents and students together, particularly around stream selection after
                Class 10.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/who-we-are"
          className="group inline-flex items-center gap-2 font-medium text-brand-green hover:underline"
        >
          Read Our Full Story
          <PillCtaEndcap className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  )
}
