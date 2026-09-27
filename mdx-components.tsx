import type { MDXComponents } from "mdx/types";
import { Callout, Figure } from "@/components/case-study/Figure";

const components: MDXComponents = {
  Figure,
  Callout,
};

export function useMDXComponents(overrides?: MDXComponents): MDXComponents {
  return { ...components, ...overrides };
}
