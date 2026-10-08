import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { LocalBusinessSchema } from './LocalBusinessSchema'

describe('LocalBusinessSchema', () => {
  it('embeds LocalBusiness structured data with verified business information', () => {
    render(<LocalBusinessSchema />)
    const script = document.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}')

    expect(data['@type']).toBe('ProfessionalService')
    expect(data['@id']).toBe('https://bestcareercounselling.com/#organization')
    expect(data.name).toBeTruthy()
    expect(data.url).toBe('https://bestcareercounselling.com')
    expect(data.logo).toBe('https://bestcareercounselling.com/logo.png')
    expect(data.telephone).toBe('+918758175187')
    expect(data.email).toBeTruthy()

    expect(data.address['@type']).toBe('PostalAddress')
    expect(data.address.addressLocality).toBe('Surat')
    expect(data.address.addressRegion).toBe('Gujarat')
    expect(data.address.postalCode).toBe('395007')
    expect(data.address.addressCountry).toBe('IN')

    expect(data.geo['@type']).toBe('GeoCoordinates')
    expect(data.geo.latitude).toBeCloseTo(21.1657021)
    expect(data.geo.longitude).toBeCloseTo(72.7939999)

    expect(data.openingHoursSpecification['@type']).toBe('OpeningHoursSpecification')
    expect(data.openingHoursSpecification.dayOfWeek).toEqual([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ])
    expect(data.openingHoursSpecification.opens).toBe('10:00')
    expect(data.openingHoursSpecification.closes).toBe('19:00')

    expect(data.founder).toEqual([
      { '@id': 'https://bestcareercounselling.com/#kishan-patel' },
      { '@id': 'https://bestcareercounselling.com/#meeta-patel' },
    ])
    expect(data.sameAs).toEqual(['https://maps.app.goo.gl/ND7zWHZV3Znj1FbNA'])
    expect(data.aggregateRating.ratingValue).toBe('5.0')
    expect(data.aggregateRating.reviewCount).toBe('900')
  })
})
