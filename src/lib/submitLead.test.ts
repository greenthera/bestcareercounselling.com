import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { submitLead } from './submitLead'

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
    expect(leadEvent).toMatchObject({ form_id: 'hero', current_status: 'Class 10', lead_channel: 'whatsapp' })
    expect(leadEvent).not.toHaveProperty('name')
    expect(leadEvent).not.toHaveProperty('phone')
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
