import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, GraduationCap, Landmark, ClipboardList, Briefcase, Globe, Repeat } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { services } from '@/data/services'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const SERVICE_ICONS: Record<string, LucideIcon> = {
  'after-10th': GraduationCap,
  'after-12th': Landmark,
  'ug-pg-admission': ClipboardList,
  mba: Briefcase,
  'study-abroad': Globe,
  'career-change': Repeat,
}

export function WhoWeHelp() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-green-tint px-6 py-14 md:px-10 md:py-16">
        <Reveal>
          <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Where are you right now?</h2>
          <p className="mt-2 text-center text-sm text-muted-ink">Six ways we help, one conversation to start.</p>
        </Reveal>

        <Reveal delay={100} className="mt-9">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {services.map((service, index) => {
              const isActive = index === activeIndex
              const Icon = SERVICE_ICONS[service.id]
              return (
                <Link
                  key={service.id}
                  to={`/what-we-do#${service.id}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  aria-current={isActive ? 'true' : undefined}
                  className="group flex items-center gap-3 rounded-2xl border border-neutral-border bg-white p-4"
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300',
                      isActive ? 'bg-brand-yellow text-ink' : 'bg-green-tint text-brand-green',
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink">{service.title}</p>
                    <p className="mt-0.5 truncate text-xs text-muted-ink">{service.description}</p>
                  </div>
                  <ArrowUpRight
                    className={cn(
                      'h-4 w-4 shrink-0 transition-all duration-300 group-hover:translate-x-0.5',
                      isActive ? 'text-brand-green' : 'text-muted-ink',
                    )}
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
