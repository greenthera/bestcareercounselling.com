import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ConsultationForm } from '@/components/forms/ConsultationForm'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import { Reveal } from '@/components/ui/reveal'
import type { Service } from '@/data/services'

const HEADINGS: Record<string, string> = {
  'after-10th': 'Career Counselling After 10th',
  'after-12th': 'Career Counselling After 12th',
}

interface ServiceSectionProps {
  service: Service
}

export function ServiceSection({ service }: ServiceSectionProps) {
  const heading = HEADINGS[service.id] ?? service.title

  return (
    <section id={service.id} className="mx-auto max-w-3xl scroll-mt-36 px-4 py-10 md:px-8 md:py-14">
      <Reveal>
        <h2 className="text-3xl font-bold text-ink md:text-4xl">{heading}</h2>
        {service.subheading && <p className="mt-2 text-lg text-brand-green">{service.subheading}</p>}
        {service.whoItsFor && <p className="mt-4 text-muted-ink">Who it's for: {service.whoItsFor}</p>}

        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {service.covers.map((item) => (
            <li key={item} className="flex items-start gap-2 rounded-xl border border-neutral-border bg-white px-3 py-2.5 text-ink">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-yellow" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink py-2.5 pl-6 pr-2 text-sm font-semibold text-warm-white transition-colors hover:bg-ink/90"
            >
              {service.ctaLabel}
              <PillCtaEndcap tone="yellow" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{service.ctaLabel}</DialogTitle>
            </DialogHeader>
            <ConsultationForm context={service.id} submitLabel={service.ctaLabel} />
          </DialogContent>
        </Dialog>
      </Reveal>
    </section>
  )
}
