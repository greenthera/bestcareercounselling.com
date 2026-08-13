import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WhoWeAreHero } from './WhoWeAreHero'

describe('WhoWeAreHero', () => {
  it('renders the H1 and subheading', () => {
    render(<WhoWeAreHero />)
    expect(
      screen.getByRole('heading', { level: 1, name: /30\+ years\. 5,000\+ students\. one question we keep answering\./i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/what should i do with my life/i)).toBeInTheDocument()
  })
})
