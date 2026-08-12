import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FeaturedCaseStudy } from './FeaturedCaseStudy'

describe('FeaturedCaseStudy', () => {
  it('renders the first story with Was/Found/Chose/Now labels and student meta', () => {
    render(<FeaturedCaseStudy />)
    expect(screen.getByText('Was')).toBeInTheDocument()
    expect(screen.getByText('Found')).toBeInTheDocument()
    expect(screen.getByText('Chose')).toBeInTheDocument()
    expect(screen.getByText('Now')).toBeInTheDocument()
    expect(screen.getByText(/class 10/i)).toBeInTheDocument()
    expect(screen.getByText(/surat/i)).toBeInTheDocument()
    expect(screen.getByText('After 10th')).toBeInTheDocument()
  })
})
