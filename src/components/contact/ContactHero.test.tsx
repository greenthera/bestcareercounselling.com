import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContactHero } from './ContactHero'

describe('ContactHero', () => {
  it('renders the H1 and subheading', () => {
    render(<ContactHero />)
    expect(screen.getByRole('heading', { level: 1, name: /book your free consultation/i })).toBeInTheDocument()
    expect(screen.getByText(/15 minutes with kishan or meeta/i)).toBeInTheDocument()
  })
})
