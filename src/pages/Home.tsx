import { Hero } from '@/components/home/Hero'
import { TrustStrip } from '@/components/trust/TrustStrip'
import { ProblemSection } from '@/components/home/ProblemSection'
import { WhoWeHelp } from '@/components/home/WhoWeHelp'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ReportSection } from '@/components/home/ReportSection'
import { FreeAssessmentSection } from '@/components/home/FreeAssessmentSection'
import { MeetFounders } from '@/components/home/MeetFounders'
import { GoogleReviewsCarousel } from '@/components/trust/GoogleReviewsCarousel'
import { FAQSection } from '@/components/home/FAQSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { homeFaqs } from '@/data/faqs'
import { usePageSeo } from '@/hooks/usePageSeo'
import { pageSeo } from '@/data/seo'

export default function Home() {
  usePageSeo(pageSeo.home)
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <WhoWeHelp />
      <HowItWorks />
      <ReportSection />
      <FreeAssessmentSection />
      <MeetFounders />
      <GoogleReviewsCarousel />
      <FAQSection faqs={homeFaqs} />
      <FinalCTA />
    </>
  )
}
