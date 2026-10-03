import { useSyncExternalStore } from 'react'

const DAY_MS = 24 * 60 * 60 * 1000

// Set in vite.config.ts at build time.
const BUILD_DAY = Date.parse(import.meta.env.VITE_BUILD_DATE as string)

const subscribe = () => () => {}
// Rounded to the day so repeated reads return the same value (a stable snapshot).
const getToday = () => Math.floor(Date.now() / DAY_MS) * DAY_MS
const getBuildDay = () => (Number.isNaN(BUILD_DAY) ? getToday() : BUILD_DAY)

/**
 * Today's date, safe to render in prerendered markup. The home page is prerendered
 * into index.html at build time (scripts/prerender.mjs) and hydrated in the browser,
 * so anything derived from the clock must match the build-time HTML during
 * hydration — otherwise React discards the whole prerendered tree. This returns the
 * build date for the prerender and hydration pass, then the real date immediately
 * after, so a stale deploy still shows the current year/season.
 */
export function useToday(): Date {
  return new Date(useSyncExternalStore(subscribe, getToday, getBuildDay))
}
