import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContactMethods } from './ContactMethods'

describe('ContactMethods', () => {
  it('renders call/WhatsApp and email contact details', () => {
    render(<ContactMethods />)
    expect(screen.getByRole('link', { name: /\+91 87581 75187/ })).toHaveAttribute('href', 'tel:+918758175187')
    expect(screen.getByRole('link', { name: /kishan@bestcareercounselling\.com/i })).toHaveAttribute(
      'href',
      'mailto:kishan@bestcareercounselling.com',
    )
  })
})
