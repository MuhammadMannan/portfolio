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
    timeline: "[X weeks]",
    tools: "IBM Bob (designed in code), React, Carbon Design System, IBM Granite, Ollama",
    published: false,
    Content: MboTracker,
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
