import { useState } from 'react'
import { X } from 'lucide-react'
import { getSeasonalMessage } from './seasonalMessage'

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="flex items-center justify-center gap-3 bg-brand-green px-4 py-2 text-center text-sm text-warm-white" role="status">
      <span>{getSeasonalMessage()}</span>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setDismissed(true)}
        className="shrink-0 rounded p-1 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-yellow"
      >
        <X size={14} />
      </button>
    </div>
  )
}
