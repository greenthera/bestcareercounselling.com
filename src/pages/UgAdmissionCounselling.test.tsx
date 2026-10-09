import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import UgAdmissionCounselling from './UgAdmissionCounselling'

describe('UgAdmissionCounselling page', () => {
  it('renders the hero, the includes grid, and the CTA button', () => {
    render(
      <MemoryRouter>
        <UgAdmissionCounselling />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /ug admission counselling/i })).toBeInTheDocument()
    expect(screen.getAllByText(/course discovery and career direction/i).length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: /how it works/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /who it's for/i })).toBeInTheDocument()
    expect(screen.getAllByText(/students and parents/i).length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: /book a free session/i })).toHaveAttribute('href', '/contact-us')
    expect(screen.getAllByRole('link', { name: /book 15-min pre counselling session/i }).length).toBeGreaterThan(0)
    expect(document.title).toBe('UG Admission Counselling | Best Career Counselling')
  })
})
