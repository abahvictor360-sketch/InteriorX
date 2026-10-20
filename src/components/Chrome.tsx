import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ease } from './motion'
import { LogoMark } from './ui'

/** Lenis smooth scrolling + reset to top on route change. */
export function SmoothScroll() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15 })
    let id = 0
    const raf = (t: number) => {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  return <motion.div className="progress-bar" style={{ scaleX }} />
}

export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40 })
  const sy = useSpring(y, { stiffness: 500, damping: 40 })
  const [big, setBig] = useState(false)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target as HTMLElement
      setBig(!!t.closest('a, button, .project-card, .g-item, .pano'))
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])
  return <motion.div className="cursor" style={{ x: sx, y: sy }} animate={{ scale: big ? 3.2 : 1 }} transition={{ duration: 0.3 }} />
}

export function Preloader() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1300)
    return () => clearTimeout(t)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="preloader" exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.9, ease }}>
          <motion.div
            className="logo"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <LogoMark />
            interiorx
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
