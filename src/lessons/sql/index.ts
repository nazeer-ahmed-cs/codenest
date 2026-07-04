import IntroMdx, { frontmatter as introFm } from "./intro.mdx";
import SelectMdx, { frontmatter as selectFm } from "./select.mdx";
import FiltersMdx, { frontmatter as filtersFm } from "./filters.mdx";
import AggregationMdx, { frontmatter as aggregationFm } from "./aggregation.mdx";
import JoinsMdx, { frontmatter as joinsFm } from "./joins.mdx";
import NestedMdx, { frontmatter as nestedFm } from "./nested.mdx";
import ConstraintsMdx, { frontmatter as constraintsFm } from "./constraints.mdx";
import ModifyingMdx, { frontmatter as modifyingFm } from "./modifying.mdx";
import type { LessonEntry } from "@/lib/curriculum";

export const lessons: LessonEntry[] = [
  { ...(introFm as unknown as LessonEntry), Content: IntroMdx },
  { ...(selectFm as unknown as LessonEntry), Content: SelectMdx },
  { ...(filtersFm as unknown as LessonEntry), Content: FiltersMdx },
  { ...(aggregationFm as unknown as LessonEntry), Content: AggregationMdx },
  { ...(joinsFm as unknown as LessonEntry), Content: JoinsMdx },
  { ...(nestedFm as unknown as LessonEntry), Content: NestedMdx },
  { ...(constraintsFm as unknown as LessonEntry), Content: ConstraintsMdx },
  { ...(modifyingFm as unknown as LessonEntry), Content: ModifyingMdx },
];
