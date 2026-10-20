import { PageHero } from "@/components/ui";
import MemberDirectory from "@/components/MemberDirectory";
import { ContributionCTA } from "@/components/Institutional";
import { pageMetadata } from "@/utils/metadata";
export const metadata = pageMetadata(
  "Nuestras socias",
  "Elegí productos y servicios de las emprendedoras de nuestra comunidad en Santa Fe.",
  "/socias",
);
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="DIRECTORIO DE EMPRENDEDORAS"
        title="Elegí emprendedoras de nuestra comunidad"
        description="Cada compra, contratación o recomendación ayuda a que una mujer emprendedora siga creciendo."
      />
      <section className="section container" id="directorio">
        <MemberDirectory />
      </section>
      <ContributionCTA />
    </>
  );
}
