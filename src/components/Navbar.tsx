import { AnimatePresence, motion } from 'framer-motion'
import { LayoutGrid, Menu, PhoneCall, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { contact, navLinks } from '../data'
import { ease } from './motion'
import { Logo } from './ui'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <motion.header
        className={`nav${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 1.4, ease }}
      >
        <div className="container nav-inner">
          <Logo />
          <ul className="nav-links">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'}>
                  {({ isActive }) => (
                    <>
                      {l.label}
                      {isActive && <motion.span layoutId="nav-underline" className="underline" />}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="nav-right">
            <a className="nav-phone" href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>
              <PhoneCall size={22} />
              <span>
                Call Us Phone
                <strong>{contact.phone}</strong>
              </span>
            </a>
            <Link to="/contact" className="btn solid">
              Get A Quote!
            </Link>
            <button className="icon-btn" aria-label="Search">
              <Search size={18} />
            </button>
            <button className="icon-btn burger" aria-label="Open menu" onClick={() => setOpen(true)}>
              <Menu size={18} />
            </button>
            <button className="icon-btn grid-btn" aria-label="Menu" onClick={() => setOpen(true)}>
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.8, ease }}
          >
            <button className="icon-btn close" aria-label="Close menu" onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
            {navLinks.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.6, ease }}
              >
                <Link to={l.to} className={pathname === l.to ? 'gold' : ''}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <p style={{ marginTop: 'auto', opacity: 0.7 }}>
              {contact.email}
              <br />
              {contact.phone}
            </p>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
