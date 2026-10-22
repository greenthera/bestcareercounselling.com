import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AssessmentForm } from './AssessmentForm'
import { ENTRY } from '@/lib/leadsForm'

describe('AssessmentForm', () => {
  let openSpy: ReturnType<typeof vi.spyOn>
  let sendBeaconSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    sendBeaconSpy = vi.spyOn(navigator, 'sendBeacon').mockReturnValue(true)
  })

  afterEach(() => {
    openSpy.mockRestore()
    sendBeaconSpy.mockRestore()
  })

  it('includes an optional email field', () => {
    render(<AssessmentForm />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('submits successfully without an email (email is optional)', async () => {
    render(<AssessmentForm />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/^name$/i), 'Diya Shah')
    await user.type(screen.getByLabelText(/phone/i), '9876543210')
    await user.selectOptions(screen.getByLabelText(/current status/i), 'Class 12')
    await user.click(screen.getByRole('button', { name: /take the free assessment/i }))

    expect(openSpy).toHaveBeenCalledTimes(1)
  })

  it('includes the email in the WhatsApp message when provided', async () => {
    render(<AssessmentForm />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/^name$/i), 'Diya Shah')
    await user.type(screen.getByLabelText(/phone/i), '9876543210')
    await user.selectOptions(screen.getByLabelText(/current status/i), 'Class 12')
    await user.type(screen.getByLabelText(/email/i), 'diya@example.com')
    await user.click(screen.getByRole('button', { name: /take the free assessment/i }))

    const [url] = openSpy.mock.calls[0]
    expect(decodeURIComponent(String(url))).toContain('Email: diya@example.com')
  })

  it('saves the lead to the shared Leads Sheet before opening WhatsApp', async () => {
    render(<AssessmentForm />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/^name$/i), 'Diya Shah')
    await user.type(screen.getByLabelText(/phone/i), '9876543210')
    await user.selectOptions(screen.getByLabelText(/current status/i), 'Class 12')
    await user.type(screen.getByLabelText(/email/i), 'diya@example.com')
    await user.click(screen.getByRole('button', { name: /take the free assessment/i }))

    expect(sendBeaconSpy).toHaveBeenCalledTimes(1)
    const [, body] = sendBeaconSpy.mock.calls[0]
    const params = body as URLSearchParams
    expect(params.get(ENTRY.name)).toBe('Diya Shah')
    expect(params.get(ENTRY.phone)).toBe('9876543210')
    expect(params.get(ENTRY.email)).toBe('diya@example.com')
    expect(params.get(ENTRY.notes)).toBe('Status: Class 12')
    expect(params.get(ENTRY.form_id)).toBe('assessment')
  })

  it('disables the submit button after the first click to prevent duplicate leads', async () => {
    render(<AssessmentForm />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/^name$/i), 'Diya Shah')
    await user.type(screen.getByLabelText(/phone/i), '9876543210')
    await user.selectOptions(screen.getByLabelText(/current status/i), 'Class 12')

    const button = screen.getByRole('button', { name: /take the free assessment/i })
    await user.click(button)

    expect(button).toBeDisabled()
    expect(openSpy).toHaveBeenCalledTimes(1)
  })
})
