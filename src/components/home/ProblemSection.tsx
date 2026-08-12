import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/reveal'

const PROBLEMS = [
  'Science, Commerce or Arts — and no way to decide',
  'You and your child want different things',
  'Wrong stream chosen. Now what?',
  'No idea which colleges to even apply to',
]

const SPANS = ['md:col-span-2', 'md:col-span-1', 'md:col-span-1', 'md:col-span-2']

export function ProblemSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 pt-16 md:px-8 md:pb-14 md:pt-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <h2 className="text-3xl font-bold text-ink md:text-4xl">
            Sound <span className="text-brand-green">familiar</span>?
          </h2>
        </Reveal>
        <Reveal delay={60}>
          <p className="text-sm text-muted-ink">Most families we meet are stuck on one of these.</p>
        </Reveal>
      </div>

      <div className="mt-9 grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {PROBLEMS.map((problem, index) => (
          <Reveal key={problem} delay={index * 90} className={SPANS[index]}>
            <div className="group flex h-full flex-col justify-between gap-4 rounded-[1.375rem] border border-neutral-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-tint text-xs font-bold text-brand-green transition-colors duration-300 group-hover:bg-brand-yellow group-hover:text-ink">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className={cn('text-ink', (index === 0 || index === 3) && 'text-lg')}>{problem}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
