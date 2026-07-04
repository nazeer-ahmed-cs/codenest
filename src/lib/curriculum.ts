import { lessons as gettingStarted } from "@/lessons/getting-started";
import { lessons as html } from "@/lessons/html";
import { lessons as css } from "@/lessons/css";
import { lessons as javascript } from "@/lessons/javascript";
import { lessons as react } from "@/lessons/react";
import { lessons as python } from "@/lessons/python";
import { lessons as sql } from "@/lessons/sql";

export type LessonFrontmatter = {
  title: string;
  slug: string;
  order: number;
  topic: string;
  description: string;
  nextSlug?: string;
  prevSlug?: string;
};

export type LessonEntry = LessonFrontmatter & { Content: React.ComponentType };

const unsorted: LessonEntry[] = [
  ...gettingStarted,
  ...html,
  ...css,
  ...javascript,
  ...react,
  ...python,
  ...sql,
];

unsorted.sort((a, b) => {
  if (a.topic !== b.topic) return a.topic.localeCompare(b.topic);
  return a.order - b.order;
});

const rawLessons: LessonEntry[] = unsorted.map((lesson, i, arr) => ({
  ...lesson,
  prevSlug: i > 0 ? arr[i - 1].slug : undefined,
  nextSlug: i < arr.length - 1 ? arr[i + 1].slug : undefined,
}));

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

export const lessonsMap: Record<string, { title: string; Content: React.ComponentType; frontmatter: LessonFrontmatter }> =
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
