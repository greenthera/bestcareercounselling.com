import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PrivacyPolicy from './PrivacyPolicy'

describe('PrivacyPolicy page', () => {
  it('renders the heading and key sections', () => {
    render(
      <MemoryRouter>
        <PrivacyPolicy />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /privacy policy/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /information we collect/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument()
    expect(document.title).toBe('Privacy Policy | Best Career Counselling')
  })
})
