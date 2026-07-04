import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { topics, lessonsMap } from "@/lib/curriculum";
import Container from "@/components/Container";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const client = await connectToDatabase();
  const db = client.db("codenest");
  const progressDoc = await db
    .collection("user-progress")
    .findOne({ userId: session.user.id });
  const progress = progressDoc ?? {};

  const completed = new Set(progress?.completedLessons ?? []);
  const bookmarked = new Set(progress?.bookmarkedLessons ?? []);
  const streak = progress?.streak?.count ?? 0;
  const lastLessonSlug = progress?.lastLessonSlug ?? null;
  const lastLesson = lastLessonSlug ? lessonsMap[lastLessonSlug] : null;

  const allLessons = topics.flatMap((t) => t.lessons);
  const totalLessons = allLessons.length;
  const completedCount = completed.size;

  const topicStats = topics.map((topic) => {
    const done = topic.lessons.filter((l) => completed.has(l.slug)).length;
    return { title: topic.title, total: topic.lessons.length, done };
  });

  return (
    <Container className="py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Welcome back, {session.user.name || session.user.email}
          </p>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">
            <span>{streak}-day streak</span>
          </div>
        )}
      </div>

      {lastLesson && (
        <a
          href={`/tutorial/html/${lastLessonSlug}`}
          className="mb-6 flex items-center gap-4 rounded-xl border border-blue-200 bg-blue-50 p-5 transition-colors hover:bg-blue-100"
        >
          <div className="rounded-lg bg-blue-100 p-2.5">
            <svg className="size-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-xs font-medium uppercase tracking-wide text-blue-500">
              Continue where you left off
            </div>
            <div className="text-sm font-semibold text-blue-900">
              {lastLesson.title}
            </div>
          </div>
          <svg className="size-5 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      )}

      <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
        <div className="mb-1 text-sm text-gray-500">Overall Progress</div>
        <div className="mb-2 text-3xl font-bold text-gray-900">
          {completedCount} / {totalLessons}
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{
              width: `${totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Progress by Topic
      </h2>
      <div className="mb-10 space-y-4">
        {topicStats.map((t) => {
          const pct = t.total > 0 ? Math.round((t.done / t.total) * 100) : 0;
          return (
            <div key={t.title}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{t.title}</span>
                <span className="text-gray-500">
                  {t.done}/{t.total} ({pct}%)
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-green-500 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {completedCount > 0 && (
        <>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Completed Lessons
          </h2>
          <div className="space-y-2">
            {allLessons
              .filter((l) => completed.has(l.slug))
              .map((l) => (
                <a
                  key={l.slug}
                  href={`/tutorial/html/${l.slug}`}
                  className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 transition-colors hover:bg-green-100"
                >
                  <svg
                    className="size-4 shrink-0 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {l.title}
                </a>
              ))}
          </div>
        </>
      )}

      {bookmarked.size > 0 && (
        <>
          <h2 className="mb-4 mt-10 text-lg font-semibold text-gray-900">
            Bookmarked Lessons
          </h2>
          <div className="space-y-2">
            {allLessons
              .filter((l) => bookmarked.has(l.slug))
              .map((l) => (
                <a
                  key={l.slug}
                  href={`/tutorial/html/${l.slug}`}
                  className="flex items-center gap-3 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800 transition-colors hover:bg-yellow-100"
                >
                  <svg
                    className="size-4 shrink-0 text-yellow-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  {l.title}
                </a>
              ))}
          </div>
        </>
      )}
    </Container>
  );
}
