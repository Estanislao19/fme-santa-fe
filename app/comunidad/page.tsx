import Form from "@/components/Forms";
import { PageHero, PhotoPlaceholder } from "@/components/ui";
import { getInstitutional } from "@/lib/institutional";
import { paragraphs } from "@/lib/admin/institutional-schema";
import { pageMetadata } from "@/utils/metadata";
import { media } from "@/data/media";
import { getCategories } from "@/lib/content";
export const metadata = pageMetadata(
  "Sumate a la comunidad",
  "Conocé qué significa ser parte de FME y acercanos tu emprendimiento.",
  "/comunidad",
);
export const dynamic = "force-dynamic";
export default async function Page() {
  const [categories,{content}] = await Promise.all([getCategories(),getInstitutional()]);
  const copy=paragraphs(content.community_text);
  return (
    <>
      <PageHero
        title="Las socias: el corazón de la Fundación"
        description={copy[0]||""}
      />
      <div className="container">
        <section className="section intro-grid">
          <div>
            <h2>Qué significa ser parte.</h2>{copy.slice(1,3).map((text,i)=><p className="institutional-text" key={i}>{text}</p>)}
          </div>
          <PhotoPlaceholder
            label="Un lugar para tu emprendimiento"
            image={media.introduction}
            variant="sage"
          />
        </section>
        <section className="community-note institutional-community"><h2>Un acompañamiento recíproco.</h2>{copy.slice(3).map((text,i)=><p className="institutional-text" key={i}>{text}</p>)}</section>
        <section className="section form-section" id="sumarme">
          <div>
            <h2>Quiero formar parte</h2><p>Requisitos, cuota de asociación y condiciones de ingreso: [DATO A CONFIRMAR].</p>
            <p>
              Dejanos conocer tu emprendimiento. Este formulario estará
              habilitado para recibir solicitudes cuando se conecte el canal de
              atención.
            </p>
          </div>
          <Form kind="membership" categories={categories} />
        </section>
      </div>
    </>
  );
}

