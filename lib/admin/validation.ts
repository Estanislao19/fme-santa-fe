import { z } from "zod";
import { collectionKinds, collections, type ContentKind } from "./collections";

export function safeLink(value: string, media = false) {
  if (!value) return true;
  if (media && /^\/(images|media)\/[a-zA-Z0-9/_ .-]+$/.test(value) && !value.includes("..")) return true;
  try { const u = new URL(value); return u.protocol === "https:" && !u.username && !u.password; } catch { return false; }
}
const text = z.string().max(12000, "El texto es demasiado largo.");
const link = z.string().max(2000).refine(v => safeLink(v), "Usá una dirección HTTPS completa.");
const image = z.string().max(2000).refine(v => safeLink(v, true), "La ruta de la imagen no es válida.");
export function payloadSchema(kind: ContentKind) {
  const fields = Object.values(collections).find(c => c.kind === kind)!.fields;
  const shape: Record<string, z.ZodType> = { demo: z.boolean().default(false) };
  for (const f of fields) {
    shape[f.key] = f.type === "gallery" ? z.array(image).max(20).default([])
      : f.type === "lines" ? z.array(z.string().max(500)).max(40).default([])
      : f.type === "image" ? image.default("")
      : f.type === "url" ? link.default("")
      : f.options ? z.enum(f.options as [string, ...string[]])
      : f.required ? z.string().trim().min(1, "Completá este campo.").max(f.key === "description" ? 1200 : 200)
      : text.default("");
  }
  // Campos numéricos legados: conservar montos existentes sin inventar recaudación.
  if (kind === "projects") { shape.target = z.number().nonnegative().optional(); shape.raised = z.number().nonnegative().optional(); }
  return z.object(shape).strict().superRefine((data, ctx) => {
    if (kind === "trainings" && data.video && !data.image) ctx.addIssue({code:"custom",path:["image"],message:"Agregá una imagen principal para usar como poster del video."});
  });
}
export const envelopeSchema = z.object({
  id: z.uuid().optional(), kind: z.enum(collectionKinds),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Usá letras minúsculas, números y guiones.").max(100),
  active: z.boolean(), featured: z.boolean(), sort_order: z.number().int().min(0).max(100000),
  state: z.enum(["draft", "published", "archived"]), revision: z.number().int().min(1),
  data: z.record(z.string(), z.unknown()),
}).strict();
export function validateRecord(input: unknown) {
  const envelope = envelopeSchema.parse(input);
  return { ...envelope, data: payloadSchema(envelope.kind).parse(envelope.data) };
}
