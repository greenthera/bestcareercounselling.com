import { useState } from 'react'
import { Menu, ArrowUpRight, ChevronDown, Phone, ExternalLink, Star } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import { cn } from '@/lib/utils'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { navItems } from '@/data/navigation'
import logo from '@/assets/logo.webp'

const DEFAULT_MESSAGE = 'Hi, I want to know about career counselling for my child in Class ___'

function activeParentTo(pathname: string): string | null {
  return navItems.find((item) => item.children?.some((child) => child.to === pathname))?.to ?? null
}

export function MobileNav() {
  const location = useLocation()
  const [expandedTo, setExpandedTo] = useState<string | null>(() => activeParentTo(location.pathname))
  const [lastPathname, setLastPathname] = useState(location.pathname)

  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname)
    setExpandedTo(activeParentTo(location.pathname))
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-md text-ink xl:hidden"
        >
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-5/6 flex-col p-0 sm:max-w-sm">
        <div className="border-b border-neutral-border p-6">
          <SheetTitle asChild>
            <div className="flex items-center gap-2">
              <img src={logo} alt="" loading="lazy" decoding="async" width={165} height={192} className="h-14 w-auto" />
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
            {navItems.map((item, index) => {
              const badge = (isActive: boolean) => (
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold',
                    isActive ? 'bg-brand-yellow text-ink' : 'bg-white text-brand-green',
                  )}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              )

              if (!item.children) {
                return (
                  <li key={item.to}>
                    <SheetClose asChild>
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) =>
                          cn(
                            'group flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors',
                            isActive ? 'bg-green-tint' : 'hover:bg-green-tint/60',
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {badge(isActive)}
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
                )
              }

              const isExpanded = expandedTo === item.to
              const isChildActive = item.children.some((child) => child.to === location.pathname)

              return (
                <li key={item.to}>
                  <div className={cn('flex items-center gap-1 rounded-2xl transition-colors', isExpanded && 'bg-green-tint/60')}>
                    <SheetClose asChild>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          cn('group flex flex-1 items-center gap-3 rounded-2xl px-3 py-3', (isActive || isChildActive) && !isExpanded && 'bg-green-tint')
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {badge(isActive || isChildActive)}
                            <span className={cn('flex-1 text-base font-medium', isActive || isChildActive ? 'text-brand-green' : 'text-ink')}>
                              {item.label}
                            </span>
                          </>
                        )}
                      </NavLink>
                    </SheetClose>
                    <button
                      type="button"
                      onClick={() => setExpandedTo(isExpanded ? null : item.to)}
                      aria-label={`Toggle ${item.label} submenu`}
                      aria-expanded={isExpanded}
                      className="flex h-10 w-10 shrink-0 items-center justify-center text-muted-ink"
                    >
                      <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', isExpanded && 'rotate-180')} aria-hidden="true" />
                    </button>
                  </div>

                  {isExpanded && (
                    <ul className="ml-11 mt-1 space-y-1 border-l border-neutral-border pl-4">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <SheetClose asChild>
                            <NavLink
                              to={child.to}
                              className={({ isActive }) =>
                                cn(
                                  'block rounded-lg px-3 py-2.5 text-sm transition-colors',
                                  isActive ? 'font-medium text-brand-green' : 'text-muted-ink hover:text-ink',
                                )
                              }
                            >
                              {child.label}
                            </NavLink>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-neutral-border p-4">
          <SheetClose asChild>
            <NavLink
              to="/contact-us"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-2.5 pl-5 pr-2 text-sm font-semibold text-warm-white transition-colors hover:bg-ink/90"
            >
              Book 15-Min Pre Counselling Session
              <PillCtaEndcap tone="yellow" />
            </NavLink>
          </SheetClose>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={buildWhatsAppUrl(DEFAULT_MESSAGE)}
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

          <p className="text-center text-xs text-muted-ink">Surat, Gujarat</p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
