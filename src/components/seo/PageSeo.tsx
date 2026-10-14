import { SITE_URL, SITE_NAME } from '@/lib/seo'

const OG_IMAGE = `${SITE_URL}/og-image.png`
const OG_IMAGE_ALT = 'Best Career Counselling: Kishan and Meeta Patel, Surat'

interface PageSeoProps {
  title: string
  description: string
  path: string
  /** Set true for pages that shouldn't be indexed (e.g. a 404 page). Defaults to indexable. */
  noindex?: boolean
  /** Defaults to 'website'. Use 'article' for blog posts, paired with publishedTime. */
  type?: 'website' | 'article'
  /** ISO date. Only meaningful (and only rendered) when type is 'article'. */
  publishedTime?: string
  /** Comma-separated topics. Optional; omitted pages don't get a keywords tag. */
  keywords?: string
  /** Overrides the sitewide default social-share image for this page. */
  image?: string
}

// Renders title/meta/link tags directly in the tree instead of mutating document.head
// imperatively. React 19 hoists title/meta/link elements into <head> automatically,
// on the client AND during SSR/prerendering (scripts/prerender.mjs) — so every route's
// real title and description end up baked into its static HTML instead of only
// appearing after hydration, which matters for crawlers and link-preview bots (e.g.
// WhatsApp, Twitter) that don't execute JS at all.
export function PageSeo({ title, description, path, noindex, type = 'website', publishedTime, keywords, image }: PageSeoProps) {
  const canonical = `${SITE_URL}${path}`
  const ogImage = image ?? OG_IMAGE

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={OG_IMAGE_ALT} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {type === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {keywords && <meta name="keywords" content={keywords} />}
    </>
  )
}
