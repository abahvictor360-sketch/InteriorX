import { AnimatePresence, motion } from 'framer-motion'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import PageHero from '../components/PageHero'
import { Reveal } from '../components/motion'
import { contact, images, services } from '../data'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const rows = [
    { icon: <Phone size={18} />, label: 'Call us', value: contact.phone },
    { icon: <Mail size={18} />, label: 'Email', value: contact.email },
    { icon: <MapPin size={18} />, label: 'Studio', value: contact.address },
    { icon: <Clock size={18} />, label: 'Hours', value: 'Mon – Sat, 9:00 – 18:00' },
  ]
  return (
    <>
      <PageHero title="Get In [Touch]" tag="Contact us" image={images.cta} crumb="Contact" />
      <section className="section">
        <div className="container contact-grid">
          <Reveal className="info-card" x={-40} y={0}>
            <h3>
              Let’s design <span className="gold">something beautiful</span>
            </h3>
            {rows.map((r) => (
              <div className="info-row" key={r.label}>
                <span className="i">{r.icon}</span>
                <div>
                  <small>{r.label}</small>
                  {r.value}
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.15}>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
                e.currentTarget.reset()
              }}
            >
              <h3>
                Request a <span className="gold">Quote</span>
              </h3>
              <label className="field">
                Full name
                <input required placeholder="Jane Doe" />
              </label>
              <label className="field">
                Email
                <input required type="email" placeholder="jane@email.com" />
              </label>
              <label className="field">
                Phone
                <input placeholder="+1 555 000 000" />
              </label>
              <label className="field">
                Service
                <select defaultValue="">
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {services.map((s) => (
                    <option key={s.slug}>{s.title}</option>
                  ))}
                </select>
              </label>
              <label className="field full">
                Tell us about your project
                <textarea rows={5} placeholder="Space, size, timeline, budget…" />
              </label>
              <div className="field full">
                <button className="btn solid" type="submit" style={{ justifySelf: 'start' }}>
                  Send Message
                </button>
                <AnimatePresence>
                  {sent && (
                    <motion.p className="form-msg" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      Thank you! Our team will be in touch within one business day.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
        <div className="container">
          <Reveal className="map">
            <iframe
              title="Studio location"
              loading="lazy"
              src="https://www.google.com/maps?q=5609+E+Sprague+Ave,+Spokane+Valley,+WA+99212&output=embed"
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
