import { combineChunks, stringFromBase64URL, isChunkLike } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

type Cookie = { name: string; value: string };
export function sessionCookieName(url:string) { return `sb-${new URL(url).hostname.split(".")[0]}-auth-token`; }
export function sessionCookiesToClear(url:string,cookies:Cookie[]) {
  const key=sessionCookieName(url);
  return cookies.filter(cookie=>isChunkLike(cookie.name,key)).map(cookie=>cookie.name);
}
// La cookie solo indica si renovar; NO acredita identidad ni permisos.
export async function readSessionCookie(url: string, cookies: Cookie[], now = Date.now()) {
  const key = sessionCookieName(url);
  const raw = await combineChunks(key, name => cookies.find(cookie => cookie.name === name)?.value);
  if (!raw) return null;
  try {
    const session = JSON.parse(raw.startsWith("base64-") ? stringFromBase64URL(raw.slice(7)) : raw);
    if (typeof session?.access_token !== "string" || !session.access_token) return null;
    const payload = JSON.parse(Buffer.from(session.access_token.split(".")[1], "base64url").toString("utf8"));
    const expires = typeof payload.exp === "number" && Number.isFinite(payload.exp) ? payload.exp * 1000 : 0;
    return { accessToken: session.access_token, needsRefresh: expires - now < 60_000 };
  } catch { return null; }
}
export function readOnlyClient(url: string, key: string, accessToken: string) {
  // JWT explícito: no rota refresh tokens durante un render de solo lectura.
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { headers: { Authorization: `Bearer ${accessToken}` },
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
  });
}
export function adminReturnPath(value: string | null) {
  if (!value || value.length > 1000 || /[\\\r\n%?#]/.test(value)) return "/admin/";
  if (value !== "/admin" && !value.startsWith("/admin/")) return "/admin/";
  if (/^\/admin\/(login|session)(\/|$)/.test(value) || value.includes("..")) return "/admin/";
  return value;
}
