import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SuccessStoriesHero } from './SuccessStoriesHero'

describe('SuccessStoriesHero', () => {
  it('renders the H1 and subheading', () => {
    render(<SuccessStoriesHero />)
    expect(
      screen.getByRole('heading', { level: 1, name: /real students\. real decisions\. real outcomes\./i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/moved from confusion to clarity/i)).toBeInTheDocument()
  })
})
