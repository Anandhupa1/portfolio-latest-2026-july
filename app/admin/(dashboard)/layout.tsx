import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import AdminShell from "@/components/admin/AdminShell";
import { getSession, clearSessionCookie } from "@/lib/auth/session";
import { getUsersCollection } from "@/lib/auth/users";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const users = await getUsersCollection();
  const user = await users.findOne({
    _id: new ObjectId(session.sub),
    isVerified: true,
  });

  if (!user) {
    await clearSessionCookie();
    redirect("/admin/login");
  }

  return <AdminShell email={session.email}>{children}</AdminShell>;
}
