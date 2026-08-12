import { JsonLd } from './JsonLd'
import { SITE_URL } from '@/lib/seo'

interface BreadcrumbListSchemaProps {
  title: string
  path: string
}

export function BreadcrumbListSchema({ title, path }: BreadcrumbListSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${SITE_URL}/blogs` },
          { '@type': 'ListItem', position: 3, name: title, item: `${SITE_URL}${path}` },
        ],
      }}
    />
  )
}
