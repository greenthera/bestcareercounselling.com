import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LocationsSection } from './LocationsSection'

describe('LocationsSection', () => {
  it('renders a card for each of the four cities', () => {
    render(<LocationsSection />)
    expect(screen.getByRole('heading', { name: /meet us in person/i })).toBeInTheDocument()
    ;['Surat', 'Navsari', 'Ankleshwar', 'Valsad'].forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument()
    })
  })

  it('shows a map placeholder only for Surat', () => {
    render(<LocationsSection />)
    expect(screen.getByText(/\[MAP — SURAT\]/i)).toBeInTheDocument()
  })
})
