import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import WhoWeAre from './WhoWeAre'

describe('WhoWeAre page', () => {
  it('renders every section heading in order', () => {
    render(
      <MemoryRouter>
        <WhoWeAre />
      </MemoryRouter>,
    )

    const headingNames = [
      /30 years\. 5,000 students\./i,
      /sound familiar/i,
      /our story/i,
      /kishan & meeta/i,
      /our methodology/i,
      /our journey/i,
      /real work/i,
      /how it works/i,
      /what you walk away with/i,
      /real students\. real decisions\./i,
      /hear it from parents/i,
      /universities & colleges/i,
      /where are you right now/i,
      /let's talk about your child's future/i,
    ]

    headingNames.forEach((name) => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    })
  })

  it('renders the trust strip and Google reviews', () => {
    render(
      <MemoryRouter>
        <WhoWeAre />
      </MemoryRouter>,
    )
    expect(screen.getByText('5.0★')).toBeInTheDocument()
    expect(screen.getByText(/\[LIVE GOOGLE REVIEWS WIDGET/i)).toBeInTheDocument()
  })
})
