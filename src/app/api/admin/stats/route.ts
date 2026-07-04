import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import type { Lesson } from "@/lib/models/lesson";
import type { UserProgress } from "@/lib/models/user-progress";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
    return false;
  }
  return true;
}

export async function GET() {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const client = await connectToDatabase();
    const db = client.db("codenest");

    const totalLessons = await db
      .collection<Lesson>("lessons")
      .countDocuments();

    const publishedLessons = await db
      .collection<Lesson>("lessons")
      .countDocuments({ isPublished: true });

    const totalUsers = await db
      .collection("users")
      .countDocuments();

    const progressDocs = await db
      .collection<UserProgress>("user-progress")
      .find({})
      .toArray();

    const totalCompletedActions = progressDocs.reduce(
      (sum, p) => sum + (p.completedLessons?.length ?? 0),
      0
    );

    const quizScoresFlat = progressDocs.flatMap(
      (p) => p.quizScores ?? []
    );

    const lessonsByTopic = (await db
      .collection<Lesson>("lessons")
      .aggregate<{ _id: string; count: number }>([
        { $group: { _id: "$topic", count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ])
      .toArray()) as { _id: string; count: number }[];

    return NextResponse.json(
      {
        totalLessons,
        publishedLessons,
        totalUsers,
        totalCompletedActions,
        totalQuizAttempts: quizScoresFlat.length,
        lessonsByTopic: lessonsByTopic.map((t) => ({
          topic: t._id,
          count: t.count,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[admin/stats] GET", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
