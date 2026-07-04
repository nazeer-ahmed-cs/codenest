"use client";

import { useState, useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
import type { Quiz, QuizQuestion } from "@/lib/models/quiz";

type Props = {
  quiz: Quiz;
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizClient({ quiz }: Props) {
  const { data: session } = useSession();
  const [shuffledQuestions] = useState(() => shuffleArray(quiz.questions));
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const question: QuizQuestion = shuffledQuestions[current];
  const total = shuffledQuestions.length;
  const selected = answers[current];

  const handleSelect = (optionIndex: number) => {
    if (answered || finished) return;
    setAnswers((prev) => ({ ...prev, [current]: optionIndex }));
    setAnswered(true);
  };

  const handleNext = () => {
    if (current < total - 1) {
      setCurrent((c) => c + 1);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / total) * 100;

  const score = useMemo(() => {
    let correct = 0;
    for (const [qIdx, ans] of Object.entries(answers)) {
      if (shuffledQuestions[Number(qIdx)].correctIndex === ans) correct++;
    }
    return correct;
  }, [answers, shuffledQuestions]);

  const missedQuestions = useMemo(() => {
    const missed: { question: QuizQuestion; userAnswer: number; idx: number }[] = [];
    for (const [qIdx, ans] of Object.entries(answers)) {
      const idx = Number(qIdx);
      if (shuffledQuestions[idx].correctIndex !== ans) {
        missed.push({ question: shuffledQuestions[idx], userAnswer: ans, idx });
      }
    }
    return missed;
  }, [answers, shuffledQuestions]);

  useEffect(() => {
    if (!finished || saving || saved || !session?.user?.id) return;
    setSaving(true);
    fetch("/api/progress/quiz-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topicId: quiz.topicId,
        score,
        total,
      }),
    })
      .then((res) => res.json())
      .then(() => setSaved(true))
      .catch(() => {})
      .finally(() => setSaving(false));
  }, [finished, score, total, saving, saved, session, quiz.topicId]);

  const retry = () => {
    setAnswers({});
    setCurrent(0);
    setAnswered(false);
    setFinished(false);
    setSaved(false);
  };

  if (finished) {
    const percentage = Math.round((score / total) * 100);
    let gradeColor = "text-red-600";
    let gradeBg = "bg-red-50 border-red-200";
    let gradeLabel = "Needs Improvement";
    if (percentage >= 80) {
      gradeColor = "text-green-600";
      gradeBg = "bg-green-50 border-green-200";
      gradeLabel = "Great Job!";
    } else if (percentage >= 60) {
      gradeColor = "text-yellow-600";
      gradeBg = "bg-yellow-50 border-yellow-200";
      gradeLabel = "Good Effort";
    }

    return (
      <div className="mx-auto max-w-2xl">
        {/* Progress bar — full */}
        <div className="mb-8">
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* Score circle */}
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              {gradeLabel}
            </h2>
            <p className="mb-6 text-gray-500">
              You scored {score} out of {total}
            </p>

            <div
              className={`mx-auto mb-8 inline-flex size-36 items-center justify-center rounded-full border-4 ${gradeBg} ${gradeColor}`}
            >
              <div>
                <span className="text-4xl font-bold">{percentage}%</span>
              </div>
            </div>

            {saving && (
              <p className="mb-4 text-sm text-gray-400">Saving score...</p>
            )}
            {saved && (
              <p className="mb-4 text-sm text-green-600">
                Score saved to your profile
              </p>
            )}
            {!session?.user?.id && (
              <p className="mb-4 text-sm text-gray-400">
                Sign in to save your quiz scores
              </p>
            )}
          </div>

          {/* Missed questions */}
          {missedQuestions.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-red-700">
                Missed Questions ({missedQuestions.length})
              </h3>
              <div className="space-y-4">
                {missedQuestions.map(({ question: q, userAnswer, idx }) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3"
                  >
                    <p className="mb-2 font-medium text-gray-900">
                      {q.question}
                    </p>
                    <p className="mb-1 text-sm text-red-600">
                      <span className="font-semibold">Your answer:</span>{" "}
                      {q.options[userAnswer]}
                    </p>
                    <p className="mb-2 text-sm text-green-700">
                      <span className="font-semibold">Correct answer:</span>{" "}
                      {q.options[q.correctIndex]}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Explanation:</span>{" "}
                      {q.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Correct questions (collapsed count) */}
          {score > 0 && (
            <div className="mb-8">
              <details className="group">
                <summary className="cursor-pointer text-sm font-semibold text-green-700 hover:text-green-800">
                  Correct Answers ({score})
                </summary>
                <div className="mt-3 space-y-2">
                  {shuffledQuestions.map((q, idx) => {
                    const userAns = answers[idx];
                    const correct = userAns === q.correctIndex;
                    if (!correct) return null;
                    return (
                      <div
                        key={idx}
                        className="rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm"
                      >
                        <p className="font-medium text-gray-900">{q.question}</p>
                        <p className="text-green-700">
                          {q.options[q.correctIndex]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </details>
            </div>
          )}

          {/* All questions review */}
          <div className="mb-8">
            <h3 className="mb-3 text-base font-semibold text-gray-900">
              All Questions
            </h3>
            <div className="space-y-2">
              {shuffledQuestions.map((q, idx) => {
                const userAns = answers[idx];
                const correct = userAns === q.correctIndex;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-2 text-sm ${
                      correct
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                        correct ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="flex-1 text-gray-700">{q.question}</span>
                    {correct ? (
                      <svg
                        className="size-4 shrink-0 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="size-4 shrink-0 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={retry}
              className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Retry Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="mb-1 flex items-center justify-between text-sm text-gray-500">
          <span>
            Question {current + 1} of {total}
          </span>
          <span>{Math.round(progressPercent)}% complete</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold leading-relaxed text-gray-900">
          {question.question}
        </h2>
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selected === idx;
            let borderStyle =
              "border-gray-200 hover:border-blue-300 hover:bg-blue-50";

            if (answered) {
              if (idx === question.correctIndex) {
                borderStyle = "border-green-400 bg-green-50";
              } else if (isSelected) {
                borderStyle = "border-red-400 bg-red-50";
              } else {
                borderStyle = "border-gray-200 opacity-60";
              }
            } else if (isSelected) {
              borderStyle = "border-blue-400 bg-blue-50";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={answered}
                className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${borderStyle} ${
                  answered ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    answered
                      ? idx === question.correctIndex
                        ? "bg-green-500 text-white"
                        : isSelected
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 text-gray-400"
                      : isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{option}</span>
                {answered && idx === question.correctIndex && (
                  <svg
                    className="size-5 shrink-0 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                {answered && isSelected && idx !== question.correctIndex && (
                  <svg
                    className="size-5 shrink-0 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div className="mt-4 animate-fade-in rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-900">
            <span className="font-semibold">Explanation:</span>{" "}
            {question.explanation}
          </div>
        )}
      </div>

      {/* Next button */}
      {answered && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            {current < total - 1 ? "Next Question →" : "See Results →"}
          </button>
        </div>
      )}
    </div>
  );
}
