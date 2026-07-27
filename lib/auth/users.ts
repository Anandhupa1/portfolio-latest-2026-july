import { randomBytes } from "crypto";
import type { Collection, ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export type AdminUser = {
  _id: ObjectId;
  email: string;
  passwordHash: string;
  /** Manually set to true in MongoDB to allow login. */
  isVerified: boolean;
  /** Lookup key shown after register — find this user in Atlas. */
  verificationKey: string;
  createdAt: Date;
};

export async function getUsersCollection(): Promise<Collection<AdminUser>> {
  const db = await getDb();
  return db.collection<AdminUser>("admin_users");
}

export function createVerificationKey() {
  return randomBytes(16).toString("hex");
}
