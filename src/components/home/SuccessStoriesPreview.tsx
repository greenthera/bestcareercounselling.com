import { Link } from 'react-router-dom'
import { successStories } from '@/data/stories'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import { Reveal } from '@/components/ui/reveal'

export function SuccessStoriesPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <Reveal>
        <h2 className="text-3xl font-bold text-ink md:text-4xl">
          Real students. Real <span className="text-brand-green">decisions</span>.
        </h2>
      </Reveal>

      <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {successStories.slice(0, 3).map((story, index) => (
          <Reveal key={`${story.studentInitial}-${story.city}`} delay={index * 100}>
            <div className="group h-full rounded-[1.6rem] border border-neutral-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-green">
                {story.studentInitial} · {story.studentClass} · {story.city}
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-wide text-muted-ink">Was</dt>
                  <dd className="mt-0.5 text-ink">{story.was}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-wide text-muted-ink">Found</dt>
                  <dd className="mt-0.5 text-ink">{story.found}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-wide text-muted-ink">Chose</dt>
                  <dd className="mt-0.5 text-ink">{story.chose}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-wide text-muted-ink">Now</dt>
                  <dd className="mt-0.5 text-ink">{story.now}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/success-stories"
          className="group inline-flex items-center gap-2 font-medium text-brand-green hover:underline"
        >
          View All Success Stories
          <PillCtaEndcap className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  )
}
