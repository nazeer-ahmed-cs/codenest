import IntroMdx, { frontmatter as introFm } from "./intro.mdx";
import DataTypesMdx, { frontmatter as dataTypesFm } from "./data-types.mdx";
import ListsMdx, { frontmatter as listsFm } from "./lists.mdx";
import DictsMdx, { frontmatter as dictsFm } from "./dicts.mdx";
import ControlFlowMdx, { frontmatter as controlFlowFm } from "./control-flow.mdx";
import FunctionsMdx, { frontmatter as functionsFm } from "./functions.mdx";
import ModulesMdx, { frontmatter as modulesFm } from "./modules.mdx";
import FileIoMdx, { frontmatter as fileIoFm } from "./file-io.mdx";
import type { LessonEntry } from "@/lib/curriculum";

export const lessons: LessonEntry[] = [
  { ...(introFm as unknown as LessonEntry), Content: IntroMdx },
  { ...(dataTypesFm as unknown as LessonEntry), Content: DataTypesMdx },
  { ...(listsFm as unknown as LessonEntry), Content: ListsMdx },
  { ...(dictsFm as unknown as LessonEntry), Content: DictsMdx },
  { ...(controlFlowFm as unknown as LessonEntry), Content: ControlFlowMdx },
  { ...(functionsFm as unknown as LessonEntry), Content: FunctionsMdx },
  { ...(modulesFm as unknown as LessonEntry), Content: ModulesMdx },
  { ...(fileIoFm as unknown as LessonEntry), Content: FileIoMdx },
];
