import { Play } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'
import { videoTestimonials, type VideoTestimonial } from '@/data/testimonials'

export function VideoTestimonials() {
  const [active, setActive] = useState<VideoTestimonial | null>(null)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Hear it from parents</h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {videoTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="overflow-hidden rounded-xl border border-neutral-border bg-white">
            <div className="relative aspect-video bg-soft-cream">
              <div className="flex h-full items-center justify-center p-4 text-center text-xs text-muted-ink">
                {testimonial.thumbnailAlt}
              </div>
              <button
                type="button"
                aria-label="Play testimonial"
                onClick={() => setActive(testimonial)}
                className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow text-ink">
                  <Play size={20} fill="currentColor" />
                </span>
              </button>
            </div>
            <div className="p-4 text-sm text-ink">
              {testimonial.name} · {testimonial.city}, {testimonial.relationship}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {active?.name} · {active?.relationship} · {active?.city}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded-lg bg-soft-cream" role="img" aria-label={active?.thumbnailAlt}>
            <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-ink">
              {active?.thumbnailAlt}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
