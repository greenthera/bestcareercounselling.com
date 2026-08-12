import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConsultationForm } from './ConsultationForm'

describe('ConsultationForm', () => {
  let openSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
  })

  afterEach(() => {
    openSpy.mockRestore()
  })

  it('shows validation errors when submitted empty', async () => {
    render(<ConsultationForm context="home" />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /book free session/i }))

    expect(await screen.findByText(/student name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/phone number is required/i)).toBeInTheDocument()
    expect(screen.getByText(/select the current class/i)).toBeInTheDocument()
    expect(openSpy).not.toHaveBeenCalled()
  })

  it('rejects an invalid phone number', async () => {
    render(<ConsultationForm context="home" />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/student name/i), 'Aarav Shah')
    await user.type(screen.getByLabelText(/phone/i), '12345')
    await user.selectOptions(screen.getByLabelText(/current class/i), 'Class 9–10')
    await user.click(screen.getByRole('button', { name: /book free session/i }))

    expect(await screen.findByText(/enter a valid 10-digit phone number/i)).toBeInTheDocument()
    expect(openSpy).not.toHaveBeenCalled()
  })

  it('opens WhatsApp with the contextual message on valid submit', async () => {
    render(<ConsultationForm context="after-10th" />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/student name/i), 'Aarav Shah')
    await user.type(screen.getByLabelText(/phone/i), '9876543210')
    await user.selectOptions(screen.getByLabelText(/current class/i), 'Class 9–10')
    await user.click(screen.getByRole('button', { name: /book free session/i }))

    expect(openSpy).toHaveBeenCalledTimes(1)
    const [url] = openSpy.mock.calls[0]
    expect(String(url)).toContain('https://wa.me/918758175187?text=')
    expect(decodeURIComponent(String(url))).toContain('stream selection and career options')
    expect(decodeURIComponent(String(url))).toContain('Aarav Shah')
  })

  it('renders a custom submit label when provided', () => {
    render(<ConsultationForm context="home" submitLabel="Book a Free Consultation" />)
    expect(screen.getByRole('button', { name: 'Book a Free Consultation' })).toBeInTheDocument()
  })
})
