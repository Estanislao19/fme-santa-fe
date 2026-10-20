import { PageHero } from "@/components/ui";
import { pageMetadata } from "@/utils/metadata";
export const metadata = pageMetadata(
  "Política de privacidad",
  "Información sobre los formularios y el tratamiento de datos en el sitio de FME.",
  "/politica-de-privacidad",
);
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="INFORMACIÓN DEL SITIO"
        title="Política de privacidad"
        description="Versión informativa provisional, pendiente de revisión y aprobación institucional antes de habilitar la recepción de datos."
      />
      <article className="container section legal-copy">
        <h2>Responsable y contacto</h2>
        <p>
          Fundación Mujeres Emprendedoras, Santa Fe, Argentina. Domicilio,
          identificación legal y correo de privacidad: [DATO A CONFIRMAR].
        </p>
        <h2>Estado de los formularios</h2>
        <p>
          En esta versión los formularios validan los campos únicamente en tu
          navegador. No envían ni guardan la información ingresada. No se ha
          conectado un servicio de email, CRM, base de datos ni Google Sheets.
        </p>
        <h2>Finalidades previstas</h2>
        <p>
          Cuando se habilite su recepción, los datos se utilizarán para
          responder consultas, gestionar solicitudes de asociación,
          voluntariado, alianzas e inscripciones. Antes de activar esa función,
          FME deberá confirmar las finalidades, los destinatarios, los plazos de
          conservación y el contacto para ejercer derechos.
        </p>
        <h2>Servicios externos</h2>
        <p>
          Los enlaces a Instagram y, cuando se configure, WhatsApp te llevan a
          servicios de terceros sujetos a sus propias políticas. Este sitio no
          incorpora analítica ni publicidad. Las fuentes se sirven desde los
          archivos generados durante la construcción del sitio.
        </p>
        <h2>Actualizaciones</h2>
        <p>
          Esta política deberá completarse y revisarse antes de recibir datos
          personales. Fecha de aprobación institucional: [DATO A CONFIRMAR].
        </p>
      </article>
    </>
  );
}
