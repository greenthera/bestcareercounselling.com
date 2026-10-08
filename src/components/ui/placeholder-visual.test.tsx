import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PlaceholderVisual } from './placeholder-visual'
import photo from '@/assets/career-counsellors-at-event.webp'

describe('Responsive photography', () => {
  it('uses intrinsic dimensions and smaller WebP sources for lazy-loaded photos', () => {
    render(<PlaceholderVisual src={photo} label="Counsellors at an event" sizes="50vw" />)
    const image = screen.getByRole('img', { name: 'Counsellors at an event' })
    expect(image).toHaveAttribute('width', '1400')
    expect(image).toHaveAttribute('height', '788')
    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).toHaveAttribute('decoding', 'async')
    expect(image.getAttribute('srcset')).toContain('640w')
    expect(image.getAttribute('srcset')).toContain('960w')
    expect(image).toHaveAttribute('sizes', '50vw')
  })

  it('loads priority photos eagerly and preserves explicit image hints', () => {
    render(<PlaceholderVisual src={photo} label="Hero" priority width={700} height={394} srcSet="custom.webp 700w" />)
    const image = screen.getByRole('img', { name: 'Hero' })
    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('fetchpriority', 'high')
    expect(image).toHaveAttribute('width', '700')
    expect(image).toHaveAttribute('height', '394')
    expect(image).toHaveAttribute('srcset', 'custom.webp 700w')
  })
})
