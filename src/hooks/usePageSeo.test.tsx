import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { usePageSeo } from './usePageSeo'

function Probe(props: { title: string; description: string; path: string; noindex?: boolean }) {
  usePageSeo(props)
  return null
}

describe('usePageSeo', () => {
  it('sets the document title and meta description', () => {
    render(<Probe title="Test Title" description="Test description" path="/test" />)
    expect(document.title).toBe('Test Title')
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Test description')
  })

  it('sets a canonical link built from SITE_URL and the given path', () => {
    render(<Probe title="Test Title" description="Test description" path="/test" />)
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://greenthera.shivantra.com/bestcareercounselling.com/test',
    )
  })

  it('sets Open Graph and Twitter Card tags', () => {
    render(<Probe title="Test Title" description="Test description" path="/test" />)
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('Test Title')
    expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe(
      'Test description',
    )
    expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe('summary_large_image')
  })

  it('sets an absolute og:image and twitter:image', () => {
    render(<Probe title="Test Title" description="Test description" path="/test" />)
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content')
    expect(ogImage).toBe('https://greenthera.shivantra.com/bestcareercounselling.com/og-image.png')
    expect(document.querySelector('meta[name="twitter:image"]')?.getAttribute('content')).toBe(ogImage)
  })

  it('defaults to index, follow and sets noindex, nofollow when noindex is true', () => {
    render(<Probe title="Test Title" description="Test description" path="/test" />)
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('index, follow')

    render(<Probe title="Not Found" description="Missing page" path="/404" noindex />)
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex, nofollow')
  })

  it('updates existing tags rather than duplicating them across renders', () => {
    const { rerender } = render(<Probe title="First" description="First desc" path="/first" />)
    rerender(<Probe title="Second" description="Second desc" path="/second" />)
    expect(document.title).toBe('Second')
    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1)
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
  })
})
