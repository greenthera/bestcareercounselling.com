import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RealWork } from './RealWork'

describe('RealWork', () => {
  it('renders the heading and a grid of photo placeholders', () => {
    render(<RealWork />)
    expect(screen.getByRole('heading', { name: /real work/i })).toBeInTheDocument()
    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(4)
  })

  it('opens a lightbox with prev/next navigation when a photo is clicked', async () => {
    const user = userEvent.setup()
    render(<RealWork />)

    await user.click(screen.getByRole('button', { name: /view photo: our office in surat/i }))
    expect(screen.getByText('1 / 4')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /next photo/i }))
    expect(screen.getByText('2 / 4')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /previous photo/i }))
    expect(screen.getByText('1 / 4')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^close$/i }))
    expect(screen.queryByText('1 / 4')).not.toBeInTheDocument()
  })
})
