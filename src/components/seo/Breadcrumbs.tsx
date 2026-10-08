import { Link } from 'react-router-dom'
import { ChevronRight, House } from 'lucide-react'
import { JsonLd } from './JsonLd'
import { SITE_URL } from '@/lib/seo'

export interface BreadcrumbItem {
  label: string
  path: string
}

interface BreadcrumbsProps {
  /** Trail after Home, which is prepended automatically. The last item is the current page. */
  items: BreadcrumbItem[]
  /** Tailwind max-width class, matched to the page's own content container so the trail lines up with what's below it. */
  maxWidthClassName?: string
  align?: 'left' | 'center'
  /**
   * Match pages that put horizontal padding inside their max-width container
   * (legal pages and assessments), rather than on an outer wrapper.
   */
  innerPadding?: boolean
}

export function Breadcrumbs({ items, maxWidthClassName = 'max-w-7xl', innerPadding = false, align = 'center' }: BreadcrumbsProps) {
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
    <nav aria-label="Breadcrumb" className={`pt-5 md:pt-6 ${innerPadding ? '' : 'px-4 md:px-8'}`}>
      <ol
        className={`mx-auto flex ${maxWidthClassName} ${innerPadding ? 'px-4 md:px-8' : ''} ${align === 'left' ? 'justify-start text-left' : 'justify-center text-center'} flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-relaxed text-muted-ink sm:text-sm`}
      >
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1
          return (
            <li key={item.path} className="flex min-w-0 max-w-full items-center gap-2">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-ink/50" aria-hidden="true" />}
              {isLast ? (
                <span aria-current="page" className="min-w-0 rounded-lg bg-green-tint px-2.5 py-1.5 font-medium text-brand-green [overflow-wrap:anywhere]">
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className="inline-flex min-h-9 min-w-0 items-center gap-1.5 rounded-md py-1 transition-colors hover:text-brand-green hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 [overflow-wrap:anywhere]">
                  {index === 0 && <House className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
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
