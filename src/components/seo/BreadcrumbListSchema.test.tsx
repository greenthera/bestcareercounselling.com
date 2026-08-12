import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { BreadcrumbListSchema } from './BreadcrumbListSchema'

describe('BreadcrumbListSchema', () => {
  it('embeds a three-item BreadcrumbList ending at the current page', () => {
    render(<BreadcrumbListSchema title="Some Post Title" path="/blogs/some-post" />)
    const script = document.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}')
    expect(data['@type']).toBe('BreadcrumbList')
    expect(data.itemListElement).toHaveLength(3)
    expect(data.itemListElement[2].name).toBe('Some Post Title')
    expect(data.itemListElement[2].item).toBe('https://bestcareercounselling.com/blogs/some-post')
  })
})
