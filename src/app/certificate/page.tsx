import Link from "next/link";
import { certificateQuiz } from "@/lib/quizzes";
import CertificateClient from "@/components/certificate/CertificateClient";

export default function CertificatePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Certificate Exam</span>
      </nav>
      <CertificateClient questionPool={certificateQuiz.questions} />
    </div>
  );
}
