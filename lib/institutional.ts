import "server-only";
import { cache } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { publicClient } from "@/lib/content";
import { requireAdmin } from "@/lib/admin/auth";
import { officialInstitutional, officialValues } from "@/data/institutional";
import { institutionalSchema, type InstitutionalDocument, type InstitutionalValue } from "@/lib/admin/institutional-schema";

async function readInstitutional(client: SupabaseClient, admin: boolean) {
  const { data: row, error } = await client.from("fme_institutional").select("mission,vision,home_intro,members_intro,community_text,revision").eq("id", 1).maybeSingle();
  if (error) throw new Error("No se pudo leer el contenido institucional. Revisá la migración institucional de Supabase.");
  const values: InstitutionalValue[] = [];
  for (let from=0;;from+=500) {
    let query = client.from("fme_values").select("id,name,description,sort_order,active,revision").order("sort_order").order("name").order("id").range(from,from+499);
    if (!admin) query=query.eq("active",true);
    const { data, error: valueError }=await query;
    if (valueError) throw new Error("No se pudieron leer los valores institucionales.");
    values.push(...data as InstitutionalValue[]);
    if(data.length<500) break;
  }
  // Sin fila inicial se puede revisar la propuesta oficial. Los errores NO activan fallback.
  // Una lista vacía tras desactivar todos los valores se respeta; nunca se repone el seed.
  return {
    content: row ? institutionalSchema.parse(row) : { ...officialInstitutional, revision: 0 },
    values,
  };
}
export const getInstitutional = cache(async (): Promise<{content:InstitutionalDocument;values:InstitutionalValue[]}> => {
  const client=publicClient();
  if (!client) return { content:{...officialInstitutional,revision:0}, values:officialValues };
  return readInstitutional(client,false);
});
export async function getInstitutionalAdmin() {
  const {client}=await requireAdmin();
  return readInstitutional(client,true);
}
