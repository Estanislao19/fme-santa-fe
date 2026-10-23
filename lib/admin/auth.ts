import "server-only";
import { redirect } from "next/navigation";
import { readOnlySession, sessionClient } from "@/lib/supabase/server";
import { verifyAdmin } from "./access";

// Cada página, acción y upload valida identidad y autorización. El layout no es la frontera.
export async function adminAccess({ writable = false } = {}) {
  if (writable) {
    const client = await sessionClient();
    return client ? verifyAdmin(client) : { status: "anonymous" as const };
  }
  const session = await readOnlySession();
  if (!session) return { status: "anonymous" as const };
  if (session.needsRefresh) return { status: "refresh" as const };
  return verifyAdmin(session.client, session.accessToken);
}
export async function requireAdmin(options = { writable: false }) {
  const access = await adminAccess(options);
  if (access.status === "refresh") redirect("/api/admin/session/?next=/admin/");
  if (access.status === "forbidden") redirect("/admin/login/?denied=1");
  if (access.status !== "authorized") redirect("/admin/login");
  return access;
}
