import { Phone, MessageCircle, CalendarCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const DEFAULT_MESSAGE = 'Hi, I want to know about career counselling for my child in Class ___'

export function MobileBottomBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-neutral-border bg-white md:hidden"
    >
      <a href="tel:+918758175187" className="flex flex-col items-center gap-0.5 py-2 text-xs text-ink">
        <Phone size={18} aria-hidden="true" />
        Call
      </a>
      <a
        href={buildWhatsAppUrl(DEFAULT_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 py-2 text-xs text-ink"
      >
        <MessageCircle size={18} aria-hidden="true" />
        WhatsApp
      </a>
      <Link to="/contact-us" className="flex flex-col items-center gap-0.5 bg-brand-yellow py-2 text-xs font-medium text-ink">
        <CalendarCheck size={18} aria-hidden="true" />
        Book
      </Link>
    </nav>
  )
}
