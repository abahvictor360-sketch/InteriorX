import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import PageHero from '../components/PageHero'
import { ease } from '../components/motion'
import { SectionHead } from '../components/ui'
import { images, projects } from '../data'
import { HouseBand, Panorama, ProjectCard } from '../sections/HomeSections'

const filters = ['All', 'Residential', 'Commercial']

export default function Portfolio() {
  const [f, setF] = useState('All')
  const list = projects.filter((p) => f === 'All' || p.tags.includes(f))
  return (
    <>
      <PageHero title="Our [Portfolio]" tag="Selected work" image={images.cta} crumb="Portfolio" />
      <section className="section">
        <div className="container">
          <SectionHead tag="Our projects" title="Creative [Projects That Define] Our Style" />
          <div className="filter-bar">
            {filters.map((x) => (
              <button key={x} className={f === x ? 'on' : ''} onClick={() => setF(x)}>
                {f === x && <motion.span layoutId="filter-pill" className="pill" transition={{ duration: 0.5, ease }} />}
                <span>{x}</span>
              </button>
            ))}
          </div>
          <motion.div className="grid-projects" layout>
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <ProjectCard p={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <HouseBand />
      <Panorama />
    </>
  )
}
