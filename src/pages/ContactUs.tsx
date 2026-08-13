import { ContactHero } from '@/components/contact/ContactHero'
import { TwoPaths } from '@/components/contact/TwoPaths'
import { WhatHappensOnCall } from '@/components/contact/WhatHappensOnCall'
import { ContactMethods } from '@/components/contact/ContactMethods'
import { ContactLocation } from '@/components/contact/ContactLocation'
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
      <ContactLocation />
      <FAQSection faqs={bookingFaqs} heading="Booking FAQ" />
    </>
  )
}
