import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import BlogPost from './BlogPost'

function renderAtSlug(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/blogs/${slug}`]}>
      <Routes>
        <Route path="/blogs/:slug" element={<BlogPost />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('BlogPost page', () => {
  it('renders the post content, breadcrumb and SEO title for a known slug', () => {
    renderAtSlug('course-and-career-after-12th')

    expect(
      screen.getByRole('heading', { level: 1, name: /which course & career is right after 12th/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/min read/i)).toBeInTheDocument()
    expect(screen.getAllByText(/ai engineer/i).length).toBeGreaterThan(0)
    expect(document.title).toBe('Which Course & Career Is Right After 12th? | Best Career Counselling')

    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
    const data = scripts.map((s) => JSON.parse(s.textContent ?? '{}')).find((d) => d['@type'] === 'BlogPosting')
    expect(data?.headline).toBe('Which Course & Career Is Right After 12th?')
  })

  it('renders the cover image and the final CTA', () => {
    renderAtSlug('course-and-career-after-12th')

    expect(screen.getByAltText(/which course & career is right after 12th/i)).toHaveAttribute(
      'src',
      '/images/blog/course-and-career-after-12th.webp',
    )
    expect(screen.getByText(/a 15-minute call with kishan or meeta/i)).toBeInTheDocument()
  })

  it('shows the not-found page for an unknown slug', () => {
    renderAtSlug('this-post-does-not-exist')
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument()
  })
})
