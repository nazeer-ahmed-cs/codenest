import { topics } from "@/lib/curriculum";

export default function TutorialPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
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
