import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems } from '@/data/navigation'

export function DesktopNav() {
  const [openTo, setOpenTo] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const [lastPathname, setLastPathname] = useState(location.pathname)

  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname)
    setOpenTo(null)
  }

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpenTo(null)
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenTo(null)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <nav aria-label="Primary" ref={navRef} className="hidden items-center gap-4 xl:flex">
      {navItems.map((item) => {
        if (!item.children) {
          return (
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
          )
        }

        const isOpen = openTo === item.to
        const isChildActive = item.children.some((child) => child.to === location.pathname)

        return (
          <div key={item.to} className="relative" onMouseEnter={() => setOpenTo(item.to)} onMouseLeave={() => setOpenTo(null)}>
            <div className="flex items-center gap-1">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive || isChildActive ? 'text-brand-green' : 'text-ink hover:text-brand-green'}`
                }
              >
                {item.label}
              </NavLink>
              <button
                type="button"
                onClick={() => setOpenTo(item.to)}
                aria-label={`${item.label} submenu`}
                aria-expanded={isOpen}
                className={cn('transition-colors hover:text-brand-green', isChildActive ? 'text-brand-green' : 'text-ink')}
              >
                <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', isOpen && 'rotate-180')} aria-hidden="true" />
              </button>
            </div>

            {isOpen && (
              // The pt-3 (not a margin on the visible card below) keeps the gap between the
              // trigger and the card part of this element's own hoverable box, so moving the
              // mouse down into the dropdown doesn't cross dead space and fire mouseleave
              // on the trigger before it reaches the card.
              <div className="absolute left-0 top-full z-20 w-72 pt-3">
                <div className="rounded-2xl border border-neutral-border bg-white p-2 shadow-lg">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      className={({ isActive }) =>
                        cn(
                          'block rounded-xl px-3.5 py-2.5 text-sm transition-colors',
                          isActive ? 'bg-green-tint font-medium text-brand-green' : 'text-ink hover:bg-green-tint hover:text-brand-green',
                        )
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
