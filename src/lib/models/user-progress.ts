import { ObjectId } from "mongodb";

export interface Streak {
  count: number;
  lastActivityDate: string;
}

export interface UserProgress {
  _id: ObjectId;
  userId: string;
  completedLessons: string[];
  bookmarkedLessons: string[];
  lastVisited: Date;
  streak: Streak;
}
