import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * False while prerendering (scripts/prerender.mjs) and during the hydration pass,
 * true right after. Lets heavy below-the-fold content stay out of the prerendered
 * HTML without causing a hydration mismatch.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
