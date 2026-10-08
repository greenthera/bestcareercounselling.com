import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Breadcrumbs } from './Breadcrumbs'

function renderBreadcrumbs(items: { label: string; path: string }[]) {
  return render(
    <MemoryRouter>
      <Breadcrumbs items={items} />
    </MemoryRouter>,
  )
}

describe('Breadcrumbs', () => {
  it('renders a visible Home > Page trail with the current page not a link', () => {
    renderBreadcrumbs([{ label: 'Career Counselling', path: '/career-counselling' }])

    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveAttribute('href', '/')

    const current = screen.getByText('Career Counselling')
    expect(current.tagName).toBe('SPAN')
    expect(current).toHaveAttribute('aria-current', 'page')
    expect(screen.queryByRole('link', { name: 'Career Counselling' })).not.toBeInTheDocument()
  })

  it('defaults to the site-wide max width and switches when a page passes a narrower one', () => {
    const { container, rerender } = renderBreadcrumbs([{ label: 'Career Counselling', path: '/career-counselling' }])
    expect(container.querySelector('ol')).toHaveClass('max-w-7xl')

    rerender(
      <MemoryRouter>
        <Breadcrumbs items={[{ label: 'Terms of Service', path: '/terms' }]} maxWidthClassName="max-w-3xl" />
      </MemoryRouter>,
    )
    expect(container.querySelector('ol')).toHaveClass('max-w-3xl')
    expect(container.querySelector('ol')).not.toHaveClass('max-w-7xl')
  })

  it('renders every intermediate level as a link for a nested trail', () => {
    renderBreadcrumbs([
      { label: 'Admission Consulting', path: '/admission-consulting' },
      { label: 'Online University Admissions', path: '/admission-consulting/online-admissions' },
    ])

    expect(screen.getByRole('link', { name: 'Admission Consulting' })).toHaveAttribute(
      'href',
      '/admission-consulting',
    )
    expect(screen.getByText('Online University Admissions')).toHaveAttribute('aria-current', 'page')
  })

  it('embeds a matching BreadcrumbList JSON-LD without a URL on the current page', () => {
    renderBreadcrumbs([
      { label: 'Admission Consulting', path: '/admission-consulting' },
      { label: 'Online University Admissions', path: '/admission-consulting/online-admissions' },
    ])

    const script = document.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}')

    expect(data['@context']).toBe('https://schema.org')
    expect(data['@type']).toBe('BreadcrumbList')
    expect(data.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bestcareercounselling.com/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Admission Consulting',
        item: 'https://bestcareercounselling.com/admission-consulting',
      },
      { '@type': 'ListItem', position: 3, name: 'Online University Admissions' },
    ])
  })
})
