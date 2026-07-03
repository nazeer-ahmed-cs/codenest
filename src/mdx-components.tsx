import type { MDXComponents } from "mdx/types";
import TryIt from "@/components/TryIt";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    TryIt,
  };
}
