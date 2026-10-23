import { createServerClient, type CookieMethodsServer } from "@supabase/ssr";

// Una instancia por petición. Solo se usa donde es posible emitir Set-Cookie.
export function cookieClient(config: {url:string;key:string}, cookies: CookieMethodsServer) {
  return createServerClient(config.url, config.key, {
    cookieOptions: { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" },
    cookies,
  });
}
