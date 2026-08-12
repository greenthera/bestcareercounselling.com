import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { successStories } from '@/data/stories'
import { services } from '@/data/services'
import { Reveal } from '@/components/ui/reveal'
import type { WhatsAppContext } from '@/components/whatsapp/whatsappMessages'

type FilterValue = 'all' | WhatsAppContext

export function StoryFilterGrid() {
  const [filter, setFilter] = useState<FilterValue>('all')

  const filtered = filter === 'all' ? successStories : successStories.filter((story) => story.filterCategory === filter)

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterValue)}>
        <TabsList className="h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
          <TabsTrigger value="all" className="rounded-full border border-neutral-border data-[state=active]:border-ink data-[state=active]:bg-ink data-[state=active]:text-warm-white">
            All
          </TabsTrigger>
          {services.map((service) => (
            <TabsTrigger
              key={service.id}
              value={service.id}
              className="rounded-full border border-neutral-border data-[state=active]:border-ink data-[state=active]:bg-ink data-[state=active]:text-warm-white"
            >
              {service.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-muted-ink">No stories in this category yet — check back soon.</p>
      ) : (
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {filtered.map((story, index) => (
            <Reveal key={`${story.studentInitial}-${story.city}`} delay={index * 80}>
              <div className="group h-full rounded-[1.375rem] border border-neutral-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <p className="text-sm font-semibold text-brand-green">
                  {story.studentInitial} · {story.studentClass} · {story.city}
                </p>
                <p className="mt-1 text-xs text-muted-ink">{story.service}</p>
                <dl className="mt-3 space-y-2 text-sm">
                  <div>
                    <dt className="font-semibold text-ink">Was</dt>
                    <dd className="text-muted-ink">{story.was}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Now</dt>
                    <dd className="text-muted-ink">{story.now}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}
