import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PillCtaEndcapProps {
  className?: string
  /** Use 'dark' when the endcap sits on a brand-yellow pill (yellow-on-yellow would lack contrast). */
  tone?: 'yellow' | 'dark'
}

export function PillCtaEndcap({ className, tone = 'yellow' }: PillCtaEndcapProps) {
  return (
    <span
      className={cn(
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
        tone === 'yellow' ? 'bg-brand-yellow text-ink' : 'bg-ink text-warm-white',
        className,
      )}
      aria-hidden="true"
    >
      <ArrowUpRight className="h-4 w-4" />
    </span>
  )
}
