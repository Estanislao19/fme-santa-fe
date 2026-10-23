export const collectionKinds = ["members", "trainings", "alliances", "collaborators", "projects"] as const;
export type ContentKind = typeof collectionKinds[number];
export type PublicationState = "draft" | "published" | "archived";
export interface ContentRecord {
  id: string; kind: ContentKind; slug: string; data: Record<string, unknown>;
  active: boolean; featured: boolean; sort_order: number; state: PublicationState;
  revision: number; created_at?: string; updated_at?: string;
}
export type EditorField = { key: string; label: string; type?: "text" | "textarea" | "select" | "url" | "tel" | "image" | "gallery" | "lines" | "checkbox"; options?: readonly string[]; required?: boolean; help?: string };
export const collections: Record<string, { kind: ContentKind; title: string; singular: string; nameField: string; fields: EditorField[] }> = {
  socias: { kind: "members", title: "Socias", singular: "Socia", nameField: "name", fields: [
    { key: "name", label: "Nombre y apellido", required: true },
    { key: "business", label: "Emprendimiento", required: true },
    { key: "category", label: "Rubro", type: "select", required: true },
    { key: "description", label: "Descripción breve", type: "textarea", required: true },
    { key: "story", label: "Su historia", type: "textarea" },
    { key: "offers", label: "Qué ofrece", type: "lines", help: "Una propuesta por línea." },
    { key: "phone", label: "Teléfono", type: "tel" },
    { key: "whatsapp", label: "WhatsApp", type: "tel", help: "Incluir código de país y de área." },
    { key: "instagram", label: "Instagram", type: "url" },
    { key: "image", label: "Fotografía principal", type: "image" },
    { key: "gallery", label: "Galería", type: "gallery" },
  ] },
  capacitaciones: { kind: "trainings", title: "Capacitaciones", singular: "Capacitación", nameField: "title", fields: [
    { key: "title", label: "Título", required: true }, { key: "description", label: "Descripción", type: "textarea", required: true },
    { key: "status", label: "Agenda", type: "select", options: ["upcoming", "past"] },
    ...[ ["date", "Fecha"], ["time", "Horario"], ["location", "Lugar"], ["modality", "Modalidad"], ["duration", "Duración"], ["teacher", "Profesional / capacitador"], ["capacity", "Cupos"], ["price", "Precio general"], ["memberPrice", "Precio para socias"] ].map(([key, label]) => ({ key, label })),
    { key: "image", label: "Imagen principal", type: "image" }, { key: "gallery", label: "Galería", type: "gallery" },
    { key: "video", label: "Video opcional", type: "url", help: "Enlace HTTPS a un video MP4 autorizado (no un enlace de YouTube)." },
    { key: "registrationUrl", label: "Link de inscripción", type: "url", help: "Si se deja vacío, se conserva el formulario público con su estado de integración actual." },
  ] },
  alianzas: { kind: "alliances", title: "Alianzas", singular: "Alianza", nameField: "name", fields: [
    { key: "name", label: "Empresa / institución", required: true }, { key: "kind", label: "Tipo" },
    { key: "description", label: "Descripción", type: "textarea", required: true }, { key: "action", label: "Proyecto / acción en conjunto", type: "textarea" },
    { key: "logo", label: "Logo", type: "image" }, { key: "image", label: "Fotografía", type: "image" }, { key: "gallery", label: "Galería", type: "gallery" },
    { key: "url", label: "Web", type: "url" }, { key: "instagram", label: "Instagram", type: "url" }, { key: "link", label: "Otro enlace", type: "url" },
  ] },
  colaboradores: { kind: "collaborators", title: "Colaboradores", singular: "Colaborador", nameField: "name", fields: [
    { key: "name", label: "Nombre", required: true }, { key: "kind", label: "Tipo", required: true },
    { key: "description", label: "Cómo acompaña", type: "textarea" }, { key: "logo", label: "Logo", type: "image" },
    { key: "image", label: "Fotografía", type: "image" }, { key: "url", label: "Web", type: "url" }, { key: "instagram", label: "Instagram", type: "url" },
  ] },
  proyectos: { kind: "projects", title: "Proyectos / Eventos", singular: "Proyecto / Evento", nameField: "title", fields: [
    { key: "title", label: "Título", required: true }, { key: "description", label: "Descripción", type: "textarea", required: true },
    { key: "kind", label: "Tipo", type: "select", options: ["Proyecto", "Evento", "Campaña"] }, { key: "date", label: "Fecha" },
    { key: "objective", label: "Objetivo", type: "textarea" }, { key: "image", label: "Imagen", type: "image" },
    { key: "cta", label: "Texto del botón" }, { key: "ctaUrl", label: "Destino del botón", type: "url", help: "Dejar vacío para consultar por los canales de contacto." },
  ] },
};
export function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100).replace(/-$/, "");
}
export function recordTitle(record: ContentRecord) {
  return String(record.data.name || record.data.title || record.slug);
}
