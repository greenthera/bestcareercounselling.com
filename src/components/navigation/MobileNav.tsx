import { Menu, ArrowUpRight, Phone, ExternalLink, Star } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import { cn } from '@/lib/utils'
import logo from '@/assets/logo.png'

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/who-we-are', label: 'Who We Are' },
  { to: '/what-we-do', label: 'What We Do' },
  { to: '/success-stories', label: 'Success Stories' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/contact-us', label: 'Contact Us' },
]

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-md text-ink lg:hidden"
        >
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-5/6 flex-col p-0 sm:max-w-sm">
        <div className="border-b border-neutral-border p-6">
          <SheetTitle asChild>
            <div className="flex items-center gap-2">
              <img src={logo} alt="" className="h-14 w-auto" />
              <span className="text-lg font-bold text-ink">Best Career Counselling</span>
            </div>
          </SheetTitle>
          <p className="mt-1 text-sm text-muted-ink">Career counselling for students &amp; parents</p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-tint px-3 py-1 text-xs font-semibold text-brand-green">
            <Star size={12} fill="currentColor" />
            5.0 Google Rating · 900+ Reviews
          </div>
        </div>

        <nav aria-label="Primary" className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1.5">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.to}>
                <SheetClose asChild>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cn(
                        'group flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors',
                        isActive ? 'bg-green-tint' : 'hover:bg-green-tint/60',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          aria-hidden="true"
                          className={cn(
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold',
                            isActive ? 'bg-brand-yellow text-ink' : 'bg-white text-brand-green',
                          )}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={cn('flex-1 text-base font-medium', isActive ? 'text-brand-green' : 'text-ink')}>
                          {item.label}
                        </span>
                        <ArrowUpRight
                          className={cn('h-4 w-4 shrink-0', isActive ? 'text-brand-green' : 'text-muted-ink')}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </NavLink>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-neutral-border p-4">
          <SheetClose asChild>
            <NavLink
              to="/contact-us"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-2.5 pl-5 pr-2 text-sm font-semibold text-warm-white transition-colors hover:bg-ink/90"
            >
              Book Free Session
              <PillCtaEndcap tone="yellow" />
            </NavLink>
          </SheetClose>

          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://wa.me/918758175187"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-full bg-brand-green py-2.5 pl-1.5 pr-4 text-sm font-semibold text-warm-white transition-colors hover:bg-brand-green/90"
            >
              <PillCtaEndcap
                tone="yellow"
                icon={ExternalLink}
                className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              WhatsApp
            </a>
            <a
              href="tel:+918758175187"
              className="flex items-center justify-center gap-2 rounded-full border border-neutral-border py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand-green hover:text-brand-green"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call
            </a>
          </div>

          <p className="text-center text-xs text-muted-ink">Surat · Navsari · Ankleshwar · Valsad</p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
