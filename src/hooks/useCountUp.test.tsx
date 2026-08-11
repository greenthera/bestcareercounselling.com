import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useCountUp } from './useCountUp'

function Probe() {
  const value = useCountUp(900, { start: true, durationMs: 0 })
  return <span data-testid="value">{value}</span>
}

describe('useCountUp', () => {
  it('jumps straight to target when durationMs is 0', () => {
    render(<Probe />)
    expect(screen.getByTestId('value')).toHaveTextContent('900')
  })

  it('starts at 0 when start is false', () => {
    function Idle() {
      const value = useCountUp(900, { start: false, durationMs: 0 })
      return <span data-testid="idle">{value}</span>
    }
    render(<Idle />)
    expect(screen.getByTestId('idle')).toHaveTextContent('0')
  })
})
