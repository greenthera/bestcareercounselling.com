import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ServiceNav } from './ServiceNav'

describe('ServiceNav', () => {
  it('renders an anchor link for each of the six services', () => {
    render(<ServiceNav />)
    expect(screen.getByRole('link', { name: 'After 10th' })).toHaveAttribute('href', '#after-10th')
    expect(screen.getByRole('link', { name: 'Career Change' })).toHaveAttribute('href', '#career-change')
    expect(screen.getAllByRole('link')).toHaveLength(6)
  })
})
