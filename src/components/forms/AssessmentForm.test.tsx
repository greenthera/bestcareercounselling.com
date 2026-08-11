import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AssessmentForm } from './AssessmentForm'

describe('AssessmentForm', () => {
  let openSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
  })

  afterEach(() => {
    openSpy.mockRestore()
  })

  it('includes an optional email field', () => {
    render(<AssessmentForm />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('submits successfully without an email (email is optional)', async () => {
    render(<AssessmentForm />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/student name/i), 'Diya Shah')
    await user.type(screen.getByLabelText(/phone/i), '9876543210')
    await user.selectOptions(screen.getByLabelText(/current class/i), 'Class 11–12')
    await user.click(screen.getByRole('button', { name: /take the free assessment/i }))

    expect(openSpy).toHaveBeenCalledTimes(1)
  })

  it('includes the email in the WhatsApp message when provided', async () => {
    render(<AssessmentForm />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/student name/i), 'Diya Shah')
    await user.type(screen.getByLabelText(/phone/i), '9876543210')
    await user.selectOptions(screen.getByLabelText(/current class/i), 'Class 11–12')
    await user.type(screen.getByLabelText(/email/i), 'diya@example.com')
    await user.click(screen.getByRole('button', { name: /take the free assessment/i }))

    const [url] = openSpy.mock.calls[0]
    expect(decodeURIComponent(String(url))).toContain('Email: diya@example.com')
  })
})
