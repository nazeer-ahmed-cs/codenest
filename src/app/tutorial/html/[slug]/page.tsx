import Link from "next/link";
import { notFound } from "next/navigation";
import { lessonsMap, allSlugs } from "@/lib/curriculum";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export default function TutorialLessonPage({ params }: Props) {
  const lesson = lessonsMap[params.slug];

  if (!lesson) {
    notFound();
  }

  const { frontmatter } = lesson;
  const prev = frontmatter.prevSlug ? lessonsMap[frontmatter.prevSlug] : null;
  const next = frontmatter.nextSlug ? lessonsMap[frontmatter.nextSlug] : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
        <span>{frontmatter.topic}</span>
        <span className="text-gray-300">/</span>
        <span className="text-gray-600">{lesson.title}</span>
      </div>
      <h1 className="mb-3 text-3xl font-bold tracking-tight">
        {lesson.title}
      </h1>
      <p className="mb-10 text-base leading-relaxed text-gray-500">
        {frontmatter.description}
      </p>

      <div className="prose prose-gray max-w-none">
        <lesson.Content />
      </div>

      <nav
        className="mt-16 grid grid-cols-2 gap-4 border-t border-gray-100 pt-8"
        aria-label="Lesson navigation"
      >
        {prev ? (
          <Link
            href={`/tutorial/html/${prev.frontmatter.slug}`}
            className="group rounded-xl border border-gray-200 p-5 transition-colors hover:border-blue-200 hover:bg-blue-50/50"
          >
            <span className="mb-1 block text-xs font-medium text-gray-400">
              &larr; Previous
            </span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/tutorial/html/${next.frontmatter.slug}`}
            className="group col-start-2 rounded-xl border border-gray-200 p-5 text-right transition-colors hover:border-blue-200 hover:bg-blue-50/50"
          >
            <span className="mb-1 block text-xs font-medium text-gray-400">
              Next &rarr;
            </span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
}
