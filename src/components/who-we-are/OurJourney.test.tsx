import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OurJourney } from './OurJourney'

describe('OurJourney', () => {
  it('renders a timeline with milestone entries', () => {
    render(<OurJourney />)
    expect(screen.getByRole('heading', { name: /our journey/i })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(3)
  })
})
