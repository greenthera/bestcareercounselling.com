import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FinalCTA } from './FinalCTA'

describe('FinalCTA', () => {
  it('renders the closing heading and a consultation form', () => {
    render(<FinalCTA />)
    expect(screen.getByRole('heading', { name: /let's talk about your child's future/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/student name/i)).toBeInTheDocument()
  })

  it('renders custom heading, description and submit label when provided', () => {
    render(
      <FinalCTA
        heading="Not sure which counselling service you need?"
        description="Talk to us and we'll point you to the right one."
        submitLabel="Book a Free Consultation"
      />,
    )
    expect(screen.getByRole('heading', { name: /not sure which counselling service you need/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Book a Free Consultation' })).toBeInTheDocument()
  })
})
