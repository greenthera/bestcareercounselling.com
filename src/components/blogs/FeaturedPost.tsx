import { Link } from 'react-router-dom'
import type { BlogPost } from '@/data/blogs'

interface FeaturedPostProps {
  post: BlogPost
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link
      to={`/blogs/${post.slug}`}
      className="mx-auto block max-w-5xl overflow-hidden rounded-2xl border border-neutral-border bg-white md:grid md:grid-cols-2"
    >
      <div
        className="aspect-video bg-soft-cream md:aspect-auto"
        role="img"
        aria-label={`[FEATURED IMAGE — ${post.title.toUpperCase()}]`}
      >
        <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-ink">
          [FEATURED IMAGE]
        </div>
      </div>
      <div className="p-6 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">{post.category}</p>
        <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">{post.title}</h2>
        <p className="mt-3 text-muted-ink">{post.excerpt}</p>
        <p className="mt-4 text-xs text-muted-ink">
          {post.readTime} · {post.date}
        </p>
      </div>
    </Link>
  )
}
