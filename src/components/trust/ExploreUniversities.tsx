import { GraduationCap, Landmark, Building2, School, BookOpen, Award, ExternalLink } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'

const EXPLORE_URL = 'https://careertest.edumilestones.com/online-courses/universities/NTEy'

const PLACEHOLDER_LOGOS = [
  { id: 'logo-1', icon: GraduationCap },
  { id: 'logo-2', icon: Landmark },
  { id: 'logo-3', icon: Building2 },
  { id: 'logo-4', icon: School },
  { id: 'logo-5', icon: BookOpen },
  { id: 'logo-6', icon: Award },
]

function LogoTile({ icon: Icon }: { icon: typeof GraduationCap }) {
  return (
    <div
      className="flex h-20 w-44 shrink-0 items-center justify-center gap-2 rounded-2xl border border-neutral-border bg-white px-4 shadow-sm"
      role="img"
      aria-label="University logo placeholder"
    >
      <Icon className="h-5 w-5 shrink-0 text-brand-green/40" aria-hidden="true" />
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-ink/50">University logo</span>
    </div>
  )
}

function LogoRow({ reverse }: { reverse?: boolean }) {
  return (
    <div className="flex w-max gap-4">
      {[PLACEHOLDER_LOGOS, PLACEHOLDER_LOGOS].map((set, setIndex) => (
        <div
          key={setIndex}
          className={
            reverse
              ? 'flex shrink-0 gap-4 animate-marquee-reverse motion-reduce:animate-none'
              : 'flex shrink-0 gap-4 animate-marquee motion-reduce:animate-none'
          }
          aria-hidden={setIndex === 1}
        >
          {set.map((logo) => (
            <LogoTile key={logo.id} icon={logo.icon} />
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
          Explore Courses <span className="text-brand-green">&amp; Universities</span>
        </h2>
        <p className="mt-2 text-muted-ink">Browse courses and universities from our network of partner institutions.</p>
      </Reveal>

      <Reveal delay={100} className="mt-10">
        <div
          className="space-y-4 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
          }}
        >
          <LogoRow />
          <LogoRow reverse />
          <LogoRow />
        </div>
      </Reveal>

      <Reveal delay={160} className="mt-10 text-center">
        <a
          href={EXPLORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-brand-green py-2.5 pl-6 pr-2 text-sm font-semibold text-warm-white transition-colors hover:bg-brand-green/90"
        >
          Explore Courses
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
