import { describe, it, expect, beforeEach } from 'vitest'
import { captureAttribution, getAttribution, track, newLeadId } from './tracking'

function setUrl(path: string) {
  window.history.pushState({}, '', path)
}

describe('captureAttribution / getAttribution', () => {
  beforeEach(() => {
    localStorage.clear()
    setUrl('/')
  })

  it('returns null before anything has been captured', () => {
    expect(getAttribution()).toBeNull()
  })

  it('captures UTM params, gclid and fbclid from the URL', () => {
    setUrl('/?utm_source=google&utm_medium=cpc&utm_campaign=test&gclid=abc123')
    captureAttribution()

    const attribution = getAttribution()
    expect(attribution).toMatchObject({
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'test',
      gclid: 'abc123',
      fbclid: '',
    })
  })

  it('stores empty strings for a direct visit with no campaign params', () => {
    captureAttribution()
    expect(getAttribution()).toMatchObject({ utm_source: '', gclid: '', fbclid: '' })
  })

  it('keeps the first-touch attribution on a later visit with no new campaign params', () => {
    setUrl('/?utm_source=meta&utm_medium=paid&utm_campaign=oct')
    captureAttribution()

    setUrl('/blogs')
    captureAttribution()

    expect(getAttribution()).toMatchObject({ utm_source: 'meta', utm_campaign: 'oct' })
  })

  it('overwrites the stored attribution when a new campaign signal arrives', () => {
    setUrl('/?utm_source=meta&utm_campaign=oct')
    captureAttribution()

    setUrl('/?utm_source=google&utm_campaign=nov')
    captureAttribution()

    expect(getAttribution()).toMatchObject({ utm_source: 'google', utm_campaign: 'nov' })
  })
})

describe('track', () => {
  beforeEach(() => {
    ;(window as unknown as { dataLayer?: unknown[] }).dataLayer = []
  })

  it('pushes the event and params onto window.dataLayer', () => {
    track('generate_lead', { form_id: 'hero', lead_id: 'abc' })
    const dataLayer = (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer
    expect(dataLayer).toContainEqual({ event: 'generate_lead', form_id: 'hero', lead_id: 'abc' })
  })
})

describe('newLeadId', () => {
  it('generates a non-empty, unique id on each call', () => {
    const a = newLeadId()
    const b = newLeadId()
    expect(a).toBeTruthy()
    expect(b).toBeTruthy()
    expect(a).not.toBe(b)
  })
})
