import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("codenest");
    const collections = await db.listCollections().toArray();

    return NextResponse.json({
      status: "connected",
      collections: collections.map((c) => c.name),
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: (error as Error).message },
      { status: 500 }
    );
  }
}
