import { Outlet } from 'react-router-dom'
import { AnnouncementBar } from './AnnouncementBar'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileBottomBar } from './MobileBottomBar'
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
      <LocalBusinessSchema />
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBottomBar />
    </div>
  )
}
