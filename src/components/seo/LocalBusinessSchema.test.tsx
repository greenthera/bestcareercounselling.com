import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { LocalBusinessSchema } from './LocalBusinessSchema'

describe('LocalBusinessSchema', () => {
  it('embeds LocalBusiness structured data with only already-established facts', () => {
    render(<LocalBusinessSchema />)
    const script = document.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}')
    expect(data['@type']).toBe('LocalBusiness')
    expect(data.telephone).toBe('+91-87581-75187')
    expect(data.areaServed).toEqual(['Surat', 'Navsari', 'Ankleshwar', 'Valsad'])
    expect(data.aggregateRating.ratingValue).toBe('5.0')
    expect(data.aggregateRating.reviewCount).toBe('900')
    expect(data.address).toBeUndefined()
  })
})
