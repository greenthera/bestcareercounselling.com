import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { WebSiteSchema } from './WebSiteSchema'

describe('WebSiteSchema', () => {
  it('embeds WebSite structured data linked to the organization', () => {
    render(<WebSiteSchema />)
    const script = document.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}')

    expect(data['@context']).toBe('https://schema.org')
    expect(data['@type']).toBe('WebSite')
    expect(data.name).toBe('Kishan & Meeta Patel Career Counselling')
    expect(data.url).toBe('https://bestcareercounselling.com')
    expect(data.publisher).toEqual({ '@id': 'https://bestcareercounselling.com/#organization' })
  })
})
