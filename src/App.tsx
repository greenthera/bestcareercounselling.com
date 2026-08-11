import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'

const Home = lazy(() => import('@/pages/Home'))
const WhoWeAre = lazy(() => import('@/pages/WhoWeAre'))
const WhatWeDo = lazy(() => import('@/pages/WhatWeDo'))
const SuccessStories = lazy(() => import('@/pages/SuccessStories'))
const Blogs = lazy(() => import('@/pages/Blogs'))
const BlogDetail = lazy(() => import('@/pages/BlogDetail'))
const ContactUs = lazy(() => import('@/pages/ContactUs'))
const ThankYou = lazy(() => import('@/pages/ThankYou'))

export default function App() {
  return (
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
        </Route>
      </Routes>
    </Suspense>
  )
}
