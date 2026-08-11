import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders the H1, eyebrow, and consultation form', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1, name: /stop guessing which stream is right/i })).toBeInTheDocument()
    expect(screen.getByText(/google's highest-rated career counsellors in surat/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/student name/i)).toBeInTheDocument()
  })
})
