import type { Metadata } from "next";
import { site } from "@/data/site";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    ...(site.url
      ? { alternates: { canonical: `${site.url.replace(/\/$/, "")}${path}` } }
      : {}),
    openGraph: {
      title: `${title} | FME`,
      description,
      locale: "es_AR",
      type: "website",
      ...(site.url ? { url: `${site.url}${path}` } : {}),
    },
  };
}
