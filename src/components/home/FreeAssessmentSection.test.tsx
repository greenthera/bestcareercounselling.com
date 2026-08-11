import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FreeAssessmentSection } from './FreeAssessmentSection'

describe('FreeAssessmentSection', () => {
  it('renders the heading and opens the assessment form in a dialog', async () => {
    render(<FreeAssessmentSection />)
    expect(screen.getByRole('heading', { name: /not ready to book/i })).toBeInTheDocument()

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /take the free assessment/i }))
    expect(await screen.findByLabelText(/email/i)).toBeInTheDocument()
  })
})
