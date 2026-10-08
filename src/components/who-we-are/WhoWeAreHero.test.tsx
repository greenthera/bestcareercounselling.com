import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WhoWeAreHero } from './WhoWeAreHero'

describe('WhoWeAreHero', () => {
  it('renders the H1 and subheading', () => {
    render(<WhoWeAreHero />)
    expect(
      screen.getByRole('heading', { level: 1, name: /meet kishan & meeta patel, your career counsellors/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/what should i do with my life/i)).toBeInTheDocument()
  })
})
