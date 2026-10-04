/*
  CASE STUDIES

  To add one:
  1. Copy _template.mdx to a new file, e.g. budget-app.mdx, and write it.
  2. Put its images in /public/images/work/<slug>/.
  3. Import it below and add an entry to `caseStudies`.
  4. Set published: true when it's ready. Drafts only show up when you run
     the site locally (npm run dev), never on the live site.

  The "Selected work" section and the nav link appear automatically once
  at least one case study is published.
*/
import type { ComponentType } from "react";
import Template from "./_template.mdx";
import MboTracker from "./mbo-tracker.mdx";
import Mise from "./mise.mdx";
import DayFlow from "./dayflow.mdx";

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  cover?: string;
  role: string;
  timeline: string;
  tools: string;
  published: boolean;
  Content: ComponentType;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "mbo-tracker",
    title: "MBO Tracker",
    category: "Desktop app · AI · Design system",
    summary: "One consistent, AI-assisted way for sales teams to track, forecast and get coached on their MBOs, with a guided setup that gets non-technical users running local AI.",
    role: "Solo designer and developer",
    timeline: "2.5 weeks, plus ongoing updates",
    cover: "/images/work/mbo-tracker/01-cover-dashboard.webp",
    tools: "IBM Bob (designed in code), React, Carbon Design System, IBM Granite, Ollama",
    published: true,
    Content: MboTracker,
  },
  {
    slug: "mise",
    title: "Mise",
    category: "Mobile app · UX redesign · Information architecture",
    summary: "A redesign of a pantry-first cooking app so people can decide what to cook, add what they bought and cook with messy hands, without hunting through the interface.",
    role: "Freelance UI/UX designer",
    timeline: "Sep 2026 – present",
    cover: "/images/work/mise/01-cover.webp",
    tools: "Figma, WCAG contrast checks, Expo / React Native codebase",
    published: true,
    Content: Mise,
  },
  {
    slug: "dayflow",
    title: "DayFlow",
    category: "Mobile app · UX redesign · Flutter",
    summary: "A redesign and rebuild of my own day planner, so unfinished tasks carry forward, the phone's calendar sits beside them, and a forgiving streak keeps people coming back.",
    role: "Designer and developer (personal project)",
    timeline: "Oct 2026",
    cover: "/images/work/dayflow/01-cover.webp",
    tools: "Figma (variables, light and dark modes), Flutter, Firebase, iOS EventKit",
    published: true,
    Content: DayFlow,
  },
  {
    slug: "template",
    title: "[Project title]",
    category: "[Mobile app · UX research]",
    summary: "[One or two sentences: who it was for, what problem it solved, and what changed because of the design.]",
    role: "[UX research, UI design]",
    timeline: "[6 weeks]",
    tools: "[Figma, FigJam]",
    published: false,
    Content: Template,
  },
];

const isDev = process.env.NODE_ENV === "development";

/** Published case studies, plus drafts when running locally. */
export function visibleCaseStudies(): CaseStudy[] {
  return caseStudies.filter((c) => c.published || isDev);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return visibleCaseStudies().find((c) => c.slug === slug);
}
