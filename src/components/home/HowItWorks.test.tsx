import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HowItWorks } from './HowItWorks'

describe('HowItWorks', () => {
  it('renders all four steps in order', () => {
    render(<HowItWorks />)
    const steps = screen.getAllByRole('listitem')
    expect(steps).toHaveLength(4)
    expect(steps[0]).toHaveTextContent('PreCounselling')
    expect(steps[3]).toHaveTextContent('FutureRoadmap & Admission')
    expect(screen.getByText(/end-to-end support/i)).toBeInTheDocument()
  })
})
