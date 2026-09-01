import type { WhatsAppContext } from '@/components/whatsapp/whatsappMessages'

export interface Service {
  id: WhatsAppContext
  title: string
  description: string
  ctaLabel: string
  subheading?: string
  whoItsFor?: string
  covers: string[]
  comparison: {
    whoItsFor: string
    duration: string
    assessment: string
    admissionSupport: string
    bestTimeToStart: string
  }
}

export const services: Service[] = [
  {
    id: 'after-10th',
    title: 'After 10th',
    description: 'Science, Commerce or Arts? Decide with data, not pressure.',
    ctaLabel: 'Book After 10th Counselling',
    subheading: 'Stream selection based on understanding, not pressure.',
    whoItsFor: 'Students in Class 9–10.',
    covers: [
      'Science vs Commerce vs Arts',
      'Aptitude',
      'Interests',
      'Strengths',
      'Subject suitability',
      'Career possibilities',
      'Parent counselling',
      'Career roadmap',
    ],
    comparison: {
      whoItsFor: 'Class 9–10',
      duration: 'A couple of weeks',
      assessment: 'Yes',
      admissionSupport: 'No',
      bestTimeToStart: 'Start of Class 10, before board exam pressure builds',
    },
  },
  {
    id: 'after-12th',
    title: 'After 12th',
    description: 'Degree, course and college, sorted before deadlines close.',
    ctaLabel: 'Book After 12th Counselling',
    covers: ['Course selection', 'College selection', 'Entrance exams', 'Career options', 'Application strategy', 'Roadmap'],
    comparison: {
      whoItsFor: 'Class 11–12',
      duration: 'A couple of weeks',
      assessment: 'Yes',
      admissionSupport: 'Yes',
      bestTimeToStart: 'Start of Class 12, ahead of entrance exam and application deadlines',
    },
  },
  {
    id: 'ug-pg-admission',
    title: 'UG & PG Admission',
    description: 'Shortlists, applications, forms, follow-up. Handled.',
    ctaLabel: 'Get Admission Guidance',
    covers: ['Course shortlist', 'College shortlist', 'Application forms', 'Document preparation', 'Deadline tracking', 'Follow-up'],
    comparison: {
      whoItsFor: 'UG & PG students',
      duration: 'A couple of weeks',
      assessment: 'Yes',
      admissionSupport: 'Yes',
      bestTimeToStart: '6–8 months before your target intake',
    },
  },
  {
    id: 'mba',
    title: 'MBA & Professional',
    description: 'CAT, entrances, specialisation. Pick the right one.',
    ctaLabel: 'Discuss Your MBA Options',
    covers: ['CAT and entrance strategy', 'Specialisation selection', 'College selection', 'Career outcomes', 'ROI considerations', 'Application guidance'],
    comparison: {
      whoItsFor: 'PG / MBA aspirants',
      duration: 'A couple of weeks',
      assessment: 'Yes',
      admissionSupport: 'Yes',
      bestTimeToStart: '8–12 months before your target CAT/entrance attempt',
    },
  },
  {
    id: 'study-abroad',
    title: 'Study Abroad',
    description: 'Country, university, budget, visa. Mapped out.',
    ctaLabel: 'Plan Your Study Abroad Journey',
    covers: ['Country selection', 'University shortlist', 'Course selection', 'Budget planning', 'Application guidance', 'Visa guidance'],
    comparison: {
      whoItsFor: 'Students planning to study abroad',
      duration: 'A couple of weeks',
      assessment: 'Yes',
      admissionSupport: 'Yes',
      bestTimeToStart: '12–18 months before your target intake',
    },
  },
  {
    id: 'career-change',
    title: 'Career Change',
    description: "Stuck in the wrong job? It's not too late.",
    ctaLabel: 'Discuss Your Career Change',
    covers: ['Transferable skills', 'Career assessment', 'Career options', 'Upskilling', 'Transition planning', 'Practical roadmap'],
    comparison: {
      whoItsFor: 'Working professionals',
      duration: 'A couple of weeks',
      assessment: 'Yes',
      admissionSupport: 'No',
      bestTimeToStart: 'As soon as the current role feels like a dead end',
    },
  },
]
