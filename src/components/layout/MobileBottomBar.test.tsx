import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MobileBottomBar } from './MobileBottomBar'

describe('MobileBottomBar', () => {
  it('renders Call, WhatsApp and Book actions', () => {
    render(
      <MemoryRouter>
        <MobileBottomBar />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /call/i })).toHaveAttribute('href', 'tel:+918758175187')
    expect(screen.getByRole('link', { name: /whatsapp/i })).toHaveAttribute(
      'href',
      expect.stringContaining('https://wa.me/918758175187'),
    )
    expect(screen.getByRole('link', { name: /^book$/i })).toHaveAttribute('href', '/contact-us')
  })
})
