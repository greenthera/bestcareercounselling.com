import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ServiceComparisonTable } from './ServiceComparisonTable'

describe('ServiceComparisonTable', () => {
  it('renders a row for each service with no pricing column', () => {
    render(<ServiceComparisonTable />)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Service' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Best Time to Start' })).toBeInTheDocument()
    expect(screen.queryByRole('columnheader', { name: /price/i })).not.toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(7) // header + 6 services
  })
})
