import type { Collaborator } from "@/types";
// DEMO / REEMPLAZAR. No implica una colaboración vigente.
export const collaborators: Collaborator[] = [
  "Empresa",
  "Profesional",
  "Institución",
  "Organización",
].map((kind) => ({ name: `${kind} de ejemplo`, kind, demo: true }));
