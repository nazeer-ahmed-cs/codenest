import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { topics, lessonsMap } from "@/lib/curriculum";
import Container from "@/components/Container";
import type { CertificateAttempt } from "@/lib/models/user-progress";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const client = await connectToDatabase();
  const db = client.db("codenest");
  const progress = await db
    .collection("user-progress")
    .findOne({ userId: session.user.id });

  const completed = new Set(progress?.completedLessons ?? []);
  const bookmarked = new Set(progress?.bookmarkedLessons ?? []);
  const quizScores: { topicId: string; score: number; total: number; percentage: number; completedAt: string }[] =
    progress?.quizScores ?? [];
  const certificateAttempts: CertificateAttempt[] =
    progress?.certificateAttempts ?? [];
  const CERT_PASS_THRESHOLD = 70;
  const bestCert = certificateAttempts.length > 0
    ? certificateAttempts.reduce((a, b) => (a.percentage > b.percentage ? a : b))
    : null;
  const certPassed = bestCert ? bestCert.percentage >= CERT_PASS_THRESHOLD : false;
  const streak = progress?.streak?.count ?? 0;
  const lastLessonSlug = progress?.lastLessonSlug ?? null;
  const lastLesson = lastLessonSlug ? lessonsMap[lastLessonSlug] : null;

  const scoresByTopic: Record<string, typeof quizScores> = {};
  for (const s of quizScores) {
    (scoresByTopic[s.topicId] ??= []).push(s);
  }

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
              <div className="mb-2 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-green-500 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <Link
                href={`/quiz/${encodeURIComponent(t.title)}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800"
              >
                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                Take Quiz
              </Link>
            </div>
          );
        })}
      </div>

      {/* Quiz Scores */}
      {quizScores.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Quiz Scores
          </h2>

          {/* Per-topic summary */}
          <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(scoresByTopic).map(([topicId, scores]) => {
              const latest = scores[scores.length - 1];
              const best = scores.reduce((a, b) =>
                a.percentage > b.percentage ? a : b
              , scores[0]);
              const avg = Math.round(
                scores.reduce((sum, s) => sum + s.percentage, 0) /
                  scores.length
              );

              const colorClass =
                best.percentage >= 80
                  ? "border-green-200 bg-green-50"
                  : best.percentage >= 60
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-red-200 bg-red-50";
              const textClass =
                best.percentage >= 80
                  ? "text-green-700"
                  : best.percentage >= 60
                    ? "text-yellow-700"
                    : "text-red-700";

              return (
                <div
                  key={topicId}
                  className={`rounded-xl border p-4 ${colorClass}`}
                >
                  <div className="mb-2 text-sm font-semibold text-gray-900">
                    {topicId}
                  </div>
                  <div className="mb-2 flex items-center gap-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${textClass}`}
                    >
                      {best.percentage}%
                    </span>
                    <span className="text-xs text-gray-500">
                      {scores.length} attempt{scores.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="space-y-0.5 text-xs text-gray-500">
                    <div>
                      Best: <span className="font-medium">{best.percentage}%</span>
                    </div>
                    <div>
                      Average:{" "}
                      <span className="font-medium">{avg}%</span>
                    </div>
                    <div>
                      Latest:{" "}
                      <span className="font-medium">{latest.percentage}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full history */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-gray-900">
              View full history ({quizScores.length} entries)
            </summary>
            <div className="mt-3 space-y-2">
              {[...quizScores]
                .reverse()
                .map((s, idx) => {
                  const date = new Date(s.completedAt);
                  const color =
                    s.percentage >= 80
                      ? "text-green-700 bg-green-50 border-green-200"
                      : s.percentage >= 60
                        ? "text-yellow-700 bg-yellow-50 border-yellow-200"
                        : "text-red-700 bg-red-50 border-red-200";
                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between rounded-lg border px-4 py-2.5 text-sm ${color}`}
                    >
                      <div>
                        <span className="font-medium">{s.topicId}</span>
                        <span className="ml-2 text-gray-500">
                          {date.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span>
                          {s.score}/{s.total}
                        </span>
                        <span className="font-bold">{s.percentage}%</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </details>
        </div>
      )}

      {/* Certificate Exam */}
      <div className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Certificate Exam
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {bestCert && certPassed ? (
            <div className="flex items-center gap-4">
              <div className="inline-flex size-12 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="size-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  Certificate Earned
                </div>
                <div className="text-sm text-gray-500">
                  Best score: {bestCert.percentage}% ({bestCert.score}/
                  {bestCert.total}) &middot; {certificateAttempts.length}{" "}
                  attempt{certificateAttempts.length !== 1 ? "s" : ""}
                </div>
              </div>
              <Link
                href="/certificate"
                className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-50"
              >
                Retake
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="inline-flex size-12 items-center justify-center rounded-full bg-gray-100">
                <svg
                  className="size-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  {certificateAttempts.length > 0
                    ? "Keep Trying"
                    : "Ready to Test Your Skills?"}
                </div>
                <div className="text-sm text-gray-500">
                  {certificateAttempts.length > 0
                    ? `Best score: ${bestCert?.percentage}% (${bestCert?.score}/${bestCert?.total})`
                    : "20 random questions, 30 minutes, 70% to pass."}
                </div>
              </div>
              <Link
                href="/certificate"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                {certificateAttempts.length > 0 ? "Retry" : "Start Exam"}
              </Link>
            </div>
          )}
        </div>
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
