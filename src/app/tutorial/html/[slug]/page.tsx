import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lessonsMap, allSlugs } from "@/lib/curriculum";
import CopyCodeBlocks from "@/components/CopyCodeBlocks";
import Breadcrumbs from "@/components/Breadcrumbs";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import BookmarkButton from "@/components/BookmarkButton";
import TrackVisit from "@/components/TrackVisit";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const lesson = lessonsMap[params.slug];
  if (!lesson) return { title: "Lesson Not Found" };

  const { frontmatter } = lesson;
  const siteUrl = "https://codenest-pink.vercel.app";
  const ogImage = `${siteUrl}/api/og/lesson?slug=${encodeURIComponent(params.slug)}`;

  return {
    title: `${frontmatter.title} | CodeNest`,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `${siteUrl}/tutorial/html/${params.slug}`,
      siteName: "CodeNest",
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: [ogImage],
    },
  };
}

export default function TutorialLessonPage({ params }: Props) {
  const lesson = lessonsMap[params.slug];

  if (!lesson) {
    notFound();
  }

  const { frontmatter } = lesson;
  const prev = frontmatter.prevSlug ? lessonsMap[frontmatter.prevSlug] : null;
  const next = frontmatter.nextSlug ? lessonsMap[frontmatter.nextSlug] : null;

  const siteUrl = "https://codenest-pink.vercel.app";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: frontmatter.title,
    description: frontmatter.description,
    url: `${siteUrl}/tutorial/html/${params.slug}`,
    image: `${siteUrl}/api/og/lesson?slug=${encodeURIComponent(params.slug)}`,
    author: { "@type": "Organization", name: "CodeNest", url: siteUrl },
    publisher: {
      "@type": "Organization",
      name: "CodeNest",
      logo: { "@type": "ImageObject", url: `${siteUrl}/favicon.ico` },
    },
    datePublished: "2026-01-01",
    inLanguage: "en-US",
    about: { "@type": "Thing", name: frontmatter.topic },
    teaches: frontmatter.title,
    proficiencyLevel: "Beginner",
    timeRequired: "PT15M",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/tutorial/html/${params.slug}`,
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrackVisit slug={params.slug} />
      <Breadcrumbs topic={frontmatter.topic} title={lesson.title} />
      <h1 className="mb-3 text-3xl font-bold tracking-tight">
        {lesson.title}
      </h1>
      <p className="mb-10 text-base leading-relaxed text-gray-500">
        {frontmatter.description}
      </p>

      <CopyCodeBlocks>
        <div className="prose prose-gray max-w-none">
          <lesson.Content />
        </div>
      </CopyCodeBlocks>

      <div className="mt-8 flex items-center justify-center gap-3">
        <MarkCompleteButton slug={params.slug} />
        <BookmarkButton slug={params.slug} />
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
