# SHD · Beyond the Interface

Portfolio of Shahzada Shaheryar Durrani. Next.js 16 (App Router), Tailwind 4, React Three Fiber, GSAP ScrollTrigger, Lenis and Motion. Fully static, no database.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (lint: npm run lint)
```

## Updating content

All copy lives in `src/data/`:

| File | What it holds |
|---|---|
| `profile.ts` | Name, contact, intro, resume path, social links (empty until you add LinkedIn / GitHub) |
| `experience.ts` | Roles, responsibilities, stacks, education |
| `skills.ts` | Skill groups and the "where it was used" notes |
| `projects.ts` | Every project; `featured: true` puts it in the showcase, the rest go to the archive |

Colours, fonts and easing are tokens at the top of `src/app/globals.css`.

## Images

Source material stays in the parent folder (`../Figma`, `../Portals`, `../Websites`). After adding or changing screenshots, map the folder to a slug in `scripts/optimize-images.mjs` and run:

```bash
npm run images
```

It writes resized WebP files to `public/projects/<slug>/` and `src/data/media.generated.json`.

## Contact form

There is no backend, so the form validates and then opens the visitor's email app with the message prefilled. To receive messages in an inbox directly, swap `onSubmit` in `src/components/sections/ContactForm.tsx` for a form service or a route handler.

## Deploy (Vercel)

Import the repo and set **Root Directory** to `shd-portfolio`. Set `NEXT_PUBLIC_SITE_URL` to the final domain for canonical Open Graph URLs and the sitemap.
