import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ServiceSection } from './ServiceSection'
import { services } from '@/data/services'

describe('ServiceSection', () => {
  const service = services[0]

  it('renders the id anchor, heading, who-its-for, and covers list', () => {
    const { container } = render(<ServiceSection service={service} />)
    expect(container.querySelector('#after-10th')).not.toBeNull()
    expect(screen.getByRole('heading', { name: /career counselling after 10th/i })).toBeInTheDocument()
    expect(screen.getByText(/students in class 9–10/i)).toBeInTheDocument()
    expect(screen.getByText('Science vs Commerce vs Arts')).toBeInTheDocument()
  })

  it('opens a booking dialog with the service context when the CTA is clicked', async () => {
    render(<ServiceSection service={service} />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Book After 10th Counselling' }))
    expect(await screen.findByLabelText(/^name$/i)).toBeInTheDocument()
  })
})
