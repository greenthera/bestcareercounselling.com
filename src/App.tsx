import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { ScrollToTop } from '@/components/layout/ScrollToTop'

const Home = lazy(() => import('@/pages/Home'))
const WhoWeAre = lazy(() => import('@/pages/WhoWeAre'))
const WhatWeDo = lazy(() => import('@/pages/WhatWeDo'))
const SuccessStories = lazy(() => import('@/pages/SuccessStories'))
const Blogs = lazy(() => import('@/pages/Blogs'))
const BlogDetail = lazy(() => import('@/pages/BlogDetail'))
const ContactUs = lazy(() => import('@/pages/ContactUs'))
const ThankYou = lazy(() => import('@/pages/ThankYou'))
const AdmissionConsulting = lazy(() => import('@/pages/AdmissionConsulting'))
const CareerCounselling = lazy(() => import('@/pages/CareerCounselling'))
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'))
const Terms = lazy(() => import('@/pages/Terms'))
const RefundPolicy = lazy(() => import('@/pages/RefundPolicy'))

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="py-24 text-center text-muted-ink">Loading…</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/who-we-are" element={<WhoWeAre />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/admission-consulting" element={<AdmissionConsulting />} />
            <Route path="/career-counselling" element={<CareerCounselling />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
