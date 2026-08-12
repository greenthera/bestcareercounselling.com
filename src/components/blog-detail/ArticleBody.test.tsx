import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ArticleBody } from './ArticleBody'
import { blogPosts } from '@/data/blogs'

describe('ArticleBody', () => {
  it('renders every section heading and paragraph, plus a matching table of contents', () => {
    const post = blogPosts[0]
    render(<ArticleBody sections={post.sections} />)

    post.sections.forEach((section) => {
      expect(screen.getAllByText(section.heading).length).toBeGreaterThanOrEqual(2) // TOC link + section heading
      expect(screen.getByText(section.paragraphs[0])).toBeInTheDocument()
    })

    expect(screen.getByRole('navigation', { name: /table of contents/i })).toBeInTheDocument()
  })
})
