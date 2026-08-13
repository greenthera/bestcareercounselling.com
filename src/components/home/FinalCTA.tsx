import { Link } from 'react-router-dom'
import { ConsultationForm } from '@/components/forms/ConsultationForm'
import type { WhatsAppContext } from '@/components/whatsapp/whatsappMessages'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import { Reveal } from '@/components/ui/reveal'

interface FinalCTAProps {
  heading?: string
  description?: string
  context?: WhatsAppContext
  submitLabel?: string
  variant?: 'form' | 'button'
}

export function FinalCTA({
  heading = "Let's talk about your child's future",
  description = 'A 15-minute call costs nothing and usually clears up more than months of guessing.',
  context = 'home',
  submitLabel,
  variant = 'form',
}: FinalCTAProps) {
  const headingWords = heading.split(' ')
  const lastWord = headingWords.pop()
  const headingLead = headingWords.join(' ')

  return (
    <section className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-brand-green px-6 py-12 text-warm-white md:px-10 md:py-14">
        {variant === 'form' ? (
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
        ) : (
          <Reveal className="mx-auto flex max-w-xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              {headingLead && `${headingLead} `}
              <span className="text-brand-yellow">{lastWord}</span>
            </h2>
            <p className="mt-3 text-warm-white/60">{description}</p>
            <Link
              to="/contact-us"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-brand-yellow py-2.5 pl-6 pr-2 text-sm font-semibold text-ink transition-all duration-300 hover:bg-brand-yellow/90 hover:shadow-[0_10px_30px_-8px_rgba(255,204,1,0.5)]"
            >
              Book Free Session
              <PillCtaEndcap tone="dark" className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  )
}
