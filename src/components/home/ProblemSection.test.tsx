import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProblemSection } from './ProblemSection'

describe('ProblemSection', () => {
  it('renders the heading and all four problems', () => {
    render(<ProblemSection />)
    expect(screen.getByRole('heading', { name: /sound familiar/i })).toBeInTheDocument()
    expect(screen.getByText(/science, commerce or arts/i)).toBeInTheDocument()
    expect(screen.getByText(/wrong stream chosen/i)).toBeInTheDocument()
  })
})
