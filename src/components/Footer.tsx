import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { contact, images } from '../data'
import { Reveal, ease } from './motion'
import { Logo } from './ui'

const col1 = [
  ['About Us', '/about'],
  ['Services', '/services'],
  ['Careers', '/about'],
  ['Our Team', '/team'],
  ['Blog', '/blog'],
  ['Contact Us', '/contact'],
]
const col2 = [
  ['Our Projects', '/portfolio'],
  ['Partners', '/about'],
  ['Partners Program', '/about'],
  ['Affiliate Program', '/about'],
  ['Terms & Conditions', '/contact'],
  ['Support Center', '/contact'],
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bg" style={{ backgroundImage: `url(${images.about})` }} />
      <div className="container footer-grid">
        <Reveal>
          <Logo />
          <h4>We Transform Your Vision Into Beautifully Crafted Spaces.</h4>
          <address>{contact.address}</address>
        </Reveal>
        <Reveal delay={0.1}>
          <ul>
            {col1.map(([l, to]) => (
              <li key={l}>
                <Link to={to}>{l}</Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.2}>
          <ul>
            {col2.map(([l, to]) => (
              <li key={l}>
                <Link to={to}>{l}</Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.3} className="big-contact">
          <a href={`tel:${contact.phoneAlt.replace(/[^\d+]/g, '')}`}>{contact.phoneAlt}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <div className="socials">
            {['Facebook', 'Instagram', 'YouTube', 'Twitter'].map((s, i) => (
              <span key={s}>
                {i > 0 && <span style={{ marginRight: 12 }}>-</span>}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {s}
                </a>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
      <p className="copyright">
        © Copyright {new Date().getFullYear()} <span className="gold">InteriorX</span>. All rights reserved.
      </p>
      <motion.div
        className="footer-word"
        initial={{ y: 120, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease }}
        aria-hidden
      >
        interiorx
      </motion.div>
    </footer>
  )
}
