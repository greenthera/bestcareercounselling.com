import { services } from '@/data/services'

export function ServiceNav() {
  return (
    <nav aria-label="Service sections" className="mb-3 px-3 md:mb-4 md:px-6">
      <div className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-2 rounded-[1.5rem] border border-neutral-border bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md">
        {services.map((service) => (
          <a
            key={service.id}
            href={`#${service.id}`}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-neutral-border bg-white px-3.5 py-1.5 text-sm font-medium text-ink shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-green hover:text-brand-green hover:shadow-md"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-yellow transition-transform duration-200 group-hover:scale-125" aria-hidden="true" />
            {service.title}
          </a>
        ))}
      </div>
    </nav>
  )
}
