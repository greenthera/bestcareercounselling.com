import { Link } from 'react-router-dom'
import { successStories } from '@/data/stories'

export function SuccessStoriesPreview() {
  return (
    <section className="bg-green-tint px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Real students. Real decisions.</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {successStories.slice(0, 3).map((story) => (
            <div key={`${story.studentInitial}-${story.city}`} className="rounded-xl border border-neutral-border bg-white p-5">
              <p className="text-sm font-semibold text-brand-green">
                {story.studentInitial} · {story.studentClass} · {story.city}
              </p>
              <dl className="mt-3 space-y-2 text-sm">
                <div>
                  <dt className="font-semibold text-ink">Was</dt>
                  <dd className="text-muted-ink">{story.was}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Found</dt>
                  <dd className="text-muted-ink">{story.found}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Chose</dt>
                  <dd className="text-muted-ink">{story.chose}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Now</dt>
                  <dd className="text-muted-ink">{story.now}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/success-stories" className="font-medium text-brand-green hover:underline">
            View All Success Stories →
          </Link>
        </div>
      </div>
    </section>
  )
}
