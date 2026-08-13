import type { BlogPost } from '@/data/blogs'
import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { Reveal } from '@/components/ui/reveal'

const AUTHOR_NAMES = { kishan: 'Kishan Patel', meeta: 'Meeta Patel' } as const

interface ArticleHeaderProps {
  post: BlogPost
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <Reveal as="div" className="mx-auto max-w-3xl px-4 pt-6 md:px-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">{post.category}</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-ink md:text-5xl">{post.title}</h1>
        <p className="mt-4 flex flex-wrap gap-x-2 text-sm text-muted-ink">
          <span>
            By <span>{AUTHOR_NAMES[post.author]}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>{post.date}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </p>
      </header>

      <div className="group relative mt-6 overflow-hidden rounded-[1.6rem] border border-white/10 bg-brand-green shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <div
          className="aspect-[16/7] w-full transition-transform duration-700 ease-out group-hover:scale-105"
          role="img"
          aria-label={post.title}
        >
          <PlaceholderVisual label={post.title} src={post.image} tone="dark" />
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/60 to-transparent"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 rounded-2xl bg-brand-yellow shadow-lg" aria-hidden="true" />
      </div>
    </Reveal>
  )
}
