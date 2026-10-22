// Posts a lead to the Google Form that backs the lead-tracking Google Sheet (the
// "backend of record" — see public/ConfigureConversionTracking.md). Entry IDs come
// from the form's "Get pre-filled link" output; if the form's questions are ever
// edited, added to or recreated, these IDs change and must be re-collected the same
// way, or submissions will silently stop landing in the right columns.

// Falls back to the form collected for this site if VITE_GFORM_URL isn't set, the
// same pattern src/lib/seo.ts uses for VITE_SITE_URL — so a fresh clone or CI build
// still works without a local .env file.
const GFORM_URL =
  import.meta.env.VITE_GFORM_URL ||
  'https://docs.google.com/forms/d/e/1FAIpQLSeEV9QGcM6u-Nb7dtb92ddWJX0kVzmMQAPLRHs6qb73zy2DzQ/formResponse'

export const ENTRY = {
  lead_id: 'entry.243360331',
  name: 'entry.1081356038',
  phone: 'entry.1290721114',
  status: 'entry.1238164411',
  form_id: 'entry.1777820978',
  page: 'entry.837934175',
  utm_source: 'entry.1608291639',
  utm_medium: 'entry.762024564',
  utm_campaign: 'entry.491650539',
  utm_term: 'entry.1658321924',
  utm_content: 'entry.475079642',
  gclid: 'entry.197075013',
  fbclid: 'entry.112890306',
  landing_page: 'entry.2124836624',
  referrer: 'entry.1682408961',
} as const

export type LeadFormData = Record<keyof typeof ENTRY, string>

export function saveLeadToForm(data: LeadFormData): void {
  const body = new URLSearchParams()
  for (const key of Object.keys(ENTRY) as (keyof typeof ENTRY)[]) {
    // Send '-' for empty values so nothing is ever posted as a blank string.
    body.append(ENTRY[key], data[key] || '-')
  }

  // sendBeacon queues the request and survives the page navigating away right after
  // (e.g. to WhatsApp) — its response is opaque, so failures are invisible by design.
  const sent = navigator.sendBeacon(GFORM_URL, body)
  if (!sent) {
    fetch(GFORM_URL, { method: 'POST', mode: 'no-cors', body, keepalive: true }).catch(() => {})
  }
}
