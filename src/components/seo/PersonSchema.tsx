import { JsonLd } from './JsonLd'
import { ORGANIZATION_ID, PERSON_IDS } from './ids'
import { SITE_URL } from '@/lib/seo'

const PEOPLE = {
  kishan: {
    name: 'Kishan Patel',
    jobTitle: 'Founder & Career Counsellor',
    description: '30+ years guiding students across Gujarat. Certified Career Analyst, Edumilestones.',
    image: `${SITE_URL}/kishan-patel.webp`,
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'Certified Career Analyst',
      recognizedBy: { '@type': 'Organization', name: 'Edumilestones' },
    },
  },
  meeta: {
    name: 'Meeta Patel',
    jobTitle: 'Founder & Career Counsellor',
    description:
      'Specialises in working with parents and students together, particularly around stream selection after Class 10.',
    image: `${SITE_URL}/meeta-patel.webp`,
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'Certified Practitioner, Edumilestones Psychometric Framework',
      recognizedBy: { '@type': 'Organization', name: 'Edumilestones' },
    },
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
