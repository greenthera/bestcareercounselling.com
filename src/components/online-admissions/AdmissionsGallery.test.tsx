import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AdmissionsGallery } from './AdmissionsGallery'

describe('AdmissionsGallery', () => {
  it('renders the heading and a bento grid of photo tiles', () => {
    render(<AdmissionsGallery />)
    expect(screen.getByRole('heading', { name: /inside our admission counselling/i })).toBeInTheDocument()
    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(6)
  })

  it('opens a lightbox with prev/next navigation when a photo is clicked', async () => {
    const user = userEvent.setup()
    render(<AdmissionsGallery />)

    await user.click(screen.getByRole('button', { name: /view photo: our office in surat/i }))
    expect(screen.getByText('1 / 6')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /next photo/i }))
    expect(screen.getByText('2 / 6')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /previous photo/i }))
    expect(screen.getByText('1 / 6')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^close$/i }))
    expect(screen.queryByText('1 / 6')).not.toBeInTheDocument()
  })
})
