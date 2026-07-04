import { Quiz } from "../models/quiz";
import { gettingStartedQuiz } from "./getting-started";
import { htmlQuiz } from "./html";
import { cssQuiz } from "./css";
import { javascriptQuiz } from "./javascript";
import { reactQuiz } from "./react";

export const quizzes: Quiz[] = [
  gettingStartedQuiz,
  htmlQuiz,
  cssQuiz,
  javascriptQuiz,
  reactQuiz,
];

export const quizMap: Record<string, Quiz> = Object.fromEntries(
  quizzes.map((q) => [q.topicId, q])
);
