import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'
import WhoWeAre from './WhoWeAre'
import WhatWeDo from './WhatWeDo'
import ContactUs from './ContactUs'
import ThankYou from './ThankYou'
import AdmissionConsulting from './AdmissionConsulting'
import OnlineAdmissions from './OnlineAdmissions'
import CareerCounselling from './CareerCounselling'
import SchoolStudentCareerAssessment from './SchoolStudentCareerAssessment'
import ParentCareerClarityAssessment from './ParentCareerClarityAssessment'
import PrivacyPolicy from './PrivacyPolicy'
import Terms from './Terms'
import NotFound from './NotFound'

describe('Page heading hierarchy', () => {
  it.each([
    ['Home', Home],
    ['WhoWeAre', WhoWeAre],
    ['WhatWeDo', WhatWeDo],
    ['ContactUs', ContactUs],
    ['ThankYou', ThankYou],
    ['AdmissionConsulting', AdmissionConsulting],
    ['OnlineAdmissions', OnlineAdmissions],
    ['CareerCounselling', CareerCounselling],
    ['SchoolStudentCareerAssessment', SchoolStudentCareerAssessment],
    ['ParentCareerClarityAssessment', ParentCareerClarityAssessment],
    ['PrivacyPolicy', PrivacyPolicy],
    ['Terms', Terms],
    ['NotFound', NotFound],
  ])('%s has one primary heading and no skipped heading levels', (_name, Page) => {
    const { container } = render(<MemoryRouter><Page /></MemoryRouter>)
    const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    expect(headings.filter((heading) => heading.tagName === 'H1')).toHaveLength(1)
    expect(headings[0].tagName).toBe('H1')
    let previousLevel = 0
    for (const heading of headings) {
      const level = Number(heading.tagName.slice(1))
      expect(heading.textContent?.trim()).toBeTruthy()
      expect(level, heading.textContent ?? '').toBeLessThanOrEqual(previousLevel + 1)
      previousLevel = level
    }
  })
})
