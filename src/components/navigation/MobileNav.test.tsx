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
    expect(await screen.findByRole('link', { name: 'What We Do' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Admission Consulting' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Career Counselling' })).toBeInTheDocument()
  })

  it('expands the Admission Consulting submenu to show the MBA and UG pages', async () => {
    render(
      <MemoryRouter>
        <MobileNav />
      </MemoryRouter>,
    )
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /open menu/i }))

    expect(screen.queryByRole('link', { name: 'MBA Admission Counselling' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /toggle admission consulting submenu/i }))

    expect(screen.getByRole('link', { name: 'MBA Admission Counselling' })).toHaveAttribute(
      'href',
      '/mba-admission-counselling',
    )
    expect(screen.getByRole('link', { name: 'UG Admission Counselling' })).toHaveAttribute(
      'href',
      '/ug-admission-counselling',
    )
  })

  it('auto-expands the submenu and highlights Admission Consulting when landing directly on a submenu page', async () => {
    render(
      <MemoryRouter initialEntries={['/ug-admission-counselling']}>
        <MobileNav />
      </MemoryRouter>,
    )
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /open menu/i }))

    expect(await screen.findByRole('link', { name: 'UG Admission Counselling' })).toHaveAttribute(
      'href',
      '/ug-admission-counselling',
    )
    expect(screen.getByText('Admission Consulting')).toHaveClass('text-brand-green')
  })
})
