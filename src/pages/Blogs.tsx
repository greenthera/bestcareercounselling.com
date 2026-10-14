import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BlogHero } from '@/components/blogs/BlogHero'
import { BlogCategories } from '@/components/blogs/BlogCategories'
import { FeaturedPost } from '@/components/blogs/FeaturedPost'
import { BlogGrid } from '@/components/blogs/BlogGrid'
import { FreeAssessmentSection } from '@/components/home/FreeAssessmentSection'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { usePageSeo } from '@/hooks/usePageSeo'
import { pageSeo } from '@/data/seo'
import { getAllBlogPosts, filterBlogPosts } from '@/lib/blog'

export default function Blogs() {
  usePageSeo(pageSeo.blogs)
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const allPosts = getAllBlogPosts()
  const featuredPost = allPosts[0]
  // The featured post above is only meaningful for the default, unfiltered view — once the
  // visitor searches or picks a category, show every match in the grid (including the
  // otherwise-featured post, if it matches) instead of a "featured" pick mixed into results.
  const isDefaultView = search.trim() === '' && category === 'All'

  const filtered = useMemo(() => filterBlogPosts(search, category), [search, category])
  const gridPosts = isDefaultView ? filtered.filter((post) => post.slug !== featuredPost?.slug) : filtered

  function handlePageChange(nextPage: number) {
    const next = new URLSearchParams(searchParams)
    if (nextPage > 1) next.set('page', String(nextPage))
    else next.delete('page')
    setSearchParams(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSearchChange(value: string) {
    setSearch(value)
    setSearchParams(new URLSearchParams())
  }

  function handleCategoryChange(value: string) {
    setCategory(value)
    setSearchParams(new URLSearchParams())
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Blog', path: '/blogs' }]} />
      <BlogHero searchValue={search} onSearchChange={handleSearchChange} />
      <div className="mt-10 md:mt-14">
        <BlogCategories selected={category} onSelect={handleCategoryChange} />
      </div>
      {isDefaultView && featuredPost && (
        <div className="mt-10 md:mt-14">
          <FeaturedPost post={featuredPost} />
        </div>
      )}
      {/*
        In the default view, an empty grid just means the featured post above is the only
        article so far — not a "nothing found" state, so there's nothing useful to show
        below it. That empty-search messaging only makes sense once the visitor has
        actually searched or filtered.
      */}
      {(gridPosts.length > 0 || !isDefaultView) && (
        <BlogGrid posts={gridPosts} page={page} onPageChange={handlePageChange} />
      )}
      <div className="mt-6 md:mt-10">
        <FreeAssessmentSection />
      </div>
    </>
  )
}
