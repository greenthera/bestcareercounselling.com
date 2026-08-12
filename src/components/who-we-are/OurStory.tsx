const TOPICS = [
  { title: 'Before career counselling', body: '[CLIENT TO PROVIDE: what Kishan was doing before he started counselling]' },
  { title: 'The moment that started it', body: '[CLIENT TO PROVIDE: the moment that made him start]' },
  { title: 'Why Surat', body: '[CLIENT TO PROVIDE: why the practice is based in Surat]' },
  { title: 'Why Meeta joined', body: '[CLIENT TO PROVIDE: how Meeta came to join the practice]' },
  {
    title: 'Our philosophy',
    body: 'Career decisions should be based on understanding, assessment and counselling — not assumptions or pressure.',
  },
]

export function OurStory() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
      <h2 className="text-3xl font-bold text-ink md:text-4xl">Our story</h2>
      <div className="mt-8 space-y-6">
        {TOPICS.map((topic) => (
          <div key={topic.title}>
            <p className="font-semibold text-brand-green">{topic.title}</p>
            <p className="mt-1 text-muted-ink">{topic.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
