import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DesktopNav } from '@/components/navigation/DesktopNav'
import { MobileNav } from '@/components/navigation/MobileNav'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled ? 'border-b border-neutral-border bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="text-lg font-bold text-brand-green">
          Kishan & Meeta Patel
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-2">
          <Link
            to="/contact-us"
            className="hidden rounded-full bg-brand-yellow px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-yellow/90 md:inline-block"
          >
            Book Free Session
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
