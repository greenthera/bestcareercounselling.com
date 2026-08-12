import { Reveal } from '@/components/ui/reveal'

interface BlogHeroProps {
  searchValue: string
  onSearchChange: (value: string) => void
}

export function BlogHero({ searchValue, onSearchChange }: BlogHeroProps) {
  return (
    <section className="px-4 pb-4 pt-10 text-center md:px-8 md:pb-6 md:pt-14">
      <Reveal className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold leading-tight text-ink md:text-6xl">
          Career guidance, <span className="text-brand-green">explained</span>.
        </h1>
        <p className="mt-4 text-lg text-muted-ink">
          Practical guidance for students and parents making important education and career decisions.
        </p>
        <input
          type="search"
          role="searchbox"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search articles…"
          aria-label="Search blog articles"
          className="mt-8 w-full rounded-full border border-neutral-border bg-white px-5 py-3 text-sm shadow-sm transition-shadow duration-300 focus:shadow-md focus:outline-none"
        />
      </Reveal>
    </section>
  )
}
