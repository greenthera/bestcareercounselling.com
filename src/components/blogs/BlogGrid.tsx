import { Link } from 'react-router-dom'
import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { Reveal } from '@/components/ui/reveal'
import { Pagination } from '@/components/blog/Pagination'
import type { BlogPost } from '@/lib/blog'

const PAGE_SIZE = 10

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

interface BlogGridProps {
  posts: BlogPost[]
  page: number
  onPageChange: (page: number) => void
}

export function BlogGrid({ posts, page, onPageChange }: BlogGridProps) {
  if (posts.length === 0) {
    return <p className="mx-auto max-w-7xl px-4 py-16 text-center text-muted-ink md:px-8">No articles match your search.</p>
  }

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pagePosts = posts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pagePosts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 70}>
            <Link
              to={`/blogs/${post.slug}`}
              className="group block h-full overflow-hidden rounded-[1.375rem] border border-neutral-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              aria-label={`${post.title} — ${post.readingTimeMinutes} min read`}
            >
              <div className="aspect-video overflow-hidden" role="img" aria-label={post.title}>
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                  <PlaceholderVisual label={post.title} src={post.image} />
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">{post.category}</p>
                <p className="mt-2 font-semibold text-ink">{post.title}</p>
                <p className="mt-1 text-sm text-muted-ink">{post.description}</p>
                <p className="mt-3 text-xs text-muted-ink">
                  {post.readingTimeMinutes} min read · {formatDate(post.date)}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Pagination page={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  )
}
