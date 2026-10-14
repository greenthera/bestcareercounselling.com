import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Blogs from './Blogs'

describe('Blogs page', () => {
  it('renders the hero, categories and the sample post as the featured post', () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /career guidance, explained/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'After 12th' })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /which course & career is right after 12th/i }),
    ).toBeInTheDocument()
    expect(screen.getByAltText(/which course & career is right after 12th/i)).toHaveAttribute(
      'src',
      '/images/blog/course-and-career-after-12th.webp',
    )
    expect(document.title).toBe('Blog | Best Career Counselling')
  })

  it('does not show the featured post a second time in the grid below', () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>,
    )
    // Only one post exists, and it's already shown as the featured post above, so the grid
    // (and its "no articles match" empty state) shouldn't render at all in the default view.
    expect(
      screen.getAllByRole('link', { name: /which course & career is right after 12th/i }),
    ).toHaveLength(1)
    expect(screen.queryByText(/no articles match/i)).not.toBeInTheDocument()
  })

  it('filters posts with the search box', async () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>,
    )
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/search blog articles/i), 'something that will never match anything')

    expect(screen.getByText(/no articles match/i)).toBeInTheDocument()
  })

  it('filters posts by category', async () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>,
    )
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Exams' }))

    expect(screen.getByText(/no articles match/i)).toBeInTheDocument()
  })
})
