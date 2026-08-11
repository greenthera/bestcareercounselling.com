import { describe, it, expect } from 'vitest'
import { buildContextualMessage, type WhatsAppContext } from './whatsappMessages'

describe('buildContextualMessage', () => {
  it('builds the home context message with interpolated fields', () => {
    const msg = buildContextualMessage('home', {
      name: 'Aarav Shah',
      currentClass: 'Class 9–10',
      phone: '9876543210',
    })
    expect(msg).toContain('Student Name: Aarav Shah')
    expect(msg).toContain('Current Class: Class 9–10')
    expect(msg).toContain('Phone: 9876543210')
    expect(msg).toContain('book a free career counselling consultation')
  })

  it('builds the after-10th context message', () => {
    const msg = buildContextualMessage('after-10th', {
      name: 'Priya Patel',
      currentClass: 'Class 9–10',
      phone: '9876543211',
    })
    expect(msg).toContain('career counselling after Class 10')
    expect(msg).toContain('stream selection and career options')
  })

  it('builds the career-change context message without a class field', () => {
    const msg = buildContextualMessage('career-change', {
      name: 'Rohan Mehta',
      phone: '9876543212',
    })
    expect(msg).toContain('career change counselling')
    expect(msg).not.toContain('Current Class')
  })

  it('builds the assessment context message including email', () => {
    const msg = buildContextualMessage('assessment', {
      name: 'Diya Shah',
      currentClass: 'Class 11–12',
      phone: '9876543213',
      email: 'diya@example.com',
    })
    expect(msg).toContain('free assessment')
    expect(msg).toContain('Email: diya@example.com')
  })

  it('covers every context key defined in the type', () => {
    const contexts: WhatsAppContext[] = [
      'home',
      'after-10th',
      'after-12th',
      'ug-pg-admission',
      'mba',
      'study-abroad',
      'career-change',
      'assessment',
    ]
    for (const ctx of contexts) {
      const msg = buildContextualMessage(ctx, { name: 'Test', phone: '9876543210' })
      expect(msg.length).toBeGreaterThan(0)
    }
  })
})
