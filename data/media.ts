// DEMO / REEMPLAZAR. Las personas y escenas ilustrativas no pertenecen a FME.
// Administrar las referencias aquí. Ver README y MEDIA-DEMO.md.
const base = "/media/demo";
export type VideoMedia = {
  src: string; poster: string; label: string; demo?: boolean;
  informative?: boolean;
  captions?: { src: string; language: string; label: string };
};
export const media = {
  hero: `${base}/videos/hero-demo-poster.webp`,
  introduction: `${base}/comunidad/encuentro-demo.webp`,
  training: `${base}/capacitaciones/taller-demo.webp`,
  alliance: `${base}/alianzas/colaboracion-demo.webp`,
  team: `${base}/equipo/equipo-demo.webp`,
  members: {
    "emprendimiento-gastronomico-demo": `${base}/socias/foto-demo-01.webp`,
    "emprendimiento-diseno-demo": `${base}/socias/foto-demo-02.webp`,
    "emprendimiento-servicios-demo": `${base}/socias/foto-demo-03.webp`,
    "emprendimiento-bienestar-demo": `${base}/socias/foto-demo-04.webp`,
    "emprendimiento-moda-demo": `${base}/socias/foto-demo-05.webp`,
    "emprendimiento-profesional-demo": `${base}/socias/foto-demo-06.webp`,
  } as Record<string, string>,
  activities: [
    `${base}/capacitaciones/taller-demo.webp`,
    `${base}/comunidad/actividad-demo-01.webp`,
    `${base}/comunidad/actividad-demo-02.webp`,
    `${base}/comunidad/actividad-demo-03.webp`,
  ],
  videos: {
    hero: {
      src: `${base}/videos/hero-demo.mp4`, poster: `${base}/videos/hero-demo-poster.webp`,
      label: "Video ilustrativo de mujeres compartiendo un trabajo artesanal; no es un registro de FME", demo: true,
    },
    activity: {
      src: `${base}/videos/actividad-demo.mp4`, poster: `${base}/videos/actividad-demo-poster.webp`,
      label: "Video ilustrativo de un taller de cerámica; no es una actividad de FME", demo: true,
    },
  } satisfies Record<string, VideoMedia>,
};
export const isDemoMedia = (src?: string) => !!src?.startsWith(`${base}/`);
export function memberPhoto(member: { slug: string; image?: string }) {
  return member.image || media.members[member.slug];
}
