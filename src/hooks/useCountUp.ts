import { useEffect, useState } from 'react'

interface UseCountUpOptions {
  start: boolean
  durationMs?: number
}

export function useCountUp(target: number, { start, durationMs = 1200 }: UseCountUpOptions): number {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start || durationMs === 0) return

    const startTime = performance.now()
    let frame: number

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1)
      setValue(Math.round(target * progress))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, target, durationMs])

  if (start && durationMs === 0) {
    return target
  }

  return value
}
