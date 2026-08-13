import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProblemSection } from './ProblemSection'

describe('ProblemSection', () => {
  it('renders the heading and all four problems', () => {
    render(<ProblemSection />)
    expect(screen.getByRole('heading', { name: /sound familiar/i })).toBeInTheDocument()
    expect(screen.getAllByText(/science, commerce or arts/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/wrong stream chosen/i).length).toBeGreaterThan(0)
  })
})
