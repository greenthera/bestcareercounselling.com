import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageLoader } from './page-loader'

describe('PageLoader', () => {
  it('renders a status region announcing the loading state', () => {
    render(<PageLoader />)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText('Loading…')).toBeInTheDocument()
  })
})
