import { Play, Quote } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'
import { videoTestimonials, type VideoTestimonial } from '@/data/testimonials'
import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { Reveal } from '@/components/ui/reveal'

export function VideoTestimonials() {
  const [active, setActive] = useState<VideoTestimonial | null>(null)

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <Reveal>
        <h2 className="text-3xl font-bold text-ink md:text-4xl">
          Hear it from <span className="text-brand-green">parents</span>
        </h2>
      </Reveal>

      <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videoTestimonials.map((testimonial, index) => (
          <Reveal key={testimonial.id} delay={index * 100}>
            <div className="group h-full overflow-hidden rounded-[1.6rem] border border-neutral-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="relative aspect-video overflow-hidden">
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                  <PlaceholderVisual label={testimonial.thumbnailAlt} />
                </div>
                <Quote className="absolute left-3 top-3 h-6 w-6 text-brand-yellow" fill="currentColor" aria-hidden="true" />
                <button
                  type="button"
                  aria-label="Play testimonial"
                  onClick={() => setActive(testimonial)}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-yellow text-ink shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play size={18} fill="currentColor" />
                  </span>
                </button>
              </div>
              <div className="flex items-center gap-3 p-4">
                <span className="h-9 w-9 shrink-0 rounded-full bg-green-tint" aria-hidden="true" />
                <div className="text-sm text-ink">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-muted-ink">
                    {testimonial.city} · {testimonial.relationship}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {active?.name} · {active?.relationship} · {active?.city}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video overflow-hidden rounded-lg" role="img" aria-label={active?.thumbnailAlt}>
            <PlaceholderVisual label={active?.thumbnailAlt ?? ''} />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
