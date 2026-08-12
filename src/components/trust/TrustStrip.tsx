import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'

interface Stat {
  value: string
  label: string
  numeric?: number
}

const STATS: Stat[] = [
  { value: '5.0★', label: 'Google Rating' },
  { value: '900+', label: 'Reviews', numeric: 900 },
  { value: '30+', label: 'Years', numeric: 30 },
  { value: '5,000+', label: 'Students Guided', numeric: 5000 },
  { value: '4', label: 'Cities', numeric: 4 },
  { value: 'Edumilestones', label: 'Certified' },
]

function StatItem({ stat, isInView, index }: { stat: Stat; isInView: boolean; index: number }) {
  const count = useCountUp(stat.numeric ?? 0, { start: isInView && stat.numeric !== undefined })
  const display =
    stat.numeric !== undefined && isInView ? `${count}${stat.value.replace(/[0-9,]/g, '')}` : stat.value

  return (
    <div
      className="flex flex-col items-center gap-1 px-2 py-5 text-center transition-all duration-500"
      style={{ transitionDelay: isInView ? `${index * 70}ms` : '0ms' }}
    >
      <p className="break-words text-lg font-bold text-brand-green sm:text-xl lg:text-2xl">{display}</p>
      <p className="text-xs text-muted-ink">{stat.label}</p>
    </div>
  )
}

export function TrustStrip() {
  const { ref, isInView } = useInView<HTMLDivElement>()

  return (
    <div className="px-4 md:px-8">
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-neutral-border rounded-[2rem] border border-neutral-border bg-white shadow-lg sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0"
      >
        {STATS.map((stat, index) => (
          <StatItem key={stat.label} stat={stat} isInView={isInView} index={index} />
        ))}
      </div>
    </div>
  )
}
