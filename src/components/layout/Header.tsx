import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DesktopNav } from '@/components/navigation/DesktopNav'
import { MobileNav } from '@/components/navigation/MobileNav'
import { PillCtaEndcap } from '@/components/ui/pill-cta-endcap'
import logo from '@/assets/logo.webp'
import logoSmall from '@/assets/logo-128.webp'

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
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img
            src={logo}
            srcSet={`${logoSmall} 110w, ${logo} 165w`}
            sizes="(min-width: 768px) 55px, 48px"
            alt=""
            width={165}
            height={192}
            className="h-14 w-auto md:h-16"
          />
          <span className="text-sm font-bold leading-tight text-ink md:text-base">Best Career Counselling</span>
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-2">
          <Link
            to="/contact-us"
            className="hidden items-center gap-2 rounded-full bg-ink py-2.5 pl-5 pr-2 text-sm font-semibold text-warm-white transition-colors hover:bg-ink/90 xl:inline-flex"
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
