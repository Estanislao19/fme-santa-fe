import { notFound } from "next/navigation";
import Link from "next/link";
import { members } from "@/data/members";
import {
  PageHero,
  PhotoPlaceholder,
  PhotoGallery,
  DemoLabel,
} from "@/components/ui";
import { whatsappLink } from "@/utils/links";
import { pageMetadata } from "@/utils/metadata";
import { memberPhoto, media } from "@/data/media";
export function generateStaticParams() {
  return members.map((m) => ({ slug: m.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = members.find((m) => m.slug === slug);
  return m ? pageMetadata(m.business, m.description, `/socias/${slug}`) : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = members.find((m) => m.slug === slug);
  if (!m) notFound();
  const phone = m.phone ? whatsappLink(m.phone) : null;
  return (
    <>
      <PageHero
        eyebrow={`NUESTRAS SOCIAS / ${m.category}`}
        title={m.name}
        description={m.business}
      >
        {m.demo && <DemoLabel />}
      </PageHero>
      <section className="section container profile-grid member-profile">
        <PhotoPlaceholder label={m.name} image={memberPhoto(m)} variant="sand" />
        <div>
          <h2>Su historia</h2>
          <p>{m.description}</p>
          <p className="lede">{m.story}</p>
          <h3>Qué ofrece</h3>
          <ul className="plain-list">
            {m.offers.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <p>Rubro: {m.category}</p>
          <div className="actions">
            {phone ? (
              <a className="button" href={phone}>
                Contactar por WhatsApp ↗
              </a>
            ) : (
              <p className="muted">WhatsApp: [DATO A CONFIRMAR]</p>
            )}
            {m.instagram ? (
              <a
                className="text-link"
                href={m.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Instagram ↗
              </a>
            ) : (
              <p className="muted">Instagram: [DATO A CONFIRMAR]</p>
            )}
          </div>
        </div>
      </section>
      <section className="section container">
        <h2>Una mirada a su trabajo</h2>
        <PhotoGallery images={m.gallery.length ? m.gallery : media.activities.slice(1, 3)} label="Galería del emprendimiento" />
        <Link className="text-link" href="/socias">
          ← Volver al directorio
        </Link>
      </section>
    </>
  );
}
