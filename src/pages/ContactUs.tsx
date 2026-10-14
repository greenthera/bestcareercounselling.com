import { ContactHero } from '@/components/contact/ContactHero'
import { TwoPaths } from '@/components/contact/TwoPaths'
import { WhatHappensOnCall } from '@/components/contact/WhatHappensOnCall'
import { ContactMethods } from '@/components/contact/ContactMethods'
import { ContactLocation } from '@/components/contact/ContactLocation'
import { FAQSection } from '@/components/home/FAQSection'
import { bookingFaqs } from '@/data/faqs'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { PageSeo } from '@/components/seo/PageSeo'
import { pageSeo } from '@/data/seo'

export default function ContactUs() {
  return (
    <>
      <PageSeo {...pageSeo.contactUs} />
      <Breadcrumbs items={[{ label: 'Contact Us', path: '/contact-us' }]} maxWidthClassName="max-w-2xl" />
      <ContactHero />
      <TwoPaths />
      <WhatHappensOnCall />
      <ContactMethods />
      <ContactLocation />
      <FAQSection faqs={bookingFaqs} heading="Booking Appointment FAQs" />
    </>
  )
}
