import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    // The target section (e.g. a service on /what-we-do) may not be in the DOM yet if
    // this navigation is also loading a lazy-loaded page chunk, so keep retrying across
    // a few animation frames rather than giving up on the first miss.
    const id = hash.slice(1)
    let frameId: number
    let attempts = 0

    function tryScroll() {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ block: 'start' })
        return
      }
      attempts += 1
      if (attempts < 50) {
        frameId = requestAnimationFrame(tryScroll)
      }
    }

    tryScroll()

    return () => cancelAnimationFrame(frameId)
  }, [pathname, hash])

  return null
}
