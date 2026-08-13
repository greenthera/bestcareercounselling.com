import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TrustStrip } from './TrustStrip'

describe('TrustStrip', () => {
  it('renders all six credibility indicators', () => {
    render(<TrustStrip />)
    expect(screen.getByText('5.0')).toBeInTheDocument()
    expect(screen.getByText('Google Rating')).toBeInTheDocument()
    expect(screen.getByText('30+')).toBeInTheDocument()
    expect(screen.getByText('Years')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('Edumilestones')).toBeInTheDocument()
  })
})
