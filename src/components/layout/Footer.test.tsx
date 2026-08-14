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

  it('renders the Surat location', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
    expect(screen.getByText('Surat')).toBeInTheDocument()
  })

  it('links the phone number and email', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /\+91 87581 75187/ })).toHaveAttribute('href', 'tel:+918758175187')
    expect(screen.getByRole('link', { name: /kishan@bestcareercounselling\.com/i })).toHaveAttribute(
      'href',
      'mailto:kishan@bestcareercounselling.com',
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
    expect(screen.getByRole('link', { name: 'Refund Policy' })).toHaveAttribute('href', '/refund-policy')
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
