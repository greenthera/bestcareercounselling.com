// Posts a lead to the Google Form that backs the lead-tracking Google Sheet (the
// "backend of record"). Entry IDs come from the form's "Get pre-filled link" output;
// if the form's questions are ever edited, added to or recreated, these IDs change and
// must be re-collected the same way, or submissions will silently stop landing in the
// right columns.

// Falls back to the form collected for this site if VITE_GFORM_URL isn't set, the
// same pattern src/lib/seo.ts uses for VITE_SITE_URL — so a fresh clone or CI build
// still works without a local .env file.
const GFORM_URL =
  import.meta.env.VITE_GFORM_URL ||
  'https://docs.google.com/forms/d/e/1FAIpQLSfvIhJMmBIghgJgKROt9FnO5IyFCTtpENS0UP97LtKyNQmcog/formResponse'

// Order matches the Form's own question order (lead_id, name, email, phone, notes,
// then the shared attribution fields). `notes` carries whatever is specific to the
// form that captured this lead (e.g. "Status: Class 10" or "Course: Online MBA;
// Qualification: Graduate; ...") — the one field every form fills in differently,
// instead of giving every possible form-specific field its own column.
export const ENTRY = {
  lead_id: 'entry.1311777246',
  name: 'entry.689730906',
  email: 'entry.1156704139',
  phone: 'entry.808173884',
  notes: 'entry.1381980248',
  form_id: 'entry.2074549916',
  page: 'entry.1871426431',
  utm_source: 'entry.784612854',
  utm_medium: 'entry.769170639',
  utm_campaign: 'entry.1997714945',
  utm_term: 'entry.292238718',
  utm_content: 'entry.367534719',
  gclid: 'entry.1303728676',
  fbclid: 'entry.275821024',
  landing_page: 'entry.1821401819',
  referrer: 'entry.439433515',
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
