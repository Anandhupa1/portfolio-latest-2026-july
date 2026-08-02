import type { Collection, ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export type AdminUser = {
  _id: ObjectId;
  email: string;
  passwordHash: string;
  /** Set to true by a super admin (e.g. in MongoDB) to allow login. */
  isVerified: boolean;
  createdAt: Date;
};

export async function getUsersCollection(): Promise<Collection<AdminUser>> {
  const db = await getDb();
  return db.collection<AdminUser>("admin_users");
}
