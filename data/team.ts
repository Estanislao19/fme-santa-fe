import type { TeamPerson } from "@/types";
import { UNKNOWN } from "./site";
export const team: TeamPerson[] = [
  "Presidenta",
  "Secretaria",
  "Comisión de Eventos",
  "Comunicación",
  "Administración",
  "Voluntarias",
].map((role) => ({
  role,
  name: UNKNOWN,
  description: "Información del equipo pendiente de confirmación.",
}));
