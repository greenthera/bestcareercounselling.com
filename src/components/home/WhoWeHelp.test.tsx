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
})
