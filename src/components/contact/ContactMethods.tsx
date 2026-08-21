import { Phone, Mail } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { buildContextualMessage } from '@/components/whatsapp/whatsappMessages'
import { Reveal } from '@/components/ui/reveal'
import { contactEmails } from '@/data/contact'

export function ContactMethods() {
  const whatsAppUrl = buildWhatsAppUrl(
    buildContextualMessage('home', { name: '', phone: '' }).replace('Name: \n', '').replace('Phone: \n', ''),
  )

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
      <Reveal className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-bold text-ink md:text-4xl">Contact methods</h2>
        <p className="mt-2 text-muted-ink">Whichever way is easiest for you — we reply fast.</p>
      </Reveal>

      <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Reveal delay={0}>
          <a
            href="tel:+918758175187"
            className="group flex h-full flex-col items-center rounded-[1.6rem] border border-neutral-border bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-tint text-brand-green transition-colors duration-300 group-hover:bg-brand-yellow group-hover:text-ink">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-4 font-semibold text-ink">Call us</p>
            <p className="mt-1 text-sm text-brand-green">+91 87581 75187</p>
          </a>
        </Reveal>

        <Reveal delay={90}>
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col items-center rounded-[1.6rem] border border-neutral-border bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-tint text-brand-green transition-colors duration-300 group-hover:bg-brand-yellow group-hover:text-ink">
              <WhatsAppIcon className="h-5 w-5" />
            </span>
            <p className="mt-4 font-semibold text-ink">WhatsApp us</p>
            <p className="mt-1 text-sm text-brand-green">We reply fast</p>
          </a>
        </Reveal>

        <Reveal delay={180}>
          <div className="group flex h-full flex-col items-center rounded-[1.6rem] border border-neutral-border bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-tint text-brand-green transition-colors duration-300 group-hover:bg-brand-yellow group-hover:text-ink">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-4 font-semibold text-ink">Email us</p>
            {contactEmails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="mt-1 break-words text-sm text-brand-green hover:underline"
              >
                {email}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
