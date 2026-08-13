import { Reveal } from '@/components/ui/reveal'

const TOPICS = [
  {
    title: 'Before career counselling',
    body: 'Kishan spent years in the education sector, watching bright students choose streams and colleges based on family pressure and guesswork rather than any real understanding of their own strengths.',
  },
  {
    title: 'The moment that started it',
    body: 'A conversation with a student who had aced Science but was miserable in it — chosen for him, not by him — became the turning point that led Kishan to train formally in psychometric assessment and career counselling.',
  },
  {
    title: 'Why Surat',
    body: "Surat's fast-growing student population had access to coaching for exams, but almost no one guiding families through the decision itself. That gap is what the practice was built to fill.",
  },
  {
    title: 'Our philosophy',
    body: 'Career decisions should be based on understanding, assessment and counselling — not assumptions or pressure.',
  },
]

export function OurStory() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 md:px-8 md:py-14">
      <Reveal>
        <h2 className="text-3xl font-bold text-ink md:text-4xl">Our story</h2>
      </Reveal>
      <div className="mt-8 border-t border-neutral-border">
        {TOPICS.map((topic, index) => (
          <Reveal key={topic.title} delay={index * 80}>
            <div className="border-b border-neutral-border py-6">
              <p className="font-semibold text-brand-green">{topic.title}</p>
              <p className="mt-1 text-muted-ink">{topic.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
