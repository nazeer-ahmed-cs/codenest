import HtmlDocMdx, { frontmatter as htmlDocFm } from "./html-document-structure.mdx";
import HtmlTextMdx, { frontmatter as htmlTextFm } from "./html-text-elements.mdx";
import HtmlElementsMdx, { frontmatter as htmlElementsFm } from "./html-elements.mdx";
import HtmlAttributesMdx, { frontmatter as htmlAttributesFm } from "./html-attributes.mdx";
import HtmlHeadingsMdx, { frontmatter as htmlHeadingsFm } from "./html-headings.mdx";
import HtmlFormsMdx, { frontmatter as htmlFormsFm } from "./html-forms.mdx";
import HtmlTablesMdx, { frontmatter as htmlTablesFm } from "./html-tables.mdx";
import HtmlLinksMdx, { frontmatter as htmlLinksFm } from "./html-links.mdx";
import HtmlImagesMdx, { frontmatter as htmlImagesFm } from "./html-images.mdx";
import HtmlMultimediaMdx, { frontmatter as htmlMultimediaFm } from "./html-multimedia.mdx";
import HtmlAccessibilityMdx, { frontmatter as htmlAccessibilityFm } from "./html-accessibility.mdx";
import HtmlMetaTagsMdx, { frontmatter as htmlMetaTagsFm } from "./html-meta-tags.mdx";
import HtmlEntitiesMdx, { frontmatter as htmlEntitiesFm } from "./html-entities.mdx";
import HtmlSemanticLandmarksMdx, { frontmatter as htmlSemanticLandmarksFm } from "./html-semantic-landmarks.mdx";
import HtmlEmbeddingMdx, { frontmatter as htmlEmbeddingFm } from "./html-embedding.mdx";
import HtmlListsDeepDiveMdx, { frontmatter as htmlListsDeepDiveFm } from "./html-lists-deep-dive.mdx";
import HtmlPathsMdx, { frontmatter as htmlPathsFm } from "./html-paths.mdx";
import HtmlCssIntegrationMdx, { frontmatter as htmlCssIntegrationFm } from "./html-css-integration.mdx";
import HtmlEmailLinksMdx, { frontmatter as htmlEmailLinksFm } from "./html-email-links.mdx";
import type { LessonEntry } from "@/lib/curriculum";

export const lessons: LessonEntry[] = [
  { ...(htmlDocFm as unknown as LessonEntry), Content: HtmlDocMdx },
  { ...(htmlTextFm as unknown as LessonEntry), Content: HtmlTextMdx },
  { ...(htmlElementsFm as unknown as LessonEntry), Content: HtmlElementsMdx },
  { ...(htmlAttributesFm as unknown as LessonEntry), Content: HtmlAttributesMdx },
  { ...(htmlHeadingsFm as unknown as LessonEntry), Content: HtmlHeadingsMdx },
  { ...(htmlFormsFm as unknown as LessonEntry), Content: HtmlFormsMdx },
  { ...(htmlTablesFm as unknown as LessonEntry), Content: HtmlTablesMdx },
  { ...(htmlLinksFm as unknown as LessonEntry), Content: HtmlLinksMdx },
  { ...(htmlImagesFm as unknown as LessonEntry), Content: HtmlImagesMdx },
  { ...(htmlMultimediaFm as unknown as LessonEntry), Content: HtmlMultimediaMdx },
  { ...(htmlAccessibilityFm as unknown as LessonEntry), Content: HtmlAccessibilityMdx },
  { ...(htmlMetaTagsFm as unknown as LessonEntry), Content: HtmlMetaTagsMdx },
  { ...(htmlEntitiesFm as unknown as LessonEntry), Content: HtmlEntitiesMdx },
  { ...(htmlSemanticLandmarksFm as unknown as LessonEntry), Content: HtmlSemanticLandmarksMdx },
  { ...(htmlEmbeddingFm as unknown as LessonEntry), Content: HtmlEmbeddingMdx },
  { ...(htmlListsDeepDiveFm as unknown as LessonEntry), Content: HtmlListsDeepDiveMdx },
  { ...(htmlPathsFm as unknown as LessonEntry), Content: HtmlPathsMdx },
  { ...(htmlCssIntegrationFm as unknown as LessonEntry), Content: HtmlCssIntegrationMdx },
  { ...(htmlEmailLinksFm as unknown as LessonEntry), Content: HtmlEmailLinksMdx },
];
