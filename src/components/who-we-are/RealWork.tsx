import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { Reveal } from '@/components/ui/reveal'

const PHOTOS = [
  '[REAL PHOTO — OFFICE, SURAT]',
  '[REAL PHOTO — COUNSELLING SESSION]',
  '[REAL PHOTO — WORKSHOP]',
  '[REAL PHOTO — TEAM]',
]

export function RealWork() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-0 pt-10 md:px-8 md:pt-14">
      <Reveal>
        <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Real work</h2>
      </Reveal>
      <div className="mt-9 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {PHOTOS.map((caption, index) => (
          <Reveal key={caption} delay={index * 90}>
            <div
              className="group aspect-square overflow-hidden rounded-[1.375rem] border border-neutral-border shadow-sm transition-shadow duration-300 hover:shadow-lg"
              role="img"
              aria-label={caption}
            >
              <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                <PlaceholderVisual label={caption} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
