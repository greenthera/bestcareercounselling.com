import { GitFork, ArrowLeftRight, RotateCcw, Compass } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

const PROBLEMS = [
  {
    eyebrow: 'Stream Confusion',
    text: 'Science, Commerce or Arts — and no way to decide',
    icon: GitFork,
    angle: 315,
  },
  {
    eyebrow: 'Family Conflict',
    text: 'You and your child want different things',
    icon: ArrowLeftRight,
    angle: 45,
  },
  {
    eyebrow: 'Wrong Choice',
    text: 'Wrong stream chosen. Now what?',
    icon: RotateCcw,
    angle: 225,
  },
  {
    eyebrow: 'College List',
    text: 'No idea which colleges to even apply to',
    icon: Compass,
    angle: 135,
  },
]

export function ProblemSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 pt-16 md:px-8 md:pb-14 md:pt-24">
      <Reveal className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-bold text-ink md:text-4xl">
          Sound <span className="text-brand-green">familiar</span>?
        </h2>
        <p className="mt-2 text-muted-ink">Most families we meet are stuck on one of these.</p>
      </Reveal>

      {/* Desktop: radial layout — rings and cards orbit slowly around the circle, pause on hover to read.
          A single shared `--orbit-angle` custom property (see index.css) drives both the card's
          position around the circle and its counter-rotation, so they can never drift out of sync
          and the card content always stays upright. */}
      <Reveal
        className="group relative mx-auto mt-16 hidden aspect-square max-w-2xl md:block [animation:orbit-spin_140s_linear_infinite] [animation-play-state:running] motion-reduce:[animation:none] group-hover:[animation-play-state:paused]"
      >
        <div
          className="absolute inset-[10%] rounded-full border-2 border-dashed border-brand-green/40"
          style={{ transform: 'rotate(var(--orbit-angle))' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-[22%] rounded-full border-2 border-dashed border-brand-green/55"
          style={{ transform: 'rotate(calc(-1 * var(--orbit-angle)))' }}
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

        {PROBLEMS.map((problem) => {
          const Icon = problem.icon
          return (
            <div
              key={problem.eyebrow}
              className="absolute left-1/2 top-1/2 [--radius:295px] lg:[--radius:305px]"
              style={{
                transform: `rotate(calc(var(--orbit-angle) + ${problem.angle}deg)) translateY(var(--radius))`,
                transformOrigin: '0 0',
              }}
            >
              <div
                style={{
                  transform: `translate(-50%, -50%) rotate(calc(-1 * (var(--orbit-angle) + ${problem.angle}deg)))`,
                }}
              >
                <div className="group/card w-60 rounded-2xl border border-neutral-border bg-white p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:w-64">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-tint text-brand-green transition-colors duration-300 group-hover/card:bg-brand-yellow group-hover/card:text-ink">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="mt-2.5 text-xs font-bold uppercase tracking-wide text-brand-green">{problem.eyebrow}</p>
                  <p className="mt-1 text-sm font-semibold text-ink">{problem.text}</p>
                </div>
              </div>
            </div>
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
