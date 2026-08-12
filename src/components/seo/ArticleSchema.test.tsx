import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ArticleSchema } from './ArticleSchema'
import { blogPosts } from '@/data/blogs'

describe('ArticleSchema', () => {
  it('embeds Article structured data for the given post', () => {
    const post = blogPosts[0]
    render(<ArticleSchema post={post} />)
    const script = document.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}')
    expect(data['@type']).toBe('Article')
    expect(data.headline).toBe(post.title)
    expect(data.datePublished).toBe(post.date)
    expect(data.author.name).toBe('Kishan Patel')
  })
})
