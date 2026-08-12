import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ConsultationForm } from '@/components/forms/ConsultationForm'
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
    <section id={service.id} className="mx-auto max-w-3xl scroll-mt-20 px-4 py-16 md:px-8 md:py-20">
      <h2 className="text-3xl font-bold text-ink md:text-4xl">{heading}</h2>
      {service.subheading && <p className="mt-2 text-lg text-brand-green">{service.subheading}</p>}
      {service.whoItsFor && <p className="mt-4 text-muted-ink">Who it's for: {service.whoItsFor}</p>}

      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {service.covers.map((item) => (
          <li key={item} className="flex items-start gap-2 text-ink">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-yellow" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="mt-8 rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-warm-white hover:bg-brand-green/90"
          >
            {service.ctaLabel}
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{service.ctaLabel}</DialogTitle>
          </DialogHeader>
          <ConsultationForm context={service.id} submitLabel={service.ctaLabel} />
        </DialogContent>
      </Dialog>
    </section>
  )
}
