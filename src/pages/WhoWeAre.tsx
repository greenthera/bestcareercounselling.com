import { WhoWeAreHero } from '@/components/who-we-are/WhoWeAreHero'
import { TrustStrip } from '@/components/trust/TrustStrip'
import { ProblemSection } from '@/components/home/ProblemSection'
import { OurStory } from '@/components/who-we-are/OurStory'
import { FounderProfiles } from '@/components/who-we-are/FounderProfiles'
import { OurMethodology } from '@/components/who-we-are/OurMethodology'
import { OurJourney } from '@/components/who-we-are/OurJourney'
import { RealWork } from '@/components/who-we-are/RealWork'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ReportSection } from '@/components/home/ReportSection'
import { SuccessStoriesPreview } from '@/components/home/SuccessStoriesPreview'
import { VideoTestimonials } from '@/components/home/VideoTestimonials'
import { UniversitiesSection } from '@/components/who-we-are/UniversitiesSection'
import { GoogleReviews } from '@/components/trust/GoogleReviews'
import { WhoWeHelp } from '@/components/home/WhoWeHelp'
import { FinalCTA } from '@/components/home/FinalCTA'
import { PersonSchema } from '@/components/seo/PersonSchema'
import { usePageSeo } from '@/hooks/usePageSeo'
import { pageSeo } from '@/data/seo'

export default function WhoWeAre() {
  usePageSeo(pageSeo.whoWeAre)
  return (
    <>
      <PersonSchema person="kishan" />
      <PersonSchema person="meeta" />
      <WhoWeAreHero />
      <TrustStrip />
      <OurStory />
      <FounderProfiles />
      <OurMethodology />
      <OurJourney />
      <RealWork />
      <div className="h-2 md:h-4" aria-hidden="true" />
      <ProblemSection />
      <HowItWorks />
      <ReportSection />
      <SuccessStoriesPreview />
      <VideoTestimonials />
      <UniversitiesSection />
      <div className="mx-auto max-w-3xl px-4 py-10 md:px-8">
        <GoogleReviews />
      </div>
      <WhoWeHelp />
      <FinalCTA />
    </>
  )
}
