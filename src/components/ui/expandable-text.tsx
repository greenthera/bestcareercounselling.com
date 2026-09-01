import { useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ExpandableTextProps {
  text: string
  className?: string
}

/**
 * Clamps text to 3 lines and reveals the rest on click, animating the height change smoothly.
 * The "Read more" toggle only renders when the text actually overflows 3 lines, measured
 * against the browser's own line-clamp box, not a guessed height, so short text never gets
 * a toggle it doesn't need.
 */
export function ExpandableText({ text, className }: ExpandableTextProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const [collapsedHeight, setCollapsedHeight] = useState<number>()

  useLayoutEffect(() => {
    const el = paragraphRef.current
    if (!el) return
    // Measured while still clamped to 3 lines (the mount-time state), so clientHeight is the
    // browser's own 3-line box height, not an approximation.
    setCollapsedHeight(el.clientHeight)
    setIsTruncated(el.scrollHeight > el.clientHeight + 1)
  }, [text])

  return (
    <div>
      <div
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight: expanded ? '48rem' : collapsedHeight }}
      >
        <p ref={paragraphRef} className={cn(className, !expanded && 'line-clamp-3')}>
          {text}
        </p>
      </div>
      {isTruncated && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-1 text-xs font-semibold text-brand-green transition-colors hover:text-brand-green/80"
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  )
}
