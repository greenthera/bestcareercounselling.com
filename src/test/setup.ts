import '@testing-library/jest-dom'

window.IntersectionObserver = class {
  readonly root: Element | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
} as unknown as typeof IntersectionObserver

window.scrollTo = () => {}

// jsdom doesn't implement sendBeacon at all, so tests that need to spy on or stub it
// (saveLeadToForm's primary delivery path) have nothing to attach to without this.
if (!('sendBeacon' in navigator)) {
  Object.defineProperty(navigator, 'sendBeacon', {
    value: () => true,
    writable: true,
    configurable: true,
  })
}
