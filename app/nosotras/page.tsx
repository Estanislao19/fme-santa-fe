import {
  PageHero,
  PhotoPlaceholder,
  SectionHeading,
  Button,
} from "@/components/ui";
import { team } from "@/data/team";
import { values } from "@/data/content";
import { site, UNKNOWN } from "@/data/site";
import { pageMetadata } from "@/utils/metadata";
export const metadata = pageMetadata(
  "Nosotras",
  "Conocé a Fundación Mujeres Emprendedoras, su comunidad y su equipo en Santa Fe.",
  "/nosotras",
);
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="NUESTRA FUNDACIÓN"
        title="Un lugar para encontrarnos. Una red para crecer."
        description="Somos Fundación Mujeres Emprendedoras, una comunidad de Santa Fe que acompaña y visibiliza a mujeres y sus emprendimientos."
      />
      <div className="container">
        <section className="section intro-grid">
          <PhotoPlaceholder label="Las mujeres que hacen FME" variant="sand" />
          <div>
            <p className="eyebrow">QUIÉNES SOMOS</p>
            <h2>El valor de hacer camino juntas.</h2>
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
            eyebrow="LO QUE NOS TRAJO HASTA ACÁ"
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
            <p className="eyebrow">MISIÓN</p>
            <h2>Acompañar, conectar y visibilizar.</h2>
            <p>
              Promover espacios de formación y vínculos que acompañen a las
              mujeres emprendedoras y den visibilidad a su trabajo en Santa Fe.
            </p>
          </div>
          <div>
            <p className="eyebrow">VISIÓN</p>
            <h2>Una comunidad con más oportunidades.</h2>
            <p>
              Construir una red cercana y colaborativa, en la que las
              emprendedoras puedan compartir conocimientos y participar en el
              desarrollo de su comunidad.
            </p>
          </div>
          <p className="editorial-note">
            Redacción institucional propuesta, pendiente de validación por FME.
          </p>
        </section>
        <section className="section">
          <SectionHeading
            eyebrow="LO QUE GUÍA EL CAMINO"
            title="Nuestros valores"
          />
          <div className="value-grid">
            {values.map(([title, copy], i) => (
              <div key={title}>
                <span className="number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="section">
          <SectionHeading
            eyebrow="PERSONAS QUE ACOMPAÑAN"
            title="Nuestro equipo"
            description="Los nombres, las fotografías y la composición de las autoridades están pendientes de confirmación."
          />
          <div className="team-grid">
            {team.map((p) => (
              <article key={p.role}>
                <PhotoPlaceholder
                  image={p.image}
                  label={`Fotografía · ${p.role}`}
                  variant="sage"
                />
                <p className="eyebrow">{p.role}</p>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="section form-section">
          <div>
            <p className="eyebrow">SANTA FE, ARGENTINA</p>
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
            <span aria-hidden="true">⌖</span>
            <h3>Nos encontramos en Santa Fe</h3>
            <p>Mapa pendiente de la dirección confirmada.</p>
          </div>
        </section>
      </div>
    </>
  );
}
