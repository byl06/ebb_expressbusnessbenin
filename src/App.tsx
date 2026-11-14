import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { MobileBar } from './components/MobileBar'
import { ScrollToTop } from './components/ScrollToTop'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Immobilier = lazy(() => import('./pages/Immobilier'))
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const location = useLocation()
  return (
    // reducedMotion="user" : respecte la préférence système « réduire les animations »
    <MotionConfig reducedMotion="user">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold focus:px-4 focus:py-3 focus:font-semibold focus:text-navy">
        Aller au contenu
      </a>
      <ScrollToTop />
      <Header />
      <main id="contenu" tabIndex={-1} className="outline-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.28, ease: 'easeOut' }}>
            <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/a-propos" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/immobilier" element={<Immobilier />} />
                <Route path="/immobilier/:slug" element={<PropertyDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/mentions-legales" element={<Legal />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <MobileBar />
    </MotionConfig>
  )
}
