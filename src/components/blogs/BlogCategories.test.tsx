import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BlogCategories } from './BlogCategories'

describe('BlogCategories', () => {
  it('renders all six categories plus All, and reports selection', async () => {
    const onSelect = vi.fn()
    render(<BlogCategories selected="All" onSelect={onSelect} />)

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Parenting' })).toBeInTheDocument()

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Exams' }))
    expect(onSelect).toHaveBeenCalledWith('Exams')
  })
})
