// Stable JSON-LD @id values shared across schema components, so the same
// organization and person entities are recognised consistently wherever they're
// referenced (LocalBusiness on every page, Person details on Who We Are).
import { SITE_URL } from '@/lib/seo'

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const PERSON_IDS = {
  kishan: `${SITE_URL}/#kishan-patel`,
  meeta: `${SITE_URL}/#meeta-patel`,
} as const
