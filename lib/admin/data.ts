import "server-only";
import { requireAdmin } from "./auth";
import type { ContentKind, ContentRecord } from "./collections";
export async function adminRecords(kind?: ContentKind) {
  const { client } = await requireAdmin();
  const records: ContentRecord[] = [];
  for (let from = 0; ; from += 500) {
    let query = client.from("fme_content").select("*").order("sort_order").order("id").range(from, from + 499);
    if (kind) query = query.eq("kind", kind);
    const { data, error } = await query;
    if (error) throw new Error("No se pudo leer el contenido del panel. Revisá las migraciones y la conexión.");
    records.push(...data as ContentRecord[]);
    if (data.length < 500) break;
  }
  return records;
}
