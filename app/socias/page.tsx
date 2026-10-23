import { getPublicContent, getCategories } from "@/lib/content";
import { PageHero } from "@/components/ui";
import MemberDirectory from "@/components/MemberDirectory";
import { ContributionCTA } from "@/components/Institutional";
import { pageMetadata } from "@/utils/metadata";
import { getInstitutional } from "@/lib/institutional";
import { paragraphs } from "@/lib/admin/institutional-schema";
export const metadata = pageMetadata(
  "Nuestras socias",
  "Elegí productos y servicios de las emprendedoras de nuestra comunidad en Santa Fe.",
  "/socias",
);
export const dynamic = "force-dynamic";
export default async function Page() {
  const [members, categories, {content}] = await Promise.all([getPublicContent("members"), getCategories(),getInstitutional()]);
  const intro=paragraphs(content.members_intro);
  return (
    <>
      <PageHero
        title="Las socias: el corazón de la Fundación"
        description={intro[0]||""}
      >
        {intro.slice(1).map((text,i)=><p className="members-intro" key={i}>{text}</p>)}
      </PageHero>
      <section className="section container" id="directorio">
        <MemberDirectory members={members} categories={categories} />
      </section>
      <ContributionCTA />
    </>
  );
}
