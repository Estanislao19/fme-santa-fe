import Form from "@/components/Forms";
import { PageHero } from "@/components/ui";
import { AllianceStory, Collaborators } from "@/components/Institutional";
import { PhotoGallery } from "@/components/ui";
import { getPublicContent } from "@/lib/content";
import { pageMetadata } from "@/utils/metadata";
import { media } from "@/data/media";
export const metadata = pageMetadata(
  "Alianzas y colaboradores",
  "Vínculos con empresas e instituciones para acercar oportunidades a las emprendedoras de Santa Fe.",
  "/alianzas",
);
export const dynamic = "force-dynamic";
export default async function Page() {
  const alliances = await getPublicContent("alliances");
  return (
    <>
      <PageHero
        title="Las alianzas multiplican oportunidades."
        description="Conectamos con organizaciones que quieran acercar propuestas y acompañar a las mujeres emprendedoras de Santa Fe."
      />
      <div className="container">
        <section className="section">
          {alliances.map((alliance) => (
            <div key={alliance.name}>
              <AllianceStory alliance={alliance} />
              <PhotoGallery
                images={alliance.gallery.length ? alliance.gallery : [alliance.image || media.alliance]}
                label={`Registro de la alianza con ${alliance.name}`}
              />
            </div>
          ))}
        </section>
        <Collaborators />
        <section className="section form-section" id="propuesta">
          <div>
            <h2>¿Tu empresa quiere trabajar con FME?</h2>
            <p>
              Contanos qué pueden aportar y qué les gustaría construir junto a
              la Fundación. Podemos conversar sobre formación, eventos,
              servicios y otras formas de colaboración.
            </p>
          </div>
          <Form kind="alliance" />
        </section>
      </div>
    </>
  );
}
