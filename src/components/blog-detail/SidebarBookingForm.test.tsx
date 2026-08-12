import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SidebarBookingForm } from './SidebarBookingForm'

describe('SidebarBookingForm', () => {
  it('renders a sticky consultation form', () => {
    render(<SidebarBookingForm />)
    expect(screen.getByLabelText(/student name/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /book free session/i })).toBeInTheDocument()
  })
})
