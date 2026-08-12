import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { successStories } from '@/data/stories'
import { services } from '@/data/services'
import type { WhatsAppContext } from '@/components/whatsapp/whatsappMessages'

type FilterValue = 'all' | WhatsAppContext

export function StoryFilterGrid() {
  const [filter, setFilter] = useState<FilterValue>('all')

  const filtered = filter === 'all' ? successStories : successStories.filter((story) => story.filterCategory === filter)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterValue)}>
        <TabsList className="h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
          <TabsTrigger value="all" className="rounded-full border border-neutral-border data-[state=active]:bg-brand-green data-[state=active]:text-warm-white">
            All
          </TabsTrigger>
          {services.map((service) => (
            <TabsTrigger
              key={service.id}
              value={service.id}
              className="rounded-full border border-neutral-border data-[state=active]:bg-brand-green data-[state=active]:text-warm-white"
            >
              {service.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-muted-ink">No stories in this category yet — check back soon.</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {filtered.map((story) => (
            <div key={`${story.studentInitial}-${story.city}`} className="rounded-xl border border-neutral-border bg-white p-5">
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
          ))}
        </div>
      )}
    </section>
  )
}
