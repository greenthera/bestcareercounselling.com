import { Link } from 'react-router-dom'
import { services } from '@/data/services'

export function WhoWeHelp() {
  return (
    <section className="bg-green-tint px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Where are you right now?</h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/what-we-do#${service.id}`}
              className="block rounded-xl border border-neutral-border bg-white p-5 transition-shadow hover:shadow-md"
            >
              <p className="font-semibold text-brand-green">{service.title}</p>
              <p className="mt-1 text-sm text-muted-ink">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
