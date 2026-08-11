import { ConsultationForm } from '@/components/forms/ConsultationForm'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { buildContextualMessage } from '@/components/whatsapp/whatsappMessages'

export function Hero() {
  const directWhatsAppUrl = buildWhatsAppUrl(
    buildContextualMessage('home', { name: '', phone: '' }).replace('Student Name: \n', '').replace('Phone: \n', ''),
  )

  return (
    <section className="relative overflow-hidden bg-soft-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-green">
            Google's highest-rated career counsellors in Surat
          </p>
          <h1 className="text-4xl font-bold leading-tight text-ink md:text-6xl">
            Stop guessing which stream is right for your child.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-ink">
            Aptitude testing and one-on-one counselling from Kishan & Meeta Patel — 30 years, 5,000+ students, 900+
            five-star reviews.
          </p>

          <div className="mt-8 max-w-sm rounded-xl border border-neutral-border bg-white p-6 shadow-sm">
            <ConsultationForm context="home" />
          </div>

          <a href={directWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium text-brand-green hover:underline">
            Or WhatsApp us directly →
          </a>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] w-full rounded-2xl border-2 border-brand-green bg-green-tint" role="img" aria-label="[REAL PHOTO — KISHAN OR MEETA COUNSELLING A STUDENT]">
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-ink">
              [REAL PHOTO — KISHAN OR MEETA COUNSELLING A STUDENT]
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-xl bg-brand-yellow" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
