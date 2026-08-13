import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const DEFAULT_MESSAGE = 'Hi, I want to know about career counselling for my child in Class ___'

export function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppUrl(DEFAULT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-yellow md:bottom-6"
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}
