import { ExternalLink } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'

const EXPLORE_URL = 'https://careertest.edumilestones.com/online-courses/universities/NTEy'

const logoModules = import.meta.glob('../../assets/university-logo-*.webp', { eager: true }) as Record<
  string,
  { default: string }
>
const UNIVERSITY_LOGOS = Object.keys(logoModules)
  .sort()
  .map((path) => logoModules[path].default)

// Split the logo set across the three marquee rows so each row shows a different
// slice rather than all three cycling through the same logos in lockstep.
const ROW_SIZE = Math.ceil(UNIVERSITY_LOGOS.length / 3)
const ROWS = [
  UNIVERSITY_LOGOS.slice(0, ROW_SIZE),
  UNIVERSITY_LOGOS.slice(ROW_SIZE, ROW_SIZE * 2),
  UNIVERSITY_LOGOS.slice(ROW_SIZE * 2),
]

function LogoTile({ src }: { src: string }) {
  return (
    <div className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-neutral-border bg-white p-4 shadow-sm">
      <img src={src} alt="" className="h-full w-full object-contain" />
    </div>
  )
}

function LogoRow({ logos, reverse }: { logos: string[]; reverse?: boolean }) {
  return (
    <div className="flex w-max gap-4">
      {[logos, logos].map((set, setIndex) => (
        <div
          key={setIndex}
          className={
            reverse
              ? 'flex shrink-0 gap-4 animate-marquee-reverse motion-reduce:animate-none'
              : 'flex shrink-0 gap-4 animate-marquee motion-reduce:animate-none'
          }
          aria-hidden={setIndex === 1}
        >
          {set.map((src, index) => (
            <LogoTile key={`${src}-${index}`} src={src} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function ExploreUniversities() {
  return (
    <section className="overflow-hidden px-4 py-10 md:px-8 md:py-14">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-ink md:text-4xl">
          Explore <span className="text-brand-green">Universities</span>
        </h2>
        <p className="mt-2 text-muted-ink">Browse universities from our network of partner institutions.</p>
      </Reveal>

      <Reveal delay={100} className="mt-10">
        <div
          className="space-y-4 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
          }}
        >
          <LogoRow logos={ROWS[0]} />
          <LogoRow logos={ROWS[1]} reverse />
          <LogoRow logos={ROWS[2]} />
        </div>
      </Reveal>

      <Reveal delay={160} className="mt-10 text-center">
        <a
          href={EXPLORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-brand-green py-2.5 pl-6 pr-2 text-sm font-semibold text-warm-white transition-colors hover:bg-brand-green/90"
        >
          View all Universities
          <PillCtaEndcap
            tone="yellow"
            icon={ExternalLink}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
        </a>
      </Reveal>
    </section>
  )
}
