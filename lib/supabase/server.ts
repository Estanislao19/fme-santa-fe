import "server-only";
import { cookies } from "next/headers";
import { supabaseConfig } from "./config";
import { readOnlyClient, readSessionCookie, sessionCookiesToClear } from "./session";
import { cookieClient } from "./cookie-client";

export async function sessionClient() {
  const config = supabaseConfig();
  if (!config) return null;
  const jar = await cookies();
  return cookieClient(config, {
      getAll: () => jar.getAll(),
      setAll(values) {
        // Solo Server Actions/Route Handlers. Una escritura fallida no se silencia.
        values.forEach(({ name, value, options }) => jar.set(name, value, options));
      },
  });
}
export async function readOnlySession() {
  const config = supabaseConfig();
  if (!config) return null;
  const session = await readSessionCookie(config.url, (await cookies()).getAll());
  if (!session) return null;
  return { ...session, client: readOnlyClient(config.url, config.key, session.accessToken) };
}
export async function clearSessionCookies() {
  const config=supabaseConfig();
  if(!config)return;
  const jar=await cookies();
  for(const name of sessionCookiesToClear(config.url,jar.getAll())) {
    jar.set(name,"",{path:"/",maxAge:0,httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production"});
  }
}
