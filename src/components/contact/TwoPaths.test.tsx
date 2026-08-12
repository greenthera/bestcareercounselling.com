import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TwoPaths } from './TwoPaths'

describe('TwoPaths', () => {
  it('renders the consultation form under the first path', () => {
    render(<TwoPaths />)
    expect(screen.getByRole('heading', { name: /i want to talk to someone/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Book Free Consultation' })).toBeInTheDocument()
  })

  it('opens the assessment form dialog under the second path', async () => {
    render(<TwoPaths />)
    expect(screen.getByRole('heading', { name: /i want to start with the free assessment/i })).toBeInTheDocument()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Take Free Assessment' }))
    expect(await screen.findByLabelText(/email/i)).toBeInTheDocument()
  })
})
