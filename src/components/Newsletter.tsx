import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { Heading, Reveal } from './motion'

export default function Newsletter() {
  const [sent, setSent] = useState(false)
  return (
    <section className="newsletter">
      <div className="container">
        <Reveal>
          <span className="tag">Subscribe to the newsletter</span>
        </Reveal>
        <Heading text="Join [Our Newsletter Stay] Up To Date" />
        <Reveal delay={0.2}>
          <p>Join our newsletter. Learn something new, gain access to exclusive content, and stay informed with the latest updates in the industry.</p>
          <form
            className="news-form"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
              e.currentTarget.reset()
            }}
          >
            <input type="email" required placeholder="Email address..." aria-label="Email address" />
            <button type="submit" aria-label="Subscribe">
              <ArrowUpRight size={18} />
            </button>
          </form>
          <AnimatePresence>
            {sent && (
              <motion.p className="form-msg" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                Thanks for subscribing — welcome aboard!
              </motion.p>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
