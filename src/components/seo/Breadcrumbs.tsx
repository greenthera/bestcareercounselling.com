import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { JsonLd } from './JsonLd'
import { SITE_URL } from '@/lib/seo'

export interface BreadcrumbItem {
  label: string
  path: string
}

interface BreadcrumbsProps {
  /** Trail after Home, which is prepended automatically. The last item is the current page. */
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const trail: BreadcrumbItem[] = [{ label: 'Home', path: '/' }, ...items]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      // Google's own examples omit the URL on the last (current-page) item.
      ...(index < trail.length - 1 ? { item: `${SITE_URL}${item.path}` } : {}),
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="px-4 pt-4 md:px-8">
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 text-sm text-muted-ink">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-ink/60" aria-hidden="true" />}
              {isLast ? (
                <span aria-current="page" className="font-medium text-ink">
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className="transition-colors hover:text-brand-green hover:underline">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
      <JsonLd data={structuredData} />
    </nav>
  )
}
