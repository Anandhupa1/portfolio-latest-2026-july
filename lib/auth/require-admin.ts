import { ObjectId } from "mongodb";
import { getSession, type SessionPayload } from "@/lib/auth/session";
import { getUsersCollection } from "@/lib/auth/users";

export type RequireAdminResult =
  | { ok: true; session: SessionPayload }
  | { ok: false; error: string };

/** Ensures a verified admin session for server actions / route handlers. */
export async function requireVerifiedAdmin(): Promise<RequireAdminResult> {
  const session = await getSession();
  if (!session) {
    return { ok: false, error: "You must be signed in." };
  }

  try {
    const users = await getUsersCollection();
    const user = await users.findOne({
      _id: new ObjectId(session.sub),
      isVerified: true,
    });
    if (!user) {
      return { ok: false, error: "Admin access required." };
    }
    return { ok: true, session };
  } catch (err) {
    console.error("requireVerifiedAdmin error:", err);
    return { ok: false, error: "Could not verify admin session." };
  }
}
