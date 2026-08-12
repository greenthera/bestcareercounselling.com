import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ArticleHeader } from './ArticleHeader'
import { blogPosts } from '@/data/blogs'

describe('ArticleHeader', () => {
  it('renders category, H1, date, read time and author name', () => {
    const post = blogPosts[0]
    render(<ArticleHeader post={post} />)
    expect(screen.getByText(post.category)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: post.title })).toBeInTheDocument()
    expect(screen.getByText(post.readTime)).toBeInTheDocument()
    expect(screen.getByText(post.date)).toBeInTheDocument()
    expect(screen.getByText('Kishan Patel')).toBeInTheDocument()
  })
})
