import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DummyMap } from './dummy-map'

describe('DummyMap', () => {
  it('renders a labeled map placeholder for the given city', () => {
    render(<DummyMap city="Surat" />)
    expect(screen.getByRole('img', { name: /map showing our surat office location/i })).toBeInTheDocument()
    expect(screen.getByText('Surat, Gujarat')).toBeInTheDocument()
  })
})
