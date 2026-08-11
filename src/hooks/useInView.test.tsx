import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useInView } from './useInView'

function Probe() {
  const { ref, isInView } = useInView<HTMLDivElement>()
  return (
    <div ref={ref} data-testid="probe">
      {isInView ? 'visible' : 'hidden'}
    </div>
  )
}

describe('useInView', () => {
  it('starts hidden before the observer fires', () => {
    render(<Probe />)
    expect(screen.getByTestId('probe')).toHaveTextContent('hidden')
  })
})
