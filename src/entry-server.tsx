import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from './App.tsx'

/**
 * Build-time render of a route to static HTML, used by scripts/prerender.mjs to bake
 * the home page's markup into dist/index.html so it paints before any JS runs.
 * `prerender` (unlike renderToString) waits for the lazy route chunks to resolve, so
 * the output is the real page, not the Suspense fallback. Mirrors main.tsx's tree so
 * the browser can hydrate it.
 */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url} basename={import.meta.env.BASE_URL}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )

  return new Response(prelude).text()
}
