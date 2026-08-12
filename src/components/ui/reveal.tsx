import type { ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li'
}

export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>(0.15)
  const Tag = as

  return (
    <Tag
      ref={ref as never}
      className={cn(
        'transition-all duration-700 ease-out motion-reduce:transition-none',
        isInView ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-7 blur-[2px]',
        className,
      )}
      style={{ transitionDelay: isInView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}
