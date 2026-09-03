import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ExploreUniversities } from './ExploreUniversities'

describe('ExploreUniversities', () => {
  it('renders the heading and a link to the external course explorer', () => {
    render(<ExploreUniversities />)
    expect(screen.getByRole('heading', { name: /explore universities/i })).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /view all/i })
    expect(link).toHaveAttribute('href', 'https://careertest.edumilestones.com/online-courses/universities/NTEy')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders university logo tiles', () => {
    const { container } = render(<ExploreUniversities />)
    expect(container.querySelectorAll('img').length).toBeGreaterThan(0)
  })
})
