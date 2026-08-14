import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AdmissionConsulting from './AdmissionConsulting'

describe('AdmissionConsulting page', () => {
  it('renders the hero, the includes grid, and the CTA button', () => {
    render(
      <MemoryRouter>
        <AdmissionConsulting />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /admission consulting/i })).toBeInTheDocument()
    expect(screen.getByText(/course & college shortlisting/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /how it works/i })).toBeInTheDocument()
    expect(screen.getByText(/^Shortlist$/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /who it's for/i })).toBeInTheDocument()
    expect(screen.getByText(/study abroad aspirants/i)).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /book free session/i }).length).toBeGreaterThan(0)
    expect(document.title).toBe('Admission Consulting | Best Career Counselling')
  })
})
