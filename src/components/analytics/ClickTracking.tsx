import { useEffect } from 'react'
import { track } from '@/lib/tracking'

// Delegated click listener (one for the whole app, mounted once) that logs every
// WhatsApp (wa.me) and phone (tel:) link click, regardless of where it lives on the
// page or whether it was added before or after this listener mounted. `link_location`
// comes from a data-location attribute on the link (or its closest ancestor), so each
// entry point — floating button, mobile bar, "message us directly", footer — reports
// separately without needing its own bespoke handler.
export function ClickTracking() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement).closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href') ?? ''
      const location = anchor.closest('[data-location]')?.getAttribute('data-location') ?? 'unspecified'

      if (href.startsWith('https://wa.me/')) {
        track('whatsapp_click', { link_location: location })
      } else if (href.startsWith('tel:')) {
        track('phone_click', { link_location: location })
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
