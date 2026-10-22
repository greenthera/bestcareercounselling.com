import { describe, it, expect, beforeEach } from 'vitest'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom'
import { RouteTracking } from './RouteTracking'

function dataLayer() {
  return (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer
}

describe('RouteTracking', () => {
  beforeEach(() => {
    ;(window as unknown as { dataLayer?: unknown[] }).dataLayer = []
  })

  it('does not push a page_view_spa event on first render', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <RouteTracking />
      </MemoryRouter>,
    )
    expect(dataLayer()).toHaveLength(0)
  })

  it('pushes page_view_spa with the new path on a client-side route change', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <RouteTracking />
        <Routes>
          <Route path="/" element={<Link to="/blogs">Go to blogs</Link>} />
          <Route path="/blogs" element={<p>Blogs page</p>} />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.click(getByText('Go to blogs'))

    await waitFor(() => {
      expect(dataLayer()).toContainEqual({ event: 'page_view_spa', page_path: '/blogs' })
    })
  })
})
