import { connectToDatabase } from "@/lib/mongodb";
import type { UserProgress } from "@/lib/models/user-progress";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function VerifyPage({
  params,
}: {
  params: { certId: string };
}) {
  const certId = params.certId;

  const client = await connectToDatabase();
  const db = client.db("codenest");

  const doc = await db
    .collection<UserProgress>("user-progress")
    .findOne(
      { "certificateAttempts.certId": certId },
      { projection: { "certificateAttempts.$": 1 } }
    );

  if (!doc || !doc.certificateAttempts || doc.certificateAttempts.length === 0) {
    notFound();
  }

  const attempt = doc.certificateAttempts[0];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-lg">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* Verification badge */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 inline-flex size-14 items-center justify-center rounded-full bg-green-100">
              <svg className="size-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="mb-1 text-2xl font-bold text-gray-900">Certificate Verified</h1>
            <p className="text-sm text-green-600">This certificate is authentic and issued by CodeNest.</p>
          </div>

          {/* Certificate details */}
          <div className="mb-6 space-y-4 border-t border-b border-gray-100 py-5">
            <div className="text-center">
              <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">Recipient</p>
              <p className="text-xl font-semibold text-gray-900">{attempt.userName}</p>
            </div>

            <div className="text-center">
              <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">Certificate</p>
              <p className="text-base font-medium text-gray-900">CodeNest Certificate of Completion</p>
            </div>

            <div className="text-center">
              <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">Date Issued</p>
              <p className="text-sm text-gray-700">{formatDate(attempt.completedAt)}</p>
            </div>

            <div className="text-center">
              <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">Score</p>
              <p className="text-sm text-gray-700">
                {attempt.score}/{attempt.total} ({attempt.percentage}%)
              </p>
            </div>

            <div className="text-center">
              <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">Status</p>
              {attempt.passed ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Passed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Did Not Pass
                </span>
              )}
            </div>

            <div className="text-center">
              <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">Certificate ID</p>
              <p className="font-mono text-xs text-gray-500">{certId}</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/certificate"
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Take the Exam
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          CodeNest Certificate Verification &middot; codenest-pink.vercel.app
        </p>
      </div>
    </div>
  );
}
