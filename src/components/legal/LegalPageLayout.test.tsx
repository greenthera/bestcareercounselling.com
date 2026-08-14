import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LegalPageLayout } from './LegalPageLayout'

describe('LegalPageLayout', () => {
  it('renders the title, intro, and each section', () => {
    render(
      <LegalPageLayout
        title="Sample Policy"
        lastUpdated="1 January 2026"
        intro="This is a sample intro."
        sections={[{ heading: 'Section One', paragraphs: ['Paragraph text.'] }]}
      />,
    )
    expect(screen.getByRole('heading', { level: 1, name: 'Sample Policy' })).toBeInTheDocument()
    expect(screen.getByText(/1 january 2026/i)).toBeInTheDocument()
    expect(screen.getByText('This is a sample intro.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Section One' })).toBeInTheDocument()
    expect(screen.getByText('Paragraph text.')).toBeInTheDocument()
  })
})
