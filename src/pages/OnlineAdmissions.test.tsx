import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import OnlineAdmissions from './OnlineAdmissions'

function renderPage() {
  return render(
    <MemoryRouter>
      <OnlineAdmissions />
    </MemoryRouter>,
  )
}

describe('OnlineAdmissions page', () => {
  it('renders the hero, key sections and the match form', () => {
    renderPage()
    expect(
      screen.getByRole('heading', { level: 1, name: /get into the right online university/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/find your best-fit university/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /show my options/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /which online program are you looking for/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /we help you decide/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /parents: have questions/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /explore online bca/i })).toBeInTheDocument()
  })

  it('sets the page title and links CTAs to the match form', () => {
    renderPage()
    expect(document.title).toBe(
      'Online University Admissions | MBA, MCA, BBA, BCA, B.Com | Best Career Counselling',
    )
    const eligibilityCta = screen.getByRole('link', { name: /check my eligibility/i })
    expect(eligibilityCta).toHaveAttribute('href', '#match')
  })

  it('is indexable', () => {
    renderPage()
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('index, follow')
  })
})
