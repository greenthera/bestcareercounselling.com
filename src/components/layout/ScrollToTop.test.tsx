import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { ScrollToTop } from './ScrollToTop'

function TestApp() {
  return (
    <>
      <ScrollToTop />
      <Link to="/other">Go to other page</Link>
      <Link to="/other#section-two">Go to section two</Link>
      <Routes>
        <Route path="/" element={<div>Home page</div>} />
        <Route
          path="/other"
          element={
            <div>
              Other page
              <div id="section-two">Section two</div>
            </div>
          }
        />
      </Routes>
    </>
  )
}

describe('ScrollToTop', () => {
  let scrollToSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  })

  afterEach(() => {
    scrollToSpy.mockRestore()
  })

  it('scrolls to the top when the route changes', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <TestApp />
      </MemoryRouter>,
    )
    scrollToSpy.mockClear()

    const user = userEvent.setup()
    await user.click(screen.getByRole('link', { name: /go to other page/i }))

    expect(await screen.findByText('Other page')).toBeInTheDocument()
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0)
  })

  it('scrolls to the hash target instead of the top when the URL has a hash', async () => {
    const scrollIntoViewSpy = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoViewSpy

    render(
      <MemoryRouter initialEntries={['/']}>
        <TestApp />
      </MemoryRouter>,
    )
    scrollToSpy.mockClear()

    const user = userEvent.setup()
    await user.click(screen.getByRole('link', { name: /go to section two/i }))

    await screen.findByText('Section two')

    await vi.waitFor(() => {
      expect(scrollIntoViewSpy).toHaveBeenCalledWith({ block: 'start' })
    })
    expect(scrollToSpy).not.toHaveBeenCalled()
  })
})
