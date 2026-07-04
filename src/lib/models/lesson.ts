import { ObjectId } from "mongodb";

export interface Lesson {
  _id: ObjectId;
  slug: string;
  title: string;
  description: string;
  topic: string;
  order: number;
  content: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
