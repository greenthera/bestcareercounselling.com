import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FAQSection } from './FAQSection'

describe('FAQSection', () => {
  it('renders all eight questions', () => {
    render(<FAQSection />)
    expect(screen.getAllByRole('button', { expanded: false })).toHaveLength(8)
  })

  it('expands an answer when its question is clicked', async () => {
    render(<FAQSection />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /is the first consultation really free/i }))
    expect(await screen.findByText(/yes\. the first consultation is completely free/i)).toBeInTheDocument()
  })

  it('embeds FAQPage structured data', () => {
    render(<FAQSection />)
    const script = document.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
    expect(script?.textContent).toContain('FAQPage')
  })
})
