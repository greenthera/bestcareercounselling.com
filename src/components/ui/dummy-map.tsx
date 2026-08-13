import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DummyMapProps {
  city: string
  className?: string
}

export function DummyMap({ city, className }: DummyMapProps) {
  return (
    <div
      role="img"
      aria-label={`Map showing our ${city} office location`}
      className={cn('relative h-full w-full bg-green-tint', className)}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(1,73,36,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(1,73,36,0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      <svg className="absolute inset-0 h-full w-full text-brand-green/25" viewBox="0 0 400 280" fill="none" aria-hidden="true">
        <path d="M-20 200 C 80 160, 140 220, 220 140 S 380 60, 440 90" stroke="currentColor" strokeWidth="10" />
        <path d="M40 -20 C 90 60, 60 140, 160 180 S 320 260, 360 320" stroke="currentColor" strokeWidth="7" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className="flex h-14 w-14 animate-glow-pulse items-center justify-center rounded-full bg-brand-green text-warm-white shadow-lg motion-reduce:animate-none">
          <MapPin className="h-7 w-7" aria-hidden="true" />
        </span>
        <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-ink shadow-sm">{city}, Gujarat</span>
      </div>
    </div>
  )
}
