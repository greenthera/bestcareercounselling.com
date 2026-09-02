import logo from '@/assets/logo.png'

/**
 * Full-page loading state shown by App.tsx's Suspense boundary while a lazy-loaded
 * route chunk is still being fetched. The logo stays static and fully readable at
 * the centre (a compass rose isn't rotationally symmetric, so spinning the mark
 * itself reads as broken/cut off mid-turn at this size); a thin brand ring spins
 * around it instead to carry the motion. Under reduced motion the ring holds still
 * and the logo pulses gently, so loading is still visibly communicated.
 */
export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-24" role="status" aria-live="polite">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <span
          className="absolute inset-0 rounded-full border-2 border-neutral-border border-t-brand-green animate-spin motion-reduce:animate-none"
          aria-hidden="true"
        />
        <img src={logo} alt="" className="relative h-20 w-auto animate-pulse" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  )
}
