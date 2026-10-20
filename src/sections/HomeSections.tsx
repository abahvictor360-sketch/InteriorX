import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Play, Star, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Counter, Heading, ImageReveal, Parallax, Reveal, Watermark, ease, fadeUp, stagger } from '../components/motion'
import { Btn, SectionHead } from '../components/ui'
import { clients, gallery, images, pillars, posts, process, projects, services, stats, team, testimonials } from '../data'

/* ---------------- Hero ---------------- */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const lines = ['The Art of Stunning', 'Interior Design']

  return (
    <section className="hero" ref={ref}>
      <motion.div
        className="hero-bg"
        style={{ backgroundImage: `url(${images.hero})`, y: bgY, scale: bgScale }}
        initial={{ scale: 1.25, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, delay: 1, ease }}
      />
      <motion.div className="container hero-content" style={{ y: contentY, opacity: fade }}>
        <div>
          <motion.span className="tag dark" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.8, ease }}>
            Fast and reliable
          </motion.span>
          <h1>
            {lines.map((l, i) => (
              <span className="line" key={l}>
                <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 1.6 + i * 0.15, duration: 1.1, ease }}>
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div className="hero-sub" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1, duration: 0.9, ease }}>
            <p>Whether it's your home, office, or a commercial project, we are always dedicated to bringing your vision to life.</p>
            <Btn to="/contact" light>
              Take Counsel
            </Btn>
          </motion.div>
        </div>
        <motion.div className="hero-cards" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 2.2 } } }}>
          <motion.div className="glass hero-stat" variants={fadeUp}>
            <strong>
              <Counter to={260} suffix="+" />
            </strong>
            <small>Successful Projects and Counting</small>
            <ul>
              <li>Tech Specifications</li>
              <li>Design Project</li>
              <li>3D Visualisation</li>
            </ul>
          </motion.div>
          <motion.div className="hero-card-img" variants={fadeUp} whileHover={{ rotate: -2, scale: 1.03 }}>
            <img src={images.heroCard} alt="Warm lit hallway with timber slats" />
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.a
        href="#who-we-are"
        className="scroll-cue"
        aria-label="Scroll down"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown size={18} />
      </motion.a>
    </section>
  )
}

/* ---------------- Who we are ---------------- */
const pillarIcons = [
  <svg key="a" width="38" height="38" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="4" y="4" width="32" height="32" rx="2" /><path d="M4 20h32M20 4v32M4 4l16 16M36 4 20 20" /></svg>,
  <svg key="b" width="38" height="38" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6h10a14 14 0 0 1 0 28H6zM20 6h4a14 14 0 0 1 0 28h-4" /></svg>,
  <svg key="c" width="38" height="38" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 4h32v32H4zM4 4l32 32M20 4v16H4M36 20H20v16" /></svg>,
  <svg key="d" width="38" height="38" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="6" y="4" width="28" height="9" rx="4.5" /><rect x="6" y="15.5" width="28" height="9" rx="4.5" /><rect x="6" y="27" width="28" height="9" rx="4.5" /></svg>,
]

export function WhoWeAre() {
  return (
    <section className="section" id="who-we-are" style={{ overflow: 'hidden' }}>
      <div className="container">
        <SectionHead
          tag="Who we are"
          title="Experience [The Art Of Interior] Design"
          text="We specialize in transforming visions into reality. Explore our portfolio of innovative architectural and interior design projects crafted with precision."
        />
        <motion.div className="pillars" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          {pillars.map((p, i) => (
            <motion.article className="pillar" key={p.title} variants={fadeUp}>
              <div className="pillar-top">
                <h3>{p.title}</h3>
                <span className="ico">{pillarIcons[i]}</span>
              </div>
              <p>{p.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- Dark split ---------------- */
export function WhereSpaces() {
  return (
    <section className="section dark-split">
      <Watermark text="InteriorX" className="light" />
      <div className="container split-grid">
        <div>
          <Reveal>
            <span className="tag dark">Started in 1991</span>
          </Reveal>
          <Heading text="Where Spaces Inspire, And [Design Comes Alive]" />
          <motion.ul className="checks" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {['Latest Technologies', 'High-Quality Designs', '5 Years Warranty', 'Residential Design'].map((c) => (
              <motion.li key={c} variants={fadeUp}>
                <Check size={18} /> {c}
              </motion.li>
            ))}
          </motion.ul>
          <Reveal delay={0.2}>
            <p>Whether it's your home, office, or a commercial project, we are always dedicated to bringing your vision to life. Our numbers speak better than words.</p>
            <Btn to="/about" light>
              More About Us
            </Btn>
          </Reveal>
        </div>
        <Parallax offset={50}>
          <ImageReveal className="reveal-img" src={images.about} alt="Living room with fluted timber walls and boucle sofas" />
        </Parallax>
      </div>
    </section>
  )
}

/* ---------------- Services ---------------- */
export function ServicesShowcase() {
  const [active, setActive] = useState(0)
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          tag="Our services"
          title="Explore Our [Comprehensive Interior Design] Services"
          text="We specialize in transforming visions into reality. Explore our portfolio of innovative architectural and interior design projects crafted with precision."
        />
        <div className="services-grid">
          <div className="service-visual">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={services[active].image}
                src={services[active].image}
                alt={services[active].title}
                initial={{ clipPath: 'inset(0 0 0 100%)', scale: 1.15 }}
                animate={{ clipPath: 'inset(0 0 0 0%)', scale: 1 }}
                exit={{ opacity: 0.6 }}
                transition={{ duration: 1, ease }}
              />
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="caption glass"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease }}
              >
                {services[active].blurb}
              </motion.div>
            </AnimatePresence>
          </div>
          <ul className="service-list">
            {services.map((s, i) => (
              <Reveal as="li" delay={i * 0.08} key={s.slug}>
                <Link
                  to="/services"
                  className={`service-item${active === i ? ' active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="num">0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <span className="arrow">{active === i ? <ArrowRight size={18} /> : <ArrowUpRight size={18} />}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Stats ---------------- */
export function Stats() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <motion.div className="container stats" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {stats.map((s) => (
          <motion.div className="stat" key={s.label} variants={fadeUp}>
            <strong>{s.display ? <Counter from={1950} to={2013} /> : <Counter to={s.value} suffix={s.suffix} />}</strong>
            <h4>{s.label}</h4>
            <p>{s.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

/* ---------------- Process ---------------- */
export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6])
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  return (
    <section className="section process">
      <div className="process-top" ref={ref}>
        <Watermark text="InteriorX" />
        <motion.img
          className="floorplan"
          src={images.floorplan}
          alt="Isometric 3D floor plan"
          style={{ rotate, y }}
          initial={{ opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
        />
      </div>
      <div className="container">
        <div className="process-head">
          <div>
            <Reveal>
              <span className="tag">How we work</span>
            </Reveal>
            <Heading text="Description [Architecture Process] For Exceptional Results." />
          </div>
          <Reveal delay={0.2}>
            <p>
              Our process is alive — adapting, refining, and growing with your vision. Always. Like artists with a blank canvas, we transform rooms into living works of art.
            </p>
          </Reveal>
        </div>
        <motion.div className="steps" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          {process.map((s, i) => (
            <motion.article className="step" key={s.title} variants={fadeUp} whileHover={{ y: -10 }}>
              <div className="ph">
                <img src={s.image} alt={s.title} loading="lazy" />
              </div>
              <h4>
                <span className="gold">0{i + 1}.</span> {s.title}
              </h4>
              <p>{s.text}</p>
              <span className="big-n">0{i + 1}</span>
            </motion.article>
          ))}
        </motion.div>
        <Reveal className="center-note">
          We’ve been working hard to impress you. <Link to="/contact">Start Yours Today</Link>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Projects carousel ---------------- */
export function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  return (
    <article className="project-card">
      <div className="project-media">
        <img src={p.image} alt={p.title} loading="lazy" draggable={false} />
        <div className="chips">
          {p.tags.map((t) => (
            <span className="chip glass" key={t}>
              {t}
            </span>
          ))}
        </div>
        <span className="view-btn">View</span>
      </div>
      <h3>{p.title}</h3>
      <p className="meta">
        {p.location}
        <br />
        {p.year}
      </p>
    </article>
  )
}

export function ProjectsCarousel() {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [limit, setLimit] = useState(0)
  useEffect(() => {
    const calc = () => setLimit(Math.max(0, (track.current?.scrollWidth ?? 0) - (wrap.current?.offsetWidth ?? 0) + 48))
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])
  return (
    <section className="section projects">
      <div className="container">
        <SectionHead
          tag="Our projects"
          title="Creative [Projects That Define] Our Style"
          text="Our portfolio showcases a diverse range of projects, from beautifully crafted residential spaces to functional and stylish commercial interiors. Drag to explore."
        />
      </div>
      <div className="track-wrap" ref={wrap}>
        <motion.div
          className="track"
          ref={track}
          drag="x"
          dragConstraints={{ left: -limit, right: 0 }}
          dragElastic={0.08}
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          style={{ paddingTop: 40 }}
        >
          {projects.map((p) => (
            <ProjectCard p={p} key={p.title} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function HouseBand() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  return (
    <div className="house-band" ref={ref}>
      <Watermark text="Interior" distance={100} />
      <motion.img className="house" src={images.house} alt="Modern glass pavilion house" style={{ scale }} loading="lazy" />
    </div>
  )
}

/* ---------------- Testimonials ---------------- */
export function Testimonials() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000)
    return () => clearInterval(t)
  }, [])
  const t = testimonials[i]
  return (
    <section className="section">
      <div className="container">
        <SectionHead tag="Our clients say" title="Here’s What [Warm Words Our Clients] Say" />
        <div className="testi-grid">
          <ImageReveal className="testi-img" src={images.testimonial} alt="Finished luxury lounge" direction="left" />
          <Reveal delay={0.2}>
            <div className="rating">
              <strong>4.80</strong>
              <div>
                <span className="stars">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} size={11} fill="currentColor" />
                  ))}
                </span>
                <small>2,688 reviews</small>
              </div>
              <span className="blurb">From Concept To Reality, The Team Turned My Vision Into A Stunning, Livable Space.</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.6, ease }}>
                <p className="quote">“{t.quote}”</p>
                <div className="author">
                  <span className="avatar">{t.name.split(' ').map((n) => n[0]).join('')}</span>
                  <div>
                    <strong>{t.name}</strong>
                    <small>{t.role}</small>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="dots" style={{ marginTop: 26, marginLeft: 0 }}>
              {testimonials.map((_, n) => (
                <button key={n} className={n === i ? 'on' : ''} onClick={() => setI(n)} aria-label={`Show testimonial ${n + 1}`} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Clients() {
  const logos = [...clients, ...clients]
  return (
    <section className="clients">
      <div className="container">
        <p className="clients-title">
          Our Website <span className="gold">&nbsp;75000+&nbsp;</span> VIP Customer
        </p>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {logos.map((c, i) => (
            <div className="client-logo" key={i}>
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.5">
                {i % 2 ? <circle cx="17" cy="17" r="15" /> : <rect x="2" y="2" width="30" height="30" />}
                <path d="M9 26V12l8-5 8 5v14M13 26v-8h8v8" />
              </svg>
              <span>
                {c}
                <small>{i % 2 ? 'Construction' : 'Interiors'}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- 360 panorama ---------------- */
export function Panorama() {
  // horizontal position as a percentage of the pannable range; auto-pans back and forth until dragged
  const [pos, setPos] = useState(50)
  const dragging = useRef<{ x: number; start: number; w: number } | null>(null)
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    if (!auto) return
    let id = 0
    let dir = 1
    const tick = () => {
      setPos((p) => {
        if (p >= 100) dir = -1
        if (p <= 0) dir = 1
        return Math.min(100, Math.max(0, p + dir * 0.06))
      })
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [auto])
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <SectionHead center tag="360-degree panoramas" title="Create An Even [Greater Experience]" />
        <Reveal>
          <div
            className="pano"
            style={{ backgroundImage: `url(${images.panorama})`, backgroundPosition: `${pos}% center` }}
            onPointerDown={(e) => {
              setAuto(false)
              dragging.current = { x: e.clientX, start: pos, w: e.currentTarget.offsetWidth }
              ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
            }}
            onPointerMove={(e) => {
              const d = dragging.current
              if (d) setPos(Math.min(100, Math.max(0, d.start - ((e.clientX - d.x) / d.w) * 100)))
            }}
            onPointerUp={() => {
              dragging.current = null
              setAuto(true)
            }}
          >
            <span className="pano-badge glass" style={{ borderRadius: 999 }}>
              <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 6, ease: 'linear' }} style={{ display: 'inline-flex' }}>
                ⟳
              </motion.span>
              360° · Drag to look around
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Team ---------------- */
export function TeamShowcase() {
  const [on, setOn] = useState(0)
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="container">
        <SectionHead tag="Amazing design team" title="Meet The [Experts Our Interior] Designers" />
        <div className="team-grid">
          <Reveal>
            <motion.div className="team-photo" whileHover={{ rotate: -1.5 }}>
              <motion.img
                src={images.designer}
                alt={team[on].name}
                key={on}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease }}
                style={{ x: '-50%' }}
              />
              <div className="role-badge glass">
                <strong>{team[on].name}</strong> · {team[on].role}
              </div>
            </motion.div>
          </Reveal>
          <ul className="team-list">
            {team.map((m, i) => (
              <Reveal as="li" key={m.name} delay={i * 0.07}>
                <Link to="/team" className={`team-row${on === i ? ' on' : ''}`} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)}>
                  <span className="n">0{i + 1}</span>
                  <h3>{m.name}</h3>
                  <span className="r">{m.role}</span>
                  <ArrowUpRight size={18} />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------------- CTA ---------------- */
export function CTA() {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  return (
    <section className="cta" ref={ref}>
      <motion.div className="cta-bg" style={{ backgroundImage: `url(${images.cta})`, y }} />
      <button className="play glass" aria-label="Play showreel" onClick={() => setOpen(true)}>
        <motion.span className="ring" animate={{ scale: [1, 1.6], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
        <motion.span className="ring" animate={{ scale: [1, 1.6], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} />
        <Play size={28} fill="currentColor" />
      </button>
      <div className="container">
        <Heading text="Unlock Your Dream Home Today!" />
        <Reveal delay={0.3}>
          <p>We encourage clients to actively participate in discussions, share their ideas, preferences, and feedback.</p>
        </Reveal>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="video-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div className="frame" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} transition={{ duration: 0.6, ease }} onClick={(e) => e.stopPropagation()}>
              <motion.div
                className="pano-loop"
                style={{ backgroundImage: `url(${images.panorama})` }}
                animate={{ backgroundPositionX: ['0%', '100%'] }}
                transition={{ repeat: Infinity, repeatType: 'mirror', duration: 18, ease: 'easeInOut' }}
              />
              <span className="label">InteriorX Showreel · Oasis Atrium</span>
              <button className="icon-btn" style={{ position: 'absolute', top: 16, right: 16, color: '#fff' }} onClick={() => setOpen(false)} aria-label="Close">
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ---------------- Blog ---------------- */
export function PostCard({ p }: { p: (typeof posts)[number] }) {
  return (
    <Link to={`/blog/${p.slug}`} className="post-card">
      <div className="ph">
        <img src={p.image} alt={p.title} loading="lazy" />
        <span className="badge">{p.tag}</span>
      </div>
      <p className="post-meta">
        {p.date} · By <b>Admin</b>
      </p>
      <h3>{p.title}</h3>
      <p>{p.excerpt}</p>
    </Link>
  )
}

export function BlogPreview() {
  return (
    <section className="section" style={{ paddingBottom: 0 }}>
      <div className="container">
        <SectionHead tag="Straight from the newsroom" title="Take A Look At [Our Latest Blog] & Articles." />
        <motion.div className="blog-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          {posts.map((p) => (
            <motion.div key={p.slug} variants={fadeUp}>
              <PostCard p={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- Gallery ---------------- */
const sizes = [
  [260, 200],
  [210, 150],
  [420, 280],
  [300, 210],
  [230, 160],
  [380, 260],
  [280, 190],
  [240, 170],
]

export function Gallery() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['-5%', '-30%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-35%', '-10%'])
  const row = (offset: number) => [...gallery.slice(offset), ...gallery.slice(0, offset), ...gallery]
  return (
    <section className="gallery" ref={ref}>
      <Watermark text="gallery" distance={120} />
      {[x1, x2].map((x, r) => (
        <motion.div className="gallery-row" style={{ x }} key={r}>
          {row(r * 3).map((src, i) => {
            const [w, h] = sizes[(i + r * 2) % sizes.length]
            return (
              <motion.div className="g-item" key={i} style={{ width: w, height: h }} whileHover={{ y: -8 }}>
                <img src={src} alt="" loading="lazy" />
              </motion.div>
            )
          })}
        </motion.div>
      ))}
    </section>
  )
}
