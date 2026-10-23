import type { NextConfig } from "next";
const publicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
let privateKey = publicKey.startsWith("sb_secret_");
try { if (publicKey.split(".").length === 3) privateKey ||= JSON.parse(Buffer.from(publicKey.split(".")[1], "base64url").toString()).role === "service_role"; } catch { /* Supabase validará las claves públicas mal formadas. */ }
if (privateKey) throw new Error("La variable pública de Supabase no puede contener una clave secreta/service_role.");
const config: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  async headers() {
    const headers = [
      { key: "Cache-Control", value: "private, no-store, max-age=0" },
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "same-origin" },
    ];
    return ["/admin/:path*", "/api/admin/:path*"].map(source => ({source,headers}));
  },
};
export default config;
