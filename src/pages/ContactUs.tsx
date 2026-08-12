import { ContactHero } from '@/components/contact/ContactHero'
import { TwoPaths } from '@/components/contact/TwoPaths'
import { WhatHappensOnCall } from '@/components/contact/WhatHappensOnCall'
import { ContactMethods } from '@/components/contact/ContactMethods'
import { LocationsSection } from '@/components/home/LocationsSection'
import { MeetFounders } from '@/components/home/MeetFounders'
import { GoogleReviews } from '@/components/trust/GoogleReviews'
import { FAQSection } from '@/components/home/FAQSection'
import { bookingFaqs } from '@/data/faqs'
import { usePageSeo } from '@/hooks/usePageSeo'
import { pageSeo } from '@/data/seo'

export default function ContactUs() {
  usePageSeo(pageSeo.contactUs)
  return (
    <>
      <ContactHero />
      <TwoPaths />
      <WhatHappensOnCall />
      <ContactMethods />
      <LocationsSection />
      <MeetFounders />
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
        <GoogleReviews />
      </div>
      <FAQSection faqs={bookingFaqs} heading="Booking FAQ" />
    </>
  )
}
