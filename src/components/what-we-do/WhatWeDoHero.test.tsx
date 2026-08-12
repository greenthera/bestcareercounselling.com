import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WhatWeDoHero } from './WhatWeDoHero'

describe('WhatWeDoHero', () => {
  it('renders the H1 and subheading', () => {
    render(<WhatWeDoHero />)
    expect(
      screen.getByRole('heading', { level: 1, name: /career guidance for every important decision/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/from choosing a stream after class 10 to changing careers/i)).toBeInTheDocument()
  })
})
