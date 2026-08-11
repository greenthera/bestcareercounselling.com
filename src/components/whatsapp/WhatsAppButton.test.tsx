import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WhatsAppButton } from './WhatsAppButton'

describe('WhatsAppButton', () => {
  it('renders an accessible link to WhatsApp with the default message', () => {
    render(<WhatsAppButton />)
    const link = screen.getByRole('link', { name: /chat on whatsapp/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('https://wa.me/918758175187?text='))
    expect(decodeURIComponent(link.getAttribute('href') ?? '')).toContain(
      'Hi, I want to know about career counselling for my child in Class',
    )
  })

  it('opens in a new tab safely', () => {
    render(<WhatsAppButton />)
    const link = screen.getByRole('link', { name: /chat on whatsapp/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })
})
