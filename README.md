# InteriorX

Multi-page interior design studio website built with **React + Vite + TypeScript**, animated with **Framer Motion** and **Lenis** smooth scrolling. Deployed on Vercel.

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, who we are, services, stats, process, projects carousel, testimonials, 360° panorama, team, CTA, blog, gallery, newsletter |
| `/about` | Story, values, timeline, stats, testimonials |
| `/services` | Each service in detail + process |
| `/portfolio` | Filterable project grid |
| `/team` | Designer cards |
| `/blog`, `/blog/:slug` | Article list and article page |
| `/contact` | Contact details, quote form, map |

## Motion

Preloader, page transitions, word-by-word heading reveals, clip-path image reveals, parallax hero/backgrounds, scroll-linked watermark text, count-up stats, magnetic buttons, custom cursor, draggable projects carousel, auto-rotating testimonials, logo marquee, draggable 360° panorama, scroll progress bar. Motion respects `prefers-reduced-motion` for smooth scrolling and the marquee.

## Images

All photos live in `public/images`. Replace any file with a new one of the same name to swap it.

- `scripts/prepare_photos.py` — optimises the supplied photos into `public/images`.
- `scripts/extract_cutouts.py` — cuts the floor plan, house and designer portrait out of the design mockup and removes their backgrounds (ISNet model via onnxruntime).

## Develop

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # outputs dist/
```
