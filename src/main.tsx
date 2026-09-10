import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
