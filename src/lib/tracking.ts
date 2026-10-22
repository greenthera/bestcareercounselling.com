// Attribution capture + GTM dataLayer helpers for lead-conversion tracking (see
// public/ConfigureConversionTracking.md for the full spec this implements).

export interface Attribution {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
  gclid: string
  fbclid: string
  landing_page: string
  referrer: string
}

const STORAGE_KEY = 'attribution_v1'
const CAMPAIGN_PARAMS = ['utm_source', 'gclid', 'fbclid'] as const

function readDataLayer(): Record<string, unknown>[] {
  const w = window as Window & { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer || []
  return w.dataLayer
}

// Reads attribution off the current URL and stores it in localStorage, keeping the
// FIRST touch unless a new campaign signal (utm_source, gclid or fbclid) shows up —
// so a visitor who lands from an ad, browses a few pages, then submits a form later
// still gets credited to the campaign that actually brought them in, not whatever
// page they happened to submit from.
export function captureAttribution(): void {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(window.location.search)
  const hasNewCampaignSignal = CAMPAIGN_PARAMS.some((key) => params.get(key))
  if (!hasNewCampaignSignal && getAttribution()) return

  const attribution: Attribution = {
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    utm_term: params.get('utm_term') ?? '',
    utm_content: params.get('utm_content') ?? '',
    gclid: params.get('gclid') ?? '',
    fbclid: params.get('fbclid') ?? '',
    landing_page: window.location.pathname + window.location.search,
    referrer: document.referrer ?? '',
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution))
  } catch {
    // Private browsing / blocked storage — attribution just won't persist across pages.
  }
}

export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Attribution) : null
  } catch {
    return null
  }
}

export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  readDataLayer().push({ event, ...params })
}

export function newLeadId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}
