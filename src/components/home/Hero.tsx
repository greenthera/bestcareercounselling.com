import { ConsultationForm } from '@/components/forms/ConsultationForm'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { buildContextualMessage } from '@/components/whatsapp/whatsappMessages'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { Reveal } from '@/components/ui/reveal'
import { ExternalLink } from 'lucide-react'

export function Hero() {
  const directWhatsAppUrl = buildWhatsAppUrl(
    buildContextualMessage('home', { name: '', phone: '' }).replace('Name: \n', '').replace('Phone: \n', ''),
  )

  return (
    <section className="px-4 pb-4 pt-8 md:px-8 md:pb-6 md:pt-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Reveal className="flex flex-col justify-center rounded-[2rem] border border-neutral-border bg-white p-8 lg:col-span-4 lg:p-11">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-green-tint px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-green">
            Google's highest-rated career counsellors in Surat
          </span>
          <h1 className="max-w-lg text-4xl font-bold leading-[1.08] tracking-tight text-ink md:text-[46px]">
            Stop guessing which stream is{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">right</span>
              <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-brand-yellow/70" aria-hidden="true" />
            </span>{' '}
            for your child.
          </h1>
          <p className="mt-4 max-w-md text-base text-muted-ink md:text-lg">
            Aptitude testing and one-on-one counselling from Kishan & Meeta Patel — 30 years, 5,000+ students, 900+
            five-star reviews.
          </p>
        </Reveal>

        <Reveal delay={120} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-brand-green lg:col-span-2 lg:row-span-2">
          <div className="group relative h-full min-h-[280px] w-full" role="img" aria-label="[REAL PHOTO — KISHAN OR MEETA COUNSELLING A STUDENT]">
            <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
              <PlaceholderVisual label="[REAL PHOTO — KISHAN OR MEETA COUNSELLING A STUDENT]" tone="dark" />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden="true" />
          </div>
          <div className="absolute bottom-4 left-4 rounded-2xl bg-white/95 p-4 shadow-lg transition-transform duration-300 hover:-translate-y-1">
            <p className="text-xl font-bold text-brand-green">5,000+</p>
            <p className="text-xs text-muted-ink">Students guided</p>
          </div>
        </Reveal>

        <Reveal delay={180} className="rounded-[2rem] border border-neutral-border bg-white p-6 lg:col-span-2">
          <ConsultationForm context="home" />
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-brand-green py-2.5 pl-2 pr-5 text-sm font-semibold text-warm-white transition-colors hover:bg-brand-green/90"
          >
            <PillCtaEndcap
              tone="yellow"
              icon={ExternalLink}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Message us directly, we reply fast
          </a>
        </Reveal>

        <Reveal
          delay={220}
          className="relative min-h-[200px] overflow-hidden rounded-[2rem] border border-neutral-border lg:col-span-2"
        >
          <div
            className="group h-full w-full"
            role="img"
            aria-label="[REAL PHOTO — SMILING STUDENT WITH FAMILY]"
          >
            <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
              <PlaceholderVisual label="[REAL PHOTO — SMILING STUDENT WITH FAMILY]" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
