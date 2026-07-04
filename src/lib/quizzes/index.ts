import type { Quiz } from "@/lib/models/quiz";
import { gettingStartedQuiz } from "./getting-started";
import { htmlQuiz } from "./html";
import { cssQuiz } from "./css";
import { javascriptQuiz } from "./javascript";
import { reactQuiz } from "./react";
import { pythonQuiz } from "./python";
import { sqlQuiz } from "./sql";
import { certificateQuiz } from "./certificate";

export const quizzes: Quiz[] = [
  gettingStartedQuiz,
  htmlQuiz,
  cssQuiz,
  javascriptQuiz,
  reactQuiz,
  pythonQuiz,
  sqlQuiz,
];

export { certificateQuiz };

export const quizMap: Record<string, Quiz> = Object.fromEntries(
  quizzes.map((q) => [q.topicId, q])
);
