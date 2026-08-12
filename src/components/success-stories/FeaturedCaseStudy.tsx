import { successStories } from '@/data/stories'

export function FeaturedCaseStudy() {
  const story = successStories[0]

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
      <div className="overflow-hidden rounded-2xl border border-neutral-border bg-white md:grid md:grid-cols-2">
        <div className="aspect-video bg-soft-cream md:aspect-auto" role="img" aria-label={story.imageAlt}>
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-ink">
            [REAL PHOTO]
          </div>
        </div>

        <div className="p-6 md:p-10">
          <p className="text-sm font-semibold text-brand-green">
            {story.studentInitial} · {story.studentClass} · {story.city}
          </p>
          <p className="mt-1 text-sm text-muted-ink">{story.service}</p>

          <dl className="mt-6 space-y-4">
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-brand-green">Was</dt>
              <dd className="mt-1 text-ink">{story.was}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-brand-green">Found</dt>
              <dd className="mt-1 text-ink">{story.found}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-brand-green">Chose</dt>
              <dd className="mt-1 text-ink">{story.chose}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-brand-green">Now</dt>
              <dd className="mt-1 text-ink">{story.now}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
