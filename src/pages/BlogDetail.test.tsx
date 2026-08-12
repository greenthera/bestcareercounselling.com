import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import BlogDetail from './BlogDetail'
import { blogPosts } from '@/data/blogs'

function renderAtSlug(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/blogs/${slug}`]}>
      <Routes>
        <Route path="/blogs/:slug" element={<BlogDetail />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('BlogDetail page', () => {
  it('renders breadcrumb, header, article body, inline CTA, sidebar form, author bio and related posts', () => {
    const post = blogPosts[0]
    renderAtSlug(post.slug)

    expect(screen.getByRole('link', { name: 'Blogs' })).toHaveAttribute('href', '/blogs')
    expect(screen.getByRole('heading', { level: 1, name: post.title })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: post.sections[0].heading })).toBeInTheDocument()
    expect(screen.getByText(/not sure what is right for your child/i)).toBeInTheDocument()
    expect(screen.getAllByLabelText(/student name/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText('Kishan Patel').length).toBeGreaterThan(0)
  })

  it('renders an honest not-found state for an unknown slug', () => {
    renderAtSlug('this-slug-does-not-exist')
    expect(screen.getByRole('heading', { name: /article not found/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to blogs/i })).toHaveAttribute('href', '/blogs')
  })
})
