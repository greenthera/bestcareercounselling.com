import { useParams, Link } from 'react-router-dom'
import { Breadcrumb } from '@/components/blog-detail/Breadcrumb'
import { ArticleHeader } from '@/components/blog-detail/ArticleHeader'
import { ArticleBody } from '@/components/blog-detail/ArticleBody'
import { InlineCTA } from '@/components/blog-detail/InlineCTA'
import { SidebarBookingForm } from '@/components/blog-detail/SidebarBookingForm'
import { AuthorBio } from '@/components/blog-detail/AuthorBio'
import { RelatedPosts } from '@/components/blog-detail/RelatedPosts'
import { FinalCTA } from '@/components/home/FinalCTA'
import { blogPosts } from '@/data/blogs'

export default function BlogDetail() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-brand-green">Article not found</h1>
        <p className="mt-4 text-muted-ink">This article may have been moved or the link is out of date.</p>
        <Link to="/blogs" className="mt-6 inline-block font-medium text-brand-green hover:underline">
          Back to Blogs →
        </Link>
      </div>
    )
  }

  return (
    <>
      <Breadcrumb title={post.title} />
      <ArticleHeader post={post} />

      <div className="mx-auto mt-10 grid max-w-5xl gap-10 px-4 md:grid-cols-[1fr_280px] md:px-8">
        <div>
          <ArticleBody sections={post.sections.slice(0, 2)} />
          <div className="mx-auto max-w-2xl">
            <InlineCTA />
          </div>
          <ArticleBody sections={post.sections.slice(2)} />
          <div className="mx-auto max-w-2xl">
            <AuthorBio author={post.author} />
          </div>
        </div>
        <SidebarBookingForm />
      </div>

      <RelatedPosts currentSlug={post.slug} category={post.category} />
      <FinalCTA />
    </>
  )
}
