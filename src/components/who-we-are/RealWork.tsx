import { useState } from 'react'
import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { ImageLightbox } from '@/components/ui/image-lightbox'
import { Reveal } from '@/components/ui/reveal'
import counselling from '@/assets/career-counselling-small-group.webp'
import counsellingOne from '@/assets/career-counselling-group-discussion.webp'
import counsellingThree from '@/assets/career-counselling-table-discussion.webp'
import counsellingFour from '@/assets/career-counselling-event-conversation.webp'

const PHOTOS = [
  { label: 'A counsellor speaking with event attendees', src: counsellingFour },
  { label: 'A counsellor leading a group discussion', src: counsellingOne },
  { label: 'A small-group counselling discussion', src: counselling },
  { label: 'A counsellor speaking with a seated group', src: counsellingThree },
]

export function RealWork() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <section className="mx-auto max-w-7xl px-4 pb-0 pt-10 md:px-8 md:pt-14">
      <Reveal>
        <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Real work</h2>
      </Reveal>
      <div className="mt-9 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {PHOTOS.map((photo, index) => (
          <Reveal key={photo.label} delay={index * 90}>
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="group aspect-square w-full overflow-hidden rounded-[1.375rem] border border-neutral-border shadow-sm transition-shadow duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
              aria-label={`View photo: ${photo.label}`}
            >
              <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                <PlaceholderVisual label={photo.label} src={photo.src} sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, 50vw" />
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <ImageLightbox
        images={PHOTOS.map((photo) => ({ src: photo.src, alt: photo.label }))}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </section>
  )
}
