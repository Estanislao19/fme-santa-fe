import { PageHero, SectionHeading } from "@/components/ui";
import TrainingCard from "@/components/TrainingCard";
import { getPublicContent } from "@/lib/content";
import { pageMetadata } from "@/utils/metadata";
export const metadata = pageMetadata(
  "Capacitaciones",
  "Formación, herramientas y encuentros para emprendedoras de Santa Fe.",
  "/capacitaciones",
);
export const dynamic = "force-dynamic";
export default async function Page() {
  const trainings = await getPublicContent("trainings");
  return (
    <>
      <PageHero
        title="Aprender también es emprender"
        description="Espacios para incorporar herramientas, compartir experiencias y seguir construyendo tu camino."
      />
      <div className="container">
        <section className="section">
          <SectionHeading
            title="Próximas capacitaciones"
            description={trainings.some(t => t.status === "upcoming" && !t.demo) ? "Consultá la información de cada actividad y su forma de inscripción." : "Las propuestas actuales son demostrativas. Todavía no hay inscripciones abiertas a actividades confirmadas."}
          />
          {trainings
            .filter((t) => t.status === "upcoming")
            .map((t) => (
              <TrainingCard key={t.slug} training={t} />
            ))}
        </section>
        <section className="section">
          <SectionHeading
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
