declare module "*.mdx" {
  import type { Element } from "mdx/types";
  const content: (props: Record<string, unknown>) => Element;
  export default content;
  export const title: string;
}
