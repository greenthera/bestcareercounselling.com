import { JsonLd } from './JsonLd'
import { SITE_NAME, SITE_URL } from '@/lib/seo'
import { locations } from '@/data/locations'
import { contactEmails } from '@/data/contact'
import { ORGANIZATION_ID, PERSON_IDS } from './ids'

const location = locations[0]

export function LocalBusinessSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': ORGANIZATION_ID,
        name: SITE_NAME,
        alternateName: 'Best Career Counselling',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        image: `${SITE_URL}/og-image.png`,
        description:
          'Career counselling and stream selection guidance from Kishan & Meeta Patel in Surat, with 30+ years of aptitude testing and one-on-one guidance.',
        telephone: '+918758175187',
        email: contactEmails[0],
        address: {
          '@type': 'PostalAddress',
          streetAddress:
            'LG-22, Nariman Point, City Light Rd, opp. Dharmraj Suzuki Showroom, near Ashok Panhouse, City Light Town, Athwa',
          addressLocality: 'Surat',
          addressRegion: 'Gujarat',
          postalCode: '395007',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 21.1657021,
          longitude: 72.7939999,
        },
        hasMap: location.mapLink,
        areaServed: ['Surat', 'Gujarat'],
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '10:00',
          closes: '19:00',
        },
        founder: [{ '@id': PERSON_IDS.kishan }, { '@id': PERSON_IDS.meeta }],
        sameAs: [location.mapLink],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          reviewCount: '900',
        },
      }}
    />
  )
}
