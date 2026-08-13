import { Link } from 'react-router-dom'
import { services } from '@/data/services'
import logo from '@/assets/logo.png'

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
    <footer className="px-3 pb-3 md:px-6 md:pb-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-ink text-warm-white">
        <div className="grid gap-10 px-6 py-12 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="inline-block shrink-0 rounded-2xl bg-white p-3">
                <img src={logo} alt="" className="h-14 w-auto" />
              </div>
              <span className="text-lg font-bold text-warm-white">Best Career Counselling</span>
            </div>
            <p className="mt-3 text-sm text-warm-white/60">
              Career counselling and guidance for students, parents and working professionals across Gujarat.
            </p>
            <p className="mt-4 text-sm font-medium text-brand-yellow">Google 5.0★ · 900+ Reviews</p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-warm-white/40">Navigation</p>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-warm-white/75 transition-colors hover:text-brand-yellow">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-warm-white/40">Services</p>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <Link to={`/what-we-do#${service.id}`} className="text-warm-white/75 transition-colors hover:text-brand-yellow">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-warm-white/40">Contact</p>
            <p className="text-sm text-warm-white/75">+91 87581 75187</p>
            <p className="break-words text-sm text-warm-white/75">kishan@bestcareercounselling.com</p>
            <p className="mt-2 text-sm text-warm-white/75">Surat · Navsari · Ankleshwar · Valsad</p>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="flex flex-col gap-2 px-6 py-4 text-xs text-warm-white/40 md:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-1">
              <p>© {new Date().getFullYear()} All rights reserved.</p>
              <p>
                Design and developed by{' '}
                <a
                  href="https://shivantra.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brand-yellow transition-colors hover:text-warm-white"
                >
                  Shivantra
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <span>Privacy Policy</span>
              <span>Terms</span>
              <span>Refund Policy</span>
              <span>Student Dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
