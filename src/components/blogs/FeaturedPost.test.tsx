import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { FeaturedPost } from './FeaturedPost'
import { blogPosts } from '@/data/blogs'

describe('FeaturedPost', () => {
  it('renders the given post title, category, excerpt and a link to its detail page', () => {
    render(
      <MemoryRouter>
        <FeaturedPost post={blogPosts[0]} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: blogPosts[0].title })).toBeInTheDocument()
    expect(screen.getByText(blogPosts[0].category)).toBeInTheDocument()
    expect(screen.getByText(blogPosts[0].excerpt)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: new RegExp(blogPosts[0].title) })).toHaveAttribute(
      'href',
      `/blogs/${blogPosts[0].slug}`,
    )
  })
})
