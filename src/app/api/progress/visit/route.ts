import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { lessonsMap } from "@/lib/curriculum";
import { calcStreak } from "@/lib/progress";

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
      .collection("user-progress")
      .findOne({ userId: session.user.id });

    const newStreak = calcStreak(existing?.streak);

    await db.collection("user-progress").updateOne(
      { userId: session.user.id },
      {
        $set: {
          lastVisited: new Date(),
          lastLessonSlug: slug,
          streak: newStreak,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ message: "Visit tracked" }, { status: 200 });
  } catch (error) {
    console.error("[progress/visit] POST", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
