import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import { fadeUp, stagger } from '../components/motion'
import { SectionHead } from '../components/ui'
import { images, team } from '../data'
import { CTA } from '../sections/HomeSections'

const tints = ['#e9dcc4', '#d9d4cc', '#e6d3b3', '#d7cfc2', '#ebe3d6', '#d9c6a7']

export default function Team() {
  const members = [...team, { name: 'Sofia Laurent', role: 'Furniture Designer' }]
  return (
    <>
      <PageHero title="Our [Team]" tag="Amazing design team" image={images.about} crumb="Team" />
      <section className="section">
        <div className="container">
          <SectionHead tag="The people" title="Meet The [Experts Our Interior] Designers" text="A multidisciplinary collective of architects, decorators, lighting specialists and makers." />
          <motion.div className="team-cards" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {members.map((m, i) => (
              <motion.article className="member" key={m.name} variants={fadeUp} whileHover={{ y: -10 }}>
                <div className="ph" style={{ background: `linear-gradient(160deg, ${tints[i % tints.length]}, #c49b5f)` }}>
                  <img src={images.designer} alt={m.name} loading="lazy" />
                </div>
                <div className="body">
                  <div>
                    <h3>{m.name}</h3>
                    <small>{m.role}</small>
                  </div>
                  <ArrowUpRight className="gold" />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
      <CTA />
    </>
  )
}
