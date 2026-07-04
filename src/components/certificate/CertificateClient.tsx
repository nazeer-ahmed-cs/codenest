"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import type { QuizQuestion } from "@/lib/models/quiz";
import DownloadCertificate from "./DownloadCertificate";

type Props = {
  questionPool: QuizQuestion[];
};

const QUESTIONS_PER_EXAM = 20;
const EXAM_TIME_MINUTES = 30;
const EXAM_TIME_SECONDS = EXAM_TIME_MINUTES * 60;
const PASS_THRESHOLD = 70;

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

type Phase = "start" | "exam" | "review" | "result";

export default function CertificateClient({ questionPool }: Props) {
  const { data: session } = useSession();
  const [phase, setPhase] = useState<Phase>("start");
  const [questions, setQuestions] = useState(() =>
    shuffleArray(questionPool).slice(0, QUESTIONS_PER_EXAM)
  );
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME_SECONDS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [certId, setCertId] = useState(generateCertId);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const questionListRef = useRef<HTMLDivElement>(null);
  const saveGen = useRef(0);

  const total = questions.length;
  const question = questions[current];
  const selected = answers[current];
  const answeredCount = Object.keys(answers).length;
  const timerPercent = (timeLeft / EXAM_TIME_SECONDS) * 100;
  const isLowTime = timeLeft <= 300;
  const isCriticalTime = timeLeft <= 60;

  // Timer
  useEffect(() => {
    if (phase !== "exam") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setPhase("result");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const goToQuestion = useCallback((idx: number) => {
    setCurrent(idx);
  }, []);

  const handleSelect = (optionIndex: number) => {
    if (phase !== "exam") return;
    setAnswers((prev) => ({ ...prev, [current]: optionIndex }));
  };

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(current)) next.delete(current);
      else next.add(current);
      return next;
    });
  };

  const goNext = () => {
    if (current < total - 1) setCurrent((c) => c + 1);
  };

  const goPrev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const submitExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("result");
  };

  const goPrevRef = useRef(goPrev);
  const goNextRef = useRef(goNext);
  const toggleFlagRef = useRef(toggleFlag);
  const handleSelectRef = useRef(handleSelect);
  goPrevRef.current = goPrev;
  goNextRef.current = goNext;
  toggleFlagRef.current = toggleFlag;
  handleSelectRef.current = handleSelect;

  // Keyboard shortcuts during exam
  useEffect(() => {
    if (phase !== "exam") return;
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key) {
        case "1": case "2": case "3": case "4":
          handleSelectRef.current(parseInt(e.key) - 1);
          break;
        case "ArrowLeft": goPrevRef.current(); break;
        case "ArrowRight": goNextRef.current(); break;
        case "f": case "F": toggleFlagRef.current(); break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase]);

  // Autofocus question palette on question change
  useEffect(() => {
    if (phase !== "exam" || !questionListRef.current) return;
    const btn = questionListRef.current.querySelector<HTMLButtonElement>(
      `[data-qidx="${current}"]`
    );
    btn?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [current, phase]);

  // Score calculation
  const score = useMemo(() => {
    let correct = 0;
    for (const [qIdx, ans] of Object.entries(answers)) {
      if (questions[Number(qIdx)].correctIndex === ans) correct++;
    }
    return correct;
  }, [answers, questions]);

  const percentage = useMemo(
    () => Math.round((score / total) * 100),
    [score, total]
  );

  const passed = percentage >= PASS_THRESHOLD;

  const missedQuestions = useMemo(() => {
    const missed: { question: QuizQuestion; userAnswer: number; idx: number }[] = [];
    for (const [qIdx, ans] of Object.entries(answers)) {
      const idx = Number(qIdx);
      if (questions[idx].correctIndex !== ans) {
        missed.push({ question: questions[idx], userAnswer: ans, idx });
      }
    }
    return missed;
  }, [answers, questions]);

  function generateCertId(): string {
    const ts = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `CN-${ts}-${rand}`;
  }

  // Save result
  useEffect(() => {
    if (phase !== "result" || saving || saved || !session?.user?.id) return;
    const gen = ++saveGen.current;
    setSaving(true);
    fetch("/api/progress/certificate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        score,
        total,
        percentage,
        certId,
        userName: session?.user?.name || "Student",
      }),
    })
      .then((res) => res.json())
      .then(() => { if (saveGen.current === gen) setSaved(true); })
      .catch(() => {})
      .finally(() => { if (saveGen.current === gen) setSaving(false); });
  }, [phase, score, total, percentage, passed, saving, saved, session, certId]);

  const retry = () => {
    saveGen.current++;
    setQuestions(shuffleArray(questionPool).slice(0, QUESTIONS_PER_EXAM));
    setAnswers({});
    setFlagged(new Set());
    setCurrent(0);
    setPhase("start");
    setSaved(false);
    setSaving(false);
    setTimeLeft(EXAM_TIME_SECONDS);
    setCertId(generateCertId());
  };

  // ── START SCREEN ──
  if (phase === "start") {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-6 inline-flex size-16 items-center justify-center rounded-full bg-blue-100">
            <svg className="size-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">Certificate Exam</h1>
          <p className="mb-8 text-gray-500">Test your overall knowledge to earn your CodeNest certificate.</p>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-2xl font-bold text-gray-900">{QUESTIONS_PER_EXAM}</div>
              <div className="text-xs text-gray-500">Questions</div>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-2xl font-bold text-gray-900">{EXAM_TIME_MINUTES}</div>
              <div className="text-xs text-gray-500">Minutes</div>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-2xl font-bold text-gray-900">{PASS_THRESHOLD}%</div>
              <div className="text-xs text-gray-500">To Pass</div>
            </div>
          </div>

          <ul className="mb-8 space-y-2 text-left text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <svg className="mt-0.5 size-4 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              Questions are randomly selected from a pool of {questionPool.length} covering all topics.
            </li>
            <li className="flex items-start gap-2">
              <svg className="mt-0.5 size-4 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              You have {EXAM_TIME_MINUTES} minutes to complete the exam.
            </li>
            <li className="flex items-start gap-2">
              <svg className="mt-0.5 size-4 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              You need {PASS_THRESHOLD}% or higher to pass and earn your certificate.
            </li>
            <li className="flex items-start gap-2">
              <svg className="mt-0.5 size-4 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              You can flag questions to review later. Use the palette to jump between questions.
            </li>
          </ul>

          <button
            onClick={() => setPhase("exam")}
            className="rounded-lg bg-blue-600 px-10 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  // ── RESULT SCREEN ──
  if (phase === "result") {
    let gradeColor = "text-red-600";
    let gradeBg = "bg-red-50 border-red-200";
    let gradeLabel = "Needs Improvement";
    if (passed) {
      gradeColor = "text-green-600";
      gradeBg = "bg-green-50 border-green-200";
      gradeLabel = "Congratulations!";
    } else if (percentage >= 60) {
      gradeColor = "text-yellow-600";
      gradeBg = "bg-yellow-50 border-yellow-200";
      gradeLabel = "Almost There";
    }

    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="text-center">
            {passed ? (
              <div className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-green-100">
                <svg className="size-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            ) : (
              <div className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-red-100">
                <svg className="size-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            <h2 className="mb-2 text-2xl font-bold text-gray-900">{gradeLabel}</h2>
            <p className="mb-6 text-gray-500">You scored {score} out of {total}</p>

            <div className={`mx-auto mb-6 inline-flex size-36 items-center justify-center rounded-full border-4 ${gradeBg} ${gradeColor}`}>
              <div>
                <span className="text-4xl font-bold">{percentage}%</span>
              </div>
            </div>

            {passed && (
              <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="font-semibold text-green-800">You passed the certificate exam!</p>
                <p className="mt-1 text-sm text-green-700">You have demonstrated a strong understanding of web development fundamentals.</p>
              </div>
            )}

            {saving && <p className="mb-4 text-sm text-gray-400">Saving your result...</p>}
            {saved && <p className="mb-4 text-sm text-green-600">Result saved to your profile</p>}
            {!session?.user?.id && <p className="mb-4 text-sm text-gray-400">Sign in to save your exam results</p>}
            {timeLeft === 0 && <p className="mb-4 text-sm text-orange-600">Time&apos;s up! Your exam was automatically submitted.</p>}

            {passed && saved && (
              <div className="mb-6">
                <DownloadCertificate
                  name={session?.user?.name || "Student"}
                  email={session?.user?.email || ""}
                  score={score}
                  total={total}
                  percentage={percentage}
                  certId={certId}
                />
              </div>
            )}
          </div>

          {/* Missed questions */}
          {missedQuestions.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-red-700">Missed Questions ({missedQuestions.length})</h3>
              <div className="space-y-4">
                {missedQuestions.map(({ question: q, userAnswer, idx }) => (
                  <div key={idx} className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                    <p className="mb-2 font-medium text-gray-900">{q.question}</p>
                    <p className="mb-1 text-sm text-red-600"><span className="font-semibold">Your answer:</span> {q.options[userAnswer]}</p>
                    <p className="mb-2 text-sm text-green-700"><span className="font-semibold">Correct answer:</span> {q.options[q.correctIndex]}</p>
                    <p className="text-sm text-gray-600"><span className="font-semibold">Explanation:</span> {q.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Correct questions summary */}
          {score > 0 && (
            <div className="mb-8">
              <details className="group">
                <summary className="cursor-pointer text-sm font-semibold text-green-700 hover:text-green-800">
                  Correct Answers ({score})
                </summary>
                <div className="mt-3 space-y-2">
                  {questions.map((q, idx) => {
                    const userAns = answers[idx];
                    const correct = userAns === q.correctIndex;
                    if (!correct) return null;
                    return (
                      <div key={idx} className="rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm">
                        <p className="font-medium text-gray-900">{q.question}</p>
                        <p className="text-green-700">{q.options[q.correctIndex]}</p>
                      </div>
                    );
                  })}
                </div>
              </details>
            </div>
          )}

          {/* All questions review */}
          <div className="mb-8">
            <h3 className="mb-3 text-base font-semibold text-gray-900">All Questions</h3>
            <div className="space-y-2">
              {questions.map((q, idx) => {
                const userAns = answers[idx];
                const correct = userAns === q.correctIndex;
                const isUnanswered = userAns === undefined;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-2 text-sm ${
                      isUnanswered
                        ? "border-gray-200 bg-gray-50"
                        : correct
                          ? "border-green-200 bg-green-50"
                          : "border-red-200 bg-red-50"
                    }`}
                  >
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                        isUnanswered ? "bg-gray-300" : correct ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="flex-1 text-gray-700">{q.question}</span>
                    {isUnanswered ? (
                      <span className="text-xs text-gray-400">Unanswered</span>
                    ) : correct ? (
                      <svg className="size-4 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="size-4 shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button onClick={retry} className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
              Retry Exam
            </button>
            <Link href="/dashboard" className="rounded-lg border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── REVIEW BEFORE SUBMIT ──
  if (phase === "review") {
    const unanswered = total - answeredCount;
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 text-center">
            <div className="mb-3 inline-flex size-14 items-center justify-center rounded-full bg-blue-100">
              <svg className="size-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">Review Your Answers</h2>
            <p className="text-sm text-gray-500">
              {answeredCount} of {total} answered
              {unanswered > 0 && (
                <span className="text-orange-600"> &middot; {unanswered} unanswered</span>
              )}
            </p>
          </div>

          <div className="mb-6 space-y-2">
            {questions.map((q, idx) => {
              const isAnswered = answers[idx] !== undefined;
              const isFlagged = flagged.has(idx);
              return (
                <button
                  key={idx}
                  onClick={() => { setCurrent(idx); setPhase("exam"); }}
                  className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50 ${
                    isAnswered ? "border-green-200 bg-green-50/50" : "border-orange-200 bg-orange-50/50"
                  }`}
                >
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                      isAnswered ? "bg-green-500" : "bg-orange-400"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="flex-1 truncate text-gray-700">{q.question}</span>
                  {isFlagged && (
                    <svg className="size-4 shrink-0 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 21V3h13.5l-2 5.5 2 5.5H6v7z" />
                    </svg>
                  )}
                  {isAnswered ? (
                    <svg className="size-4 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-xs font-medium text-orange-600">Answer</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
            <button
              onClick={() => setPhase("exam")}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              &larr; Back to Exam
            </button>
            <button
              onClick={submitExam}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Submit{unanswered > 0 ? ` (${unanswered} unanswered)` : ""}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── EXAM PHASE ──
  const isAnsweredCurrent = answers[current] !== undefined;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Top bar: timer + submit */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-500">
            Question {current + 1} of {total}
          </span>
          {flagged.has(current) && (
            <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-yellow-700">
              Flagged
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" d="M12 6v6l4 2" />
            </svg>
            <span
              className={`text-sm font-bold tabular-nums ${
                isCriticalTime ? "text-red-600 animate-pulse" : isLowTime ? "text-orange-600" : "text-gray-700"
              }`}
            >
              {formatTime(timeLeft)}
            </span>
          </div>
          <button
            onClick={() => setPhase("review")}
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Review &amp; Submit
          </button>
        </div>
      </div>

      {/* Timer bar */}
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${
            isCriticalTime ? "bg-red-500" : isLowTime ? "bg-orange-400" : "bg-blue-500"
          }`}
          style={{ width: `${timerPercent}%` }}
        />
      </div>

      <div className="flex gap-6">
        {/* Question palette */}
        <div ref={questionListRef} className="hidden w-20 shrink-0 space-y-1.5 sm:block">
          {questions.map((q, idx) => {
            const isAnswered = answers[idx] !== undefined;
            const isCurrent = idx === current;
            const isFlagged = flagged.has(idx);
            return (
              <button
                key={idx}
                data-qidx={idx}
                onClick={() => goToQuestion(idx)}
                className={`relative flex size-full items-center justify-center rounded-lg border py-2 text-xs font-bold transition-all ${
                  isCurrent
                    ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-200"
                    : isAnswered
                      ? "border-green-300 bg-green-50 text-green-700"
                      : "border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {idx + 1}
                {isFlagged && (
                  <svg className="absolute -right-1 -top-1 size-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 21V3h13.5l-2 5.5 2 5.5H6v7z" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile question palette (horizontal scroll) */}
        <div className="-mx-4 mb-3 overflow-x-auto px-4 sm:hidden">
          <div className="flex gap-1.5">
            {questions.map((q, idx) => {
              const isAnswered = answers[idx] !== undefined;
              const isCurrent = idx === current;
              const isFlagged = flagged.has(idx);
              return (
                <button
                  key={idx}
                  onClick={() => goToQuestion(idx)}
                  className={`relative flex size-9 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition-all ${
                    isCurrent
                      ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-200"
                      : isAnswered
                        ? "border-green-300 bg-green-50 text-green-700"
                        : "border-gray-200 bg-white text-gray-400"
                  }`}
                >
                  {idx + 1}
                  {isFlagged && <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-yellow-500" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question card + navigation */}
        <div className="min-w-0 flex-1">
          {/* Question card */}
          <div className="mb-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold leading-relaxed text-gray-900">
              {current + 1}. {question.question}
            </h2>
            <div className="space-y-3">
              {question.options.map((option, idx) => {
                const isSelected = selected === idx;
                let borderStyle = "border-gray-200 hover:border-blue-300 hover:bg-blue-50";

                if (isAnsweredCurrent) {
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
                    className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${borderStyle} ${
                      isAnsweredCurrent ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isAnsweredCurrent
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
                    {isAnsweredCurrent && idx === question.correctIndex && (
                      <svg className="size-5 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {isAnsweredCurrent && isSelected && idx !== question.correctIndex && (
                      <svg className="size-5 shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>

            {isAnsweredCurrent && (
              <div className="mt-4 animate-fade-in rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-900">
                <span className="font-semibold">Explanation:</span> {question.explanation}
              </div>
            )}
          </div>

          {/* Navigation bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                disabled={current === 0}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                &larr; Previous
              </button>
              <button
                onClick={toggleFlag}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  flagged.has(current)
                    ? "border-yellow-300 bg-yellow-50 text-yellow-700"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <svg className={`size-4 ${flagged.has(current) ? "text-yellow-500" : "text-gray-400"}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 21V3h13.5l-2 5.5 2 5.5H6v7z" />
                  </svg>
                  Flag
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-gray-400 sm:inline">
                {isAnsweredCurrent ? "Answered" : "Select an answer"}
              </span>
              <button
                onClick={goNext}
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                {current < total - 1 ? "Next →" : "Review & Submit →"}
              </button>
            </div>
          </div>

          {/* Keyboard shortcut hints */}
          <div className="mt-4 flex flex-wrap gap-3 text-[10px] text-gray-400">
            <span>1-4: Select answer</span>
            <span>&larr; &rarr;: Navigate</span>
            <span>F: Flag question</span>
          </div>
        </div>
      </div>
    </div>
  );
}
