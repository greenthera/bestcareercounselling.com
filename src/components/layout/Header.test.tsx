import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Header } from './Header'

describe('Header', () => {
  it('renders the logo and the primary Book Free Session CTA', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )
    expect(screen.getByText(/kishan & meeta patel/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /book free session/i })).toHaveAttribute('href', '/contact-us')
  })
})
