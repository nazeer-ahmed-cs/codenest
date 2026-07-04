import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import type { Lesson } from "@/lib/models/lesson";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
    return false;
  }
  return true;
}

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const client = await connectToDatabase();
    const db = client.db("codenest");

    const lesson = await db
      .collection<Lesson>("lessons")
      .findOne({ slug: params.slug });

    if (!lesson) {
      return NextResponse.json(
        { message: "Lesson not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(lesson, { status: 200 });
  } catch (error) {
    console.error("[admin/lessons/slug] GET", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const updates = await req.json();
    const client = await connectToDatabase();
    const db = client.db("codenest");

    const existing = await db
      .collection<Lesson>("lessons")
      .findOne({ slug: params.slug });

    if (!existing) {
      return NextResponse.json(
        { message: "Lesson not found" },
        { status: 404 }
      );
    }

    const allowed = [
      "title",
      "description",
      "topic",
      "order",
      "content",
      "isPublished",
    ];
    const setFields: Record<string, unknown> = { updatedAt: new Date() };

    for (const key of allowed) {
      if (updates[key] !== undefined) {
        setFields[key] = updates[key];
      }
    }

    await db.collection<Lesson>("lessons").updateOne(
      { slug: params.slug },
      { $set: setFields }
    );

    if (updates.slug && updates.slug !== params.slug) {
      const slugExists = await db
        .collection<Lesson>("lessons")
        .findOne({ slug: updates.slug });

      if (slugExists) {
        return NextResponse.json(
          { message: "A lesson with the new slug already exists" },
          { status: 409 }
        );
      }

      await db.collection<Lesson>("lessons").updateOne(
        { slug: params.slug },
        { $set: { slug: updates.slug } }
      );
    }

    const updated = await db
      .collection<Lesson>("lessons")
      .findOne({ slug: updates.slug || params.slug });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("[admin/lessons/slug] PUT", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const client = await connectToDatabase();
    const db = client.db("codenest");

    const result = await db
      .collection<Lesson>("lessons")
      .deleteOne({ slug: params.slug });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Lesson not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Lesson deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[admin/lessons/slug] DELETE", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
