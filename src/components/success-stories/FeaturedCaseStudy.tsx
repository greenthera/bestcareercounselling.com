import { successStories } from '@/data/stories'
import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { Reveal } from '@/components/ui/reveal'
import counsellingOne from '@/assets/CounsellingOne.webp'

export function FeaturedCaseStudy() {
  const story = successStories[0]

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
      <Reveal className="overflow-hidden rounded-[1.6rem] border border-neutral-border bg-white shadow-sm md:grid md:grid-cols-2">
        <div className="aspect-video md:aspect-auto" role="img" aria-label={story.imageAlt}>
          <PlaceholderVisual label={story.imageAlt} src={counsellingOne} />
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
      </Reveal>
    </section>
  )
}
