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
      /what happens on the call/i,
      /contact methods/i,
      /meet us in person/i,
      /kishan & meeta/i,
      /booking faq/i,
    ]

    headingNames.forEach((name) => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    })

    expect(document.title).toBe('Contact Us | Book a Free Consultation')
  })

  it('renders the Google reviews section', () => {
    render(
      <MemoryRouter>
        <ContactUs />
      </MemoryRouter>,
    )
    expect(screen.getByText('Priya Shah')).toBeInTheDocument()
  })
})
