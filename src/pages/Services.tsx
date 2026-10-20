import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Heading, ImageReveal, Reveal } from '../components/motion'
import { Btn } from '../components/ui'
import { images, services } from '../data'
import { CTA, Process } from '../sections/HomeSections'

export default function Services() {
  return (
    <>
      <PageHero title="Our [Services]" tag="What we do" image={images.hero} crumb="Services" />
      <section className="section">
        <div className="container" style={{ display: 'grid', gap: 110 }}>
          {services.map((s, i) => (
            <div className="split-grid" key={s.slug} style={{ direction: i % 2 ? 'rtl' : 'ltr' }}>
              <motion.div style={{ direction: 'ltr' }} whileHover={{ scale: 0.98 }} transition={{ duration: 0.5 }}>
                <ImageReveal className="reveal-img" src={s.image} alt={s.title} direction={i % 2 ? 'left' : 'up'} />
              </motion.div>
              <div style={{ direction: 'ltr' }}>
                <Reveal>
                  <span className="tag">Service 0{i + 1}</span>
                </Reveal>
                <Heading text={s.title.replace(/^(\S+)/, '[$1]')} />
                <Reveal delay={0.2}>
                  <p style={{ color: 'var(--muted)', margin: '24px 0 28px', maxWidth: 480 }}>
                    {s.blurb} Our designers combine spatial planning, bespoke joinery, lighting design and styling into one seamless
                    service, so every decision supports how you want the space to feel.
                  </p>
                  <ul className="checks" style={{ color: 'var(--ink)' }}>
                    {['Concept & moodboards', '3D visualisation', 'Material sourcing', 'Site supervision'].map((c) => (
                      <li key={c}>
                        <ArrowUpRight size={16} className="gold" /> {c}
                      </li>
                    ))}
                  </ul>
                  <Btn to="/contact">Book A Consultation</Btn>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Process />
      <CTA />
    </>
  )
}
