import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WhatHappensOnCall } from './WhatHappensOnCall'

describe('WhatHappensOnCall', () => {
  it('renders all four steps and the closing line', () => {
    render(<WhatHappensOnCall />)
    expect(screen.getByRole('heading', { name: /what happens on the call/i })).toBeInTheDocument()
    const steps = screen.getAllByRole('listitem')
    expect(steps).toHaveLength(4)
    expect(steps[0]).toHaveTextContent(/understand current class, marks and interests/i)
    expect(steps[3]).toHaveTextContent(/decide next steps/i)
    expect(screen.getByText(/not a sales team/i)).toBeInTheDocument()
  })
})
