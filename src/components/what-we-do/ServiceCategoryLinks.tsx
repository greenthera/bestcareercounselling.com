import { Link } from 'react-router-dom'
import { GraduationCap, Compass } from 'lucide-react'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import { Reveal } from '@/components/ui/reveal'

const CATEGORIES = [
  {
    title: 'Admission Consulting',
    description: 'End-to-end help with shortlisting, applications, documents and admission timelines.',
    icon: GraduationCap,
    href: '/admission-consulting',
  },
  {
    title: 'Career Counselling',
    description: 'Aptitude-backed guidance to choose the right stream, course or career path.',
    icon: Compass,
    href: '/career-counselling',
  },
]

export function ServiceCategoryLinks() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-6 md:px-8 md:pb-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {CATEGORIES.map((category, index) => {
          const Icon = category.icon
          return (
            <Reveal key={category.title} delay={index * 100}>
              <Link
                to={category.href}
                className="group flex h-full flex-col justify-between rounded-[2rem] border border-neutral-border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green text-warm-white transition-colors duration-300 group-hover:bg-brand-yellow group-hover:text-ink">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-2xl font-bold text-ink">{category.title}</p>
                  <p className="mt-2 text-muted-ink">{category.description}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-green">
                  Explore
                  <PillCtaEndcap className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
