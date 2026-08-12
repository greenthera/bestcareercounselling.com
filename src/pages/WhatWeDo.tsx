import { WhatWeDoHero } from '@/components/what-we-do/WhatWeDoHero'
import { ServiceNav } from '@/components/what-we-do/ServiceNav'
import { TrustStrip } from '@/components/trust/TrustStrip'
import { ProblemSection } from '@/components/home/ProblemSection'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ReportSection } from '@/components/home/ReportSection'
import { ServiceSection } from '@/components/what-we-do/ServiceSection'
import { ServiceComparisonTable } from '@/components/what-we-do/ServiceComparisonTable'
import { SuccessStoriesPreview } from '@/components/home/SuccessStoriesPreview'
import { VideoTestimonials } from '@/components/home/VideoTestimonials'
import { GoogleReviews } from '@/components/trust/GoogleReviews'
import { FreeAssessmentSection } from '@/components/home/FreeAssessmentSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { services } from '@/data/services'
import { usePageSeo } from '@/hooks/usePageSeo'
import { pageSeo } from '@/data/seo'

export default function WhatWeDo() {
  usePageSeo(pageSeo.whatWeDo)
  return (
    <>
      <WhatWeDoHero />
      <ServiceNav />
      <TrustStrip />
      <ProblemSection />
      <HowItWorks />
      <ReportSection />

      <div className="divide-y divide-neutral-border">
        {services.map((service) => (
          <ServiceSection key={service.id} service={service} />
        ))}
      </div>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
        <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Compare services</h2>
        <div className="mt-8">
          <ServiceComparisonTable />
        </div>
      </section>

      <SuccessStoriesPreview />
      <VideoTestimonials />
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
        <GoogleReviews />
      </div>
      <FreeAssessmentSection />
      <FinalCTA
        heading="Not sure which counselling service you need?"
        description="Book a free 15-minute call and we'll point you to the right one."
        submitLabel="Book a Free Consultation"
      />
    </>
  )
}
