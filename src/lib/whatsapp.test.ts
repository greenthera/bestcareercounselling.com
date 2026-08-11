import { describe, it, expect } from 'vitest'
import { isValidIndianPhone, buildWhatsAppUrl } from './whatsapp'

describe('isValidIndianPhone', () => {
  it('accepts a valid 10-digit number', () => {
    expect(isValidIndianPhone('9876543210')).toBe(true)
  })

  it('accepts a valid number with +91 prefix', () => {
    expect(isValidIndianPhone('+919876543210')).toBe(true)
  })

  it('rejects a number that is too short', () => {
    expect(isValidIndianPhone('98765')).toBe(false)
  })

  it('rejects a number starting with 0-5', () => {
    expect(isValidIndianPhone('4876543210')).toBe(false)
  })

  it('rejects non-numeric input', () => {
    expect(isValidIndianPhone('98765abcde')).toBe(false)
  })
})

describe('buildWhatsAppUrl', () => {
  it('builds a wa.me URL with the encoded message', () => {
    const url = buildWhatsAppUrl('Hi, I need help & advice')
    expect(url).toBe('https://wa.me/918758175187?text=Hi%2C%20I%20need%20help%20%26%20advice')
  })
})
