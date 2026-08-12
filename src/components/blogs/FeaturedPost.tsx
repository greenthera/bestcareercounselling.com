import { Link } from 'react-router-dom'
import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { Reveal } from '@/components/ui/reveal'
import type { BlogPost } from '@/data/blogs'

interface FeaturedPostProps {
  post: BlogPost
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Reveal className="mx-auto max-w-5xl px-4 md:px-8">
      <Link
        to={`/blogs/${post.slug}`}
        className="group block overflow-hidden rounded-[1.6rem] border border-neutral-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg md:grid md:grid-cols-2"
      >
        <div
          className="aspect-video overflow-hidden md:aspect-auto"
          role="img"
          aria-label={`[FEATURED IMAGE — ${post.title.toUpperCase()}]`}
        >
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
            <PlaceholderVisual label="[FEATURED IMAGE]" />
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
    </Reveal>
  )
}
