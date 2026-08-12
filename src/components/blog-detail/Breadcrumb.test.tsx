import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Breadcrumb } from './Breadcrumb'

describe('Breadcrumb', () => {
  it('renders Home / Blogs / current title with the title not a link', () => {
    render(
      <MemoryRouter>
        <Breadcrumb title="Is Commerce With Maths a Good Choice?" />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Blogs' })).toHaveAttribute('href', '/blogs')
    expect(screen.getByText('Is Commerce With Maths a Good Choice?')).toBeInTheDocument()
  })
})
