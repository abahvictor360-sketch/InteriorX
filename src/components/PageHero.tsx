import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Heading, ease } from './motion'

export default function PageHero({ title, tag, image, crumb }: { title: string; tag: string; image: string; crumb: string }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2])
  return (
    <section className="page-hero" ref={ref}>
      <motion.div
        style={{ position: 'absolute', inset: 0, backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', y, scale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <div className="container">
        <motion.span className="tag dark" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, ease, duration: 0.8 }}>
          {tag}
        </motion.span>
        <Heading as="h1" text={title} />
        <motion.div className="crumbs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <Link to="/">Home</Link> / <span className="gold">{crumb}</span>
        </motion.div>
      </div>
    </section>
  )
}
