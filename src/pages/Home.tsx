import { Hero } from '@/components/home/Hero'
import { TrustStrip } from '@/components/trust/TrustStrip'
import { ProblemSection } from '@/components/home/ProblemSection'
import { WhoWeHelp } from '@/components/home/WhoWeHelp'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ReportSection } from '@/components/home/ReportSection'
import { FreeAssessmentSection } from '@/components/home/FreeAssessmentSection'
import { MeetFounders } from '@/components/home/MeetFounders'
import { VideoTestimonials } from '@/components/home/VideoTestimonials'
import { SuccessStoriesPreview } from '@/components/home/SuccessStoriesPreview'
import { GoogleReviews } from '@/components/trust/GoogleReviews'
import { LocationsSection } from '@/components/home/LocationsSection'
import { FAQSection } from '@/components/home/FAQSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { homeFaqs } from '@/data/faqs'

export default function Home() {
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
      <VideoTestimonials />
      <SuccessStoriesPreview />
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
        <GoogleReviews />
      </div>
      <LocationsSection />
      <FAQSection faqs={homeFaqs} />
      <FinalCTA />
    </>
  )
}
