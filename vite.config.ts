import path from 'node:path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Where the built site is actually hosted, so asset/router URLs resolve correctly.
// Defaults to "/" (correct whenever the site is served from its domain's root).
// If the deploy destination ever changes to a subpath instead — any subpath,
// wherever it ends up — set DEPLOY_BASE_PATH to that subpath. This is the only
// place that needs to change: see the "predeploy" script in package.json.
const DEPLOY_BASE_PATH = process.env.DEPLOY_BASE_PATH || '/'

export default defineConfig(({ command }) => ({
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
}))
