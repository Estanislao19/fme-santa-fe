import type { Training } from "@/types";
import { UNKNOWN } from "./site";
// DEMO / REEMPLAZAR: no hay convocatorias, fechas, precios ni docentes confirmados.
export const trainings: Training[] = [
  {
    slug: "taller-de-ejemplo",
    title: "Un espacio para aprender y hacer crecer tu emprendimiento",
    description:
      "Capacitación de demostración. Aquí se publicarán los contenidos, los objetivos y la información de inscripción de cada propuesta confirmada.",
    status: "upcoming",
  },
  {
    slug: "encuentro-realizado-de-ejemplo",
    title: "Encuentros que dejan aprendizajes compartidos",
    description:
      "Registro de demostración para la memoria institucional. Este espacio reunirá las fotografías, la persona que dictó la actividad y un resumen de lo vivido.",
    status: "past",
  },
].map((item) => ({
  ...item,
  status: item.status as Training["status"],
  date: UNKNOWN,
  time: UNKNOWN,
  location: UNKNOWN,
  modality: UNKNOWN,
  duration: UNKNOWN,
  teacher: UNKNOWN,
  capacity: UNKNOWN,
  price: UNKNOWN,
  memberPrice: UNKNOWN,
  gallery: [],
  demo: true,
}));
