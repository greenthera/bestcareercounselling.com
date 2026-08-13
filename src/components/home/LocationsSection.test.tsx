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

  it('shows a map only for Surat', () => {
    render(<LocationsSection />)
    expect(screen.getByRole('img', { name: /map showing our surat office location/i })).toBeInTheDocument()
  })
})
