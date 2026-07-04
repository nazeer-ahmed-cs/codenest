import { connectToDatabase } from "./mongodb";

export async function ensureCertificateIndex() {
  const client = await connectToDatabase();
  const db = client.db("codenest");
  await db.collection("user-progress").createIndex(
    { "certificateAttempts.certId": 1 },
    { background: true }
  );
}
