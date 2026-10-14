import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { PageSeo } from './PageSeo'

describe('PageSeo', () => {
  it('sets the document title and meta description', () => {
    render(<PageSeo title="Test Title" description="Test description" path="/test" />)
    expect(document.title).toBe('Test Title')
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Test description')
  })

  it('sets a canonical link built from SITE_URL and the given path', () => {
    render(<PageSeo title="Test Title" description="Test description" path="/test" />)
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://bestcareercounselling.com/test',
    )
  })

  it('sets Open Graph and Twitter Card tags', () => {
    render(<PageSeo title="Test Title" description="Test description" path="/test" />)
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('Test Title')
    expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe(
      'Test description',
    )
    expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe('summary_large_image')
  })

  it('sets an absolute og:image and twitter:image', () => {
    render(<PageSeo title="Test Title" description="Test description" path="/test" />)
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content')
    expect(ogImage).toBe('https://bestcareercounselling.com/og-image.png')
    expect(document.querySelector('meta[name="twitter:image"]')?.getAttribute('content')).toBe(ogImage)
  })

  it('defaults to index, follow and sets noindex, nofollow when noindex is true', () => {
    const { rerender } = render(<PageSeo title="Test Title" description="Test description" path="/test" />)
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('index, follow')

    rerender(<PageSeo title="Not Found" description="Missing page" path="/404" noindex />)
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex, nofollow')
  })

  it('updates existing tags rather than duplicating them across renders', () => {
    const { rerender } = render(<PageSeo title="First" description="First desc" path="/first" />)
    rerender(<PageSeo title="Second" description="Second desc" path="/second" />)
    expect(document.title).toBe('Second')
    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1)
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
  })

  it('renders article:published_time only for article type, and keywords only when given', () => {
    const { rerender } = render(
      <PageSeo title="Post" description="desc" path="/blogs/post" type="article" publishedTime="2026-01-01" keywords="a, b" />,
    )
    expect(document.querySelector('meta[property="article:published_time"]')?.getAttribute('content')).toBe(
      '2026-01-01',
    )
    expect(document.querySelector('meta[name="keywords"]')?.getAttribute('content')).toBe('a, b')

    rerender(<PageSeo title="Other" description="desc" path="/other" />)
    expect(document.querySelector('meta[property="article:published_time"]')).not.toBeInTheDocument()
    expect(document.querySelector('meta[name="keywords"]')).not.toBeInTheDocument()
  })
})
