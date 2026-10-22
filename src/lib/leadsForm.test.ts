import { describe, it, expect, vi, afterEach } from 'vitest'
import { saveLeadToForm, ENTRY, type LeadFormData } from './leadsForm'

const EMPTY_DATA: LeadFormData = {
  lead_id: '',
  name: '',
  email: '',
  phone: '',
  notes: '',
  form_id: '',
  page: '',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_term: '',
  utm_content: '',
  gclid: '',
  fbclid: '',
  landing_page: '',
  referrer: '',
}

describe('saveLeadToForm', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('posts every field to its entry ID via sendBeacon, substituting - for empty values', () => {
    const sendBeacon = vi.spyOn(navigator, 'sendBeacon').mockReturnValue(true)

    saveLeadToForm({
      ...EMPTY_DATA,
      lead_id: 'abc123',
      name: 'Aarav Shah',
      email: 'aarav@example.com',
      phone: '9876543210',
      notes: 'Status: Class 10',
      form_id: 'hero',
    })

    expect(sendBeacon).toHaveBeenCalledTimes(1)
    const [, body] = sendBeacon.mock.calls[0]
    const params = body as URLSearchParams
    expect(params.get(ENTRY.lead_id)).toBe('abc123')
    expect(params.get(ENTRY.name)).toBe('Aarav Shah')
    expect(params.get(ENTRY.email)).toBe('aarav@example.com')
    expect(params.get(ENTRY.phone)).toBe('9876543210')
    expect(params.get(ENTRY.notes)).toBe('Status: Class 10')
    expect(params.get(ENTRY.form_id)).toBe('hero')
    // Every field was sent '-' for empty values, not a blank string.
    expect(params.get(ENTRY.utm_source)).toBe('-')
    expect(params.get(ENTRY.gclid)).toBe('-')
  })

  it('falls back to fetch when sendBeacon is unavailable or fails', () => {
    vi.spyOn(navigator, 'sendBeacon').mockReturnValue(false)
    const fetchSpy = vi.spyOn(window, 'fetch').mockResolvedValue(new Response())

    saveLeadToForm({ ...EMPTY_DATA, lead_id: 'xyz' })

    expect(fetchSpy).toHaveBeenCalledTimes(1)
    const [url, init] = fetchSpy.mock.calls[0]
    expect(String(url)).toContain('/formResponse')
    expect(init).toMatchObject({ method: 'POST', mode: 'no-cors', keepalive: true })
  })
})
