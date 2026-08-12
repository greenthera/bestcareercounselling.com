import { ConsultationForm } from '@/components/forms/ConsultationForm'
import type { WhatsAppContext } from '@/components/whatsapp/whatsappMessages'
import { Reveal } from '@/components/ui/reveal'

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
  const headingWords = heading.split(' ')
  const lastWord = headingWords.pop()
  const headingLead = headingWords.join(' ')

  return (
    <section className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-ink px-6 py-12 text-warm-white md:px-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <h2 className="text-3xl font-bold md:text-4xl">
              {headingLead && `${headingLead} `}
              <span className="text-brand-yellow">{lastWord}</span>
            </h2>
            <p className="mt-3 max-w-sm text-warm-white/60">{description}</p>
          </Reveal>

          <Reveal delay={100} className="rounded-[1.6rem] bg-white p-6 text-left text-ink">
            <ConsultationForm context={context} submitLabel={submitLabel} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
