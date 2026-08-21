import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders the brand name and Google rating', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
    expect(screen.getByText(/best career counselling/i)).toBeInTheDocument()
    expect(screen.getByText(/5\.0★/)).toBeInTheDocument()
    expect(screen.getByText(/900\+ reviews/i)).toBeInTheDocument()
  })

  it('links the Surat address to Google Maps', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /LG-22, Nariman Point/i })).toHaveAttribute(
      'href',
      'https://maps.app.goo.gl/ND7zWHZV3Znj1FbNA',
    )
  })

  it('links the phone number and emails', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /\+91 87581 75187/ })).toHaveAttribute('href', 'tel:+918758175187')
    expect(screen.getByRole('link', { name: /careercounsellingsurat@gmail\.com/i })).toHaveAttribute(
      'href',
      'mailto:careercounsellingsurat@gmail.com',
    )
    expect(screen.getByRole('link', { name: /patel_kishan@rediffmail\.com/i })).toHaveAttribute(
      'href',
      'mailto:patel_kishan@rediffmail.com',
    )
  })

  it('links the legal pages and drops Student Dashboard', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy-policy')
    expect(screen.getByRole('link', { name: 'Terms' })).toHaveAttribute('href', '/terms')
    expect(screen.queryByRole('link', { name: 'Refund Policy' })).not.toBeInTheDocument()
    expect(screen.queryByText('Student Dashboard')).not.toBeInTheDocument()
  })

  it('renders all six service links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'After 10th' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Career Change' })).toBeInTheDocument()
  })
})
