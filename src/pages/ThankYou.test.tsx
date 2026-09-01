import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ThankYou from './ThankYou'

describe('ThankYou page', () => {
  it('renders the heading, a WhatsApp continue link and contact details', () => {
    render(
      <MemoryRouter>
        <ThankYou />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: /thank you/i })).toBeInTheDocument()
    const whatsappLink = screen.getByRole('link', { name: /continue to whatsapp/i })
    expect(whatsappLink).toHaveAttribute('href', expect.stringContaining('https://wa.me/918758175187'))
    expect(screen.getByText('+91 87581 75187')).toBeInTheDocument()
    expect(document.title).toBe('Thank You | Kishan & Meeta Patel')
  })
})
