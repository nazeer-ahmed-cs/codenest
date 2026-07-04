import { ObjectId } from "mongodb";

export interface Streak {
  count: number;
  lastActivityDate: string;
}

export interface QuizScore {
  topicId: string;
  score: number;
  total: number;
  percentage: number;
  completedAt: string;
}

export interface UserProgress {
  _id: ObjectId;
  userId: string;
  completedLessons: string[];
  bookmarkedLessons: string[];
  quizScores: QuizScore[];
  lastVisited: Date;
  lastLessonSlug?: string;
  streak: Streak;
}
