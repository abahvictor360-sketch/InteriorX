import { animate, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

export const ease = [0.22, 1, 0.36, 1] as const

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  x?: number
  className?: string
  as?: 'div' | 'li' | 'p' | 'span'
}

/** Fades and slides its children in when they scroll into view. */
export function Reveal({ children, delay = 0, y = 40, x = 0, className, as = 'div' }: RevealProps) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </Tag>
  )
}

/** Heading whose words rise out of a mask one after another. */
export function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  // observe the unclipped wrapper: the words themselves start hidden behind their masks
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const words = text.split(' ')
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.08em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : undefined}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease }}
          >
            {w}
            {i < words.length - 1 ? '\u00a0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/** Two-tone section heading: parts wrapped in [brackets] are rendered gold. */
export function Heading({ text, as: Tag = 'h2', className }: { text: string; as?: 'h1' | 'h2'; className?: string }) {
  const parts = text.split(/(\[[^\]]+\])/).filter(Boolean)
  let offset = 0
  return (
    <Tag className={className}>
      {parts.map((p, i) => {
        const gold = p.startsWith('[')
        const clean = gold ? p.slice(1, -1) : p
        const d = offset * 0.06
        offset += clean.trim().split(' ').length
        return <SplitText key={i} text={clean.trim()} delay={d} className={gold ? 'gold' : undefined} />
      }).reduce<ReactNode[]>((acc, el, i) => (i ? [...acc, ' ', el] : [el]), [])}
    </Tag>
  )
}

/** Image that is unveiled with a clip-path wipe and a slow zoom-out. */
export function ImageReveal({ src, alt, className, direction = 'up' }: { src: string; alt: string; className?: string; direction?: 'up' | 'left' }) {
  const ref = useRef<HTMLDivElement>(null)
  // a fully clipped element never reports as intersecting, so observe the unclipped wrapper
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const from = direction === 'up' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)'
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ clipPath: from }}
        animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
        transition={{ duration: 1.3, ease }}
        style={{ overflow: 'hidden', width: '100%', height: '100%', borderRadius: 'inherit' }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          initial={{ scale: 1.3 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={{ duration: 1.8, ease }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>
    </div>
  )
}

/** Moves its child vertically relative to scroll position. */
export function Parallax({ children, offset = 80, className }: { children: ReactNode; offset?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

/** Big background word that drifts horizontally as you scroll. */
export function Watermark({ text, className = '', distance = 160 }: { text: string; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  return (
    <motion.div ref={ref} className={`watermark ${className}`} style={{ x }} aria-hidden>
      {text}
    </motion.div>
  )
}

/** Animated number that counts up once visible. */
export function Counter({ to, suffix = '', from = 0 }: { to: number; suffix?: string; from?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(from)
  useEffect(() => {
    if (!inView) return
    const controls = animate(from, to, { duration: 2, ease: 'easeOut', onUpdate: (v) => setVal(Math.round(v)) })
    return () => controls.stop()
  }, [inView, from, to])
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

/** Element that is gently pulled toward the cursor. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}
