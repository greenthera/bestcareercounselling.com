import { WhoWeAreHero } from '@/components/who-we-are/WhoWeAreHero'
import { OurStory } from '@/components/who-we-are/OurStory'
import { FounderProfiles } from '@/components/who-we-are/FounderProfiles'
import { OurMethodology } from '@/components/who-we-are/OurMethodology'
import { OurJourney } from '@/components/who-we-are/OurJourney'
import { RealWork } from '@/components/who-we-are/RealWork'
import { HowItWorks } from '@/components/home/HowItWorks'
import { UniversitiesSection } from '@/components/who-we-are/UniversitiesSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { FAQSection } from '@/components/home/FAQSection'
import { whoWeAreFaqs } from '@/data/faqs'
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
      <OurStory />
      <FounderProfiles />
      <OurMethodology />
      <OurJourney />
      <RealWork />
      <div className="h-2 md:h-4" aria-hidden="true" />
      <HowItWorks />
      <UniversitiesSection />
      <FAQSection faqs={whoWeAreFaqs} />
      <FinalCTA variant="button" />
    </>
  )
}
