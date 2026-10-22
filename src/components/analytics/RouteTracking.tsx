import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { track } from '@/lib/tracking'

// Pushes a page_view_spa event on every client-side route change, for GTM's History
// Change trigger (or a Custom Event trigger on this exact event — either works) to
// pick up. The very first render is skipped: GTM's own container load already counts
// as that first page view, so pushing again here would double-count it.
export function RouteTracking() {
  const { pathname } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    track('page_view_spa', { page_path: pathname })
  }, [pathname])

  return null
}
