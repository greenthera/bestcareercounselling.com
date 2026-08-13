import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { Reveal } from '@/components/ui/reveal'
import type { BlogPost } from '@/data/blogs'

const PAGE_SIZE = 6

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  const [page, setPage] = useState(1)
  const [postsForPage, setPostsForPage] = useState(posts)

  if (posts !== postsForPage) {
    setPostsForPage(posts)
    setPage(1)
  }

  if (posts.length === 0) {
    return <p className="mx-auto max-w-7xl px-4 py-16 text-center text-muted-ink md:px-8">No articles match your search.</p>
  }

  const totalPages = Math.ceil(posts.length / PAGE_SIZE)
  const pagePosts = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pagePosts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 70}>
            <Link
              to={`/blogs/${post.slug}`}
              className="group block h-full overflow-hidden rounded-[1.375rem] border border-neutral-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              aria-label={`${post.title} — ${post.readTime}`}
            >
              <div className="aspect-video overflow-hidden" role="img" aria-label={`[IMAGE — ${post.title.toUpperCase()}]`}>
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                  <PlaceholderVisual label="[IMAGE]" src={post.image} />
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">{post.category}</p>
                <p className="mt-2 font-semibold text-ink">{post.title}</p>
                <p className="mt-1 text-sm text-muted-ink">{post.excerpt}</p>
                <p className="mt-3 text-xs text-muted-ink">
                  {post.readTime} · {post.date}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <span className="text-sm text-muted-ink">
            Page {page} of {totalPages}
          </span>
          <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
