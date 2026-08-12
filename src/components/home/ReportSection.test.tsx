import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReportSection } from './ReportSection'

describe('ReportSection', () => {
  it('renders the heading and all five deliverables', () => {
    render(<ReportSection />)
    expect(screen.getByRole('heading', { name: /what you walk away with/i })).toBeInTheDocument()
    expect(screen.getByText(/32-page career report/i)).toBeInTheDocument()
    expect(screen.getByText(/college and course list/i)).toBeInTheDocument()
  })

  it('opens a lightbox with an enlarged view when a thumbnail is clicked', async () => {
    render(<ReportSection />)
    const user = userEvent.setup()
    const thumbnails = screen.getAllByRole('button', { name: /view report page/i })
    expect(thumbnails).toHaveLength(3)

    await user.click(thumbnails[0])
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
  })
})
