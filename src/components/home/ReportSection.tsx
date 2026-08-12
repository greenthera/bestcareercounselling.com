import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { Reveal } from '@/components/ui/reveal'
import { useInView } from '@/hooks/useInView'
import { Expand } from 'lucide-react'
import { cn } from '@/lib/utils'

const DELIVERABLES = [
  '32-page career report',
  'Aptitude and interest profile',
  'SWOT analysis worksheet',
  'Shortlist of 8–12 careers',
  'College and course list',
]

const REPORT_PAGES = [
  '[REAL REPORT PAGE — COVER]',
  '[REAL REPORT PAGE — APTITUDE PROFILE]',
  '[REAL REPORT PAGE — CAREER SHORTLIST]',
]

const SNAPSHOT = [
  { label: 'Aptitude', score: 82 },
  { label: 'Interest', score: 91 },
  { label: 'Personality', score: 68 },
  { label: 'EQ', score: 75 },
]

function ProfileSnapshot() {
  const { ref, isInView } = useInView<HTMLDivElement>(0.3)

  return (
    <div ref={ref} className="rounded-[1.6rem] bg-ink p-6 text-warm-white">
      <p className="text-xs font-semibold uppercase tracking-wide text-warm-white/40">[Sample profile snapshot]</p>
      <div className="mt-5 space-y-4">
        {SNAPSHOT.map((row, index) => (
          <div key={row.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-warm-white/80">{row.label}</span>
              <span className="font-semibold text-brand-yellow">{isInView ? row.score : 0}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-brand-yellow transition-[width] duration-[1200ms] ease-out"
                style={{
                  width: isInView ? `${row.score}%` : '0%',
                  transitionDelay: `${index * 120}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ReportSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const activePage = REPORT_PAGES[activeIndex]

  return (
    <section className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-green-tint px-6 py-14 md:px-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative rounded-[2rem] bg-ink p-3 shadow-lg">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/10">
                <div
                  key={activePage}
                  className="h-full w-full animate-in fade-in zoom-in-[0.98] duration-500"
                  role="img"
                  aria-label={activePage}
                >
                  <PlaceholderVisual label={activePage} tone="dark" />
                </div>
                <button
                  type="button"
                  aria-label="Expand report page"
                  onClick={() => setDialogOpen(true)}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100"
                >
                  <Expand className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="relative mt-3 grid grid-cols-3 gap-2.5">
                {REPORT_PAGES.map((page, index) => {
                  const isActive = index === activeIndex
                  return (
                    <button
                      key={page}
                      type="button"
                      aria-label={`View report page: ${page}`}
                      aria-pressed={isActive}
                      onClick={() => {
                        setActiveIndex(index)
                        setDialogOpen(true)
                      }}
                      className={cn(
                        'relative aspect-[4/3] overflow-hidden rounded-xl border transition-all duration-300',
                        isActive ? 'border-brand-yellow' : 'border-white/10 opacity-50 hover:opacity-90',
                      )}
                    >
                      <PlaceholderVisual label={page} tone="dark" className="p-2" />
                      {isActive && (
                        <span className="absolute inset-x-2 bottom-1 h-1 rounded-full bg-brand-yellow" aria-hidden="true" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal delay={100}>
              <h2 className="text-3xl font-bold text-ink md:text-4xl">
                What you walk away <span className="text-brand-green">with</span>
              </h2>
              <p className="mt-2 text-muted-ink">Not advice you'll forget. A document you'll use for years.</p>
            </Reveal>

            <Reveal delay={180} className="mt-6">
              <ProfileSnapshot />
            </Reveal>

            <Reveal delay={260} className="mt-5 flex flex-wrap gap-2">
              {DELIVERABLES.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-neutral-border bg-white px-4 py-1.5 text-xs font-medium text-ink shadow-sm"
                >
                  {item}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogTitle className="sr-only">{activePage}</DialogTitle>
          <div className="aspect-[4/3] overflow-hidden rounded-xl" role="img" aria-label={activePage}>
            <PlaceholderVisual label={activePage} />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
