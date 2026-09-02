import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import { usePageSeo } from '@/hooks/usePageSeo'

export default function NotFound() {
  usePageSeo({
    title: 'Page Not Found | Best Career Counselling',
    description: "The page you're looking for doesn't exist or may have moved.",
    path: '/404',
    noindex: true,
  })

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center md:px-8">
      <Reveal className="flex flex-col items-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green text-warm-white">
          <Compass className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-brand-green">404 error</p>
        <h1 className="mt-3 text-4xl font-bold text-ink md:text-5xl">Page not found</h1>
        <p className="mt-4 text-muted-ink">
          The page you're looking for doesn't exist or may have moved. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-green py-2.5 pl-6 pr-2 text-sm font-semibold text-warm-white transition-colors hover:bg-brand-green/90"
          >
            Back to homepage
            <PillCtaEndcap tone="yellow" className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-border px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand-green hover:text-brand-green"
          >
            Contact us
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
