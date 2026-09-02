import path from 'node:path'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Where the built site is actually hosted, so asset/router URLs resolve correctly.
// Defaults to "/" (correct whenever the site is served from its domain's root).
// If the deploy destination ever changes to a subpath instead — any subpath,
// wherever it ends up — set DEPLOY_BASE_PATH to that subpath. This is the only
// place that needs to change: see the "predeploy" script in package.json.
const DEPLOY_BASE_PATH = process.env.DEPLOY_BASE_PATH || '/'

// Same fallback src/lib/seo.ts and scripts/generate-seo-files.mjs use. The .env
// file is gitignored, so a fresh clone or CI may not have it — without this,
// index.html's %VITE_SITE_URL% placeholders would build with a literal,
// unreplaced "%VITE_SITE_URL%" in canonical/OG tags instead of a real URL.
const FALLBACK_SITE_URL = 'https://greenthera.shivantra.com/bestcareercounselling.com'

export default defineConfig(({ command, mode }) => {
  // loadEnv reads .env straight off disk regardless of git tracking, so a local
  // .env still wins; this only fills in when the file is genuinely absent.
  const env = loadEnv(mode, process.cwd(), '')
  process.env.VITE_SITE_URL = env.VITE_SITE_URL || FALLBACK_SITE_URL

  return {
    base: command === 'build' ? DEPLOY_BASE_PATH : '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
    },
  }
})
