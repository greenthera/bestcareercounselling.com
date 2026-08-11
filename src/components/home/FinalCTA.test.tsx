import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FinalCTA } from './FinalCTA'

describe('FinalCTA', () => {
  it('renders the closing heading and a consultation form', () => {
    render(<FinalCTA />)
    expect(screen.getByRole('heading', { name: /let's talk about your child's future/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/student name/i)).toBeInTheDocument()
  })
})
