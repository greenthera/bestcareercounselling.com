export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  keywords: string
  category: string
  /** Public path to a cover image (e.g. "/images/blog/post.webp"). Omitted posts fall back to a generated placeholder. */
  image?: string
  content: string
  readingTimeMinutes: number
}

const WORDS_PER_MINUTE = 200

const modules = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>

function slugFromPath(path: string): string {
  return path.replace('/src/content/blog/', '').replace(/\.md$/, '')
}

// gray-matter depends on Node's Buffer global, which doesn't exist in the browser, so it
// can't run in client-side code (only in scripts/generate-seo-files.mjs, a Node script).
// Frontmatter here is just flat `key: "value"` lines, so a tiny parser avoids that
// dependency entirely. It doesn't handle escaped quotes inside a value — not needed since
// every post's frontmatter is written by hand, not generated from untrusted input.
interface Frontmatter {
  title: string
  description: string
  date: string
  author: string
  keywords: string
  category: string
  image: string
}

function parseFrontmatter(raw: string): Frontmatter & { content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    throw new Error('Blog post is missing frontmatter')
  }
  const [, block, content] = match
  const data = {} as Frontmatter
  for (const line of block.split('\n')) {
    const lineMatch = line.match(/^(\w+):\s*"?([^"]*?)"?\s*$/)
    if (lineMatch) data[lineMatch[1] as keyof Frontmatter] = lineMatch[2]
  }
  return { ...data, content: content.trim() }
}

const posts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { title, description, date, author, keywords, category, image, content } = parseFrontmatter(raw)
    const wordCount = content.split(/\s+/).length
    return {
      slug: slugFromPath(path),
      title,
      description,
      date,
      author: author || 'Best Career Counselling',
      keywords: keywords || '',
      category: category || 'Careers',
      image: image || undefined,
      content,
      readingTimeMinutes: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

export const BLOG_CATEGORIES = ['After 10th', 'After 12th', 'Exams', 'Colleges', 'Careers', 'Parenting'] as const

export function getAllBlogPosts(): BlogPost[] {
  return posts
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function filterBlogPosts(query: string, category: string): BlogPost[] {
  const normalized = query.trim().toLowerCase()
  return posts.filter((post) => {
    const matchesCategory = category === 'All' || post.category === category
    const matchesSearch =
      normalized === '' ||
      post.title.toLowerCase().includes(normalized) ||
      post.description.toLowerCase().includes(normalized) ||
      post.content.toLowerCase().includes(normalized)
    return matchesCategory && matchesSearch
  })
}
