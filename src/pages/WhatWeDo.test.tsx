import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import WhatWeDo from './WhatWeDo'

describe('WhatWeDo page', () => {
  it('renders the hero and all six service sections', () => {
    render(
      <MemoryRouter>
        <WhatWeDo />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 1, name: /career guidance for every important decision/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /career counselling after 10th/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /career counselling after 12th/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'UG & PG Admission' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'MBA & Professional' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Study Abroad' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Career Change' })).toBeInTheDocument()
    expect(document.title).toBe('What We Do | Career Counselling Services')
  })

  it('renders the Admission Consulting and Career Counselling category links', () => {
    render(
      <MemoryRouter>
        <WhatWeDo />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /admission consulting/i })).toHaveAttribute(
      'href',
      '/admission-consulting',
    )
    expect(screen.getByRole('link', { name: /career counselling/i })).toHaveAttribute('href', '/career-counselling')
  })

  it('does not render the removed sections', () => {
    render(
      <MemoryRouter>
        <WhatWeDo />
      </MemoryRouter>,
    )
    expect(screen.queryByRole('heading', { name: /sound familiar/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /not sure which counselling service you need/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})
