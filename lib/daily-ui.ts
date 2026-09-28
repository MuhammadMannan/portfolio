/*
  DAILY UI — add one entry per design.

  day:   the challenge number
  title: the challenge prompt
  image: file in /public/images/daily-ui/ (1600×1200 WebP works best)
  link:  optional — the post on Layers or Dribbble

  Every design shows on the site as soon as it's added here and pushed.
*/

export type Shot = {
  day: number;
  title: string;
  image: string;
  link?: string;
};

export const TOTAL_DAYS = 100;
const START = { year: 2026, month: 9, day: 28 };

export const shots: Shot[] = [
  { day: 1, title: "Sign up", image: "/images/daily-ui/day-001.webp" },
  { day: 2, title: "Credit card checkout", image: "/images/daily-ui/day-002.webp" },
  { day: 3, title: "Landing page", image: "/images/daily-ui/day-003.webp" },
  { day: 4, title: "Calculator", image: "/images/daily-ui/day-004.webp" },
  { day: 5, title: "App icon", image: "/images/daily-ui/day-005.webp" },
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
