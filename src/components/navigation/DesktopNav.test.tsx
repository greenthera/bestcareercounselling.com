import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DesktopNav } from './DesktopNav'

describe('DesktopNav', () => {
  it('renders all six primary nav links', () => {
    render(
      <MemoryRouter>
        <DesktopNav />
      </MemoryRouter>,
    )
    ;['Home', 'Who We Are', 'What We Do', 'Success Stories', 'Blogs', 'Contact Us'].forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    })
  })
})
