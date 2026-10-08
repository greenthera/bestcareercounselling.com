import { JsonLd } from './JsonLd'
import { ORGANIZATION_ID } from './ids'
import { SITE_URL } from '@/lib/seo'

interface ServiceSchemaProps {
  name: string
  description: string
  /** Path (and optional #anchor) this service is described on, e.g. '/what-we-do#after-10th'. */
  path: string
  areaServed?: string | string[]
}

export function ServiceSchema({ name, description, path, areaServed = ['Surat', 'Gujarat'] }: ServiceSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: name,
        name,
        description,
        provider: { '@id': ORGANIZATION_ID },
        areaServed,
        url: `${SITE_URL}${path}`,
      }}
    />
  )
}
