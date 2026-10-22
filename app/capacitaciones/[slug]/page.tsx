import Link from "next/link";
import { notFound } from "next/navigation";
import { trainings } from "@/data/trainings";
import {
  PageHero,
  DemoLabel,
  PhotoPlaceholder,
  PhotoGallery,
} from "@/components/ui";
import Form from "@/components/Forms";
import { pageMetadata } from "@/utils/metadata";
import { media } from "@/data/media";
export function generateStaticParams() {
  return trainings.map((t) => ({ slug: t.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = trainings.find((t) => t.slug === slug);
  return t
    ? pageMetadata(t.title, t.description, `/capacitaciones/${slug}`)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = trainings.find((t) => t.slug === slug);
  if (!t) notFound();
  return (
    <>
      <PageHero title={t.title} description={t.description}>
        {t.demo && <DemoLabel />}
      </PageHero>
      <div className="container">
        <section className="section profile-grid">
          <PhotoPlaceholder
            image={t.image || media.training}
            label="Encuentro y formación"
            variant="blue"
          />
          <div>
            <h2>Sobre la propuesta</h2>
            <dl className="detail-list">
              {[
                ["Fecha", t.date],
                ["Horario", t.time],
                ["Lugar", t.location],
                ["Modalidad", t.modality],
                ["Duración", t.duration],
                ["Quién dicta", t.teacher],
                ["Cupos", t.capacity],
                ["Precio general", t.price],
                ["Precio / beneficio para socias", t.memberPrice],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        {t.status === "upcoming" ? (
          <section className="section form-section" id="inscripcion">
            <div>
              <h2>Inscribirme</h2>
              <p>
                Formulario de demostración. La inscripción se habilitará cuando
                se confirme la actividad y se conecte el canal de recepción.
              </p>
            </div>
            <Form kind="training" context={t.slug} />
          </section>
        ) : (
          <section className="section">
            <h2>Lo que compartimos</h2>
            <p>
              Resumen del encuentro: [DATO A CONFIRMAR]. Fotografías y contenido
              pendientes de autorización e incorporación.
            </p>
            <PhotoGallery
              images={t.gallery.length ? t.gallery : media.activities}
              label="Fotografías del encuentro"
            />
          </section>
        )}
        <p className="back-link">
          <Link href="/capacitaciones" className="text-link">
            ← Todas las capacitaciones
          </Link>
        </p>
      </div>
    </>
  );
}
