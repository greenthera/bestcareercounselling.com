import type { WhatsAppContext } from '@/components/whatsapp/whatsappMessages'

export interface Service {
  id: WhatsAppContext
  title: string
  description: string
  ctaLabel: string
}

export const services: Service[] = [
  {
    id: 'after-10th',
    title: 'After 10th',
    description: 'Science, Commerce or Arts? Decide with data, not pressure.',
    ctaLabel: 'Book After 10th Counselling',
  },
  {
    id: 'after-12th',
    title: 'After 12th',
    description: 'Degree, course, college — before deadlines close.',
    ctaLabel: 'Book After 12th Counselling',
  },
  {
    id: 'ug-pg-admission',
    title: 'UG & PG Admission',
    description: 'Shortlists, applications, forms, follow-up. Handled.',
    ctaLabel: 'Get Admission Guidance',
  },
  {
    id: 'mba',
    title: 'MBA & Professional',
    description: 'CAT, entrances, specialisation. Pick the right one.',
    ctaLabel: 'Discuss Your MBA Options',
  },
  {
    id: 'study-abroad',
    title: 'Study Abroad',
    description: 'Country, university, budget, visa. Mapped out.',
    ctaLabel: 'Plan Your Study Abroad Journey',
  },
  {
    id: 'career-change',
    title: 'Career Change',
    description: "Stuck in the wrong job? It's not too late.",
    ctaLabel: 'Discuss Your Career Change',
  },
]
