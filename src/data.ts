const img = (name: string) => `/images/${name}`

export const images = {
  hero: img('hero.jpg'),
  heroCard: img('project-5.jpg'),
  about: img('about.jpg'),
  floorplan: img('floorplan.png'),
  house: img('house.png'),
  designer: img('designer.jpg'),
  testimonial: img('service-residential.jpg'),
  panorama: img('panorama.jpg'),
  cta: img('cta.jpg'),
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Team', to: '/team' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact Us', to: '/contact' },
]

export const contact = {
  phone: '+(480) 123 678 900',
  phoneAlt: '+(084) 456-0789',
  email: 'support@interiorx.studio',
  address: '5609 E Sprague Ave, Spokane Valley, WA 99212, USA',
}

export const pillars = [
  {
    title: 'Architectural Design',
    text: "Dream it, we'll design it! From big picture layouts to the tiniest details, our architectural magic brings your ideas to life with creativity and precision.",
  },
  {
    title: 'Interior Design & Planning',
    text: 'Make your space shine! Our team creates inviting, beautiful interiors that reflect your style and make every room a favorite place to be.',
  },
  {
    title: 'Consulting Services',
    text: 'Consider us your design whisperers! We provide expert advice to help your project sparkle with creativity, efficiency, and spot-on solutions.',
  },
  {
    title: 'Project Management',
    text: 'We handle the hustle! From start to finish, we keep your project on track, on budget, and stress-free so you can sit back and watch the magic happen.',
  },
]

export const services = [
  {
    slug: 'residential',
    title: 'Residential Interior Design',
    blurb: 'Tailored design services for private homes, including room makeovers and complete home transformations.',
    image: img('service-residential.jpg'),
  },
  {
    slug: 'commercial',
    title: 'Commercial Interior Design',
    blurb: 'Workspaces, retail and hospitality interiors that elevate your brand and the people who use them.',
    image: img('service-commercial.jpg'),
  },
  {
    slug: 'consultation',
    title: 'Interior Design Consultation',
    blurb: 'Focused sessions to sharpen your vision — palettes, layouts, materials and lighting strategy.',
    image: img('service-consultation.jpg'),
  },
  {
    slug: 'outdoor',
    title: 'Outdoor & Landscape Design',
    blurb: 'Terraces, courtyards and gardens that extend your living space beautifully into the open air.',
    image: img('service-outdoor.jpg'),
  },
  {
    slug: 'renovation',
    title: 'Renovation And Remodeling',
    blurb: 'Structural upgrades and full remodels managed end-to-end, with craftsmanship you can feel.',
    image: img('service-renovation.jpg'),
  },
]

export const stats = [
  { value: 12, suffix: '', label: 'Years Experience', text: 'Improving homes with expert craftsmanship for years', display: '2013' },
  { value: 190, suffix: '+', label: 'Projects Completed', text: 'Over 190 successful projects delivered with quality and care' },
  { value: 260, suffix: '+', label: 'Skilled Tradespeople', text: 'Our team of experts ensures top-quality results' },
  { value: 328, suffix: '+', label: 'Client Satisfaction', text: 'All of our clients are satisfied with our work and service' },
]

export const process = [
  { title: 'Initial Consultation', text: 'We begin by understanding your vision, goals, and needs.', image: img('about.jpg') },
  { title: 'Design & Planning', text: 'Our team creates detailed designs that reflect your requirements.', image: img('service-outdoor.jpg') },
  { title: 'Implementation', text: 'With carefully selected contractors, we manage every phase.', image: img('cta.jpg') },
  { title: 'Project Handover', text: 'Upon completion, we conduct a thorough review, making sure all details.', image: img('service-residential.jpg') },
]

export const projects = [
  { title: 'Luxury Skyline', location: 'Dubai, UAE', year: 2025, tags: ['Residential', 'Kitchen'], image: img('project-1.jpg') },
  { title: 'Bohemian Rhapsody', location: 'Bali, Indonesia', year: 2025, tags: ['Residential', 'Villa'], image: img('project-2.jpg') },
  { title: 'Vintage Glamour', location: 'Berlin, Germany', year: 2025, tags: ['Residential', 'Apartment'], image: img('project-3.jpg') },
  { title: 'Living Innovation', location: 'Lagos, Nigeria', year: 2024, tags: ['Residential', 'Single Home'], image: img('project-4.jpg') },
  { title: 'Golden Corridor', location: 'Abuja, Nigeria', year: 2024, tags: ['Residential', 'Hallway'], image: img('project-5.jpg') },
  { title: 'Monochrome Suite', location: 'London, UK', year: 2024, tags: ['Commercial', 'Showroom'], image: img('service-commercial.jpg') },
  { title: 'Serene Minimalism', location: 'Paris, France', year: 2023, tags: ['Commercial', 'Gallery'], image: img('service-consultation.jpg') },
  { title: 'Oasis Atrium', location: 'Miami, USA', year: 2023, tags: ['Commercial', 'Hospitality'], image: img('panorama.jpg') },
]

export const testimonials = [
  {
    quote:
      'I absolutely love my the new modern living room! The clean lines, a neutral tones, and minimalist interior create such a calming & stylish atmosphere. Highly recommend their modern interior design services!',
    name: 'Morgan Dufresne',
    role: 'Company owner',
  },
  {
    quote:
      'From the first sketch to the final styling, the team was meticulous. Our office now feels like a boutique hotel — clients comment on it every single day.',
    name: 'Elena Marquez',
    role: 'Creative director',
  },
  {
    quote:
      'They listened, refined and delivered on budget. Our kitchen remodel is warm, practical and honestly the best investment we have made in our home.',
    name: 'David Okafor',
    role: 'Homeowner',
  },
]

export const clients = ['Architect', 'Trend', 'Interior', 'Building', 'Real Estate', 'Construct']

export type Member = { name: string; role: string; photo?: string }

export const team: Member[] = [
  { name: 'Amanda Jones', role: 'Lead Interior Designer', photo: img('designer.jpg') },
  { name: 'Mark Jackson', role: 'Exhibition Designer' },
  { name: 'Valeria Novikova', role: 'Production Designer' },
  { name: 'Alex Podzemsky', role: 'Interior Decorator' },
  { name: 'Helen Reeves', role: 'Lighting Designer' },
]

export const posts = [
  {
    slug: 'extra-space-small-homes',
    title: 'Four Ways For Creating Extra Space In Small Homes',
    tag: 'Exteriors',
    date: 'May 25, 2025',
    image: img('blog-1.jpg'),
    excerpt: 'Modest, recently established interior design company that seeks to address a variety of topics, including clever storage and light.',
  },
  {
    slug: 'timeless-furniture',
    title: 'Timeless Furniture Pieces Every Home Needs',
    tag: 'Lifestyle',
    date: 'May 25, 2025',
    image: img('blog-2.jpg'),
    excerpt: 'Modest, recently established interior design company that seeks to address a variety of topics, including investment pieces.',
  },
  {
    slug: 'buying-furniture',
    title: 'How Does One Go About Buying Furniture?',
    tag: 'Tips & Trick',
    date: 'May 25, 2025',
    image: img('blog-3.jpg'),
    excerpt: 'Modest, recently established interior design company that seeks to address a variety of topics, including scale and materials.',
  },
]

export const gallery = [
  'about.jpg',
  'blog-3.jpg',
  'service-residential.jpg',
  'project-3.jpg',
  'service-outdoor.jpg',
  'blog-2.jpg',
  'cta.jpg',
  'project-4.jpg',
].map(img)
