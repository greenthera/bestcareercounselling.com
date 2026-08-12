import { Link } from 'react-router-dom'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'

export function InlineCTA() {
  return (
    <div className="mx-auto my-10 max-w-2xl rounded-[1.375rem] border border-brand-yellow bg-soft-cream p-6 text-center">
      <p className="font-semibold text-ink">Not sure what is right for your child? Book a free consultation.</p>
      <Link
        to="/contact-us"
        className="group mt-4 inline-flex items-center gap-2 rounded-full bg-ink py-1.5 pl-6 pr-1.5 text-sm font-semibold text-warm-white transition-colors hover:bg-ink/90"
      >
        Book a Free Consultation
        <PillCtaEndcap tone="yellow" className="transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}
