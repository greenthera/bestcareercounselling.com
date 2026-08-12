import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UniversitiesSection } from './UniversitiesSection'

describe('UniversitiesSection', () => {
  it('renders the heading and a placeholder for verified institution logos', () => {
    render(<UniversitiesSection />)
    expect(screen.getByRole('heading', { name: /universities & colleges/i })).toBeInTheDocument()
    expect(screen.getByText(/\[CLIENT TO PROVIDE VERIFIED INSTITUTION LOGOS/i)).toBeInTheDocument()
  })
})
