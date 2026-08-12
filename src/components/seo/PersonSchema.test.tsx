import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { PersonSchema } from './PersonSchema'

describe('PersonSchema', () => {
  it("renders Kishan's Person structured data", () => {
    render(<PersonSchema person="kishan" />)
    const script = document.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}')
    expect(data['@type']).toBe('Person')
    expect(data.name).toBe('Kishan Patel')
    expect(data.jobTitle).toBe('Career Counsellor')
  })

  it("renders Meeta's Person structured data", () => {
    render(<PersonSchema person="meeta" />)
    const script = document.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}')
    expect(data.name).toBe('Meeta Patel')
  })
})
