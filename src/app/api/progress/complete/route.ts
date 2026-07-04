import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { lessonsMap } from "@/lib/curriculum";
import { calcStreak } from "@/lib/progress";
import type { UserProgress } from "@/lib/models/user-progress";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const client = await connectToDatabase();
    const db = client.db("codenest");

    const progress = await db
      .collection<UserProgress>("user-progress")
      .findOne({ userId: session.user.id });

    return NextResponse.json(
      {
        completedLessons: progress?.completedLessons ?? [],
        bookmarkedLessons: progress?.bookmarkedLessons ?? [],
        streak: progress?.streak ?? { count: 0, lastActivityDate: null },
        lastVisited: progress?.lastVisited ?? null,
        lastLessonSlug: progress?.lastLessonSlug ?? null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[progress/complete] GET", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await req.json();
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    if (!lessonsMap[slug]) {
      return NextResponse.json(
        { message: "Invalid lesson slug" },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db("codenest");

    const existing = await db
      .collection<UserProgress>("user-progress")
      .findOne({ userId: session.user.id });

    const newStreak = calcStreak(existing?.streak);

    await db.collection<UserProgress>("user-progress").updateOne(
      { userId: session.user.id },
      {
        $addToSet: { completedLessons: slug },
        $set: {
          lastVisited: new Date(),
          lastLessonSlug: slug,
          streak: newStreak,
        },
      },
      { upsert: true }
    );

    return NextResponse.json(
      { message: "Progress saved", streak: newStreak.count },
      { status: 200 }
    );
  } catch (error) {
    console.error("[progress/complete] POST", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
