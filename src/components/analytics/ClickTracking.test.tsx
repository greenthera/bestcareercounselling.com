import { describe, it, expect, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { ClickTracking } from './ClickTracking'

function dataLayer() {
  return (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer
}

describe('ClickTracking', () => {
  beforeEach(() => {
    ;(window as unknown as { dataLayer?: unknown[] }).dataLayer = []
  })

  it('logs whatsapp_click with the link_location from the closest data-location ancestor', () => {
    const { container } = render(
      <div>
        <ClickTracking />
        <div data-location="floating-button">
          <a href="https://wa.me/918758175187?text=hi">
            <span>Chat</span>
          </a>
        </div>
      </div>,
    )

    fireEvent.click(container.querySelector('span')!)

    expect(dataLayer()).toContainEqual({ event: 'whatsapp_click', link_location: 'floating-button' })
  })

  it('logs phone_click for a tel: link', () => {
    const { getByText } = render(
      <div>
        <ClickTracking />
        <a href="tel:+918758175187" data-location="footer-call">
          Call
        </a>
      </div>,
    )

    fireEvent.click(getByText('Call'))

    expect(dataLayer()).toContainEqual({ event: 'phone_click', link_location: 'footer-call' })
  })

  it('falls back to "unspecified" when no data-location is present', () => {
    const { getByText } = render(
      <div>
        <ClickTracking />
        <a href="tel:+918758175187">Call</a>
      </div>,
    )

    fireEvent.click(getByText('Call'))

    expect(dataLayer()).toContainEqual({ event: 'phone_click', link_location: 'unspecified' })
  })

  it('ignores clicks on links that are not whatsapp or tel links', () => {
    const { getByText } = render(
      <div>
        <ClickTracking />
        <a href="/contact-us">Contact</a>
      </div>,
    )

    fireEvent.click(getByText('Contact'))

    expect(dataLayer()).toHaveLength(0)
  })
})
