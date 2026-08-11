import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { MobileNav } from './MobileNav'

describe('MobileNav', () => {
  it('opens the menu and shows nav links when the hamburger is clicked', async () => {
    render(
      <MemoryRouter>
        <MobileNav />
      </MemoryRouter>,
    )
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /open menu/i }))
    expect(await screen.findByRole('link', { name: 'Success Stories' })).toBeInTheDocument()
  })
})
