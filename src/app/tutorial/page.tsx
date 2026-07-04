import { topics } from "@/lib/curriculum";

const siteUrl = "https://codenest-pink.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "CodeNest Tutorials",
  description: "Web development lessons covering HTML, CSS, JavaScript, and React.",
  url: `${siteUrl}/tutorial`,
  itemListElement: topics.flatMap((topic, ti) =>
    topic.lessons.map((lesson, li) => ({
      "@type": "ListItem",
      position: ti * 100 + li + 1,
      item: {
        "@type": "TechArticle",
        url: `${siteUrl}/tutorial/html/${lesson.slug}`,
        name: lesson.title,
      },
    }))
  ),
};

export default function TutorialPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Tutorial</h1>
      <p className="mb-10 text-gray-500">
        Select a lesson from the sidebar to get started.
      </p>
      <div className="space-y-6">
        {topics.map((topic) => (
          <section key={topic.title}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
              {topic.title}
            </h2>
            <div className="space-y-1">
              {topic.lessons.map((lesson) => (
                <a
                  key={lesson.slug}
                  href={`/tutorial/html/${lesson.slug}`}
                  className="block rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                >
                  {lesson.title}
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
