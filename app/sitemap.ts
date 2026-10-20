import type { MetadataRoute } from "next";
import { site, navigation } from "@/data/site";
import { members } from "@/data/members";
import { trainings } from "@/data/trainings";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return [
    ...navigation.map(([, p]) => p),
    "/voluntariado",
    "/politica-de-privacidad",
    "/terminos-y-condiciones",
    ...members.filter((m) => m.active).map((m) => `/socias/${m.slug}`),
    ...trainings.map((t) => `/capacitaciones/${t.slug}`),
  ].map((path) => ({
    url: `${site.url.replace(/\/$/, "")}${path}/`.replace(/\/{2}$/, "/"),
  }));
}
