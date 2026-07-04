import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import type { Lesson } from "@/lib/models/lesson";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

async function getStats() {
  const client = await connectToDatabase();
  const db = client.db("codenest");

  const totalLessons = await db
    .collection<Lesson>("lessons")
    .countDocuments();
  const publishedLessons = await db
    .collection<Lesson>("lessons")
    .countDocuments({ isPublished: true });
  const totalUsers = await db.collection("users").countDocuments();

  type TopicStat = { _id: string; count: number; published: number };

  const lessonsByTopic = (await db
    .collection<Lesson>("lessons")
    .aggregate<TopicStat>([
      { $group: { _id: "$topic", count: { $sum: 1 }, published: { $sum: { $cond: ["$isPublished", 1, 0] } } } },
      { $sort: { _id: 1 } },
    ])
    .toArray()) as TopicStat[];

  return { totalLessons, publishedLessons, totalUsers, lessonsByTopic };
}

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
    redirect("/login");
  }

  const stats = await getStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {session.user.name || session.user.email}
        </p>
      </div>

      {/* Stats cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-1 text-sm font-medium text-gray-500">
            Total Lessons
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {stats.totalLessons}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-1 text-sm font-medium text-gray-500">
            Published
          </div>
          <div className="text-3xl font-bold text-green-600">
            {stats.publishedLessons}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-1 text-sm font-medium text-gray-500">
            Unpublished
          </div>
          <div className="text-3xl font-bold text-amber-600">
            {stats.totalLessons - stats.publishedLessons}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-1 text-sm font-medium text-gray-500">
            Total Users
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {stats.totalUsers}
          </div>
        </div>
      </div>

      {/* Lessons by topic */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Lessons by Topic
        </h2>
        <div className="space-y-4">
          {stats.lessonsByTopic.map((t) => {
            const pct = t.count > 0 ? Math.round((t.published / t.count) * 100) : 0;
            return (
              <div key={t._id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{t._id}</span>
                  <span className="text-gray-500">
                    {t.published} / {t.count} published
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/lessons/new"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Lesson
          </Link>
          <Link
            href="/admin/lessons"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Manage Lessons
          </Link>
          <Link
            href="/admin/topics"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Manage Topics
          </Link>
        </div>
      </div>
    </div>
  );
}
