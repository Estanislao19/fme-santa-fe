import Form from "@/components/Forms";
import { PageHero, SectionHeading, PhotoPlaceholder } from "@/components/ui";
import { benefits } from "@/data/content";
import { pageMetadata } from "@/utils/metadata";
export const metadata = pageMetadata(
  "Sumate a la comunidad",
  "Conocé qué significa ser parte de FME y acercanos tu emprendimiento.",
  "/comunidad",
);
export default function Page() {
  return (
    <>
      <PageHero
        title="Tu emprendimiento no tiene que crecer solo."
        description="Hay otras mujeres haciendo camino, con preguntas, experiencias y ganas de compartir. Acá hay un lugar para conocernos."
      />
      <div className="container">
        <section className="section intro-grid">
          <div>
            <h2>¿Para quién es FME?</h2>
            <p className="lede">
              Para mujeres emprendedoras que quieran conectar con una comunidad
              de Santa Fe, compartir su experiencia y dar a conocer lo que
              hacen.
            </p>
            <p>
              Ser parte es participar, escuchar y construir vínculos. Cada socia
              aporta una mirada propia; queremos que su emprendimiento tenga un
              lugar visible en la comunidad.
            </p>
            <p>
              Requisitos, cuota de asociación y condiciones de ingreso: [DATO A
              CONFIRMAR].
            </p>
          </div>
          <PhotoPlaceholder
            label="Un lugar para tu emprendimiento"
            variant="sage"
          />
        </section>
        <section className="section">
          <SectionHeading
            title="Beneficios de ser socia"
            description="Estos son los ejes que buscamos construir. Las actividades, condiciones y beneficios específicos se comunican cuando están confirmados."
          />
          <div className="value-grid">
            {benefits.map(([title, description], i) => (
              <div key={title}>
                <span className="number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="community-note">
          <h2>Una red en la que compartir también sea una forma de crecer.</h2>
          <p>
            Buscamos una comunidad con escucha, respeto y participación. Un
            espacio para intercambiar conocimientos, recomendar el trabajo de
            otras mujeres y acercar propuestas.
          </p>
        </section>
        <section className="section form-section" id="sumarme">
          <div>
            <h2>Quiero formar parte</h2>
            <p>
              Dejanos conocer tu emprendimiento. Este formulario estará
              habilitado para recibir solicitudes cuando se conecte el canal de
              atención.
            </p>
          </div>
          <Form kind="membership" />
        </section>
      </div>
    </>
  );
}
