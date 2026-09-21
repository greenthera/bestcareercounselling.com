import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UniversityMatchForm } from './UniversityMatchForm'

describe('UniversityMatchForm', () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    fetchSpy = vi.spyOn(window, 'fetch').mockResolvedValue(new Response())
  })

  afterEach(() => {
    fetchSpy.mockRestore()
  })

  it('validates name and phone before submitting to the Google Form', async () => {
    const user = userEvent.setup()
    render(<UniversityMatchForm />)

    await user.click(screen.getByRole('button', { name: /submit enquiry/i }))
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/whatsapp number is required/i)).toBeInTheDocument()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('submits the selected profile to the Google Form with the correct entry IDs', async () => {
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

    expect(fetchSpy).toHaveBeenCalledTimes(1)
    const [url, options] = fetchSpy.mock.calls[0]
    expect(url).toBe('https://docs.google.com/forms/d/e/1FAIpQLSfJMGHRKWJc_4sJqCakkbG9aL1KxT2hBCTGVJ8YcKvz0Y2ycA/formResponse')
    expect(options).toMatchObject({ method: 'POST', mode: 'no-cors' })

    const body = options?.body as FormData
    expect(body.get('entry.1781896297')).toBe('Online MBA')
    expect(body.get('entry.742214592')).toBe('Graduate')
    expect(body.get('entry.1605985204')).toBe('₹1–2 Lakh')
    expect(body.get('entry.1176639313')).toBe('Aarav Shah')
    expect(body.get('entry.981566267')).toBe('9876543210')
    expect(body.get('entry.1373262059')).toBe('aarav@example.com')
  })

  it('shows a recoverable error if the submission fails', async () => {
    fetchSpy.mockRejectedValueOnce(new Error('Network error'))
    const user = userEvent.setup()
    render(<UniversityMatchForm />)

    await user.type(screen.getByLabelText(/full name/i), 'Aarav Shah')
    await user.type(screen.getByLabelText(/whatsapp number/i), '9876543210')
    await user.click(screen.getByRole('button', { name: /submit enquiry/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/could not submit your details/i)
    expect(screen.getByRole('button', { name: /submit enquiry/i })).toBeEnabled()
  })
})
