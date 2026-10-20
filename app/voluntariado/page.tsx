import Form from "@/components/Forms";
import { PageHero, SectionHeading } from "@/components/ui";
import { volunteerAreas } from "@/data/categories";
import { pageMetadata } from "@/utils/metadata";
export const metadata = pageMetadata(
  "Voluntariado",
  "Sumá tu tiempo, experiencia y talento a Fundación Mujeres Emprendedoras.",
  "/voluntariado",
);
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="VOLUNTARIADO"
        title="Sumá tu talento a FME"
        description="Tu tiempo, tus conocimientos y tu mirada pueden acompañar el trabajo de la Fundación. Contanos cómo te gustaría colaborar."
      />
      <div className="container">
        <section className="section">
          <SectionHeading
            title="Hay distintas formas de aportar"
            description="Estas son las áreas iniciales de interés. Las tareas y la disponibilidad se acordarán según las necesidades de la Fundación."
          />
          <div className="area-list">
            {volunteerAreas.map((area, i) => (
              <a key={area} href="#voluntariado">
                <span className="number">{String(i + 1).padStart(2, "0")}</span>
                <h3>{area}</h3>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
        <section className="section form-section" id="voluntariado">
          <div>
            <p className="eyebrow">COMPARTÍ LO QUE SABÉS</p>
            <h2>Quiero ser voluntaria/o</h2>
            <p>
              Nos interesa conocer tu experiencia, tus intereses y el tiempo que
              podrías aportar.
            </p>
          </div>
          <Form kind="volunteer" />
        </section>
      </div>
    </>
  );
}
