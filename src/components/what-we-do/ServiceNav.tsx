import { services } from '@/data/services'

export function ServiceNav() {
  return (
    <nav aria-label="Service sections" className="sticky top-0 z-20 overflow-x-auto border-b border-neutral-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-3 md:px-8">
        {services.map((service) => (
          <a
            key={service.id}
            href={`#${service.id}`}
            className="shrink-0 text-sm font-medium text-ink hover:text-brand-green"
          >
            {service.title}
          </a>
        ))}
      </div>
    </nav>
  )
}
