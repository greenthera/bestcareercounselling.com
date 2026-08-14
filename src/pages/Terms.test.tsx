import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Terms from './Terms'

describe('Terms page', () => {
  it('renders the heading and key sections', () => {
    render(
      <MemoryRouter>
        <Terms />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /terms of service/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /services provided/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /limitation of liability/i })).toBeInTheDocument()
    expect(document.title).toBe('Terms of Service | Best Career Counselling')
  })
})
