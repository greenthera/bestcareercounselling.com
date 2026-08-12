import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OurStory } from './OurStory'

describe('OurStory', () => {
  it('renders the heading and all four narrative topics', () => {
    render(<OurStory />)
    expect(screen.getByRole('heading', { name: /our story/i })).toBeInTheDocument()
    expect(screen.getByText(/before career counselling/i)).toBeInTheDocument()
    expect(screen.getByText(/the moment that started it/i)).toBeInTheDocument()
    expect(screen.getByText(/why surat/i)).toBeInTheDocument()
    expect(screen.getByText(/why meeta joined/i)).toBeInTheDocument()
  })
})
