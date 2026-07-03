import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const client = await connectToDatabase();
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
