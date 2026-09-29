# Muhammad Mannan — portfolio

Next.js (App Router) + Motion, deployed on Vercel. Every push to `main` goes live automatically.

## Run it locally
```
npm install
npm run dev
```
Then open http://localhost:3000. Draft case studies only show up here, never on the live site.

## Add a Daily UI design
1. Export the frame from Figma as PNG at 1600×1200, convert it to WebP, and save it as `public/images/daily-ui/day-005.webp`.
2. Add one line to `lib/daily-ui.ts`:
   ```ts
   { day: 5, title: "App icon", image: "/images/daily-ui/day-005.webp", caption: "One or two sentences about the design." },
   ```
3. Push. The design shows up on the site as soon as the deploy finishes. The caption appears when someone opens the design.

## Add a case study
1. Copy `content/work/_template.mdx` to `content/work/<slug>.mdx` and write it.
2. Put its images in `public/images/work/<slug>/` and use them with `<Figure src="..." width={1600} height={1000} caption="..." />`.
3. Import it in `content/work/index.ts` and add an entry. Set `published: true` when it's ready.

The "Selected work" section, the nav link and section numbering update themselves.

## Where things live
- `app/page.tsx`: the home page
- `app/work/[slug]/page.tsx`: the case study page layout
- `app/globals.css`: all styles; dark and light themes are the tokens at the top
- `components/`: the hero, Daily UI grid and viewer, scroll reveals, nav, theme switch
- `lib/daily-ui.ts`: the Daily UI list
- `content/work/`: case studies
