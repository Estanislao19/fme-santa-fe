import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { resolvePublicSlug } from "@/lib/content";
import {
  PageHero,
  DemoLabel,
  PhotoPlaceholder,
  PhotoGallery,
} from "@/components/ui";
import Form from "@/components/Forms";
import { pageMetadata } from "@/utils/metadata";
import { media } from "@/data/media";
import EditorialVideo from "@/components/EditorialVideo";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolved = await resolvePublicSlug("trainings", slug);
  const t = resolved?.item;
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
  const resolved = await resolvePublicSlug("trainings", slug);
  const t = resolved?.item;
  if (!t) notFound();
  if (resolved!.canonical !== slug) permanentRedirect(`/capacitaciones/${resolved!.canonical}`);
  return (
    <>
      <PageHero title={t.title} description={t.description}>
        {t.demo && <DemoLabel />}
      </PageHero>
      <div className="container">
        <section className="section profile-grid">
          <div className="training-detail-media">{t.video ? <EditorialVideo media={{src:t.video,poster:t.image || media.training,label:t.title,informative:true}}/> : <PhotoPlaceholder image={t.image || media.training} label="Encuentro y formación" variant="blue"/>}</div>
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
                {t.registrationUrl ? "Completá tu inscripción en el enlace habilitado para esta actividad." : "El formulario conserva su estado de demostración. La inscripción se habilitará cuando se conecte el canal de recepción."}
              </p>
            </div>
            {t.registrationUrl ? <a className="button" href={t.registrationUrl} target="_blank" rel="noopener noreferrer">Ir a la inscripción</a> : <Form kind="training" context={t.slug} />}
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
