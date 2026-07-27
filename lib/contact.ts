import type { Collection } from "mongodb";
import { getDb } from "@/lib/mongodb";

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  company: string | null;
  projectType: string | null;
  source: string;
  pageUrl: string | null;
  userAgent: string | null;
  ipHash: string | null;
  status: "new" | "read" | "replied" | "spam";
  createdAt: Date;
};

export async function getContactCollection(): Promise<
  Collection<ContactSubmission>
> {
  const db = await getDb();
  return db.collection<ContactSubmission>("contact_submissions");
}
