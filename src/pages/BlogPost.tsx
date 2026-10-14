import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Calendar, Clock, Newspaper, User } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { FinalCTA } from '@/components/home/FinalCTA'
import { BlogPostingSchema } from '@/components/seo/BlogPostingSchema'
import { PageSeo } from '@/components/seo/PageSeo'
import { getBlogPostBySlug } from '@/lib/blog'
import NotFound from './NotFound'

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getBlogPostBySlug(slug) : undefined

  if (!post) {
    return <NotFound />
  }

  return (
    <>
      <PageSeo
        title={`${post.title} | Best Career Counselling`}
        description={post.description}
        path={`/blogs/${post.slug}`}
        type="article"
        publishedTime={post.date}
        keywords={post.keywords}
      />
      <BlogPostingSchema
        title={post.title}
        description={post.description}
        datePublished={post.date}
        slug={post.slug}
        keywords={post.keywords}
      />
      <Breadcrumbs
        items={[
          { label: 'Blogs', path: '/blogs' },
          { label: post.title, path: `/blogs/${post.slug}` },
        ]}
      />

      <section className="px-4 pb-4 pt-10 text-center md:px-8 md:pb-6 md:pt-14">
        <Reveal className="mx-auto max-w-3xl">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green text-warm-white">
            <Newspaper className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-ink md:text-5xl">{post.title}</h1>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-ink">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" aria-hidden="true" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readingTimeMinutes} min read
            </span>
          </div>
        </Reveal>
      </section>

      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <Reveal delay={80} className="aspect-video overflow-hidden rounded-[1.6rem] shadow-sm">
          <PlaceholderVisual label={post.title} src={post.image} />
        </Reveal>
      </div>

      <article className="mx-auto max-w-3xl px-4 pb-10 pt-8 md:px-8 md:pb-14">
        <div className="rounded-[1.6rem] border border-neutral-border bg-white p-6 shadow-sm sm:p-10">
          {/*
            Not wrapped in Reveal: its scroll-trigger needs 15% of the element's own height
            to enter the viewport before it fades in, which a long article (far taller than
            the viewport) can never reach, leaving the whole page permanently invisible.
          */}
          <div className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:text-ink prose-p:text-ink prose-a:font-semibold prose-a:text-brand-green prose-a:underline prose-a:decoration-brand-green/40 prose-a:underline-offset-2 hover:prose-a:decoration-brand-green prose-strong:text-ink prose-blockquote:border-brand-green prose-blockquote:text-muted-ink prose-li:text-ink">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>

      <FinalCTA
        variant="button"
        heading="Not sure which path is right for you?"
        description="A 15-minute call with Kishan or Meeta can help you see your options clearly."
      />
    </>
  )
}
