import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VideoTestimonials } from './VideoTestimonials'

describe('VideoTestimonials', () => {
  it('renders a card for each video testimonial', () => {
    render(<VideoTestimonials />)
    expect(screen.getByRole('heading', { name: /hear it from parents/i })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /play testimonial/i })).toHaveLength(3)
  })

  it('opens a modal with the testimonial details when played', async () => {
    render(<VideoTestimonials />)
    const user = userEvent.setup()
    await user.click(screen.getAllByRole('button', { name: /play testimonial/i })[0])
    expect(await screen.findByText(/parent · surat/i)).toBeInTheDocument()
  })
})
