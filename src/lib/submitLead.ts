import { getAttribution, track, newLeadId } from '@/lib/tracking'
import { saveLeadToForm } from '@/lib/leadsForm'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { buildContextualMessage, type WhatsAppContext, type WhatsAppFields } from '@/components/whatsapp/whatsappMessages'

interface SubmitLeadParams {
  /** Which on-page form this is (e.g. "hero", "footer", "contact-page") — becomes form_id. */
  formId: string
  context: WhatsAppContext
  fields: WhatsAppFields
}

// Shared by every lead-capture form on the site (see public/ConfigureConversionTracking.md,
// section 5.3). On submit, in order: generate a lead ID, save the lead to the Google
// Sheet (never blocks on this — a slow/failed request must never stop the WhatsApp
// redirect), log a generate_lead event with no personal data, then open WhatsApp with
// a tagged message carrying the same lead ID so the two can be reconciled later.
//
// window.open is called synchronously (not after a delay) so browsers still treat it
// as a direct result of the click/submit and don't pop-up-block it — a setTimeout'd
// window.open risks losing that "user gesture" trust, especially on iOS Safari, which
// is exactly the browser this needs to work reliably on.
export function submitLead({ formId, context, fields }: SubmitLeadParams): void {
  const leadId = newLeadId()
  const attribution = getAttribution()
  const ref = `${formId}-${attribution?.utm_source || 'DIRECT'}`

  saveLeadToForm({
    lead_id: leadId,
    name: fields.name,
    phone: fields.phone,
    status: fields.currentClass ?? '',
    form_id: formId,
    page: window.location.pathname,
    utm_source: attribution?.utm_source ?? '',
    utm_medium: attribution?.utm_medium ?? '',
    utm_campaign: attribution?.utm_campaign ?? '',
    utm_term: attribution?.utm_term ?? '',
    utm_content: attribution?.utm_content ?? '',
    gclid: attribution?.gclid ?? '',
    fbclid: attribution?.fbclid ?? '',
    landing_page: attribution?.landing_page ?? '',
    referrer: attribution?.referrer ?? '',
  })

  track('generate_lead', {
    form_id: formId,
    current_status: fields.currentClass ?? '',
    lead_channel: 'whatsapp',
    lead_id: leadId,
  })

  const message = buildContextualMessage(context, fields)
  const taggedMessage = `${message}\n\nRef: ${ref}-${leadId}`
  const whatsappUrl = buildWhatsAppUrl(taggedMessage)

  // Deliberately omits noopener/noreferrer: browsers always return null from window.open
  // when either is set — even when the popup opens successfully — which would make the
  // blocked-popup check below fire every time, redirecting the original tab in addition
  // to the new one actually opening. Safe to omit here because the destination is always
  // this fixed, hardcoded wa.me URL, never attacker-controlled, so there's no tabnabbing
  // risk from giving it an opener reference.
  const win = window.open(whatsappUrl, '_blank')
  if (!win) {
    // Popup genuinely blocked (most commonly iOS Safari) — fall back to a same-tab redirect.
    window.location.href = whatsappUrl
  }
}
