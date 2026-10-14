import { BLOG_CATEGORIES } from '@/lib/blog'
import { cn } from '@/lib/utils'

const CATEGORIES: readonly string[] = ['All', ...BLOG_CATEGORIES]

interface BlogCategoriesProps {
  selected: string
  onSelect: (category: string) => void
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
            'rounded-full border border-neutral-border px-4 py-2 text-sm font-medium transition-colors duration-200',
            selected === category ? 'border-ink bg-ink text-warm-white' : 'bg-white text-ink hover:bg-green-tint',
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
