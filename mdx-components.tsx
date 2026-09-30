import type { MDXComponents } from "mdx/types";
import { Callout, Figure, Stats } from "@/components/case-study/Figure";

const components: MDXComponents = {
  Figure,
  Callout,
  Stats,
};

export function useMDXComponents(overrides?: MDXComponents): MDXComponents {
  return { ...components, ...overrides };
}
