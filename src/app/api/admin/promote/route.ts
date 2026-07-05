import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { email: targetEmail } = await req.json();
    if (!targetEmail) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db("codenest");

    const requesterEmail = session.user.email;
    const requesterRole = session.user.role;

    const isAlreadyAdmin = requesterRole === "admin";
    const isBootstrapAdmin =
      requesterEmail === process.env.ADMIN_EMAIL;

    if (!isAlreadyAdmin && !isBootstrapAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await db.collection("users").updateOne(
      { email: targetEmail },
      { $set: { role: "admin" } }
    );

    return NextResponse.json(
      { message: `User ${targetEmail} promoted to admin` },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
