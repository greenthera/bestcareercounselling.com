import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { DesktopNav } from './DesktopNav'

describe('DesktopNav', () => {
  it('renders all six primary nav links', () => {
    render(
      <MemoryRouter>
        <DesktopNav />
      </MemoryRouter>,
    )
    ;['Home', 'Who We Are', 'What We Do', 'Admission Consulting', 'Career Counselling', 'Contact Us'].forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    })
  })

  it('reveals the MBA and UG pages in the Admission Consulting submenu on click', async () => {
    render(
      <MemoryRouter>
        <DesktopNav />
      </MemoryRouter>,
    )
    const user = userEvent.setup()

    expect(screen.queryByRole('link', { name: 'MBA Admission Counselling' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /admission consulting submenu/i }))

    expect(screen.getByRole('link', { name: 'MBA Admission Counselling' })).toHaveAttribute(
      'href',
      '/mba-admission-counselling',
    )
    expect(screen.getByRole('link', { name: 'UG Admission Counselling' })).toHaveAttribute(
      'href',
      '/ug-admission-counselling',
    )
  })

  it('highlights Admission Consulting when landing directly on a submenu page', () => {
    render(
      <MemoryRouter initialEntries={['/mba-admission-counselling']}>
        <DesktopNav />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Admission Consulting' })).toHaveClass('text-brand-green')
  })
})
