import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Cursor, Preloader, ScrollProgress, SmoothScroll } from './components/Chrome'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { ease } from './components/motion'
import About from './pages/About'
import { Blog, Post } from './pages/Blog'
import Contact from './pages/Contact'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Portfolio from './pages/Portfolio'
import Services from './pages/Services'
import Team from './pages/Team'

export default function App() {
  const location = useLocation()
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/team" element={<Team />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Post />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}
