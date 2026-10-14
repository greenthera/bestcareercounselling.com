import { JsonLd } from './JsonLd'
import { ORGANIZATION_ID } from './ids'
import { SITE_URL } from '@/lib/seo'

interface BlogPostingSchemaProps {
  title: string
  description: string
  datePublished: string
  slug: string
  keywords?: string
}

export function BlogPostingSchema({ title, description, datePublished, slug, keywords }: BlogPostingSchemaProps) {
  const url = `${SITE_URL}/blogs/${slug}`
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        datePublished,
        url,
        mainEntityOfPage: url,
        author: { '@id': ORGANIZATION_ID },
        publisher: { '@id': ORGANIZATION_ID },
        ...(keywords ? { keywords } : {}),
      }}
    />
  )
}
