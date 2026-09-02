// The site's canonical absolute origin, used to build canonical links and
// structured-data URLs. Set via VITE_SITE_URL in the local, gitignored .env file
// (see vite.config.ts, which fills in the same fallback below if that file is
// missing — a fresh clone or CI has no .env). If the site ever moves to a new
// domain, update .env and the matching fallbacks in vite.config.ts and
// scripts/generate-seo-files.mjs.
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://greenthera.shivantra.com/bestcareercounselling.com'

export const SITE_NAME = 'Kishan & Meeta Patel Career Counselling'
