import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

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

export function ReportSection() {
  const [activePage, setActivePage] = useState<string | null>(null)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <div
            className="aspect-[4/3] rounded-2xl border border-neutral-border bg-soft-cream"
            role="img"
            aria-label="[REAL PHOTO — SAMPLE CAREER REPORT]"
          >
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-ink">
              [REAL PHOTO — SAMPLE CAREER REPORT]
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {REPORT_PAGES.map((page) => (
              <button
                key={page}
                type="button"
                aria-label={`View report page: ${page}`}
                onClick={() => setActivePage(page)}
                className="aspect-[4/3] rounded-lg border border-neutral-border bg-soft-cream text-center text-xs text-muted-ink transition-shadow hover:shadow-md"
              >
                {page}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-ink md:text-4xl">What you walk away with</h2>
          <p className="mt-2 text-muted-ink">Not advice you'll forget. A document you'll use for years.</p>
          <ul className="mt-6 space-y-3">
            {DELIVERABLES.map((item) => (
              <li key={item} className="flex items-start gap-2 text-ink">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-yellow" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Dialog open={activePage !== null} onOpenChange={(open) => !open && setActivePage(null)}>
        <DialogContent>
          <DialogTitle className="sr-only">{activePage}</DialogTitle>
          <div className="aspect-[4/3] rounded-lg bg-soft-cream" role="img" aria-label={activePage ?? undefined}>
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-ink">
              {activePage}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
