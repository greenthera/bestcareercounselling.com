import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
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
      <SheetContent side="right">
        <SheetTitle>Menu</SheetTitle>
        <nav aria-label="Primary" className="mt-6 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <Link key={item.to} to={item.to} className="text-base font-medium text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
