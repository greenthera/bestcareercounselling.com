import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFound from './NotFound'

describe('NotFound page', () => {
  it('renders the heading and links back to the homepage and contact page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to homepage/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /contact us/i })).toHaveAttribute('href', '/contact-us')
    expect(document.title).toBe('Page Not Found | Best Career Counselling')
  })

  it('marks the page as noindex', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    )
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex, nofollow')
  })
})
