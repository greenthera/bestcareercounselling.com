import { getAttribution, track, newLeadId } from '@/lib/tracking'
import { saveLeadToForm } from '@/lib/leadsForm'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { buildContextualMessage, type WhatsAppContext, type WhatsAppFields } from '@/components/whatsapp/whatsappMessages'

interface SaveLeadParams {
  /** Which on-page form this is (e.g. "hero", "footer", "contact-page") — becomes form_id. */
  formId: string
  name: string
  phone: string
  email?: string
  /** Whatever is specific to this form, as readable text (e.g. "Status: Class 10",
   * or "Course: Online MBA; Qualification: Graduate") — every form collects different
   * extra fields, so instead of one Sheet column per possible field across every form,
   * this single text field carries whichever ones this particular form has. */
  notes?: string
}

// Saves a lead to the Google Sheet and logs a generate_lead event, without opening
// WhatsApp — for forms that show their own result/thank-you screen instead of
// redirecting immediately (the assessment forms, the online-admissions form). Returns
// the generated lead ID so a caller that opens WhatsApp itself can tag the message
// with it via buildLeadRef, for the same Sheet-row-to-chat reconciliation submitLead
// provides.
export function saveLead({ formId, name, phone, email, notes }: SaveLeadParams): string {
  const leadId = newLeadId()
  const attribution = getAttribution()

  saveLeadToForm({
    lead_id: leadId,
    name,
    email: email ?? '',
    phone,
    notes: notes ?? '',
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
    lead_channel: 'whatsapp',
    lead_id: leadId,
  })

  return leadId
}

// `{form_id}-{utm_source or DIRECT}-{lead_id}` — the same Ref format submitLead tags
// its WhatsApp messages with, exposed separately for forms that build and send their
// own WhatsApp message after saveLead (rather than through submitLead itself).
export function buildLeadRef(formId: string, leadId: string): string {
  const attribution = getAttribution()
  return `${formId}-${attribution?.utm_source || 'DIRECT'}-${leadId}`
}

// Builds the `notes` text for forms whose own fields don't get their own Sheet column
// (every form collects different extras, so only Name/Email/Phone are common enough to
// warrant real columns — see saveLead above). One "Label: value" line per field, blank
// fields skipped, separated by real line breaks rather than semicolons — the Sheet's
// notes column is a Paragraph-type field, so each one renders on its own line instead
// of a single hard-to-scan run-on sentence.
export function buildLeadNotes(fields: Record<string, string>): string {
  return Object.entries(fields)
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')
}

// Opens a WhatsApp URL the popup-safe way: synchronously (so browsers still treat it as
// a direct result of the click and don't pop-up-block it — a setTimeout'd window.open
// risks losing that "user gesture" trust, especially on iOS Safari), and deliberately
// without noopener/noreferrer, since browsers always return null from window.open when
// either is set — even when the popup opens successfully — which would make the
// blocked-popup check below fire every time, redirecting the original tab in addition
// to the new one actually opening. Safe to omit here because the destination is always
// a fixed, hardcoded wa.me URL, never attacker-controlled, so there's no tabnabbing risk
// from giving it an opener reference.
export function openWhatsApp(url: string): void {
  const win = window.open(url, '_blank')
  if (!win) {
    // Popup genuinely blocked (most commonly iOS Safari) — fall back to a same-tab redirect.
    window.location.href = url
  }
}

interface SubmitLeadParams {
  formId: string
  context: WhatsAppContext
  fields: WhatsAppFields
  email?: string
  notes?: string
}

// Full flow for forms that redirect straight to WhatsApp on submit (hero, footer,
// contact page, per-service forms). On submit, in order: save the lead (never blocks
// on this — a slow/failed request must never stop the WhatsApp redirect), log a
// generate_lead event with no personal data, then open WhatsApp with a tagged message
// carrying the same lead ID so the two can be reconciled later.
export function submitLead({ formId, context, fields, email, notes }: SubmitLeadParams): void {
  const leadId = saveLead({ formId, name: fields.name, phone: fields.phone, email, notes })
  const ref = buildLeadRef(formId, leadId)

  const message = buildContextualMessage(context, fields)
  const taggedMessage = `${message}\n\nRef: ${ref}`
  openWhatsApp(buildWhatsAppUrl(taggedMessage))
}
