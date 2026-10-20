import Newsletter from '../components/Newsletter'
import {
  BlogPreview,
  CTA,
  Clients,
  Gallery,
  Hero,
  HouseBand,
  Panorama,
  Process,
  ProjectsCarousel,
  ServicesShowcase,
  Stats,
  TeamShowcase,
  Testimonials,
  WhereSpaces,
  WhoWeAre,
} from '../sections/HomeSections'

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <WhereSpaces />
      <ServicesShowcase />
      <Stats />
      <Process />
      <ProjectsCarousel />
      <HouseBand />
      <Testimonials />
      <Clients />
      <Panorama />
      <TeamShowcase />
      <CTA />
      <BlogPreview />
      <Gallery />
      <Newsletter />
    </>
  )
}
