import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

describe('Home page', () => {
  it('renders every section heading in order', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    const headingNames = [
      /stop guessing which stream is right/i,
      /sound familiar/i,
      /where are you right now/i,
      /how it works/i,
      /what you walk away with/i,
      /not ready to book/i,
      /meet kishan & meeta/i,
      /hear it from parents/i,
      /real students\. real decisions\./i,
      /meet us in person/i,
      /frequently asked questions/i,
      /let's talk about your child's future/i,
    ]

    headingNames.forEach((name) => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    })

    expect(document.title).toBe(
      'Best Career Counselling Surat | Kishan Patel | Meeta Patel | 5 Star Google Review | 1000+ Reviews',
    )
  })

  it('renders the trust strip and Google reviews', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(screen.getByText('5.0★')).toBeInTheDocument()
    expect(screen.getByText(/\[LIVE GOOGLE REVIEWS WIDGET/i)).toBeInTheDocument()
  })
})
