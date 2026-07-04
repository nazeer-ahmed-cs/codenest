import { notFound } from "next/navigation";
import Link from "next/link";
import { quizMap } from "@/lib/quizzes";
import QuizClient from "@/components/quiz/QuizClient";

type Props = {
  params: { topicId: string };
};

export function generateStaticParams() {
  return Object.keys(quizMap).map((topicId) => ({ topicId }));
}

export default function QuizPage({ params }: Props) {
  const topicId = decodeURIComponent(params.topicId);
  const quiz = quizMap[topicId];

  if (!quiz) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Quiz: {topicId}</span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
        {topicId} Quiz
      </h1>
      <p className="mb-10 text-gray-600">
        Test your knowledge with {quiz.questions.length} questions.
      </p>

      <QuizClient quiz={quiz} />
    </div>
  );
}
