import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { WhoWeHelp } from './WhoWeHelp'

describe('WhoWeHelp', () => {
  it('renders all six service cards linking to /what-we-do anchors', () => {
    render(
      <MemoryRouter>
        <WhoWeHelp />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: /after 10th/i })
    expect(link).toHaveAttribute('href', '/what-we-do#after-10th')
    expect(screen.getAllByRole('link')).toHaveLength(6)
  })

  it('marks the focused service as the active one', async () => {
    render(
      <MemoryRouter>
        <WhoWeHelp />
      </MemoryRouter>,
    )
    // First service is active by default.
    expect(screen.getByRole('link', { name: /after 10th/i })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('link', { name: /career change/i })).not.toHaveAttribute('aria-current')

    screen.getByRole('link', { name: /career change/i }).focus()

    expect(await screen.findByRole('link', { name: /career change/i })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('link', { name: /after 10th/i })).not.toHaveAttribute('aria-current')
  })
})
