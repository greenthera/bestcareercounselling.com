import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UniversityMatchForm } from './UniversityMatchForm'
import { ENTRY } from '@/lib/leadsForm'

describe('UniversityMatchForm', () => {
  let sendBeaconSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    sendBeaconSpy = vi.spyOn(navigator, 'sendBeacon').mockReturnValue(true)
  })

  afterEach(() => {
    sendBeaconSpy.mockRestore()
  })

  it('validates name and phone before submitting', async () => {
    const user = userEvent.setup()
    render(<UniversityMatchForm />)

    await user.click(screen.getByRole('button', { name: /submit enquiry/i }))
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/whatsapp number is required/i)).toBeInTheDocument()
    expect(sendBeaconSpy).not.toHaveBeenCalled()
  })

  it('saves the lead to the shared Leads Sheet, with the course/qualification/etc. combined into notes', async () => {
    const user = userEvent.setup()
    render(<UniversityMatchForm />)

    await user.selectOptions(screen.getByLabelText(/which course/i), 'Online MBA')
    await user.selectOptions(screen.getByLabelText(/highest qualification/i), 'Graduate')
    await user.selectOptions(screen.getByLabelText(/approximate budget/i), '₹1–2 Lakh')
    await user.type(screen.getByLabelText(/full name/i), 'Aarav Shah')
    await user.type(screen.getByLabelText(/whatsapp number/i), '9876543210')
    await user.type(screen.getByLabelText(/email address/i), 'aarav@example.com')
    await user.click(screen.getByRole('button', { name: /submit enquiry/i }))

    expect(await screen.findByText(/thanks, aarav shah got your details/i)).toBeInTheDocument()

    expect(sendBeaconSpy).toHaveBeenCalledTimes(1)
    const [, body] = sendBeaconSpy.mock.calls[0]
    const params = body as URLSearchParams
    expect(params.get(ENTRY.name)).toBe('Aarav Shah')
    expect(params.get(ENTRY.phone)).toBe('9876543210')
    expect(params.get(ENTRY.email)).toBe('aarav@example.com')
    expect(params.get(ENTRY.form_id)).toBe('online-admissions')
    expect(params.get(ENTRY.notes)).toBe('Course: Online MBA\nQualification: Graduate\nBudget: ₹1–2 Lakh')
  })

  it('omits fields the visitor left blank from notes instead of sending empty labels', async () => {
    const user = userEvent.setup()
    render(<UniversityMatchForm />)

    await user.selectOptions(screen.getByLabelText(/which course/i), 'Online MCA')
    await user.type(screen.getByLabelText(/full name/i), 'Priya Mehta')
    await user.type(screen.getByLabelText(/whatsapp number/i), '9876543210')
    await user.click(screen.getByRole('button', { name: /submit enquiry/i }))

    await screen.findByText(/thanks, priya mehta got your details/i)

    const [, body] = sendBeaconSpy.mock.calls[0]
    expect((body as URLSearchParams).get(ENTRY.notes)).toBe('Course: Online MCA')
  })
})
