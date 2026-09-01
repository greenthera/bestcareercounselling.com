import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GoogleReviewsCarousel } from './GoogleReviewsCarousel'
import googleReviews from '@/data/googleReviews.json'

describe('GoogleReviewsCarousel', () => {
  it('renders the aggregate rating summary', () => {
    render(<GoogleReviewsCarousel />)
    expect(screen.getByRole('heading', { name: /loved on google/i })).toBeInTheDocument()
    expect(screen.getByText(/5\.0 · 948 google reviews/i)).toBeInTheDocument()
  })

  it('renders every review, each duplicated once for the seamless marquee loop', () => {
    render(<GoogleReviewsCarousel />)
    const firstReview = googleReviews[0]
    expect(screen.getAllByText(firstReview.name).length).toBeGreaterThanOrEqual(2)
  })
})
