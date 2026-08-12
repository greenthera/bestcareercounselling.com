import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AuthorBio } from './AuthorBio'

describe('AuthorBio', () => {
  it("renders Kishan's bio card", () => {
    render(<AuthorBio author="kishan" />)
    expect(screen.getByText('Kishan Patel')).toBeInTheDocument()
    expect(screen.getByText(/edumilestones/i)).toBeInTheDocument()
  })

  it("renders Meeta's bio card", () => {
    render(<AuthorBio author="meeta" />)
    expect(screen.getByText('Meeta Patel')).toBeInTheDocument()
  })
})
