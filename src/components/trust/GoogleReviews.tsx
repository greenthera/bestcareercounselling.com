import { Star, Quote } from 'lucide-react'
import { writtenTestimonials } from '@/data/testimonials'

export function GoogleReviews() {
  return (
    <section className="rounded-3xl border border-neutral-border bg-white p-6 text-center md:p-10">
      <div className="flex items-center justify-center gap-1 text-brand-yellow">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={20} fill="currentColor" stroke="none" />
        ))}
      </div>
      <p className="mt-2 text-2xl font-bold text-ink">5.0</p>
      <p className="text-sm text-muted-ink">900+ Google Reviews</p>

      <div className="mt-8 grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
        {writtenTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex h-full flex-col rounded-[1.6rem] border border-neutral-border bg-soft-cream p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <Quote className="h-6 w-6 text-brand-yellow" fill="currentColor" aria-hidden="true" />
              <div className="flex gap-0.5 text-brand-yellow">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" stroke="none" />
                ))}
              </div>
            </div>
            <p className="mt-3 flex-1 text-sm italic leading-relaxed text-ink">"{testimonial.quote}"</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-warm-white">
                {testimonial.name.charAt(0)}
              </span>
              <div className="text-sm">
                <p className="font-semibold text-ink">{testimonial.name}</p>
                <p className="text-xs text-muted-ink">
                  {testimonial.city} · {testimonial.relationship}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
