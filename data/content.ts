import { officialValues } from "./institutional";
// Compatibilidad con consumidores locales: los valores oficiales reemplazan la propuesta anterior.
export const values = officialValues.map(value => [value.name, value.description]);
export const benefits = [
  [
    "Formación",
    "Espacios para incorporar herramientas y compartir conocimientos.",
  ],
  [
    "Visibilidad",
    "Un lugar para dar a conocer tu emprendimiento y lo que ofrecés.",
  ],
  [
    "Vínculos",
    "Encuentros para conocer a otras emprendedoras y conectar experiencias.",
  ],
  [
    "Oportunidades",
    "Información sobre propuestas, actividades y alianzas de la Fundación.",
  ],
];
export const contributionOptions = [
  [
    "Aporte mensual",
    "Consultá las formas de aportar al sostenimiento de la Fundación.",
    "/contacto?motivo=Aporte%20mensual",
  ],
  [
    "Apoyar un proyecto",
    "Conocé las iniciativas que necesitan colaboración.",
    "#proyectos",
  ],
  [
    "Colaborar con un evento",
    "Acercá tu propuesta de espacios, materiales o servicios.",
    "/contacto?motivo=Eventos",
  ],
  [
    "Empresa aliada",
    "Construyamos una propuesta de colaboración.",
    "/alianzas#propuesta",
  ],
  ["Voluntariado", "Compartí tu tiempo y tus conocimientos.", "/voluntariado"],
];

