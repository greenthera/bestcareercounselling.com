import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RefundPolicy from './RefundPolicy'

describe('RefundPolicy page', () => {
  it('renders the heading and key sections', () => {
    render(
      <MemoryRouter>
        <RefundPolicy />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /refund policy/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /assessment fees/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /non-refundable services/i })).toBeInTheDocument()
    expect(document.title).toBe('Refund Policy | Best Career Counselling')
  })
})
