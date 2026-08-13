import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CareerCounselling from './CareerCounselling'

describe('CareerCounselling page', () => {
  it('renders the hero, the includes grid, and the CTA button', () => {
    render(
      <MemoryRouter>
        <CareerCounselling />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /career counselling/i })).toBeInTheDocument()
    expect(screen.getByText(/psychometric assessment/i)).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /book free session/i }).length).toBeGreaterThan(0)
    expect(document.title).toBe('Career Counselling | Best Career Counselling')
  })
})
