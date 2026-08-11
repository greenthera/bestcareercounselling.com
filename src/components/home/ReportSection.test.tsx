import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ReportSection } from './ReportSection'

describe('ReportSection', () => {
  it('renders the heading and all five deliverables', () => {
    render(<ReportSection />)
    expect(screen.getByRole('heading', { name: /what you walk away with/i })).toBeInTheDocument()
    expect(screen.getByText(/32-page career report/i)).toBeInTheDocument()
    expect(screen.getByText(/college and course list/i)).toBeInTheDocument()
  })
})
