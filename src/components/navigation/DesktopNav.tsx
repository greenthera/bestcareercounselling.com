import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/who-we-are', label: 'Who We Are' },
  { to: '/what-we-do', label: 'What We Do' },
  { to: '/contact-us', label: 'Contact Us' },
]

export function DesktopNav() {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `text-sm font-medium transition-colors ${isActive ? 'text-brand-green' : 'text-ink hover:text-brand-green'}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
