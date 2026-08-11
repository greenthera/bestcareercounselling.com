import { Star } from 'lucide-react'

export function GoogleReviews() {
  return (
    <section className="rounded-xl border border-neutral-border bg-white p-6 text-center">
      <div className="flex items-center justify-center gap-1 text-brand-yellow">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={20} fill="currentColor" stroke="none" />
        ))}
      </div>
      <p className="mt-2 text-2xl font-bold text-ink">5.0</p>
      <p className="text-sm text-muted-ink">900+ Google Reviews</p>
      <p className="mt-4 text-xs text-muted-ink">[LIVE GOOGLE REVIEWS WIDGET — replace with the client's Google Business Profile embed]</p>
    </section>
  )
}
