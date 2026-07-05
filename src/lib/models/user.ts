import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  userId: string;
  email: string;
  name: string;
  password?: string;
  role: string;
  createdAt: Date;
}
