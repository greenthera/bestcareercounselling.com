import { JsonLd } from './JsonLd'
import { SITE_NAME, SITE_URL } from '@/lib/seo'
import { ORGANIZATION_ID, WEBSITE_ID } from './ids'

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: 'en-IN',
        publisher: { '@id': ORGANIZATION_ID },
      }}
    />
  )
}
