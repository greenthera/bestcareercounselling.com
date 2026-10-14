import { useEffect } from 'react'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const OG_IMAGE = `${SITE_URL}/og-image.png`
const OG_IMAGE_ALT = 'Best Career Counselling: Kishan and Meeta Patel, Surat'

interface PageSeoOptions {
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

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Tags that only some pages set (keywords, article:published_time) need to be removed,
// not just left unset, when navigating to a page that doesn't pass them — otherwise the
// previous page's values linger in the DOM since upsertMeta only ever adds or updates.
function removeMeta(attr: 'name' | 'property', key: string) {
  document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)?.remove()
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function usePageSeo({ title, description, path, noindex, type = 'website', publishedTime, keywords, image }: PageSeoOptions) {
  useEffect(() => {
    document.title = title
    const canonical = `${SITE_URL}${path}`
    const ogImage = image ?? OG_IMAGE

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    upsertCanonical(canonical)
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:locale', 'en_IN')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('property', 'og:image:width', '1200')
    upsertMeta('property', 'og:image:height', '630')
    upsertMeta('property', 'og:image:alt', OG_IMAGE_ALT)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImage)

    if (type === 'article' && publishedTime) {
      upsertMeta('property', 'article:published_time', publishedTime)
    } else {
      removeMeta('property', 'article:published_time')
    }

    if (keywords) {
      upsertMeta('name', 'keywords', keywords)
    } else {
      removeMeta('name', 'keywords')
    }
  }, [title, description, path, noindex, type, publishedTime, keywords, image])
}
