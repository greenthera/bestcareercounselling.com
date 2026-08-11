const STEPS = [
  { number: '01', title: 'Free consultation call', description: '15 minutes. We understand the situation.' },
  { number: '02', title: 'Psychometric assessment', description: 'Aptitude, interest, personality and EQ.' },
  { number: '03', title: 'One-on-one session + report', description: 'Detailed counselling session with Kishan or Meeta.' },
  { number: '04', title: 'Roadmap and admission support', description: 'Course shortlist, college list, timeline and application help.' },
]

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">How it works</h2>
      <p className="mt-2 text-center text-muted-ink">Four steps. Complete clarity.</p>

      <ol className="mt-10 grid gap-6 md:grid-cols-4">
        {STEPS.map((step) => (
          <li key={step.number} className="border-t-4 border-brand-yellow pt-4">
            <span className="text-3xl font-bold text-brand-green">{step.number}</span>
            <p className="mt-2 font-semibold text-ink">{step.title}</p>
            <p className="mt-1 text-sm text-muted-ink">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
