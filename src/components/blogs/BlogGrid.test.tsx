import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { BlogGrid } from './BlogGrid'
import { blogPosts } from '@/data/blogs'

describe('BlogGrid', () => {
  it('paginates at 6 posts per page and shows a Next control', async () => {
    render(
      <MemoryRouter>
        <BlogGrid posts={blogPosts} />
      </MemoryRouter>,
    )
    expect(screen.getAllByRole('link', { name: /min read/i }).length).toBeLessThanOrEqual(6)

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText(blogPosts[6].title)).toBeInTheDocument()
  })

  it('shows an empty state when there are no posts to show', () => {
    render(
      <MemoryRouter>
        <BlogGrid posts={[]} />
      </MemoryRouter>,
    )
    expect(screen.getByText(/no articles match/i)).toBeInTheDocument()
  })
})
