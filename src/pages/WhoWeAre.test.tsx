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
      /30\+ years\. 5,000\+ students\./i,
      /our story/i,
      /kishan & meeta/i,
      /our methodology/i,
      /our journey/i,
      /real work/i,
      /how it works/i,
      /universities & colleges/i,
      /let's talk about your child's future/i,
    ]

    headingNames.forEach((name) => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    })

    expect(document.title).toBe('Who We Are | Kishan & Meeta Patel Career Counselling')
  })

  it('renders a single Book Free Session CTA button', () => {
    render(
      <MemoryRouter>
        <WhoWeAre />
      </MemoryRouter>,
    )
    expect(screen.getAllByRole('link', { name: /book free session/i }).length).toBeGreaterThan(0)
  })
})
