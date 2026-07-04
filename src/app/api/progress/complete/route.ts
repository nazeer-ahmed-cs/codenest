import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const client = await connectToDatabase();
    const db = client.db("codenest");

    const progress = await db
      .collection("user-progress")
      .findOne({ userId: session.user.id });

    return NextResponse.json(
      {
        completedLessons: progress?.completedLessons ?? [],
        streak: progress?.streak ?? { count: 0, lastActivityDate: null },
        lastVisited: progress?.lastVisited ?? null,
      },
      { status: 200 }
    );
  } catch {
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

    const client = await connectToDatabase();
    const db = client.db("codenest");

    const today = new Date().toISOString().slice(0, 10);

    const existing = await db
      .collection("user-progress")
      .findOne({ userId: session.user.id });

    let streakCount = 1;
    if (existing?.streak) {
      const lastDate = existing.streak.lastActivityDate;
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .slice(0, 10);
      if (lastDate === today) {
        streakCount = existing.streak.count;
      } else if (lastDate === yesterday) {
        streakCount = existing.streak.count + 1;
      } else {
        streakCount = 1;
      }
    }

    await db.collection("user-progress").updateOne(
      { userId: session.user.id },
      {
        $addToSet: { completedLessons: slug },
        $set: {
          lastVisited: new Date(),
          streak: { count: streakCount, lastActivityDate: today },
        },
      },
      { upsert: true }
    );

    return NextResponse.json(
      { message: "Progress saved", streak: streakCount },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
