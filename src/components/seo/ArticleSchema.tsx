import { JsonLd } from './JsonLd'
import type { BlogPost } from '@/data/blogs'

const AUTHOR_NAMES = { kishan: 'Kishan Patel', meeta: 'Meeta Patel' } as const

interface ArticleSchemaProps {
  post: BlogPost
}

export function ArticleSchema({ post }: ArticleSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: {
          '@type': 'Person',
          name: AUTHOR_NAMES[post.author],
        },
      }}
    />
  )
}
