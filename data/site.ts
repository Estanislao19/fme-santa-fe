export const UNKNOWN = "[DATO A CONFIRMAR]";
export const site = {
  name: "Fundación Mujeres Emprendedoras",
  shortName: "FME",
  location: "Santa Fe, Argentina",
  description:
    "Acompañamos y visibilizamos a mujeres emprendedoras de Santa Fe. Una comunidad para conectar, capacitarse y generar oportunidades.",
  instagram: "https://www.instagram.com/mujeresemprendedoras.sf/",
  instagramHandle: "@mujeresemprendedoras.sf",
  address: UNKNOWN,
  hours: UNKNOWN,
  email: "",
  phone: "",
  whatsappMessage:
    "Hola, llegué desde la web de FME y quería realizar una consulta.",
  // Configurar el dominio definitivo para habilitar canonical, sitemap y robots indexables.
  url: process.env.NEXT_PUBLIC_SITE_URL || "",
};
export const navigation = [
  ["Inicio", "/"],
  ["Nosotras", "/nosotras"],
  ["Socias", "/socias"],
  ["Capacitaciones", "/capacitaciones"],
  ["Comunidad", "/comunidad"],
  ["Alianzas", "/alianzas"],
  ["Colaborá", "/colabora"],
  ["Contacto", "/contacto"],
] as const;
