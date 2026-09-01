import { SuccessStoriesHero } from '@/components/success-stories/SuccessStoriesHero'
import { TrustStrip } from '@/components/trust/TrustStrip'
import { FeaturedCaseStudy } from '@/components/success-stories/FeaturedCaseStudy'
import { StoryFilterGrid } from '@/components/success-stories/StoryFilterGrid'
import { VideoTestimonials } from '@/components/home/VideoTestimonials'
import { WhatMakesTheDifference } from '@/components/success-stories/WhatMakesTheDifference'
import { GoogleReviewsCarousel } from '@/components/trust/GoogleReviewsCarousel'
import { FinalCTA } from '@/components/home/FinalCTA'
import { FAQSection } from '@/components/home/FAQSection'
import { successStoriesFaqs } from '@/data/faqs'
import { usePageSeo } from '@/hooks/usePageSeo'
import { pageSeo } from '@/data/seo'

export default function SuccessStories() {
  usePageSeo(pageSeo.successStories)
  return (
    <>
      <SuccessStoriesHero />
      <TrustStrip />
      <FeaturedCaseStudy />
      <StoryFilterGrid />
      <VideoTestimonials />
      <WhatMakesTheDifference />
      <GoogleReviewsCarousel />
      <FAQSection faqs={successStoriesFaqs} />
      <FinalCTA heading="Your child's story could be next." />
    </>
  )
}
