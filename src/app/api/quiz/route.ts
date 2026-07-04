import { NextRequest, NextResponse } from "next/server";
import { quizMap } from "@/lib/quizzes";

export async function GET(req: NextRequest) {
  const topicId = req.nextUrl.searchParams.get("topicId");

  if (!topicId) {
    const topicIds = Object.keys(quizMap);
    return NextResponse.json({ topicIds }, { status: 200 });
  }

  const quiz = quizMap[topicId];
  if (!quiz) {
    return NextResponse.json(
      { message: `No quiz found for topic "${topicId}"` },
      { status: 404 }
    );
  }

  return NextResponse.json(quiz, { status: 200 });
}
