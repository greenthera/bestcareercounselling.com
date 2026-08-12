import { ConsultationForm } from '@/components/forms/ConsultationForm'
import type { WhatsAppContext } from '@/components/whatsapp/whatsappMessages'

interface FinalCTAProps {
  heading?: string
  description?: string
  context?: WhatsAppContext
  submitLabel?: string
}

export function FinalCTA({
  heading = "Let's talk about your child's future",
  description = 'A 15-minute call costs nothing and usually clears up more than months of guessing.',
  context = 'home',
  submitLabel,
}: FinalCTAProps) {
  return (
    <section className="bg-brand-green px-4 py-16 text-warm-white md:px-8 md:py-24">
      <div className="mx-auto max-w-md text-center">
        <h2 className="text-3xl font-bold md:text-4xl">{heading}</h2>
        <p className="mt-3 text-warm-white/80">{description}</p>

        <div className="mt-8 rounded-xl bg-white p-6 text-left">
          <ConsultationForm context={context} submitLabel={submitLabel} />
        </div>
      </div>
    </section>
  )
}
