import { SuccessStoriesHero } from '@/components/success-stories/SuccessStoriesHero'
import { TrustStrip } from '@/components/trust/TrustStrip'
import { FeaturedCaseStudy } from '@/components/success-stories/FeaturedCaseStudy'
import { StoryFilterGrid } from '@/components/success-stories/StoryFilterGrid'
import { VideoTestimonials } from '@/components/home/VideoTestimonials'
import { WhatMakesTheDifference } from '@/components/success-stories/WhatMakesTheDifference'
import { GoogleReviews } from '@/components/trust/GoogleReviews'
import { FinalCTA } from '@/components/home/FinalCTA'

export default function SuccessStories() {
  return (
    <>
      <SuccessStoriesHero />
      <TrustStrip />
      <FeaturedCaseStudy />
      <StoryFilterGrid />
      <VideoTestimonials />
      <WhatMakesTheDifference />
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
        <GoogleReviews />
      </div>
      <FinalCTA heading="Your child's story could be next." />
    </>
  )
}
