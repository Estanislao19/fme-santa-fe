import { NextResponse, type NextRequest } from "next/server";
import { adminAccess } from "@/lib/admin/auth";
import { adminReturnPath } from "@/lib/supabase/session";
import { clearSessionCookies } from "@/lib/supabase/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Auth renueva y el adaptador SSR escribe cookies antes de enviar el redirect.
export async function GET(request: NextRequest) {
  const access = await adminAccess({ writable: true });
  // Incluso cookies corruptas que el SDK no elimine deben dejar de reenviarse.
  // De otro modo login podría volver a intentar la misma renovación inválida.
  if(access.status !== "authorized") await clearSessionCookies();
  const target = access.status === "authorized"
    ? adminReturnPath(request.nextUrl.searchParams.get("next"))
    : access.status === "forbidden" ? "/admin/login/?denied=1" : "/admin/login/";
  return NextResponse.redirect(new URL(target, request.url), {
    status: 303,
    headers: { "Cache-Control": "private, no-store, max-age=0", "X-Robots-Tag": "noindex, nofollow" },
  });
}
