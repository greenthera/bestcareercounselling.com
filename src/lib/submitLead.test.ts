import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { submitLead, saveLead, buildLeadRef, buildLeadNotes } from './submitLead'
import { ENTRY } from '@/lib/leadsForm'

describe('submitLead', () => {
  let openSpy: ReturnType<typeof vi.spyOn>
  let sendBeaconSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    localStorage.clear()
    window.history.pushState({}, '', '/')
    openSpy = vi.spyOn(window, 'open').mockImplementation(() => ({}) as Window)
    sendBeaconSpy = vi.spyOn(navigator, 'sendBeacon').mockReturnValue(true)
    ;(window as unknown as { dataLayer?: unknown[] }).dataLayer = []
  })

  afterEach(() => {
    openSpy.mockRestore()
    sendBeaconSpy.mockRestore()
  })

  it('opens WhatsApp with a Ref containing the form id, DIRECT and the lead id for a direct visit', () => {
    submitLead({ formId: 'hero', context: 'home', fields: { name: 'Aarav Shah', phone: '9876543210', currentClass: 'Class 10' } })

    expect(openSpy).toHaveBeenCalledTimes(1)
    const [url] = openSpy.mock.calls[0]
    const decoded = decodeURIComponent(String(url))
    expect(decoded).toMatch(/Ref: hero-DIRECT-[a-z0-9-]+/)
  })

  it('uses the stored utm_source in the Ref when attribution was captured', () => {
    window.history.pushState({}, '', '/?utm_source=google&utm_medium=cpc')
    // Mirrors what captureAttribution() does, without importing it, to keep this test focused.
    localStorage.setItem(
      'attribution_v1',
      JSON.stringify({ utm_source: 'google', utm_medium: 'cpc', utm_campaign: '', utm_term: '', utm_content: '', gclid: '', fbclid: '', landing_page: '/', referrer: '' }),
    )

    submitLead({ formId: 'footer', context: 'home', fields: { name: 'Aarav Shah', phone: '9876543210', currentClass: 'Class 10' } })

    const [url] = openSpy.mock.calls[0]
    expect(decodeURIComponent(String(url))).toMatch(/Ref: footer-google-[a-z0-9-]+/)
  })

  it('saves the lead to the Google Form before opening WhatsApp', () => {
    submitLead({ formId: 'hero', context: 'home', fields: { name: 'Aarav Shah', phone: '9876543210', currentClass: 'Class 10' } })
    expect(sendBeaconSpy).toHaveBeenCalledTimes(1)
  })

  it('logs a generate_lead event with no name or phone', () => {
    submitLead({ formId: 'hero', context: 'home', fields: { name: 'Aarav Shah', phone: '9876543210', currentClass: 'Class 10' } })

    const dataLayer = (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer
    const leadEvent = dataLayer.find((entry) => entry.event === 'generate_lead')
    expect(leadEvent).toMatchObject({ form_id: 'hero', lead_channel: 'whatsapp' })
    expect(leadEvent).not.toHaveProperty('name')
    expect(leadEvent).not.toHaveProperty('phone')
  })

  it('saves email and notes (the form-specific extra info) to the Sheet', () => {
    submitLead({
      formId: 'hero',
      context: 'home',
      fields: { name: 'Aarav Shah', phone: '9876543210', currentClass: 'Class 10' },
      email: 'aarav@example.com',
      notes: 'Status: Class 10',
    })

    const [, body] = sendBeaconSpy.mock.calls[0]
    const params = body as URLSearchParams
    expect(params.get(ENTRY.email)).toBe('aarav@example.com')
    expect(params.get(ENTRY.notes)).toBe('Status: Class 10')
  })

  it('falls back to a same-tab redirect when window.open is blocked', () => {
    openSpy.mockReturnValue(null)
    const originalLocation = window.location
    const assignedHrefs: string[] = []
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        ...originalLocation,
        set href(value: string) {
          assignedHrefs.push(value)
        },
      },
    })

    submitLead({ formId: 'hero', context: 'home', fields: { name: 'Aarav Shah', phone: '9876543210', currentClass: 'Class 10' } })

    expect(assignedHrefs).toHaveLength(1)
    expect(assignedHrefs[0]).toContain('https://wa.me/')

    Object.defineProperty(window, 'location', { configurable: true, value: originalLocation })
  })
})

describe('saveLead', () => {
  let sendBeaconSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    localStorage.clear()
    window.history.pushState({}, '', '/')
    sendBeaconSpy = vi.spyOn(navigator, 'sendBeacon').mockReturnValue(true)
    ;(window as unknown as { dataLayer?: unknown[] }).dataLayer = []
  })

  afterEach(() => {
    sendBeaconSpy.mockRestore()
  })

  it('saves the lead without opening WhatsApp, for forms with their own result screen', () => {
    const openSpy = vi.spyOn(window, 'open')
    const leadId = saveLead({ formId: 'online-admissions', name: 'Aarav Shah', phone: '9876543210', email: 'a@b.com', notes: 'Course: Online MBA' })

    expect(leadId).toBeTruthy()
    expect(openSpy).not.toHaveBeenCalled()
    expect(sendBeaconSpy).toHaveBeenCalledTimes(1)

    const [, body] = sendBeaconSpy.mock.calls[0]
    const params = body as URLSearchParams
    expect(params.get(ENTRY.lead_id)).toBe(leadId)
    expect(params.get(ENTRY.form_id)).toBe('online-admissions')
    expect(params.get(ENTRY.notes)).toBe('Course: Online MBA')
    openSpy.mockRestore()
  })

  it('still logs a generate_lead event', () => {
    saveLead({ formId: 'online-admissions', name: 'Aarav Shah', phone: '9876543210' })
    const dataLayer = (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer
    expect(dataLayer.find((entry) => entry.event === 'generate_lead')).toMatchObject({ form_id: 'online-admissions' })
  })
})

describe('buildLeadRef', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('uses DIRECT when no attribution is stored', () => {
    expect(buildLeadRef('hero', 'abc123')).toBe('hero-DIRECT-abc123')
  })

  it('uses the stored utm_source when attribution is present', () => {
    localStorage.setItem(
      'attribution_v1',
      JSON.stringify({ utm_source: 'google', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '', gclid: '', fbclid: '', landing_page: '/', referrer: '' }),
    )
    expect(buildLeadRef('footer', 'xyz789')).toBe('footer-google-xyz789')
  })
})

describe('buildLeadNotes', () => {
  it('puts each field on its own line, not joined into one run-on sentence', () => {
    expect(buildLeadNotes({ Course: 'Online MBA', Budget: '₹1–2 Lakh' })).toBe('Course: Online MBA\nBudget: ₹1–2 Lakh')
  })

  it('skips fields the visitor left blank', () => {
    expect(buildLeadNotes({ Course: 'Online MBA', Qualification: '', Budget: '' })).toBe('Course: Online MBA')
  })

  it('returns an empty string when every field is blank', () => {
    expect(buildLeadNotes({ Course: '', Budget: '' })).toBe('')
  })
})
