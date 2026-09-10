import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { PageLoader } from '@/components/ui/page-loader'

const Home = lazy(() => import('@/pages/Home'))
const WhoWeAre = lazy(() => import('@/pages/WhoWeAre'))
const WhatWeDo = lazy(() => import('@/pages/WhatWeDo'))
const ContactUs = lazy(() => import('@/pages/ContactUs'))
const ThankYou = lazy(() => import('@/pages/ThankYou'))
const AdmissionConsulting = lazy(() => import('@/pages/AdmissionConsulting'))
const OnlineAdmissions = lazy(() => import('@/pages/OnlineAdmissions'))
const CareerCounselling = lazy(() => import('@/pages/CareerCounselling'))
const SchoolStudentCareerAssessment = lazy(() => import('@/pages/SchoolStudentCareerAssessment'))
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'))
const Terms = lazy(() => import('@/pages/Terms'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/who-we-are" element={<WhoWeAre />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/admission-consulting" element={<AdmissionConsulting />} />
            <Route path="/admission-consulting/online-admissions" element={<OnlineAdmissions />} />
            <Route path="/career-counselling" element={<CareerCounselling />} />
            <Route path="/school-student-career-assessment" element={<SchoolStudentCareerAssessment />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
