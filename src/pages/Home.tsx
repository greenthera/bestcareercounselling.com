import { Hero } from '@/components/home/Hero'
import { TrustStrip } from '@/components/trust/TrustStrip'
import { ProblemSection } from '@/components/home/ProblemSection'
import { WhoWeHelp } from '@/components/home/WhoWeHelp'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ReportSection } from '@/components/home/ReportSection'
import { ExploreUniversities } from '@/components/trust/ExploreUniversities'
import { FreeAssessmentSection } from '@/components/home/FreeAssessmentSection'
import { MeetFounders } from '@/components/home/MeetFounders'
import { GoogleReviewsCarousel } from '@/components/trust/GoogleReviewsCarousel'
import { FAQSection } from '@/components/home/FAQSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { homeFaqs } from '@/data/faqs'
import { PageSeo } from '@/components/seo/PageSeo'
import { pageSeo } from '@/data/seo'

export default function Home() {
  return (
    <>
      <PageSeo {...pageSeo.home} />
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <WhoWeHelp />
      <HowItWorks />
      <ReportSection />
      <ExploreUniversities />
      <FreeAssessmentSection />
      <MeetFounders />
      <GoogleReviewsCarousel />
      <FAQSection faqs={homeFaqs} />
      <FinalCTA />
    </>
  )
}
