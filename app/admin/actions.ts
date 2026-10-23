"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/auth";
import { sessionClient, clearSessionCookies } from "@/lib/supabase/server";
import { validateRecord } from "@/lib/admin/validation";
import { collections, type ContentRecord } from "@/lib/admin/collections";
import { supabaseConfig } from "@/lib/supabase/config";

export async function login(_previous: { error: string }, form: FormData) {
  const parsed = z.object({ email: z.email(), password: z.string().min(1).max(200) }).safeParse({ email: form.get("email"), password: form.get("password") });
  if (!parsed.success) return { error: "Ingresá un email válido y tu contraseña." };
  const client = await sessionClient();
  if (!client) return { error: "El administrador todavía requiere la configuración de Supabase." };
  try {
    const { error } = await client.auth.signInWithPassword(parsed.data);
    if (error) return { error: "No pudimos iniciar sesión. Revisá tus datos o consultá con la persona que administra las cuentas." };
    const { data: allowed, error: denied } = await client.rpc("is_fme_admin");
    if (denied || allowed !== true) {
      await client.auth.signOut();
      return { error: "Esta cuenta no está autorizada para administrar FME." };
    }
  } catch { return { error: "No pudimos conectar con el servicio de acceso. Intentá nuevamente." }; }
  redirect("/admin");
}
export async function logout() {
  const client = await sessionClient();
  try { if (client) await client.auth.signOut({ scope: "local" }); } catch { /* El dispositivo igual debe poder cerrar su sesión. */ }
  await clearSessionCookies();
  revalidatePath("/admin", "layout");
  redirect("/admin/login");
}
export async function saveRecord(input: unknown, automaticSlug = false): Promise<{ ok: boolean; error?: string; record?: ContentRecord }> {
  const { client } = await requireAdmin({ writable: true });
  const validated = (() => { try { return validateRecord(input); } catch (e) {
    return { error: e instanceof z.ZodError ? e.issues.map(i => {
      const key = String(i.path[0] || "");
      const label = Object.values(collections).flatMap(c=>c.fields).find(f=>f.key===key)?.label || ({slug:"Enlace",state:"Estado",sort_order:"Orden"} as Record<string,string>)[key] || "Contenido";
      return `${label}: ${i.message}`;
    }).join(" · ") : "Revisá los campos." };
  } })();
  if ("error" in validated) return { ok: false, error: validated.error };
  const { id, revision, ...values } = validated;
  if (values.kind === "members") {
    const { data: category, error } = await client.from("fme_categories").select("id").eq("name", String(values.data.category)).maybeSingle();
    if (error || !category) return { ok: false, error: "Seleccioná un rubro existente." };
  }
  const base = values.slug;
  for (let attempt = 0; attempt < 20; attempt++) {
    const candidate = { ...values, slug: attempt ? `${base.slice(0, 95)}-${attempt + 1}` : base };
    const query = id
      ? client.from("fme_content").update(candidate).eq("id", id).eq("kind", values.kind).eq("revision", revision)
      : client.from("fme_content").insert(candidate);
    const { data, error } = await query.select("*").maybeSingle();
    if (error?.code === "23505" && !id && automaticSlug) continue;
    if (error) return { ok: false, error: error.code === "23505" ? "Ese enlace ya existe o está reservado por un enlace anterior. Elegí otro slug." : "No se pudo guardar. Revisá la conexión y tus permisos e intentá nuevamente." };
    if (!data) return { ok: false, error: "Este contenido cambió en otra sesión. Volvé al listado y abrilo de nuevo antes de guardar." };
    revalidatePath("/", "layout");
    return { ok: true, record: data as ContentRecord };
  }
  return { ok: false, error: "No se pudo generar un enlace único. Escribí un slug diferente." };
}
export async function deleteRecord(id: string, revision: number, confirmation: string) {
  const { client } = await requireAdmin({ writable: true });
  if (!z.uuid().safeParse(id).success || !Number.isInteger(revision)) return { ok: false, error: "Registro no válido." };
  const { data: record, error: readError } = await client.from("fme_content").select("data").eq("id", id).single();
  if (readError || !record) return { ok: false, error: "El registro no está disponible." };
  const title = String(record.data.name || record.data.title || "");
  if (!title || confirmation !== title) return { ok: false, error: "Escribí el nombre exacto para confirmar la eliminación." };
  const { data, error } = await client.from("fme_content").delete().eq("id", id).eq("revision", revision).select("id").maybeSingle();
  if (error || !data) return { ok: false, error: "No se eliminó el registro. Puede haber cambiado en otra sesión; actualizá el listado." };
  revalidatePath("/", "layout");
  return { ok: true };
}
export async function addCategory(form: FormData) {
  const { client } = await requireAdmin({ writable: true });
  const name = String(form.get("name") || "").trim();
  if (!name || name.length > 100) return { error: "Escribí un rubro de hasta 100 caracteres." };
  const { error } = await client.from("fme_categories").insert({ name });
  if (error) return { error: error.code === "23505" ? "Ese rubro ya existe." : "No se pudo agregar el rubro." };
  revalidatePath("/", "layout");
  return { message: "Rubro agregado correctamente." };
}
export async function deleteMedia(url: string) {
  const { client } = await requireAdmin({ writable: true });
  const config = supabaseConfig()!;
  const prefix = `${config.url.replace(/\/$/, "")}/storage/v1/object/public/fme-media/`;
  if (!url.startsWith(prefix)) return { ok: false, error: "El archivo no pertenece a la biblioteca de FME." };
  const path = url.slice(prefix.length);
  if (!/^[0-9a-f-]{36}\/[0-9a-f-]{36}\.webp$/.test(path)) return { ok: false, error: "La ruta del archivo no es válida." };
  // Revisar también borradores y archivados; nunca romper una referencia guardada.
  for (let from = 0; ; from += 500) {
    const { data, error } = await client.from("fme_content").select("data").order("id").range(from, from + 499);
    if (error) return { ok: false, error: "No se pudo comprobar si la imagen está en uso. No se eliminó." };
    if (JSON.stringify(data).includes(url)) return { ok: false, error: "Esta imagen todavía está en uso. Quitala de las fichas y guardá antes de eliminarla." };
    if (data.length < 500) break;
  }
  const { error } = await client.storage.from("fme-media").remove([path]);
  if (error) return { ok: false, error: "No se pudo eliminar el archivo de Storage." };
  revalidatePath("/admin/imagenes");
  return { ok: true };
}

