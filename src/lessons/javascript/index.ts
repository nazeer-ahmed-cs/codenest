import VariablesMdx, { frontmatter as variablesFm } from "./variables.mdx";
import FunctionsMdx, { frontmatter as functionsFm } from "./functions.mdx";
import ConditionalsMdx, { frontmatter as conditionalsFm } from "./conditionals.mdx";
import LoopsMdx, { frontmatter as loopsFm } from "./loops.mdx";
import ArraysMdx, { frontmatter as arraysFm } from "./arrays.mdx";
import ObjectsMdx, { frontmatter as objectsFm } from "./objects.mdx";
import DomBasicsMdx, { frontmatter as domBasicsFm } from "./dom-basics.mdx";
import EventsMdx, { frontmatter as eventsFm } from "./events.mdx";
import type { LessonEntry } from "@/lib/curriculum";

export const lessons: LessonEntry[] = [
  { ...(variablesFm as unknown as LessonEntry), Content: VariablesMdx },
  { ...(functionsFm as unknown as LessonEntry), Content: FunctionsMdx },
  { ...(conditionalsFm as unknown as LessonEntry), Content: ConditionalsMdx },
  { ...(loopsFm as unknown as LessonEntry), Content: LoopsMdx },
  { ...(arraysFm as unknown as LessonEntry), Content: ArraysMdx },
  { ...(objectsFm as unknown as LessonEntry), Content: ObjectsMdx },
  { ...(domBasicsFm as unknown as LessonEntry), Content: DomBasicsMdx },
  { ...(eventsFm as unknown as LessonEntry), Content: EventsMdx },
];
