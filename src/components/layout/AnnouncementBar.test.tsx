import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AnnouncementBar } from './AnnouncementBar'

describe('AnnouncementBar', () => {
  it('renders the seasonal message', () => {
    render(<AnnouncementBar />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('dismisses when the close button is clicked', async () => {
    render(<AnnouncementBar />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /dismiss/i }))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
