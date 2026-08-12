import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StoryFilterGrid } from './StoryFilterGrid'

describe('StoryFilterGrid', () => {
  it('shows all stories by default under the "All" tab', () => {
    render(<StoryFilterGrid />)
    expect(screen.getByText(/class 10/i)).toBeInTheDocument()
    expect(screen.getByText(/class 12/i)).toBeInTheDocument()
    expect(screen.getByText(/working professional/i)).toBeInTheDocument()
  })

  it('filters to a single story when its category tab is selected', async () => {
    render(<StoryFilterGrid />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('tab', { name: 'After 12th' }))
    expect(screen.getByText(/class 12/i)).toBeInTheDocument()
    expect(screen.queryByText(/class 10/i)).not.toBeInTheDocument()
  })

  it('shows an empty state for a category with no seeded stories yet', async () => {
    render(<StoryFilterGrid />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('tab', { name: 'Study Abroad' }))
    expect(screen.getByText(/no stories in this category yet/i)).toBeInTheDocument()
  })
})
