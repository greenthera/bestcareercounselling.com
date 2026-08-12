import { JsonLd } from './JsonLd'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export function LocalBusinessSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: SITE_NAME,
        telephone: '+91-87581-75187',
        url: SITE_URL,
        areaServed: ['Surat', 'Navsari', 'Ankleshwar', 'Valsad'],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          reviewCount: '900',
        },
      }}
    />
  )
}
