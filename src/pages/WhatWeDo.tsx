import { WhatWeDoHero } from '@/components/what-we-do/WhatWeDoHero'
import { ServiceCategoryLinks } from '@/components/what-we-do/ServiceCategoryLinks'
import { ServiceNav } from '@/components/what-we-do/ServiceNav'
import { ServiceSection } from '@/components/what-we-do/ServiceSection'
import { FreeAssessmentSection } from '@/components/home/FreeAssessmentSection'
import { services } from '@/data/services'
import { usePageSeo } from '@/hooks/usePageSeo'
import { pageSeo } from '@/data/seo'

export default function WhatWeDo() {
  usePageSeo(pageSeo.whatWeDo)
  return (
    <>
      <WhatWeDoHero />
      <ServiceCategoryLinks />
      <ServiceNav />

      <div className="divide-y divide-neutral-border">
        {services.map((service) => (
          <ServiceSection key={service.id} service={service} />
        ))}
      </div>

      <FreeAssessmentSection />
    </>
  )
}
