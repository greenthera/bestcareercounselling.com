import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UniversityMatchForm } from './UniversityMatchForm'

describe('UniversityMatchForm', () => {
  let openSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
  })

  afterEach(() => {
    openSpy.mockRestore()
  })

  it('validates name and phone before opening WhatsApp', async () => {
    const user = userEvent.setup()
    render(<UniversityMatchForm />)

    await user.click(screen.getByRole('button', { name: /submit enquiry/i }))
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/whatsapp number is required/i)).toBeInTheDocument()
    expect(openSpy).not.toHaveBeenCalled()
  })

  it('opens WhatsApp with the selected profile on a valid submit', async () => {
    const user = userEvent.setup()
    render(<UniversityMatchForm />)

    await user.selectOptions(screen.getByLabelText(/which course/i), 'Online MBA')
    await user.selectOptions(screen.getByLabelText(/highest qualification/i), 'Graduate')
    await user.selectOptions(screen.getByLabelText(/approximate budget/i), '₹1–2 Lakh')
    await user.type(screen.getByLabelText(/full name/i), 'Aarav Shah')
    await user.type(screen.getByLabelText(/whatsapp number/i), '9876543210')
    await user.click(screen.getByRole('button', { name: /submit enquiry/i }))

    expect(openSpy).toHaveBeenCalledTimes(1)
    const url = decodeURIComponent(String(openSpy.mock.calls[0][0]))
    expect(url).toContain('https://wa.me/918758175187')
    expect(url).toContain('Course: Online MBA')
    expect(url).toContain('Budget: ₹1–2 Lakh')
    expect(url).toContain('Aarav Shah')
  })
})
