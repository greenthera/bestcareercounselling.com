import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PlaceholderVisualProps {
  label: string
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Drop-in replacement for the flat "[REAL PHOTO — X]" text-in-a-box placeholders.
 * Renders the same visible label (so existing text-content assertions keep matching)
 * but with a textured pattern + icon badge so unfilled image slots still read as
 * designed, not empty, until real photography replaces them.
 */
export function PlaceholderVisual({ label, tone = 'light', className }: PlaceholderVisualProps) {
  return (
    <div className={cn('relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden p-6 text-center', className)}>
      <div
        className={cn(
          'absolute inset-0',
          tone === 'light'
            ? 'bg-[repeating-linear-gradient(135deg,#E6E8E5_0px,#E6E8E5_1px,transparent_1px,transparent_14px)]'
            : 'bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_14px)]',
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          'relative flex h-12 w-12 items-center justify-center rounded-full',
          tone === 'light' ? 'bg-white text-brand-green shadow-sm' : 'bg-white/10 text-warm-white',
        )}
      >
        <ImageIcon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className={cn('relative max-w-[85%] text-xs font-medium', tone === 'light' ? 'text-muted-ink' : 'text-warm-white/70')}>
        {label}
      </p>
    </div>
  )
}
