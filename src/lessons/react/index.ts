import ComponentsMdx, { frontmatter as componentsFm } from "./components.mdx";
import StateHooksMdx, { frontmatter as stateHooksFm } from "./state-hooks.mdx";
import type { LessonEntry } from "@/lib/curriculum";

export const lessons: LessonEntry[] = [
  { ...(componentsFm as unknown as LessonEntry), Content: ComponentsMdx },
  { ...(stateHooksFm as unknown as LessonEntry), Content: StateHooksMdx },
];
