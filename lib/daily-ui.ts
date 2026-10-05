/*
  DAILY UI — add one entry per design.

  day:   the challenge number
  title: the challenge prompt
  image:   file in /public/images/daily-ui/ (1600×1200 WebP works best)
  caption: optional — a sentence or two shown when someone opens the design
  link:    optional — the post on Layers or Dribbble

  Every design shows on the site as soon as it's added here and pushed.
*/

export type Shot = {
  day: number;
  title: string;
  image: string;
  caption?: string;
  link?: string;
};

export const TOTAL_DAYS = 100;
const START = { year: 2026, month: 9, day: 28 };

export const shots: Shot[] = [
  {
    day: 1,
    title: "Sign up",
    image: "/images/daily-ui/day-001.webp",
    caption:
      "Sign-up and sign-in built from one shared layout, so returning users recognize the form straight away. Monospace type and a dotted grid give it a developer-tool feel.",
  },
  {
    day: 2,
    title: "Credit card checkout",
    image: "/images/daily-ui/day-002.webp",
    caption:
      "A mobile checkout that leads with the total, previews the card as it's filled in, and keeps the form to four fields with one clear Pay Now button.",
  },
  {
    day: 3,
    title: "Landing page",
    image: "/images/daily-ui/day-003.webp",
    caption:
      "A concept landing page for CMF Buds Pro 2. The dot-matrix type carries over from the brand into the key specs, so the product and its numbers do the talking.",
  },
  {
    day: 4,
    title: "Calculator",
    image: "/images/daily-ui/day-004.webp",
    caption:
      "Two states of one calculator: the result, and an operator selected mid-calculation, shown by the inverted × key. A running history keeps earlier sums in view.",
  },
  {
    day: 5,
    title: "App icon",
    image: "/images/daily-ui/day-005.webp",
    caption:
      "A single bold mark on a white tile, with a warm orange-to-red gradient running through the icon and the background behind it.",
  },
  {
    day: 6,
    title: "User profile",
    image: "/images/daily-ui/day-006.webp",
    caption:
      "A colleague profile for a company directory: contact actions up front, then tabs for overview, projects and org, with skills, current work and badges below.",
  },
  {
    day: 7,
    title: "Settings",
    image: "/images/daily-ui/day-007-v2.webp",
    caption:
      "Appearance settings for Pebble, a desktop app. A live preview shows each change as you make it, and an unsaved-changes badge beside Save makes clear nothing applies until you confirm.",
  },
  {
    day: 8,
    title: "404 page",
    image: "/images/daily-ui/day-008.webp",
    caption:
      "A 404 page that turns being lost into a sailing theme, with a dotted route drifting off the map. One clear way back home, plus a link to report the broken page.",
  },
  {
    day: 9,
    title: "Music player",
    image: "/images/daily-ui/day-009.webp",
    caption:
      "A dark now-playing screen where the album art sets the mood. The next and previous albums peek in at the edges, and every control sits in one panel within thumb reach.",
  },
  {
    day: 10,
    title: "Share sheet",
    image: "/images/daily-ui/day-010.webp",
    caption:
      "A playful mobile share sheet that puts the people you share with most up front, keeps Copy link one tap away, and confirms with a quick toast once the link is on your clipboard.",
  },
];

/** Local midnight on the day this design goes live. */
export function dateFor(day: number): Date {
  return new Date(START.year, START.month - 1, START.day + day - 1);
}

/** Every design added so far, newest first. */
export function liveShots(_now?: Date): Shot[] {
  return [...shots].sort((a, b) => b.day - a.day);
}

export const pad = (n: number) => String(n).padStart(3, "0");

export const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

export const startLabel = formatDate(dateFor(1));
