import VariablesMdx, { frontmatter as variablesFm } from "./variables.mdx";
import FunctionsMdx, { frontmatter as functionsFm } from "./functions.mdx";
import JsIntroMdx, { frontmatter as jsIntroFm } from "./js-intro.mdx";
import type { LessonEntry } from "@/lib/curriculum";

export const lessons: LessonEntry[] = [
  { ...(variablesFm as unknown as LessonEntry), Content: VariablesMdx },
  { ...(functionsFm as unknown as LessonEntry), Content: FunctionsMdx },
  { ...(jsIntroFm as unknown as LessonEntry), Content: JsIntroMdx },
];
