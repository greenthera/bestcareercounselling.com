import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WhatMakesTheDifference } from './WhatMakesTheDifference'

describe('WhatMakesTheDifference', () => {
  it('contrasts generic advice with the assessment-based approach', () => {
    render(<WhatMakesTheDifference />)
    expect(screen.getByRole('heading', { name: /what makes the difference/i })).toBeInTheDocument()
    expect(screen.getByText(/generic career advice/i)).toBeInTheDocument()
    expect(screen.getByText(/assessment \+ counselling \+ personalised roadmap/i)).toBeInTheDocument()
  })
})
