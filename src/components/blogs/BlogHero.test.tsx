import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BlogHero } from './BlogHero'

describe('BlogHero', () => {
  it('renders the H1 and calls onSearchChange as the visitor types', async () => {
    const onSearchChange = vi.fn()
    render(<BlogHero searchValue="" onSearchChange={onSearchChange} />)

    expect(screen.getByRole('heading', { level: 1, name: /career guidance, explained\./i })).toBeInTheDocument()

    const user = userEvent.setup()
    await user.type(screen.getByRole('searchbox'), 'stream')
    expect(onSearchChange).toHaveBeenCalled()
  })
})
