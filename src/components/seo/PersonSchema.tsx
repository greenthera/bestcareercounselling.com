import { JsonLd } from './JsonLd'
import { ORGANIZATION_ID, PERSON_IDS } from './ids'

const PEOPLE = {
  kishan: {
    name: 'Kishan Patel',
    jobTitle: 'Career Counsellor',
    description: '30+ years guiding students across Gujarat. Certified Career Analyst, Edumilestones.',
  },
  meeta: {
    name: 'Meeta Patel',
    jobTitle: 'Career Counsellor',
    description:
      'Specialises in working with parents and students together, particularly around stream selection after Class 10.',
  },
} as const

interface PersonSchemaProps {
  person: keyof typeof PEOPLE
}

export function PersonSchema({ person }: PersonSchemaProps) {
  const data = PEOPLE[person]
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': PERSON_IDS[person],
        worksFor: { '@id': ORGANIZATION_ID },
        ...data,
      }}
    />
  )
}
