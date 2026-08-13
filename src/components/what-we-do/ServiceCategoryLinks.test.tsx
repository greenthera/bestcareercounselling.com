import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ServiceCategoryLinks } from './ServiceCategoryLinks'

describe('ServiceCategoryLinks', () => {
  it('renders both category boxes linking to their standalone pages', () => {
    render(
      <MemoryRouter>
        <ServiceCategoryLinks />
      </MemoryRouter>,
    )
    const admissionLink = screen.getByRole('link', { name: /admission consulting/i })
    const careerLink = screen.getByRole('link', { name: /career counselling/i })
    expect(admissionLink).toHaveAttribute('href', '/admission-consulting')
    expect(careerLink).toHaveAttribute('href', '/career-counselling')
  })
})
