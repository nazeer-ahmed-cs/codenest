import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import type { UserProgress } from "@/lib/models/user-progress";

const PASS_THRESHOLD = 70;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { score, total, percentage, certId, userName } = await req.json();

    if (
      typeof score !== "number" ||
      typeof total !== "number" ||
      typeof percentage !== "number"
    ) {
      return NextResponse.json(
        { message: "score, total, and percentage are required" },
        { status: 400 }
      );
    }

    if (!certId) {
      return NextResponse.json(
        { message: "certId is required" },
        { status: 400 }
      );
    }

    const passed = percentage >= PASS_THRESHOLD;
    const client = await connectToDatabase();
    const db = client.db("codenest");

    await db.collection<UserProgress>("user-progress").updateOne(
      { userId: session.user.id },
      {
        $push: {
          certificateAttempts: {
            certId,
            userName: userName || "Student",
            passed,
            score,
            total,
            percentage,
            completedAt: new Date().toISOString(),
          },
        },
        $set: {
          lastVisited: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json(
      { message: "Certificate result saved", passed },
      { status: 200 }
    );
  } catch (error) {
    console.error("[progress/certificate] POST", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
