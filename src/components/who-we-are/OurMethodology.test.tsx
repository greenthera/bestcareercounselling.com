import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OurMethodology } from './OurMethodology'

describe('OurMethodology', () => {
  it("renders the methodology pillars and the What We Don't Do list", () => {
    render(<OurMethodology />)
    expect(screen.getByRole('heading', { name: /our methodology/i })).toBeInTheDocument()
    expect(screen.getByText('Aptitude')).toBeInTheDocument()
    expect(screen.getByText('SWOT')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /what we don't do/i })).toBeInTheDocument()
    expect(screen.getByText(/no fortune telling/i)).toBeInTheDocument()
    expect(screen.getByText(/no admission-selling-first approach/i)).toBeInTheDocument()
  })
})
