import {
  PageHero,
  PhotoPlaceholder,
  SectionHeading,
  Button,
} from "@/components/ui";
import { team } from "@/data/team";
import { getInstitutional } from "@/lib/institutional";
import { site, UNKNOWN } from "@/data/site";
import { pageMetadata } from "@/utils/metadata";
import { media } from "@/data/media";
export const metadata = pageMetadata(
  "Nosotras",
  "Conocé a Fundación Mujeres Emprendedoras, su comunidad y su equipo en Santa Fe.",
  "/nosotras",
);
export const dynamic = "force-dynamic";
export default async function Page() {
  const {content,values}=await getInstitutional();
  return (
    <>
      <PageHero
        title="Un lugar para encontrarnos. Una red para crecer."
        description="Somos Fundación Mujeres Emprendedoras, una comunidad de Santa Fe que acompaña y visibiliza a mujeres y sus emprendimientos."
      />
      <div className="container about-content">
        <section className="section intro-grid">
          <PhotoPlaceholder label="Las mujeres que hacen FME" image={media.introduction} variant="sand" />
          <div>
            <h2>Una comunidad de emprendedoras en Santa Fe.</h2>
            <p className="lede">
              Buscamos crear espacios de formación, encuentro y colaboración
              para las mujeres emprendedoras de Santa Fe.
            </p>
            <p>
              Cada emprendimiento tiene una historia propia. En FME queremos que
              esas historias tengan un lugar donde darse a conocer, conectar con
              otras experiencias y encontrar oportunidades.
            </p>
          </div>
        </section>
        <section className="section">
          <SectionHeading
            title="Nuestra historia"
            description="La historia institucional está en preparación. Los hitos y las fechas se incorporarán con información confirmada por la Fundación."
          />
          <ol className="timeline">
            {[
              "El inicio",
              "Los primeros encuentros",
              "El crecimiento de la comunidad",
              "Los proyectos compartidos",
              "FME hoy",
            ].map((item, i) => (
              <li key={item}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item}</h3>
                  <p>Fecha y relato: {UNKNOWN}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="section mission-grid">
          <div>
            <h2>Misión</h2>
            <p className="institutional-text">{content.mission}</p>
          </div>
          <div>
            <h2>Visión</h2>
            <p className="institutional-text">{content.vision}</p>
          </div>
        </section>
        <section className="section">
          <SectionHeading title="Nuestros valores" />
          <div className="institutional-values">
            {values.map((value, i) => (
              <div key={value.id}>
                <span className="number">{String(i+1).padStart(2,"0")}</span>
                <h3>{value.name}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="section">
          <SectionHeading
            title="Nuestro equipo"
            description="Los nombres, las fotografías y la composición de las autoridades están pendientes de confirmación. Las imágenes DEMO son ilustrativas y no representan al equipo de FME."
          />
          <div className="team-grid">
            {team.map((p, index) => (
              <article key={p.role}>
                <PhotoPlaceholder
                  image={p.image || Object.values(media.members)[index] || media.team}
                  label={`Fotografía · ${p.role}`}
                  variant="sage"
                />
                <p className="team-role">{p.role}</p>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="section form-section">
          <div>
            <h2>Nuestra sede</h2>
            <p>Dirección: {site.address}</p>
            <p>Horario: {site.hours}</p>
            <p>Email: {site.email || UNKNOWN}</p>
            <p>WhatsApp: {site.phone || UNKNOWN}</p>
            <Button href="/contacto" secondary>
              Contactanos
            </Button>
          </div>
          <div className="map-placeholder">
            <h3>Nos encontramos en Santa Fe</h3>
            <p>Mapa pendiente de la dirección confirmada.</p>
          </div>
        </section>
      </div>
    </>
  );
}
