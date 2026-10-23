import type { SupabaseClient } from "@supabase/supabase-js";
export async function verifyAdmin(client: SupabaseClient, accessToken?: string) {
  const { data: { user }, error } = await client.auth.getUser(accessToken);
  if (error || !user) return { status: "anonymous" as const };
  const { data: allowed, error: denied } = await client.rpc("is_fme_admin");
  if (denied || allowed !== true) return { status: "forbidden" as const };
  return { status: "authorized" as const, client, user };
}
