import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import type { Lesson } from "@/lib/models/lesson";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "admin";
}

export async function PUT(req: Request) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { topic, slugs }: { topic: string; slugs: string[] } =
      await req.json();

    if (!topic || !slugs || !Array.isArray(slugs)) {
      return NextResponse.json(
        { message: "topic and slugs array are required" },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db("codenest");

    const bulkOps = slugs.map((slug, index) => ({
      updateOne: {
        filter: { slug, topic },
        update: { $set: { order: index + 1, updatedAt: new Date() } },
      },
    }));

    await db.collection<Lesson>("lessons").bulkWrite(bulkOps);

    return NextResponse.json(
      { message: "Reordered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[admin/reorder] PUT", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
