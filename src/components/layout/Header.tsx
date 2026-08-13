import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DesktopNav } from '@/components/navigation/DesktopNav'
import { MobileNav } from '@/components/navigation/MobileNav'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import logo from '@/assets/logo.png'

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
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border border-neutral-border bg-white/75 px-4 py-2.5 backdrop-blur-md transition-shadow md:px-6 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <Link to="/" className="shrink-0">
          <img src={logo} alt="Kishan & Meeta Patel — Best Career Counselling" className="h-14 w-auto md:h-16" />
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-2">
          <Link
            to="/contact-us"
            className="hidden items-center gap-2 rounded-full bg-ink py-2.5 pl-5 pr-2 text-sm font-semibold text-warm-white transition-colors hover:bg-ink/90 lg:inline-flex"
          >
            Book Free Session
            <PillCtaEndcap tone="yellow" className="h-7 w-7" />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
