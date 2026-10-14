import { describe, it, expect } from 'vitest'
import { getAllBlogPosts, getBlogPostBySlug, filterBlogPosts } from './blog'

describe('blog loader', () => {
  it('loads the sample post with parsed frontmatter and a derived slug', () => {
    const posts = getAllBlogPosts()
    expect(posts.length).toBeGreaterThan(0)

    const post = posts.find((p) => p.slug === 'course-and-career-after-12th')
    expect(post).toBeDefined()
    expect(post?.title).toBe('Which Course & Career Is Right After 12th?')
    expect(post?.description).toContain('Best courses and career options after 12th')
    expect(post?.date).toBe('2026-10-14')
    expect(post?.category).toBe('After 12th')
    expect(post?.readingTimeMinutes).toBeGreaterThan(0)
    expect(post?.content).not.toContain('---')
  })

  it('finds a post by slug and returns undefined for an unknown one', () => {
    expect(getBlogPostBySlug('course-and-career-after-12th')).toBeDefined()
    expect(getBlogPostBySlug('does-not-exist')).toBeUndefined()
  })

  it('filters by search text and category', () => {
    expect(filterBlogPosts('AI Engineer', 'All').length).toBeGreaterThan(0)
    expect(filterBlogPosts('commerce', 'All').length).toBeGreaterThan(0)
    expect(filterBlogPosts('something that will never appear anywhere', 'All')).toHaveLength(0)
    expect(filterBlogPosts('', 'All').length).toBe(getAllBlogPosts().length)
    expect(filterBlogPosts('', 'After 12th').length).toBeGreaterThan(0)
    expect(filterBlogPosts('', 'Exams')).toHaveLength(0)
  })
})
