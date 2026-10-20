import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import { ImageReveal, Reveal, fadeUp, stagger } from '../components/motion'
import { SectionHead } from '../components/ui'
import { images } from '../data'
import { Clients, Stats, Testimonials, WhereSpaces, WhoWeAre } from '../sections/HomeSections'

const values = [
  { title: 'Craft over trend', text: 'We design rooms that age gracefully — honest materials, careful proportions and details that reward a second look.' },
  { title: 'Listen first', text: 'Every project starts with how you live. Your routines, rituals and quirks shape the plan before a single sketch.' },
  { title: 'Own the outcome', text: 'One team from concept to keys. We manage trades, budgets and timelines so you can simply enjoy the reveal.' },
]

const milestones = [
  { year: '1991', text: 'Founded as a two-person drafting studio specialising in residential renovations.' },
  { year: '2005', text: 'Expanded into commercial interiors, delivering our first boutique hotel and flagship retail spaces.' },
  { year: '2013', text: 'Launched our in-house 3D visualisation lab and immersive 360° client walkthroughs.' },
  { year: '2025', text: '260+ completed projects across 14 countries, with a team of 30 designers and makers.' },
]

export default function About() {
  return (
    <>
      <PageHero title="About [Our Studio]" tag="Who we are" image={images.about} crumb="About" />
      <WhoWeAre />
      <WhereSpaces />
      <section className="section">
        <div className="container">
          <SectionHead tag="Our values" title="What [Guides Every] Project" />
          <motion.div className="values" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {values.map((v, i) => (
              <motion.div className="value" key={v.title} variants={fadeUp}>
                <span className="n">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split-grid" style={{ alignItems: 'start' }}>
          <div>
            <SectionHead tag="Our journey" title="Three Decades Of [Beautiful Spaces]" />
            <div className="timeline">
              {milestones.map((m, i) => (
                <Reveal className="tl-item" key={m.year} delay={i * 0.1} x={-30} y={0}>
                  <strong>{m.year}</strong>
                  <p>{m.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <ImageReveal className="reveal-img" src={images.panorama} alt="Lush atrium lounge" />
        </div>
      </section>
      <Stats />
      <Testimonials />
      <Clients />
    </>
  )
}
