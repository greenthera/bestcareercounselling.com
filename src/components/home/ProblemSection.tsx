import { Reveal } from '@/components/ui/reveal'

const PROBLEMS = [
  'Science, Commerce or Arts — and no way to decide',
  'You and your child want different things',
  'Wrong stream chosen. Now what?',
  'No idea which colleges to even apply to',
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
          {PROBLEMS.map((problem, index) => (
            <Reveal key={problem} delay={index * 90}>
              <div className="group flex items-center gap-5 border-b border-white/15 py-5 transition-colors duration-300 hover:bg-white/5 md:py-6">
                <span className="w-10 shrink-0 text-2xl font-extrabold text-brand-yellow/40 transition-colors duration-300 group-hover:text-brand-yellow md:text-3xl">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-lg font-medium text-warm-white md:text-xl">{problem}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
