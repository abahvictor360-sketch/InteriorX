import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import Newsletter from '../components/Newsletter'
import PageHero from '../components/PageHero'
import { Reveal, fadeUp, stagger } from '../components/motion'
import { images, posts } from '../data'
import { PostCard } from '../sections/HomeSections'

export function Blog() {
  return (
    <>
      <PageHero title="Blog & [Articles]" tag="Straight from the newsroom" image={images.panorama} crumb="Blog" />
      <section className="section">
        <motion.div className="container blog-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {[...posts, ...posts.slice().reverse()].map((p, i) => (
            <motion.div key={p.slug + i} variants={fadeUp}>
              <PostCard p={p} />
            </motion.div>
          ))}
        </motion.div>
      </section>
      <Newsletter />
    </>
  )
}

export function Post() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug) ?? posts[0]
  const more = posts.filter((p) => p.slug !== post.slug)
  return (
    <>
      <PageHero title={post.title} tag={post.tag} image={post.image} crumb="Blog" />
      <section className="section">
        <article className="container article">
          <Reveal>
            <p className="post-meta" style={{ marginBottom: 24 }}>
              {post.date} · By <b>Admin</b>
            </p>
            <p>
              Great interiors are rarely about a single statement piece. They come from a series of small, deliberate decisions — the
              height of a shelf, the warmth of a bulb, the way a rug anchors a seating group. In this article we share the principles our
              studio returns to on every project.
            </p>
            <h2>Start with light</h2>
            <p>
              Before choosing a single finish, study how daylight travels through the room across the day. Layer ambient, task and accent
              lighting so the space works at 8am and 8pm alike. Concealed LED strips behind panelling or under joinery add depth without
              clutter.
            </p>
            <blockquote>“A room should feel calm before it feels impressive.”</blockquote>
            <h2>Edit, then edit again</h2>
            <p>
              Choose fewer, better pieces. Mix textures — boucle, timber, marble, linen — within a restrained palette so the eye has room
              to rest. Leave negative space around the elements you love most.
            </p>
            <h2>Design for real life</h2>
            <p>
              Storage, circulation and durable materials are what make a beautiful room livable. Plan them first and the styling becomes
              the fun part.
            </p>
          </Reveal>
        </article>
        <div className="container" style={{ marginTop: 80 }}>
          <h2 style={{ fontSize: 36, marginBottom: 30 }}>
            More <span className="gold">Articles</span>
          </h2>
          <div className="blog-grid">
            {more.map((p) => (
              <PostCard p={p} key={p.slug} />
            ))}
          </div>
          <p className="center-note">
            <Link to="/blog">View all articles</Link>
          </p>
        </div>
      </section>
    </>
  )
}
