import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import WhatWeDo from './WhatWeDo'

describe('WhatWeDo page', () => {
  it('renders the hero, all six service sections, and the comparison table', () => {
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
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(document.title).toBe('What We Do | Career Counselling Services')
  })

  it('renders the shared sections and final CTA', () => {
    render(
      <MemoryRouter>
        <WhatWeDo />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: /sound familiar/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /not sure which counselling service you need/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Book a Free Consultation' })).toBeInTheDocument()
  })
})
