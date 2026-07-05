import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import type { Lesson } from "@/lib/models/lesson";
import { topics as mdxTopics } from "@/lib/curriculum";

export default async function AdminTopicsPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect("/login");
  }

  const client = await connectToDatabase();
  const db = client.db("codenest");

  const adminLessons = await db
    .collection<Lesson>("lessons")
    .find({})
    .sort({ topic: 1, order: 1 })
    .toArray();

  const adminLessonsByTopic = new Map<string, Lesson[]>();
  for (const lesson of adminLessons) {
    const list = adminLessonsByTopic.get(lesson.topic) ?? [];
    list.push(lesson);
    adminLessonsByTopic.set(lesson.topic, list);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Topics
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage topics and their lesson ordering
        </p>
      </div>

      <div className="space-y-8">
        {/* MDX topics (static/build-time) */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-lg font-semibold text-gray-900">
            MDX Curriculum Topics
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            These topics are defined in the MDX curriculum and are read-only in
            the admin panel. To modify these, edit the MDX files directly.
          </p>
          <div className="space-y-4">
            {mdxTopics.map((topic) => (
              <div key={topic.title}>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-700">
                    {topic.title}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {topic.lessons.length} lessons
                  </span>
                </div>
                <div className="space-y-1">
                  {topic.lessons.map((lesson, i) => (
                    <div
                      key={lesson.slug}
                      className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2 text-sm"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-gray-200 text-xs font-medium text-gray-500">
                        {i + 1}
                      </span>
                      <span className="text-gray-700">{lesson.title}</span>
                      <span className="ml-auto text-xs text-gray-400">
                        {lesson.slug}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin-created topics */}
        {adminLessonsByTopic.size > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-lg font-semibold text-gray-900">
              Admin-Created Lessons
            </h2>
            <p className="mb-4 text-sm text-gray-500">
              Lessons created through the admin panel, organized by topic.
            </p>
            <div className="space-y-4">
              {Array.from(adminLessonsByTopic.entries())
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([topic, lessons]) => (
                  <div key={topic}>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-700">
                        {topic}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {lessons.length} lesson{lessons.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {lessons.map((lesson) => (
                        <Link
                          key={lesson.slug}
                          href={`/admin/lessons/${lesson.slug}`}
                          className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2 text-sm transition-colors hover:bg-gray-100"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded bg-gray-200 text-xs font-medium text-gray-500">
                            {lesson.order}
                          </span>
                          <span className="text-gray-700">{lesson.title}</span>
                          {lesson.isPublished ? (
                            <span className="ml-auto inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                              Published
                            </span>
                          ) : (
                            <span className="ml-auto inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                              Draft
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {adminLessonsByTopic.size === 0 && (
          <div className="rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
            <h3 className="mb-1 text-sm font-semibold text-gray-900">
              No admin-created lessons yet
            </h3>
            <p className="mb-4 text-sm text-gray-500">
              Create lessons through the admin panel and they will appear here.
            </p>
            <Link
              href="/admin/lessons/new"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Create Lesson
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
