import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { quizMap } from "@/lib/quizzes";

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
      { quizScores: progress?.quizScores ?? [] },
      { status: 200 }
    );
  } catch (error) {
    console.error("[progress/quiz-score] GET", error);
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

    const { topicId, score, total } = await req.json();
    if (!topicId || typeof score !== "number" || typeof total !== "number") {
      return NextResponse.json(
        { message: "topicId, score, and total are required" },
        { status: 400 }
      );
    }

    if (!quizMap[topicId]) {
      return NextResponse.json(
        { message: "Invalid quiz topicId" },
        { status: 400 }
      );
    }

    const percentage = Math.round((score / total) * 100);
    const completedAt = new Date().toISOString();

    const client = await connectToDatabase();
    const db = client.db("codenest");

    await db.collection("user-progress").updateOne(
      { userId: session.user.id },
      {
        $push: {
          quizScores: {
            topicId,
            score,
            total,
            percentage,
            completedAt,
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
        $set: {
          lastVisited: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json(
      { message: "Quiz score saved", percentage },
      { status: 200 }
    );
  } catch (error) {
    console.error("[progress/quiz-score] POST", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
