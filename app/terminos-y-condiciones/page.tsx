import { PageHero } from "@/components/ui";
import { pageMetadata } from "@/utils/metadata";
export const metadata = pageMetadata(
  "Términos y condiciones",
  "Condiciones de uso e información provisional del sitio institucional de FME.",
  "/terminos-y-condiciones",
);
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="INFORMACIÓN DEL SITIO"
        title="Términos y condiciones"
        description="Documento provisional, pendiente de revisión y aprobación institucional."
      />
      <article className="container section legal-copy">
        <h2>Sobre este sitio</h2>
        <p>
          Este sitio presenta a Fundación Mujeres Emprendedoras de Santa Fe. Su
          primera versión contiene espacios pendientes de información y
          registros identificados como demostración.
        </p>
        <h2>Contenido de demostración</h2>
        <p>
          Los perfiles y capacitaciones de ejemplo no representan personas,
          actividades confirmadas ni ofertas comerciales. Los datos marcados
          como [DATO A CONFIRMAR] no deben considerarse información vigente.
        </p>
        <h2>Solicitudes e inscripciones</h2>
        <p>
          Los formularios todavía no envían información. Completar un formulario
          de esta versión no produce una inscripción, asociación, reserva ni
          compromiso de colaboración. No se reciben pagos.
        </p>
        <h2>Emprendimientos y enlaces</h2>
        <p>
          El directorio está preparado para visibilizar propuestas de las
          socias. Las condiciones de contratación deberán acordarse directamente
          con cada emprendimiento cuando se publiquen perfiles reales. Los
          sitios externos tienen condiciones propias.
        </p>
        <h2>Identidad e información institucional</h2>
        <p>
          El logo se utiliza como identidad oficial de FME. Las fotografías y
          los contenidos definitivos deberán incorporarse con la autorización
          correspondiente.
        </p>
        <h2>Información pendiente</h2>
        <p>
          Identificación legal, domicilio, contacto y condiciones definitivas de
          uso: [DATO A CONFIRMAR]. Estos términos deben revisarse antes de
          habilitar operaciones o solicitudes reales.
        </p>
      </article>
    </>
  );
}
