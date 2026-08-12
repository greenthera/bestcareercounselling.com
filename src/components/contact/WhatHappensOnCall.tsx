const STEPS = [
  'Understand current class, marks and interests',
  'Explain appropriate counselling service',
  'Answer questions',
  'Decide next steps',
]

export function WhatHappensOnCall() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">What happens on the call</h2>
      <ol className="mt-8 space-y-3">
        {STEPS.map((step, index) => (
          <li key={step} className="flex items-start gap-3 text-ink">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-ink">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <p className="mt-8 text-center font-medium text-brand-green">
        You'll speak to Kishan or Meeta directly. Not a sales team.
      </p>
    </section>
  )
}
