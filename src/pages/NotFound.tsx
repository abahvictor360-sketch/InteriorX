import { Heading } from '../components/motion'
import { Btn } from '../components/ui'

export default function NotFound() {
  return (
    <section className="not-found">
      <div>
        <Heading as="h1" text="404" />
        <p style={{ margin: '10px 0 30px', color: 'var(--muted)' }}>This room hasn’t been designed yet.</p>
        <Btn to="/">Back Home</Btn>
      </div>
    </section>
  )
}
