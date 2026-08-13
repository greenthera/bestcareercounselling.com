import { GitFork, ArrowLeftRight, RotateCcw, Compass } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

const PROBLEMS = [
  { text: 'Science, Commerce or Arts — and no way to decide', icon: GitFork },
  { text: 'You and your child want different things', icon: ArrowLeftRight },
  { text: 'Wrong stream chosen. Now what?', icon: RotateCcw },
  { text: 'No idea which colleges to even apply to', icon: Compass },
]

export function ProblemSection() {
  return (
    <section className="px-4 pb-4 pt-12 md:px-8 md:pb-6 md:pt-16">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-brand-green px-6 py-14 md:px-10 md:py-16">
        <Reveal>
          <h2 className="text-3xl font-bold text-warm-white md:text-4xl">
            Sound <span className="text-brand-yellow">familiar</span>?
          </h2>
          <p className="mt-2 text-warm-white/70">Most families we meet are stuck on one of these.</p>
        </Reveal>

        <div className="mt-9 border-t border-white/15">
          {PROBLEMS.map((problem, index) => {
            const Icon = problem.icon
            return (
              <Reveal key={problem.text} delay={index * 90}>
                <div className="border-b border-white/15">
                  <div className="group -mx-4 flex items-center gap-5 rounded-2xl px-4 py-5 transition-colors duration-300 hover:bg-white/5 md:py-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-warm-white transition-all duration-300 group-hover:bg-brand-yellow group-hover:text-ink md:h-12 md:w-12">
                      <Icon className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                    </span>
                    <p className="text-lg font-medium text-warm-white md:text-xl">{problem.text}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
