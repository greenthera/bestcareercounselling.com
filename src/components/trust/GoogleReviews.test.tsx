import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GoogleReviews } from './GoogleReviews'

describe('GoogleReviews', () => {
  it('renders the aggregate rating summary', () => {
    render(<GoogleReviews />)
    expect(screen.getByText(/5\.0/)).toBeInTheDocument()
    expect(screen.getByText(/900\+ google reviews/i)).toBeInTheDocument()
  })

  it('marks itself as a placeholder pending live integration', () => {
    render(<GoogleReviews />)
    expect(screen.getByText(/\[LIVE GOOGLE REVIEWS WIDGET/i)).toBeInTheDocument()
  })
})
