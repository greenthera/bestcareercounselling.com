interface BlogHeroProps {
  searchValue: string
  onSearchChange: (value: string) => void
}

export function BlogHero({ searchValue, onSearchChange }: BlogHeroProps) {
  return (
    <section className="bg-soft-cream px-4 py-16 text-center md:px-8 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold leading-tight text-ink md:text-6xl">Career guidance, explained.</h1>
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
          className="mt-8 w-full rounded-full border border-neutral-border bg-white px-5 py-3 text-sm shadow-sm"
        />
      </div>
    </section>
  )
}
