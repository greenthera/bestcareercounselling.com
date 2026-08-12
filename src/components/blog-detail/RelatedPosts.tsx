import { Link } from 'react-router-dom'
import { blogPosts, type BlogCategory } from '@/data/blogs'

interface RelatedPostsProps {
  currentSlug: string
  category: BlogCategory
}

export function RelatedPosts({ currentSlug, category }: RelatedPostsProps) {
  const related = blogPosts.filter((post) => post.category === category && post.slug !== currentSlug).slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-2xl font-bold text-ink">Related articles</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            to={`/blogs/${post.slug}`}
            className="block rounded-xl border border-neutral-border bg-white p-4 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">{post.category}</p>
            <p className="mt-2 text-sm font-semibold text-ink">{post.title}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
