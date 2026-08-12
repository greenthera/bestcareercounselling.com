import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SuccessStories from './SuccessStories'

describe('SuccessStories page', () => {
  it('renders every section heading in order', () => {
    render(
      <MemoryRouter>
        <SuccessStories />
      </MemoryRouter>,
    )

    const headingNames = [
      /real students\. real decisions\. real outcomes\./i,
      /hear it from parents/i,
      /what makes the difference/i,
      /your child's story could be next/i,
    ]

    headingNames.forEach((name) => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    })
  })

  it('renders the trust strip, featured case study and Google reviews', () => {
    render(
      <MemoryRouter>
        <SuccessStories />
      </MemoryRouter>,
    )
    expect(screen.getByText('5.0★')).toBeInTheDocument()
    expect(screen.getAllByText('Was').length).toBeGreaterThan(0)
    expect(screen.getByText(/\[LIVE GOOGLE REVIEWS WIDGET/i)).toBeInTheDocument()
  })
})
