import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MeetFounders } from './MeetFounders'

describe('MeetFounders', () => {
  it('renders both founders and a link to the full story', () => {
    render(
      <MemoryRouter>
        <MeetFounders />
      </MemoryRouter>,
    )
    expect(screen.getByText('Kishan Patel')).toBeInTheDocument()
    expect(screen.getByText('Meeta Patel')).toBeInTheDocument()
    expect(screen.getByText(/edumilestones/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /read our full story/i })).toHaveAttribute('href', '/who-we-are')
  })
})
