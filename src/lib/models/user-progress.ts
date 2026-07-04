import { ObjectId } from "mongodb";

export interface Streak {
  count: number;
  lastActivityDate: string;
}

export interface UserProgress {
  _id: ObjectId;
  userId: string;
  completedLessons: string[];
  lastVisited: Date;
  streak: Streak;
}
