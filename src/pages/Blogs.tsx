import { useMemo, useState } from 'react'
import { BlogHero } from '@/components/blogs/BlogHero'
import { BlogCategories } from '@/components/blogs/BlogCategories'
import { FeaturedPost } from '@/components/blogs/FeaturedPost'
import { BlogGrid } from '@/components/blogs/BlogGrid'
import { FreeAssessmentSection } from '@/components/home/FreeAssessmentSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { blogPosts, type BlogCategory } from '@/data/blogs'

export default function Blogs() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<BlogCategory | 'All'>('All')

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return blogPosts.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category
      const matchesSearch =
        query === '' || post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [search, category])

  return (
    <>
      <BlogHero searchValue={search} onSearchChange={setSearch} />
      <div className="mt-10">
        <BlogCategories selected={category} onSelect={setCategory} />
      </div>
      <div className="mt-10">
        <FeaturedPost post={blogPosts[0]} />
      </div>
      <BlogGrid posts={filtered} />
      <FreeAssessmentSection />
      <FinalCTA />
    </>
  )
}
