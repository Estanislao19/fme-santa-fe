import { z } from "zod";
export const institutionalFields = [
  { key: "mission", label: "Misión", max: 16000, rows: 5 },
  { key: "vision", label: "Visión", max: 16000, rows: 5 },
  { key: "home_intro", label: "Síntesis de la misión para Home", max: 600, rows: 3 },
  { key: "members_intro", label: "Texto introductorio de Socias", max: 12000, rows: 6 },
  { key: "community_text", label: "Texto de Comunidad", max: 30000, rows: 14 },
] as const;
export const institutionalSchema = z.object({
  mission: z.string().trim().min(1, "Completá la misión.").max(16000),
  vision: z.string().trim().min(1, "Completá la visión.").max(16000),
  home_intro: z.string().trim().min(1, "Completá la síntesis para Home.").max(600),
  members_intro: z.string().trim().min(1, "Completá la introducción de Socias.").max(12000),
  community_text: z.string().trim().min(1, "Completá el texto de Comunidad.").max(30000),
  revision: z.number().int().min(0),
}).strict();
export type InstitutionalDocument = z.infer<typeof institutionalSchema>;
export const institutionalValueSchema = z.object({
  id: z.uuid().optional(), name: z.string().trim().min(1, "Completá el nombre.").max(150),
  description: z.string().trim().min(1, "Completá la descripción.").max(3000),
  sort_order: z.number().int().min(0).max(100000), active: z.boolean(), revision: z.number().int().min(1),
}).strict();
export type InstitutionalValue = Omit<z.infer<typeof institutionalValueSchema>, "id"> & { id: string };
export function paragraphs(text: string) { return text.split(/\r?\n\s*\r?\n/).map(p=>p.trim()).filter(Boolean); }
