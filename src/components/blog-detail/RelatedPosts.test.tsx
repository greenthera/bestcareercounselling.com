import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { RelatedPosts } from './RelatedPosts'
import { blogPosts } from '@/data/blogs'

describe('RelatedPosts', () => {
  it('renders up to 3 other posts from the same category, excluding the current one', () => {
    const current = blogPosts.find((p) => p.slug === 'career-counselling-in-surat-what-to-expect')!
    render(
      <MemoryRouter>
        <RelatedPosts currentSlug={current.slug} category={current.category} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: /related articles/i })).toBeInTheDocument()
    expect(screen.queryByText(current.title)).not.toBeInTheDocument()
    expect(screen.getByText('Career Counselling in Navsari, Ankleshwar and Valsad')).toBeInTheDocument()
  })
})
