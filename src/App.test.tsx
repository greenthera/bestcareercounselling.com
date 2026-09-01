import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('App routing', () => {
  it('renders the Home page at "/"', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )
    expect(await screen.findByRole('heading', { level: 1 }, { timeout: 5000 })).toBeInTheDocument()
  })

  it('renders the Contact Us page at "/contact-us"', async () => {
    render(
      <MemoryRouter initialEntries={['/contact-us']}>
        <App />
      </MemoryRouter>,
    )
    expect(await screen.findByText(/book your free consultation/i, {}, { timeout: 5000 })).toBeInTheDocument()
  })
})
