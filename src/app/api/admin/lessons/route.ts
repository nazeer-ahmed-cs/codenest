import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import type { Lesson } from "@/lib/models/lesson";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "admin";
}

export async function GET() {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const client = await connectToDatabase();
    const db = client.db("codenest");

    const lessons = await db
      .collection<Lesson>("lessons")
      .find({})
      .sort({ topic: 1, order: 1 })
      .toArray();

    return NextResponse.json(lessons, { status: 200 });
  } catch (error) {
    console.error("[admin/lessons] GET", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { slug, title, description, topic, content } = await req.json();

    if (!slug || !title || !topic) {
      return NextResponse.json(
        { message: "slug, title, and topic are required" },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db("codenest");

    const existing = await db
      .collection<Lesson>("lessons")
      .findOne({ slug });

    if (existing) {
      return NextResponse.json(
        { message: "A lesson with this slug already exists" },
        { status: 409 }
      );
    }

    const lastLesson = await db
      .collection<Lesson>("lessons")
      .findOne({ topic }, { sort: { order: -1 } });

    const now = new Date();

    const lesson: Omit<Lesson, "_id"> = {
      slug,
      title,
      description: description || "",
      topic,
      order: (lastLesson?.order ?? 0) + 1,
      content: content || "",
      isPublished: false,
      createdAt: now,
      updatedAt: now,
    };

    await db.collection<Lesson>("lessons").insertOne(lesson as Lesson);

    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    console.error("[admin/lessons] POST", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
