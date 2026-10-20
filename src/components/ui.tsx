import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Heading, Magnetic, Reveal } from './motion'

export function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M4 11l12-6 12 6-12 6z" fill="#c49b5f" />
      <path d="M4 17l12 6 12-6M4 22.5l12 6 12-6" stroke="#c49b5f" strokeWidth="2.6" strokeLinejoin="round" />
    </svg>
  )
}

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="InteriorX home">
      <LogoMark />
      interiorx
    </Link>
  )
}

export function Btn({ to, children, light, solid }: { to: string; children: ReactNode; light?: boolean; solid?: boolean }) {
  return (
    <Magnetic>
      <Link to={to} className={`btn${light ? ' light' : ''}${solid ? ' solid' : ''}`}>
        {children}
        {!solid && (
          <span className="btn-icon">
            <ArrowUpRight size={16} />
          </span>
        )}
      </Link>
    </Magnetic>
  )
}

export function SectionHead({ tag, title, text, dark, center }: { tag: string; title: string; text?: string; dark?: boolean; center?: boolean }) {
  return (
    <div className={`sec-head${dark ? ' dark' : ''}${center ? ' center' : ''}`}>
      <div className={center ? '' : 'tag-col'}>
        <Reveal x={-20} y={0}>
          <span className={`tag${dark ? ' dark' : ''}`}>{tag}</span>
        </Reveal>
      </div>
      <div>
        <Heading text={title} />
        {text && (
          <Reveal delay={0.2}>
            <p>{text}</p>
          </Reveal>
        )}
      </div>
    </div>
  )
}
