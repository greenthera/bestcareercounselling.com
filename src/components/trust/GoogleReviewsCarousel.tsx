import { useState } from 'react'
import { Star, Quote } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import googleReviews from '@/data/googleReviews.json'

interface GoogleReview {
  id: string
  name: string
  avatar: string
  rating: number
  text: string
  date: string
}

const REVIEWS = googleReviews as GoogleReview[]
const MID = Math.ceil(REVIEWS.length / 2)
const ROW_ONE = REVIEWS.slice(0, MID)
const ROW_TWO = REVIEWS.slice(MID)

function ReviewAvatar({ review }: { review: GoogleReview }) {
  const [failed, setFailed] = useState(false)

  if (failed || !review.avatar) {
    return (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-warm-white">
        {review.name.charAt(0)}
      </span>
    )
  }

  return (
    <img
      src={review.avatar}
      alt=""
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="h-11 w-11 shrink-0 rounded-full object-cover"
    />
  )
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <div className="flex h-full w-[320px] shrink-0 flex-col rounded-[1.6rem] border border-white/10 bg-white p-5 shadow-xl sm:w-[380px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 text-brand-yellow">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} size={14} fill="currentColor" stroke="none" />
          ))}
        </div>
        <Quote className="h-5 w-5 text-brand-green/25" fill="currentColor" aria-hidden="true" />
      </div>

      <p className="mt-3 line-clamp-5 flex-1 whitespace-pre-line text-sm leading-relaxed text-ink">{review.text}</p>

      <div className="mt-5 flex items-center gap-3 border-t border-neutral-border pt-4">
        <ReviewAvatar review={review} />
        <div className="min-w-0 text-sm">
          <p className="truncate font-semibold text-ink">{review.name}</p>
          <p className="text-xs text-muted-ink">{review.date} · Google review</p>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ reviews, reverse }: { reviews: GoogleReview[]; reverse?: boolean }) {
  return (
    <div className="flex w-max gap-5 [--row-play-state:running] hover:[--row-play-state:paused]">
      {[reviews, reviews].map((set, setIndex) => (
        <div
          key={setIndex}
          className={
            reverse
              ? 'flex shrink-0 gap-5 animate-marquee-reverse motion-reduce:animate-none'
              : 'flex shrink-0 gap-5 animate-marquee motion-reduce:animate-none'
          }
          style={{ animationPlayState: 'var(--row-play-state, running)' }}
          aria-hidden={setIndex === 1}
        >
          {set.map((review) => (
            <ReviewCard key={`${review.id}-${setIndex}`} review={review} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function GoogleReviewsCarousel() {
  return (
    <section className="overflow-hidden bg-brand-green py-14 md:py-20">
      <Reveal className="mx-auto max-w-2xl px-4 text-center md:px-8">
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <div className="flex gap-0.5 text-brand-yellow">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill="currentColor" stroke="none" />
            ))}
          </div>
          <span className="text-sm font-semibold text-warm-white">5.0 · 948 Google Reviews</span>
        </div>
        <h2 className="mt-5 text-3xl font-bold text-warm-white md:text-4xl">
          Loved <span className="text-brand-yellow">on Google</span>
        </h2>
        <p className="mt-2 text-warm-white/60">Real words from students and parents, straight from our Google Business Profile.</p>
      </Reveal>

      <Reveal delay={120} className="relative mt-12">
        <div
          className="space-y-5 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
          }}
        >
          <MarqueeRow reviews={ROW_ONE} />
          <MarqueeRow reviews={ROW_TWO} reverse />
        </div>
      </Reveal>
    </section>
  )
}
