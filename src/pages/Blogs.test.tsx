import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Blogs from './Blogs'
import { blogPosts } from '@/data/blogs'

describe('Blogs page', () => {
  it('renders the hero, categories and the full grid by default', () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /career guidance, explained\./i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Parenting' })).toBeInTheDocument()
    expect(document.title).toBe('Blog | Career Guidance, Explained')
  })

  it('filters the grid by category', async () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>,
    )
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Parenting' }))
    expect(screen.getByText('How to Choose a Career When Your Parents Disagree')).toBeInTheDocument()
    expect(screen.queryByText('Best Colleges in Gujarat for BBA')).not.toBeInTheDocument()
  })

  it('filters the grid by search text', async () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>,
    )
    const user = userEvent.setup()
    await user.type(screen.getByRole('searchbox'), 'drop year')
    expect(screen.getByText(blogPosts.find((p) => p.slug === 'should-my-child-take-a-drop-year')!.title)).toBeInTheDocument()
    expect(screen.queryByText('Complete Admission Timeline for Gujarat Students')).not.toBeInTheDocument()
  })
})
