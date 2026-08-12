import type { BlogPost } from '@/data/blogs'

const AUTHOR_NAMES = { kishan: 'Kishan Patel', meeta: 'Meeta Patel' } as const

interface ArticleHeaderProps {
  post: BlogPost
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <header className="mx-auto max-w-3xl px-4 pt-6 md:px-8">
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
  )
}
