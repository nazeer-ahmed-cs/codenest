import WelcomeMdx, { frontmatter as welcomeFm } from "@/lessons/welcome.mdx";
import SetupMdx, { frontmatter as setupFm } from "@/lessons/setup.mdx";
import HtmlDocMdx, { frontmatter as htmlDocFm } from "@/lessons/html-document-structure.mdx";
import HtmlTextMdx, { frontmatter as htmlTextFm } from "@/lessons/html-text-elements.mdx";
import HtmlElementsMdx, { frontmatter as htmlElementsFm } from "@/lessons/html-elements.mdx";
import HtmlAttributesMdx, { frontmatter as htmlAttributesFm } from "@/lessons/html-attributes.mdx";
import HtmlHeadingsMdx, { frontmatter as htmlHeadingsFm } from "@/lessons/html-headings.mdx";
import HtmlFormsMdx, { frontmatter as htmlFormsFm } from "@/lessons/html-forms.mdx";
import HtmlTablesMdx, { frontmatter as htmlTablesFm } from "@/lessons/html-tables.mdx";
import HtmlLinksMdx, { frontmatter as htmlLinksFm } from "@/lessons/html-links.mdx";
import HtmlImagesMdx, { frontmatter as htmlImagesFm } from "@/lessons/html-images.mdx";
import HtmlMultimediaMdx, { frontmatter as htmlMultimediaFm } from "@/lessons/html-multimedia.mdx";
import HtmlAccessibilityMdx, { frontmatter as htmlAccessibilityFm } from "@/lessons/html-accessibility.mdx";
import HtmlMetaTagsMdx, { frontmatter as htmlMetaTagsFm } from "@/lessons/html-meta-tags.mdx";
import HtmlEntitiesMdx, { frontmatter as htmlEntitiesFm } from "@/lessons/html-entities.mdx";
import HtmlSemanticLandmarksMdx, { frontmatter as htmlSemanticLandmarksFm } from "@/lessons/html-semantic-landmarks.mdx";
import HtmlEmbeddingMdx, { frontmatter as htmlEmbeddingFm } from "@/lessons/html-embedding.mdx";
import HtmlListsDeepDiveMdx, { frontmatter as htmlListsDeepDiveFm } from "@/lessons/html-lists-deep-dive.mdx";
import HtmlPathsMdx, { frontmatter as htmlPathsFm } from "@/lessons/html-paths.mdx";
import HtmlCssIntegrationMdx, { frontmatter as htmlCssIntegrationFm } from "@/lessons/html-css-integration.mdx";
import HtmlEmailLinksMdx, { frontmatter as htmlEmailLinksFm } from "@/lessons/html-email-links.mdx";
import VariablesMdx, { frontmatter as variablesFm } from "@/lessons/variables.mdx";
import FunctionsMdx, { frontmatter as functionsFm } from "@/lessons/functions.mdx";
import ComponentsMdx, { frontmatter as componentsFm } from "@/lessons/components.mdx";
import StateHooksMdx, { frontmatter as stateHooksFm } from "@/lessons/state-hooks.mdx";

export type LessonFrontmatter = {
  title: string;
  slug: string;
  order: number;
  topic: string;
  description: string;
  nextSlug?: string;
  prevSlug?: string;
};

type RawLesson = LessonFrontmatter & { Content: typeof WelcomeMdx };

const rawLessons: RawLesson[] = [
  { ...(welcomeFm as unknown as LessonFrontmatter), Content: WelcomeMdx },
  { ...(setupFm as unknown as LessonFrontmatter), Content: SetupMdx },
  { ...(htmlDocFm as unknown as LessonFrontmatter), Content: HtmlDocMdx },
  { ...(htmlTextFm as unknown as LessonFrontmatter), Content: HtmlTextMdx },
  { ...(htmlElementsFm as unknown as LessonFrontmatter), Content: HtmlElementsMdx },
  { ...(htmlAttributesFm as unknown as LessonFrontmatter), Content: HtmlAttributesMdx },
  { ...(htmlHeadingsFm as unknown as LessonFrontmatter), Content: HtmlHeadingsMdx },
  { ...(htmlFormsFm as unknown as LessonFrontmatter), Content: HtmlFormsMdx },
  { ...(htmlTablesFm as unknown as LessonFrontmatter), Content: HtmlTablesMdx },
  { ...(htmlLinksFm as unknown as LessonFrontmatter), Content: HtmlLinksMdx },
  { ...(htmlImagesFm as unknown as LessonFrontmatter), Content: HtmlImagesMdx },
  { ...(htmlMultimediaFm as unknown as LessonFrontmatter), Content: HtmlMultimediaMdx },
  { ...(htmlAccessibilityFm as unknown as LessonFrontmatter), Content: HtmlAccessibilityMdx },
  { ...(htmlMetaTagsFm as unknown as LessonFrontmatter), Content: HtmlMetaTagsMdx },
  { ...(htmlEntitiesFm as unknown as LessonFrontmatter), Content: HtmlEntitiesMdx },
  { ...(htmlSemanticLandmarksFm as unknown as LessonFrontmatter), Content: HtmlSemanticLandmarksMdx },
  { ...(htmlEmbeddingFm as unknown as LessonFrontmatter), Content: HtmlEmbeddingMdx },
  { ...(htmlListsDeepDiveFm as unknown as LessonFrontmatter), Content: HtmlListsDeepDiveMdx },
  { ...(htmlPathsFm as unknown as LessonFrontmatter), Content: HtmlPathsMdx },
  { ...(htmlCssIntegrationFm as unknown as LessonFrontmatter), Content: HtmlCssIntegrationMdx },
  { ...(htmlEmailLinksFm as unknown as LessonFrontmatter), Content: HtmlEmailLinksMdx },
  { ...(variablesFm as unknown as LessonFrontmatter), Content: VariablesMdx },
  { ...(functionsFm as unknown as LessonFrontmatter), Content: FunctionsMdx },
  { ...(componentsFm as unknown as LessonFrontmatter), Content: ComponentsMdx },
  { ...(stateHooksFm as unknown as LessonFrontmatter), Content: StateHooksMdx },
];

rawLessons.sort((a, b) => {
  if (a.topic !== b.topic) return a.topic.localeCompare(b.topic);
  return a.order - b.order;
});

for (let i = 0; i < rawLessons.length; i++) {
  if (i > 0) rawLessons[i].prevSlug = rawLessons[i - 1].slug;
  if (i < rawLessons.length - 1) rawLessons[i].nextSlug = rawLessons[i + 1].slug;
}

export type LessonMeta = { title: string; slug: string };
export type Topic = { title: string; lessons: LessonMeta[] };

const topicsMap = new Map<string, LessonMeta[]>();
for (const lesson of rawLessons) {
  const list = topicsMap.get(lesson.topic) ?? [];
  list.push({ title: lesson.title, slug: lesson.slug });
  topicsMap.set(lesson.topic, list);
}

export const topics: Topic[] = Array.from(topicsMap.entries()).map(
  ([title, lessons]) => ({ title, lessons })
);

export const lessonsMap: Record<string, { title: string; Content: typeof WelcomeMdx; frontmatter: LessonFrontmatter }> =
  Object.fromEntries(
    rawLessons.map((l) => [
      l.slug,
      { title: l.title, Content: l.Content, frontmatter: l },
    ])
  );

export const allSlugs = Object.keys(lessonsMap);

export type SearchItem = {
  title: string;
  slug: string;
  topic: string;
  description: string;
};

export const searchIndex: SearchItem[] = rawLessons
  .filter((l) => l.slug !== "hello-world")
  .map((l) => ({
    title: l.title,
    slug: l.slug,
    topic: l.topic,
    description: l.description,
  }));
