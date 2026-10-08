import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ServiceSchema } from './ServiceSchema'

describe('ServiceSchema', () => {
  it('embeds Service structured data linked to the organization', () => {
    render(<ServiceSchema name="Career Counselling" description="A clear plan, not more confusion." path="/career-counselling" />)
    const script = document.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}')

    expect(data['@context']).toBe('https://schema.org')
    expect(data['@type']).toBe('Service')
    expect(data.serviceType).toBe('Career Counselling')
    expect(data.name).toBe('Career Counselling')
    expect(data.description).toBe('A clear plan, not more confusion.')
    expect(data.provider).toEqual({ '@id': 'https://bestcareercounselling.com/#organization' })
    expect(data.url).toBe('https://bestcareercounselling.com/career-counselling')
    expect(data.areaServed).toEqual(['Surat', 'Gujarat'])
  })

  it('accepts a custom areaServed', () => {
    render(
      <ServiceSchema
        name="UG & PG Admission"
        description="Shortlists, applications, forms, follow-up."
        path="/what-we-do#ug-pg-admission"
        areaServed={['Gujarat', 'India']}
      />,
    )
    const script = document.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}')
    expect(data.areaServed).toEqual(['Gujarat', 'India'])
  })
})
