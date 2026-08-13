import { GitFork, ArrowLeftRight, RotateCcw, Compass } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const PROBLEMS = [
  {
    eyebrow: 'Stream Confusion',
    text: 'Science, Commerce or Arts — and no way to decide',
    icon: GitFork,
    position: 'left-0 top-0 md:left-[1%] md:top-[2%]',
  },
  {
    eyebrow: 'Family Conflict',
    text: 'You and your child want different things',
    icon: ArrowLeftRight,
    position: 'right-0 top-[6%] md:right-[1%] md:top-[8%]',
  },
  {
    eyebrow: 'Wrong Choice',
    text: 'Wrong stream chosen. Now what?',
    icon: RotateCcw,
    position: 'bottom-[8%] left-0 md:bottom-[10%] md:left-[3%]',
  },
  {
    eyebrow: 'College List',
    text: 'No idea which colleges to even apply to',
    icon: Compass,
    position: 'bottom-0 right-0 md:bottom-[1%] md:right-[3%]',
  },
]

export function ProblemSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <Reveal className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-bold text-ink md:text-4xl">
          Sound <span className="text-brand-green">familiar</span>?
        </h2>
        <p className="mt-2 text-muted-ink">Most families we meet are stuck on one of these.</p>
      </Reveal>

      {/* Desktop: radial layout — the ring "strips" rotate continuously behind fixed, readable cards */}
      <Reveal className="relative mx-auto mt-16 hidden aspect-square max-w-2xl md:block">
        <div
          className="absolute inset-[10%] animate-[spin_90s_linear_infinite] rounded-full border-2 border-dashed border-brand-green/40 motion-reduce:animate-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-[22%] animate-[spin_70s_linear_infinite_reverse] rounded-full border-2 border-dashed border-brand-green/55 motion-reduce:animate-none"
          aria-hidden="true"
        />

        <div
          className="absolute inset-[26%] animate-glow-pulse rounded-full bg-brand-yellow/40 blur-2xl motion-reduce:animate-none"
          aria-hidden="true"
        />
        <div className="absolute inset-[32%] flex flex-col items-center justify-center gap-1 rounded-full bg-brand-yellow text-center shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50">Trusted since 1996</span>
          <p className="px-6 text-lg font-extrabold uppercase leading-tight tracking-wide text-ink">
            Best Career
            <br />
            Counselling
          </p>
        </div>

        {PROBLEMS.map((problem, index) => {
          const Icon = problem.icon
          return (
            <Reveal
              key={problem.eyebrow}
              delay={index * 100}
              className={cn('absolute w-60 lg:w-64', problem.position)}
            >
              <div className="group rounded-2xl border border-neutral-border bg-white p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-tint text-brand-green transition-colors duration-300 group-hover:bg-brand-yellow group-hover:text-ink">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="mt-2.5 text-xs font-bold uppercase tracking-wide text-brand-green">{problem.eyebrow}</p>
                <p className="mt-1 text-sm font-semibold text-ink">{problem.text}</p>
              </div>
            </Reveal>
          )
        })}
      </Reveal>

      {/* Mobile: simple stacked cards */}
      <div className="mt-9 grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:hidden">
        {PROBLEMS.map((problem, index) => {
          const Icon = problem.icon
          return (
            <Reveal key={problem.eyebrow} delay={index * 90}>
              <div className="flex items-start gap-3 rounded-[1.375rem] border border-neutral-border bg-white p-5 shadow-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-tint text-brand-green">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-green">{problem.eyebrow}</p>
                  <p className="mt-1 text-sm font-semibold text-ink">{problem.text}</p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
