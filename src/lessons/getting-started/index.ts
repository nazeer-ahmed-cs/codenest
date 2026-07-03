import WelcomeMdx, { frontmatter as welcomeFm } from "./welcome.mdx";
import SetupMdx, { frontmatter as setupFm } from "./setup.mdx";
import type { LessonEntry } from "@/lib/curriculum";

export const lessons: LessonEntry[] = [
  { ...(welcomeFm as unknown as LessonEntry), Content: WelcomeMdx },
  { ...(setupFm as unknown as LessonEntry), Content: SetupMdx },
];
