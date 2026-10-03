import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Self-hosted Inter (variable weight); only the subsets a page's text needs are fetched.
import '@fontsource-variable/inter/wght.css'
import './index.css'
import App from './App.tsx'

// A redeploy replaces the hashed chunk files, so a page that's still open or was
// served from cache can 404 when it lazy-loads a chunk it references (a lazy route,
// or the assessment report generator). Reload once to pick up the fresh build; the
// timestamp guard stops it looping if the fetch is failing for another reason.
window.addEventListener('vite:preloadError', () => {
  const KEY = 'preloadErrorReloadAt'
  try {
    const last = Number(sessionStorage.getItem(KEY) || 0)
    if (Date.now() - last < 10_000) return
    sessionStorage.setItem(KEY, String(Date.now()))
  } catch {
    // sessionStorage unavailable — fall through and reload anyway.
  }
  window.location.reload()
})

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// The home page's HTML is prerendered into index.html at build time (see
// scripts/prerender.mjs), so it paints before this bundle runs. Hydrate it when it
// matches the current route; any other route (GitHub Pages serves every deep link
// through index.html via 404.html) starts from an empty root instead.
if (container.dataset.prerendered === window.location.pathname && container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  container.replaceChildren()
  createRoot(container).render(app)
}
