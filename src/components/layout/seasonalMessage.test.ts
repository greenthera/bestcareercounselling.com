import { describe, it, expect } from 'vitest'
import { getSeasonalMessage } from './seasonalMessage'

describe('getSeasonalMessage', () => {
  it('returns the Jan–Mar message for February', () => {
    expect(getSeasonalMessage(new Date('2026-02-15'))).toMatch(/stream selection session/)
  })

  it('returns the Apr–Jun message for May', () => {
    expect(getSeasonalMessage(new Date('2026-05-15'))).toMatch(/Admission deadlines approaching/)
  })

  it('returns the Jul–Sep message for August', () => {
    expect(getSeasonalMessage(new Date('2026-08-11'))).toMatch(/Late admissions still open/)
  })

  it('returns the Oct–Dec message for November', () => {
    expect(getSeasonalMessage(new Date('2026-11-01'))).toMatch(/Early birds get better college options/)
  })
})
