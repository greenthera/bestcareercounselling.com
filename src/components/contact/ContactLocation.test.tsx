import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContactLocation } from './ContactLocation'

describe('ContactLocation', () => {
  it('renders Surat office details and a map', () => {
    render(<ContactLocation />)
    expect(screen.getByRole('heading', { name: /meet us in surat/i })).toBeInTheDocument()
    expect(screen.getByText('Surat Office')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /map showing our surat office location/i })).toBeInTheDocument()
    expect(screen.getByText('Surat, Gujarat')).toBeInTheDocument()
  })
})
