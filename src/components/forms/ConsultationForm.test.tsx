import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConsultationForm } from './ConsultationForm'
import { ENTRY } from '@/lib/leadsForm'

describe('ConsultationForm', () => {
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

  it('shows validation errors when submitted empty', async () => {
    render(<ConsultationForm context="home" formId="test" />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /book 15-min pre counselling session/i }))

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/phone number is required/i)).toBeInTheDocument()
    expect(screen.getByText(/select your current status/i)).toBeInTheDocument()
    expect(openSpy).not.toHaveBeenCalled()
  })

  it('rejects an invalid phone number', async () => {
    render(<ConsultationForm context="home" formId="test" />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/^name$/i), 'Aarav Shah')
    await user.type(screen.getByLabelText(/phone/i), '12345')
    await user.selectOptions(screen.getByLabelText(/current status/i), 'Class 10')
    await user.click(screen.getByRole('button', { name: /book 15-min pre counselling session/i }))

    expect(await screen.findByText(/enter a valid 10-digit phone number/i)).toBeInTheDocument()
    expect(openSpy).not.toHaveBeenCalled()
  })

  it('opens WhatsApp with the contextual message on valid submit', async () => {
    render(<ConsultationForm context="after-10th" formId="test" />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/^name$/i), 'Aarav Shah')
    await user.type(screen.getByLabelText(/phone/i), '9876543210')
    await user.selectOptions(screen.getByLabelText(/current status/i), 'Class 10')
    await user.click(screen.getByRole('button', { name: /book 15-min pre counselling session/i }))

    expect(openSpy).toHaveBeenCalledTimes(1)
    const [url] = openSpy.mock.calls[0]
    expect(String(url)).toContain('https://wa.me/918758175187?text=')
    expect(decodeURIComponent(String(url))).toContain('stream selection and career options')
    expect(decodeURIComponent(String(url))).toContain('Aarav Shah')
  })

  it('saves the lead to the Google Form and logs a generate_lead event', async () => {
    render(<ConsultationForm context="after-10th" formId="test" />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/^name$/i), 'Aarav Shah')
    await user.type(screen.getByLabelText(/phone/i), '9876543210')
    await user.selectOptions(screen.getByLabelText(/current status/i), 'Class 10')
    await user.click(screen.getByRole('button', { name: /book 15-min pre counselling session/i }))

    expect(sendBeaconSpy).toHaveBeenCalledTimes(1)
    const [, body] = sendBeaconSpy.mock.calls[0]
    expect(body).toBeInstanceOf(URLSearchParams)
    expect((body as URLSearchParams).get(ENTRY.notes)).toBe('Status: Class 10')

    const dataLayer = (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer
    const leadEvent = dataLayer.find((entry) => entry.event === 'generate_lead')
    expect(leadEvent).toMatchObject({ form_id: 'test', lead_channel: 'whatsapp' })
    expect(leadEvent).not.toHaveProperty('name')
    expect(leadEvent).not.toHaveProperty('phone')
    expect(leadEvent).not.toHaveProperty('current_status')
  })

  it('disables the submit button after the first click to prevent duplicate leads', async () => {
    render(<ConsultationForm context="after-10th" formId="test" />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/^name$/i), 'Aarav Shah')
    await user.type(screen.getByLabelText(/phone/i), '9876543210')
    await user.selectOptions(screen.getByLabelText(/current status/i), 'Class 10')

    const button = screen.getByRole('button', { name: /book 15-min pre counselling session/i })
    await user.click(button)

    expect(button).toBeDisabled()
    expect(openSpy).toHaveBeenCalledTimes(1)
  })

  it('renders a custom submit label when provided', () => {
    render(<ConsultationForm context="home" formId="test" submitLabel="Book a Free Consultation" />)
    expect(screen.getByRole('button', { name: 'Book a Free Consultation' })).toBeInTheDocument()
  })
})
