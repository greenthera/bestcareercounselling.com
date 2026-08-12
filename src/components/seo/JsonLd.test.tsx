import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { JsonLd } from './JsonLd'

describe('JsonLd', () => {
  it('renders a script tag containing the serialized data', () => {
    render(<JsonLd data={{ '@type': 'Thing', name: 'Test' }} />)
    const script = document.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
    expect(script?.textContent).toContain('"name":"Test"')
  })
})
