import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { InlineCTA } from './InlineCTA'

describe('InlineCTA', () => {
  it('renders the mid-article prompt with a link to Contact Us', () => {
    render(
      <MemoryRouter>
        <InlineCTA />
      </MemoryRouter>,
    )
    expect(screen.getByText(/not sure what is right for your child/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /book a free consultation/i })).toHaveAttribute('href', '/contact-us')
  })
})
