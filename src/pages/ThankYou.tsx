import { Link } from 'react-router-dom'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { blogPosts } from '@/data/blogs'

const DEFAULT_MESSAGE = 'Hi, I want to know about career counselling for my child in Class ___'

export default function ThankYou() {
  const recommended = blogPosts.slice(0, 3)

  return (
    <div className="mx-auto max-w-3xl px-4 py-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-green">Thank you</h1>
        <p className="mt-4 text-muted-ink">Your WhatsApp message is ready to send.</p>
        <a
          href={buildWhatsAppUrl(DEFAULT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-ink hover:bg-brand-yellow/90"
        >
          Continue to WhatsApp
        </a>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-ink">Recommended articles</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {recommended.map((post) => (
            <Link
              key={post.slug}
              to={`/blogs/${post.slug}`}
              className="block rounded-xl border border-neutral-border bg-white p-4 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">{post.category}</p>
              <p className="mt-2 text-sm font-semibold text-ink">{post.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-xl border border-neutral-border bg-green-tint p-6 text-center">
        <h2 className="text-lg font-semibold text-ink">Contact details</h2>
        <p className="mt-2 text-ink">+91 87581 75187</p>
        <p className="text-ink">kishan@bestcareercounselling.com</p>
      </section>
    </div>
  )
}
