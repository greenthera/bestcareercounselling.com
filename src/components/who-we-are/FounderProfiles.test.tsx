import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FounderProfiles } from './FounderProfiles'

describe('FounderProfiles', () => {
  it('renders detailed profiles for both founders', () => {
    render(<FounderProfiles />)
    expect(screen.getByRole('heading', { name: /kishan & meeta/i })).toBeInTheDocument()
    expect(screen.getByText('Kishan Patel')).toBeInTheDocument()
    expect(screen.getByText('Meeta Patel')).toBeInTheDocument()
    expect(screen.getAllByText(/edumilestones/i).length).toBeGreaterThan(0)
  })
})
