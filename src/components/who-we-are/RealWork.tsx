import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { Reveal } from '@/components/ui/reveal'
import counselling from '@/assets/what-you-walk-away-with-1.webp'
import counsellingOne from '@/assets/bestcareercounselling.webp'
import counsellingThree from '@/assets/bestcareercounselling-1.webp'
import counsellingFour from '@/assets/bestcareercounselling-4.webp'

const PHOTOS = [
  { label: 'Our office in Surat', src: counsellingFour },
  { label: 'A one-on-one counselling session', src: counsellingOne },
  { label: 'A parent workshop session', src: counselling },
  { label: 'The counselling team at work', src: counsellingThree },
]

export function RealWork() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-0 pt-10 md:px-8 md:pt-14">
      <Reveal>
        <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Real work</h2>
      </Reveal>
      <div className="mt-9 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {PHOTOS.map((photo, index) => (
          <Reveal key={photo.label} delay={index * 90}>
            <div
              className="group aspect-square overflow-hidden rounded-[1.375rem] border border-neutral-border shadow-sm transition-shadow duration-300 hover:shadow-lg"
              role="img"
              aria-label={photo.label}
            >
              <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                <PlaceholderVisual label={photo.label} src={photo.src} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
