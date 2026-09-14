import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    expect(screen.getByRole('button', { name: /submit enquiry/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /which online program are you looking for/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /we help you decide/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /have questions before your child applies/i })).toBeInTheDocument()
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

  it('reuses the Who We Are Real Work gallery with its lightbox', async () => {
    const user = userEvent.setup()
    renderPage()

    expect(screen.getByRole('heading', { name: /real work/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /view photo: our office in surat/i }))
    expect(screen.getByText('1 / 4')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /next photo/i }))
    expect(screen.getByText('2 / 4')).toBeInTheDocument()
  })
})
