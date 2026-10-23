"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { institutionalSchema, institutionalValueSchema, type InstitutionalDocument, type InstitutionalValue } from "@/lib/admin/institutional-schema";

function refresh() { revalidatePath("/", "layout"); }
const conflict = "El contenido cambió en otra sesión. Recargá la página antes de guardar.";
export async function saveInstitutional(input: unknown): Promise<{error?:string;content?:InstitutionalDocument}> {
  const {client}=await requireAdmin({ writable: true });
  const parsed=institutionalSchema.safeParse(input);
  if(!parsed.success) return {error:parsed.error.issues.map(i=>i.message).join(" · ")};
  const {revision,...fields}=parsed.data;
  try {
    const query=revision===0 ? client.from("fme_institutional").insert({id:1,...fields}) : client.from("fme_institutional").update(fields).eq("id",1).eq("revision",revision);
    const {data,error}=await query.select("mission,vision,home_intro,members_intro,community_text,revision").maybeSingle();
    if(error||!data) return {error:error?.code==="23505"||!error ? conflict : "No se pudo guardar. Revisá la conexión y los permisos."};
    refresh();return {content:institutionalSchema.parse(data)};
  } catch {return {error:"No se pudo conectar. Intentá guardar nuevamente."};}
}
export async function saveInstitutionalValue(input: unknown): Promise<{error?:string;value?:InstitutionalValue}> {
  const {client}=await requireAdmin({ writable: true });
  const parsed=institutionalValueSchema.safeParse(input);
  if(!parsed.success) return {error:parsed.error.issues.map(i=>i.message).join(" · ")};
  const {id,revision,...fields}=parsed.data;
  try {
    const query=id ? client.from("fme_values").update(fields).eq("id",id).eq("revision",revision) : client.from("fme_values").insert(fields);
    const {data,error}=await query.select("id,name,description,sort_order,active,revision").maybeSingle();
    if(error||!data) return {error:error ? "No se pudo guardar el valor. Revisá la conexión y los permisos." : conflict};
    refresh();return {value:data as InstitutionalValue};
  } catch {return {error:"No se pudo conectar. Intentá guardar nuevamente."};}
}

