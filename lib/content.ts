import "server-only";
import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "@/lib/supabase/config";
import { members } from "@/data/members";
import { trainings } from "@/data/trainings";
import { alliances } from "@/data/alliances";
import { collaborators } from "@/data/collaborators";
import { projects } from "@/data/projects";
import { categories } from "@/data/categories";
import type { Member, Training, Alliance, Collaborator, Project } from "@/types";
import type { ContentKind, ContentRecord } from "@/lib/admin/collections";

type ContentMap = { members: Member; trainings: Training; alliances: Alliance; collaborators: Collaborator; projects: Project };
const local = { members, trainings, alliances, collaborators, projects };
export function publicClient() {
  const config = supabaseConfig();
  if (!config) {
    if (process.env.FME_ALLOW_LOCAL_CONTENT === "false") throw new Error("Supabase debe configurarse para servir contenido público.");
    return null;
  }
  return createClient(config.url, config.key, { auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) } });
}
export const getPublicContent = cache(async <K extends ContentKind>(kind: K): Promise<ContentMap[K][]> => {
  const client = publicClient();
  if (!client) return local[kind].filter(item => !("active" in item) || item.active) as ContentMap[K][];
  // RLS aplica además de estos filtros. Sin fallback local ante errores o listas vacías.
  const result: ContentMap[K][] = [];
  for (let from = 0; ; from += 500) {
    const { data, error } = await client.from("fme_content").select("*").eq("kind", kind)
      .eq("state", "published").eq("active", true).order("sort_order").order("id").range(from, from + 499);
    if (error) throw new Error("No se pudo leer el contenido publicado.");
    const rows = data as ContentRecord[];
    result.push(...rows.map(row => ({ ...row.data, slug: row.slug, active: row.active, featured: row.featured, order: row.sort_order }) as unknown as ContentMap[K]));
    if (rows.length < 500) break;
  }
  return result;
});
export const getCategories = cache(async (): Promise<string[]> => {
  const client = publicClient();
  if (!client) return [...categories];
  const { data, error } = await client.from("fme_categories").select("name").order("sort_order").order("name");
  if (error) throw new Error("No se pudieron leer los rubros.");
  return data.map(row => row.name as string);
});
export async function resolvePublicSlug<K extends "members" | "trainings">(kind: K, slug: string) {
  const items = await getPublicContent(kind);
  const current = items.find(item => item.slug === slug);
  if (current) return { item: current, canonical: slug };
  const client = publicClient();
  if (!client) return null;
  const { data: alias, error } = await client.from("fme_slug_aliases").select("content_id").eq("kind", kind).eq("slug", slug).maybeSingle();
  if (error) throw new Error("No se pudo resolver el enlace.");
  if (!alias) return null;
  const { data: record, error: failed } = await client.from("fme_content").select("slug").eq("id", alias.content_id).eq("kind", kind).eq("state", "published").eq("active", true).maybeSingle();
  if (failed) throw new Error("No se pudo resolver el enlace.");
  const item = record && items.find(item => item.slug === record.slug);
  return item ? { item, canonical: item.slug } : null;
}
