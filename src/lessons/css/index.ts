import CssSelectorsMdx, { frontmatter as cssSelectorsFm } from "./css-selectors.mdx";
import CssBoxModelMdx, { frontmatter as cssBoxModelFm } from "./css-box-model.mdx";
import CssColorsMdx, { frontmatter as cssColorsFm } from "./css-colors.mdx";
import CssBackgroundsMdx, { frontmatter as cssBackgroundsFm } from "./css-backgrounds.mdx";
import CssFlexboxMdx, { frontmatter as cssFlexboxFm } from "./css-flexbox.mdx";
import CssGridMdx, { frontmatter as cssGridFm } from "./css-grid.mdx";
import CssPositioningMdx, { frontmatter as cssPositioningFm } from "./css-positioning.mdx";
import CssResponsiveMdx, { frontmatter as cssResponsiveFm } from "./css-responsive.mdx";
import CssTypographyMdx, { frontmatter as cssTypographyFm } from "./css-typography.mdx";
import CssTransitionsAnimationsMdx, { frontmatter as cssTransitionsAnimationsFm } from "./css-transitions-animations.mdx";
import type { LessonEntry } from "@/lib/curriculum";

export const lessons: LessonEntry[] = [
  { ...(cssSelectorsFm as unknown as LessonEntry), Content: CssSelectorsMdx },
  { ...(cssBoxModelFm as unknown as LessonEntry), Content: CssBoxModelMdx },
  { ...(cssColorsFm as unknown as LessonEntry), Content: CssColorsMdx },
  { ...(cssBackgroundsFm as unknown as LessonEntry), Content: CssBackgroundsMdx },
  { ...(cssFlexboxFm as unknown as LessonEntry), Content: CssFlexboxMdx },
  { ...(cssGridFm as unknown as LessonEntry), Content: CssGridMdx },
  { ...(cssPositioningFm as unknown as LessonEntry), Content: CssPositioningMdx },
  { ...(cssResponsiveFm as unknown as LessonEntry), Content: CssResponsiveMdx },
  { ...(cssTypographyFm as unknown as LessonEntry), Content: CssTypographyMdx },
  { ...(cssTransitionsAnimationsFm as unknown as LessonEntry), Content: CssTransitionsAnimationsMdx },
];
