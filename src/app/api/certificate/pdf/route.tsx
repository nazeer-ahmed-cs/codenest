import { NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import CertificatePDF from "@/components/certificate/CertificatePDF";

export async function POST(req: NextRequest) {
  const { name, email, score, total, percentage, certId, date } =
    await req.json();

  if (!name || !email || score == null || total == null || !certId || !date) {
    return new Response("Missing required fields", { status: 400 });
  }

  const buffer = await renderToBuffer(
    <CertificatePDF
      name={name}
      email={email}
      score={score}
      total={total}
      percentage={percentage}
      date={date}
      certId={certId}
    />
  );

  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="CodeNest-Certificate-${certId}.pdf"`,
      "Content-Length": buffer.byteLength.toString(),
    },
  });
}
