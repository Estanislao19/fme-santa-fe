import type { MetadataRoute } from "next";
import { site, navigation } from "@/data/site";
import { getPublicContent } from "@/lib/content";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!site.url) return [];
  const [members, trainings] = await Promise.all([getPublicContent("members"), getPublicContent("trainings")]);
  return [
    "/",
    ...navigation.map(([, p]) => p),
    "/voluntariado",
    "/beneficios",
    "/politica-de-privacidad",
    "/terminos-y-condiciones",
    ...members.filter((m) => m.active).map((m) => `/socias/${m.slug}`),
    ...trainings.map((t) => `/capacitaciones/${t.slug}`),
  ].filter((path,index,array) => array.indexOf(path) === index).map((path) => ({
    url: `${site.url.replace(/\/$/, "")}${path}/`.replace(/\/{2}$/, "/"),
  }));
}
