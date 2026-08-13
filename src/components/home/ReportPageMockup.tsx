import { Compass } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ReportPageVariant = 'cover' | 'aptitude' | 'shortlist'

const APTITUDE_ROWS = [
  { label: 'Numerical reasoning', score: 78 },
  { label: 'Verbal reasoning', score: 85 },
  { label: 'Spatial reasoning', score: 64 },
  { label: 'Logical reasoning', score: 90 },
]

const SHORTLIST_ROWS = [
  { rank: 1, career: 'Data Analyst', match: 92 },
  { rank: 2, career: 'Product Design', match: 87 },
  { rank: 3, career: 'Financial Planning', match: 81 },
]

interface ReportPageMockupProps {
  variant: ReportPageVariant
  className?: string
}

export function ReportPageMockup({ variant, className }: ReportPageMockupProps) {
  return (
    <div className={cn('flex h-full w-full flex-col bg-white p-4 text-left', className)}>
      {variant === 'cover' && (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green text-warm-white">
            <Compass className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green">
            Career Assessment Report
          </p>
          <p className="mt-2 text-lg font-bold text-ink">Aptitude &amp; Career Report</p>
          <p className="mt-1 text-xs text-muted-ink">Prepared for Aarav Shah — Class 10</p>
          <span className="mt-4 h-1 w-12 rounded-full bg-brand-yellow" aria-hidden="true" />
        </div>
      )}

      {variant === 'aptitude' && (
        <div className="flex h-full flex-col justify-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-brand-green">Aptitude profile</p>
          <div className="mt-3 space-y-2.5">
            {APTITUDE_ROWS.map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between text-[10px] text-ink">
                  <span>{row.label}</span>
                  <span className="font-semibold">{row.score}%</span>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-green-tint">
                  <div className="h-full rounded-full bg-brand-green" style={{ width: `${row.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {variant === 'shortlist' && (
        <div className="flex h-full flex-col justify-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-brand-green">Recommended careers</p>
          <div className="mt-3 space-y-2">
            {SHORTLIST_ROWS.map((row) => (
              <div key={row.career} className="flex items-center gap-2 rounded-lg bg-green-tint px-2 py-1.5">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-green text-[9px] font-bold text-warm-white">
                  {row.rank}
                </span>
                <span className="flex-1 text-[10px] font-medium text-ink">{row.career}</span>
                <span className="text-[10px] font-semibold text-brand-green">{row.match}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
