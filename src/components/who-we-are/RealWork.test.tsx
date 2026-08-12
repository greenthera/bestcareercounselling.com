import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RealWork } from './RealWork'

describe('RealWork', () => {
  it('renders the heading and a grid of photo placeholders', () => {
    render(<RealWork />)
    expect(screen.getByRole('heading', { name: /real work/i })).toBeInTheDocument()
    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(4)
  })
})
