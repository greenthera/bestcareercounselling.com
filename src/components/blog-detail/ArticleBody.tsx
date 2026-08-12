import type { BlogSection } from '@/data/blogs'

function slugify(heading: string): string {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

interface ArticleBodyProps {
  sections: BlogSection[]
}

export function ArticleBody({ sections }: ArticleBodyProps) {
  return (
    <div className="mx-auto mt-10 grid max-w-5xl gap-10 px-4 md:px-8 lg:grid-cols-[200px_1fr]">
      <nav aria-label="Table of contents" className="hidden lg:sticky lg:top-24 lg:block lg:h-fit">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-ink">On this page</p>
        <ul className="mt-3 space-y-2">
          {sections.map((section) => (
            <li key={section.heading}>
              <a href={`#${slugify(section.heading)}`} className="text-sm text-ink hover:text-brand-green">
                {section.heading}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <article className="min-w-0 max-w-2xl space-y-10">
        {sections.map((section) => (
          <section key={section.heading} id={slugify(section.heading)} className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-ink">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-ink">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </article>
    </div>
  )
}
