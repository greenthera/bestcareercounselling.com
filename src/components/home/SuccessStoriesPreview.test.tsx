import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SuccessStoriesPreview } from './SuccessStoriesPreview'

describe('SuccessStoriesPreview', () => {
  it('renders a Was/Found/Chose/Now card for each story', () => {
    render(
      <MemoryRouter>
        <SuccessStoriesPreview />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: /real students\. real decisions\./i })).toBeInTheDocument()
    expect(screen.getAllByText('Was')).toHaveLength(3)
    expect(screen.getAllByText('Now')).toHaveLength(3)
  })

  it('links to the full success stories page', () => {
    render(
      <MemoryRouter>
        <SuccessStoriesPreview />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /view all success stories/i })).toHaveAttribute('href', '/success-stories')
  })
})
