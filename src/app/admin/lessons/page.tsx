import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import type { Lesson } from "@/lib/models/lesson";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default async function AdminLessonsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
    redirect("/login");
  }

  const client = await connectToDatabase();
  const db = client.db("codenest");

  const lessons = await db
    .collection<Lesson>("lessons")
    .find({})
    .sort({ topic: 1, order: 1 })
    .toArray();

  const topics = new Set(lessons.map((l) => l.topic));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Lessons
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {lessons.length} lesson{lessons.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/lessons/new"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Lesson
        </Link>
      </div>

      {lessons.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
          <svg
            className="mx-auto mb-3 size-10 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <h3 className="mb-1 text-sm font-semibold text-gray-900">
            No lessons yet
          </h3>
          <p className="mb-4 text-sm text-gray-500">
            Create your first lesson to get started.
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
      ) : (
        <div className="space-y-6">
          {Array.from(topics)
            .sort()
            .map((topic) => {
              const topicLessons = lessons.filter((l) => l.topic === topic);
              return (
                <div key={topic}>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    {topic}
                  </h2>
                  <div className="space-y-2">
                    {topicLessons.map((lesson) => (
                      <Link
                        key={lesson.slug}
                        href={`/admin/lessons/${lesson.slug}`}
                        className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 transition-colors hover:bg-gray-50"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gray-100 text-xs font-semibold text-gray-500">
                          {lesson.order}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="truncate text-sm font-medium text-gray-900">
                              {lesson.title}
                            </span>
                            {lesson.isPublished ? (
                              <span className="inline-flex shrink-0 items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                Published
                              </span>
                            ) : (
                              <span className="inline-flex shrink-0 items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                                Draft
                              </span>
                            )}
                          </div>
                          {lesson.description && (
                            <p className="mt-0.5 truncate text-sm text-gray-500">
                              {lesson.description}
                            </p>
                          )}
                        </div>
                        <svg
                          className="size-4 shrink-0 text-gray-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
