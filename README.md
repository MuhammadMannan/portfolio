# muhammadmannan — portfolio

A plain HTML/CSS/JS site. No build step, so Vercel serves it as-is.

## Add a Daily UI design
1. Export the design from Figma as PNG (1600×1200 works best).
2. Convert it to WebP and save it as `images/daily-ui/day-005.webp` (three-digit day number).
3. Add one line to `daily-ui.js`:
   ```js
   { day: 5, title: 'App icon', image: '/images/daily-ui/day-005.webp', link: 'https://layers.to/…' },
   ```
4. Commit and push. Vercel redeploys automatically.

Dates are worked out from the day number (Day 1 = Sep 28, 2026). A design stays hidden until its date, so you can add several ahead of time.

## Preview locally
```
python3 -m http.server 8000
```
Then open http://localhost:8000.

## Files
- `index.html`: the page
- `styles.css`: dark and light themes are the tokens at the top
- `daily-ui.js`: the list of Daily UI designs
- `main.js`: theme toggle and the Daily UI grid
- `images/`: the portrait, the social preview image, and Daily UI shots
