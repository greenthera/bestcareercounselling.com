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

function StatItem({ stat, isInView }: { stat: Stat; isInView: boolean }) {
  const count = useCountUp(stat.numeric ?? 0, { start: isInView && stat.numeric !== undefined })
  const display =
    stat.numeric !== undefined && isInView ? `${count}${stat.value.replace(/[0-9,]/g, '')}` : stat.value

  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-brand-green md:text-3xl">{display}</p>
      <p className="text-xs text-muted-ink md:text-sm">{stat.label}</p>
    </div>
  )
}

export function TrustStrip() {
  const { ref, isInView } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className="grid grid-cols-2 gap-6 bg-green-tint px-4 py-8 md:grid-cols-6 md:px-8">
      {STATS.map((stat) => (
        <StatItem key={stat.label} stat={stat} isInView={isInView} />
      ))}
    </div>
  )
}
