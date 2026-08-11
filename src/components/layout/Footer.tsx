import { Link } from 'react-router-dom'
import { services } from '@/data/services'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/who-we-are', label: 'Who We Are' },
  { to: '/what-we-do', label: 'What We Do' },
  { to: '/success-stories', label: 'Success Stories' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/contact-us', label: 'Contact Us' },
]

export function Footer() {
  return (
    <footer className="bg-brand-green text-warm-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-8">
        <div>
          <p className="text-lg font-bold">Kishan & Meeta Patel</p>
          <p className="mt-2 text-sm text-warm-white/80">
            Career counselling and guidance for students, parents and working professionals across Gujarat.
          </p>
          <p className="mt-4 text-sm font-medium text-brand-yellow">Google 5.0★ · 900+ Reviews</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-warm-white/60">Navigation</p>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-brand-yellow">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-warm-white/60">Services</p>
          <ul className="space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.id}>
                <Link to={`/what-we-do#${service.id}`} className="hover:text-brand-yellow">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-warm-white/60">Contact</p>
          <p className="text-sm">+91 87581 75187</p>
          <p className="text-sm">kishan@bestcareercounselling.com</p>
          <p className="mt-2 text-sm">Surat · Navsari · Ankleshwar · Valsad</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-warm-white/60 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <span>Privacy Policy</span>
            <span>Terms</span>
            <span>Refund Policy</span>
            <span>Student Dashboard</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
