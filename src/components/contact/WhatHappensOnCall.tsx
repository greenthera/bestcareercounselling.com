import { Reveal } from '@/components/ui/reveal'

const STEPS = [
  'Understand current class, marks and interests',
  'Explain appropriate counselling service',
  'Answer questions',
  'Decide next steps',
]

export function WhatHappensOnCall() {
  return (
    <section className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-2xl rounded-[2rem] bg-green-tint px-6 py-12 md:px-10 md:py-14">
        <Reveal>
          <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">What happens on the call</h2>
        </Reveal>
        <ol className="mt-8 space-y-3">
          {STEPS.map((step, index) => (
            <Reveal key={step} delay={index * 80} as="li">
              <div className="flex items-center gap-3 rounded-2xl border border-neutral-border bg-white p-4 text-ink shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-yellow text-xs font-bold text-ink">
                  {index + 1}
                </span>
                {step}
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={STEPS.length * 80}>
          <p className="mt-8 text-center font-medium text-brand-green">
            You'll speak to Kishan or Meeta directly. Not a sales team.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
