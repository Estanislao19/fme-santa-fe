import { PageHero, SectionHeading } from "@/components/ui";
import TrainingCard from "@/components/TrainingCard";
import { trainings } from "@/data/trainings";
import { pageMetadata } from "@/utils/metadata";
export const metadata = pageMetadata(
  "Capacitaciones",
  "Formación, herramientas y encuentros para emprendedoras de Santa Fe.",
  "/capacitaciones",
);
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="FORMACIÓN Y ENCUENTROS"
        title="Aprender también es emprender"
        description="Espacios para incorporar herramientas, compartir experiencias y seguir construyendo tu camino."
      />
      <div className="container">
        <section className="section">
          <SectionHeading
            title="Próximas capacitaciones"
            description="Las propuestas de esta primera versión son demostrativas. Todavía no hay inscripciones abiertas a actividades confirmadas."
          />
          {trainings
            .filter((t) => t.status === "upcoming")
            .map((t) => (
              <TrainingCard key={t.slug} training={t} />
            ))}
        </section>
        <section className="section">
          <SectionHeading
            eyebrow="NUESTRA MEMORIA"
            title="Capacitaciones realizadas"
            description="Un lugar para volver a los encuentros, recuperar aprendizajes y compartir lo vivido."
          />
          {trainings
            .filter((t) => t.status === "past")
            .map((t) => (
              <TrainingCard key={t.slug} training={t} />
            ))}
        </section>
      </div>
    </>
  );
}
