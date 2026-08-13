import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GoogleReviews } from './GoogleReviews'

describe('GoogleReviews', () => {
  it('renders the aggregate rating summary', () => {
    render(<GoogleReviews />)
    expect(screen.getByText(/5\.0/)).toBeInTheDocument()
    expect(screen.getByText(/900\+ google reviews/i)).toBeInTheDocument()
  })

  it('renders written testimonial cards', () => {
    render(<GoogleReviews />)
    expect(screen.getByText('Priya Shah')).toBeInTheDocument()
    expect(screen.getByText(/one session with kishan sir made it obvious/i)).toBeInTheDocument()
  })
})
