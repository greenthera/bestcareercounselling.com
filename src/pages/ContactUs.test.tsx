import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ContactUs from './ContactUs'

describe('ContactUs page', () => {
  it('renders every section heading in order', () => {
    render(
      <MemoryRouter>
        <ContactUs />
      </MemoryRouter>,
    )

    const headingNames = [
      /book your free consultation/i,
      /i want to talk to someone/i,
      /i want to start with the free assessment/i,
      /what happens on the call/i,
      /contact methods/i,
      /meet us in surat/i,
      /booking appointment faqs/i,
    ]

    headingNames.forEach((name) => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    })

    expect(document.title).toBe('Contact Us | Book a Free Consultation')
  })

  it('does not render the removed founders, testimonial and free-assessment-panel sections', () => {
    render(
      <MemoryRouter>
        <ContactUs />
      </MemoryRouter>,
    )
    expect(screen.queryByRole('heading', { name: /kishan & meeta/i })).not.toBeInTheDocument()
    expect(screen.queryByText('Priya Shah')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /not ready to book/i })).not.toBeInTheDocument()
  })
})
