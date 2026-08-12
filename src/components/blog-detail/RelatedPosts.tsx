import { Link } from 'react-router-dom'
import { blogPosts, type BlogCategory } from '@/data/blogs'
import { Reveal } from '@/components/ui/reveal'

interface RelatedPostsProps {
  currentSlug: string
  category: BlogCategory
}

export function RelatedPosts({ currentSlug, category }: RelatedPostsProps) {
  const related = blogPosts.filter((post) => post.category === category && post.slug !== currentSlug).slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
      <Reveal>
        <h2 className="text-2xl font-bold text-ink">Related articles</h2>
      </Reveal>
      <div className="mt-6 grid gap-3.5 sm:grid-cols-3">
        {related.map((post, index) => (
          <Reveal key={post.slug} delay={index * 80}>
            <Link
              to={`/blogs/${post.slug}`}
              className="block h-full rounded-[1.375rem] border border-neutral-border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">{post.category}</p>
              <p className="mt-2 text-sm font-semibold text-ink">{post.title}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
