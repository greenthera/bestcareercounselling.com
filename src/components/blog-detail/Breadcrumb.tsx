import { Link } from 'react-router-dom'

interface BreadcrumbProps {
  title: string
}

export function Breadcrumb({ title }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-3xl px-4 pt-8 text-sm text-muted-ink md:px-8">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="hover:text-brand-green">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link to="/blogs" className="hover:text-brand-green">
            Blogs
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="text-ink" aria-current="page">
          {title}
        </li>
      </ol>
    </nav>
  )
}
