import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders the brand name and Google rating', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
    expect(screen.getByText(/best career counselling/i)).toBeInTheDocument()
    expect(screen.getByText(/5\.0★/)).toBeInTheDocument()
    expect(screen.getByText(/900\+ reviews/i)).toBeInTheDocument()
  })

  it('renders the four city names', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
    ;['Surat', 'Navsari', 'Ankleshwar', 'Valsad'].forEach((city) => {
      expect(screen.getByText(new RegExp(city))).toBeInTheDocument()
    })
  })

  it('renders all six service links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'After 10th' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Career Change' })).toBeInTheDocument()
  })
})
