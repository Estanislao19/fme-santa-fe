import type { MetadataRoute } from "next";
import { site } from "@/data/site";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(site.url ? { allow: "/", disallow: ["/admin/", "/api/admin/"] } : { disallow: "/" }),
    },
    ...(site.url
      ? { sitemap: `${site.url.replace(/\/$/, "")}/sitemap.xml` }
      : {}),
  };
}
