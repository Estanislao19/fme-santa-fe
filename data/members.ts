import type { Member } from "@/types";
// DEMO / REEMPLAZAR: registros ilustrativos; no representan personas ni emprendimientos reales.
export const members: Member[] = [
  {
    slug: "emprendimiento-gastronomico-demo",
    category: "Gastronomía",
    description:
      "Un espacio para presentar la propuesta gastronómica de una socia.",
    offers: ["Productos y servicios a confirmar"],
  },
  {
    slug: "emprendimiento-diseno-demo",
    category: "Productos",
    description:
      "Un espacio para dar a conocer productos creados por una emprendedora.",
    offers: ["Catálogo de productos a confirmar"],
  },
  {
    slug: "emprendimiento-servicios-demo",
    category: "Servicios",
    description:
      "Un espacio para conectar con los servicios de nuestra comunidad.",
    offers: ["Servicios y asesoramiento a confirmar"],
  },
  {
    slug: "emprendimiento-bienestar-demo",
    category: "Salud y Bienestar",
    description:
      "Un espacio para presentar una propuesta de salud y bienestar.",
    offers: ["Propuesta profesional a confirmar"],
  },
  {
    slug: "emprendimiento-moda-demo",
    category: "Moda",
    description:
      "Un espacio para conocer una propuesta de moda de la comunidad.",
    offers: ["Colecciones y productos a confirmar"],
  },
  {
    slug: "emprendimiento-profesional-demo",
    category: "Profesionales",
    description: "Un espacio para visibilizar el trabajo de una profesional.",
    offers: ["Servicios profesionales a confirmar"],
  },
].map((item, index) => ({
  ...item,
  name: `Socia de ejemplo ${String(index + 1).padStart(2, "0")}`,
  business: "Emprendimiento de ejemplo",
  story:
    "Este perfil de demostración está preparado para contar la historia de la mujer detrás del emprendimiento: cómo empezó, qué la mueve y qué desea compartir con la comunidad. El contenido se reemplazará por su historia real y autorizada.",
  gallery: [],
  active: true,
  demo: true,
}));
