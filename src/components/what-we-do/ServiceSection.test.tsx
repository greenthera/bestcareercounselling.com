import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ServiceSection } from './ServiceSection'
import { services } from '@/data/services'

describe('ServiceSection', () => {
  const service = services.find((s) => s.id === 'after-10th')!

  it('renders the id anchor, heading, who-its-for, and covers list', () => {
    const { container } = render(<ServiceSection service={service} />)
    expect(container.querySelector('#after-10th')).not.toBeNull()
    expect(screen.getByRole('heading', { name: /career counselling after 10th/i })).toBeInTheDocument()
    expect(screen.getByText(/students in class 10/i)).toBeInTheDocument()
    expect(screen.getByText('Science vs Commerce vs Arts')).toBeInTheDocument()
  })

  it('opens a booking dialog with the service context when the CTA is clicked', async () => {
    render(<ServiceSection service={service} />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Book After 10th Counselling' }))
    expect(await screen.findByLabelText(/^name$/i)).toBeInTheDocument()
  })

  it('embeds Service structured data matching the visible heading and description', () => {
    const { container } = render(<ServiceSection service={service} />)
    const script = container.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}')

    expect(data['@type']).toBe('Service')
    expect(data.name).toBe('Career Counselling After 10th')
    expect(data.description).toBe(service.description)
    expect(data.provider).toEqual({ '@id': 'https://bestcareercounselling.com/#organization' })
    expect(data.url).toBe('https://bestcareercounselling.com/what-we-do#after-10th')
    expect(data.areaServed).toEqual(['Surat', 'Gujarat'])
  })

  it('serves UG & PG admission guidance across Gujarat and India', () => {
    const ugPgService = services.find((s) => s.id === 'ug-pg-admission')!
    const { container } = render(<ServiceSection service={ugPgService} />)
    const script = container.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}')

    expect(data.areaServed).toEqual(['Gujarat', 'India'])
  })
})
