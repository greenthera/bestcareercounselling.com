import type { BlogCategory } from '@/data/blogs'
import { cn } from '@/lib/utils'

const CATEGORIES: Array<BlogCategory | 'All'> = ['All', 'After 10th', 'After 12th', 'Exams', 'Colleges', 'Careers', 'Parenting']

interface BlogCategoriesProps {
  selected: BlogCategory | 'All'
  onSelect: (category: BlogCategory | 'All') => void
}

export function BlogCategories({ selected, onSelect }: BlogCategoriesProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-4">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          className={cn(
            'rounded-full border border-neutral-border px-4 py-2 text-sm font-medium',
            selected === category ? 'bg-brand-green text-warm-white' : 'bg-white text-ink hover:bg-green-tint',
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
