import { Link } from 'react-router-dom'

export function InlineCTA() {
  return (
    <div className="mx-auto my-10 max-w-2xl rounded-xl border border-brand-yellow bg-soft-cream p-6 text-center">
      <p className="font-semibold text-ink">Not sure what is right for your child? Book a free consultation.</p>
      <Link
        to="/contact-us"
        className="mt-4 inline-block rounded-full bg-brand-yellow px-6 py-2 text-sm font-semibold text-ink hover:bg-brand-yellow/90"
      >
        Book a Free Consultation
      </Link>
    </div>
  )
}
