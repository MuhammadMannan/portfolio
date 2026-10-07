import type { MDXComponents } from "mdx/types";
import { Callout, Compare, Figure, Stats } from "@/components/case-study/Figure";

const components: MDXComponents = {
  Figure,
  Compare,
  Callout,
  Stats,
};

export function useMDXComponents(overrides?: MDXComponents): MDXComponents {
  return { ...components, ...overrides };
}
