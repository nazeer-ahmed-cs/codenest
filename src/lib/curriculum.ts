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
