import { useState } from 'react'
import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { ImageLightbox } from '@/components/ui/image-lightbox'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'
import officeSurat from '@/assets/bestcareercounselling-4.webp'
import oneOnOne from '@/assets/bestcareercounselling.webp'
import parentWorkshop from '@/assets/what-you-walk-away-with-1.webp'
import teamAtWork from '@/assets/bestcareercounselling-1.webp'
import talkingWithStudents from '@/assets/not-ready-to-book.webp'
import reviewingDocuments from '@/assets/what-you-walk-away-with-2.webp'

const PHOTOS = [
  { label: 'Our office in Surat', src: officeSurat, tile: 'lg:col-span-2 lg:row-span-2' },
  { label: 'A one-on-one counselling session', src: oneOnOne, tile: 'lg:col-span-2 lg:row-span-1' },
  { label: 'A parent workshop session', src: parentWorkshop, tile: 'lg:col-span-1 lg:row-span-1' },
  { label: 'The counselling team at work', src: teamAtWork, tile: 'lg:col-span-1 lg:row-span-1' },
  { label: 'Talking through options with students', src: talkingWithStudents, tile: 'lg:col-span-2 lg:row-span-1' },
  { label: 'Reviewing admission documents together', src: reviewingDocuments, tile: 'lg:col-span-2 lg:row-span-1' },
]

export function AdmissionsGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 md:px-8 md:pb-14">
      <Reveal>
        <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">
          Inside our <span className="text-brand-green">admission counselling</span>
        </h2>
        <p className="mt-2 text-center text-muted-ink">A look at how we work with students and parents, one profile at a time.</p>
      </Reveal>

      <div className="mt-9 grid grid-cols-2 gap-3.5 lg:grid-cols-4 lg:auto-rows-[240px] lg:gap-4">
        {PHOTOS.map((photo, index) => (
          <Reveal key={photo.label} delay={index * 90} className={cn('aspect-square lg:aspect-auto', photo.tile)}>
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="group h-full w-full overflow-hidden rounded-[1.375rem] border border-neutral-border shadow-sm transition-shadow duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
              aria-label={`View photo: ${photo.label}`}
            >
              <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                <PlaceholderVisual label={photo.label} src={photo.src} />
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
