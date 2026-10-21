import Link from "next/link";
import { Button, PhotoPlaceholder, SectionHeading } from "@/components/ui";
import MemberCard from "@/components/MemberCard";
import TrainingCard from "@/components/TrainingCard";
import { AllianceStory, ContributionCTA } from "@/components/Institutional";
import { members } from "@/data/members";
import { trainings } from "@/data/trainings";
import { categories } from "@/data/categories";
import { media } from "@/data/media";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-line" /> FUNDACIÓN MUJERES EMPRENDEDORAS ·
              SANTA FE
            </p>
            <h1>
              Cuando una
              <br />
              mujer crece,
              <br />
              <span>
                crece toda una
                <br />
                comunidad.
              </span>
            </h1>
            <p>
              Creamos oportunidades, vínculos y espacios de formación para
              acompañar y visibilizar a mujeres emprendedoras de Santa Fe.
            </p>
            <div className="actions">
              <Button href="/comunidad">Quiero sumarme</Button>
              <Link className="text-link" href="/socias">
                Conocé a nuestras socias
              </Link>
            </div>
            <div className="hero-footnote">
              <span aria-hidden="true">✳</span> Emprender. Compartir. Crecer
              juntas.
            </div>
          </div>
          <div className="hero-visual">
            <PhotoPlaceholder
              label="Nuestra comunidad, en primera persona"
              image={media.hero}
              priority
            />
            <div className="hero-caption">
              <span>
                Un lugar para encontrarnos.
                <br />
                Una red para acompañarnos.
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="principles-strip">
        <div className="container">
          <span>Comunidad</span>
          <span>Visibilidad</span>
          <span>Formación</span>
          <span>Oportunidades</span>
          <span>Acompañamiento</span>
        </div>
      </div>
      <section className="section container intro-grid">
        <div className="intro-photo">
          <PhotoPlaceholder
            label="Encuentros que nos acercan"
            variant="sand"
            image={media.introduction}
          />
        </div>
        <div className="intro-copy">
          <h2>
            Una comunidad
            <br /> para crecer juntas.
          </h2>
          <p className="lede">
            Detrás de cada emprendimiento hay una mujer, una historia y mucho
            por compartir.
          </p>
          <p>
            Somos Fundación Mujeres Emprendedoras, una comunidad de Santa Fe que
            busca acompañar, capacitar y dar visibilidad a las mujeres y sus
            emprendimientos. Construimos vínculos para intercambiar experiencias
            y generar oportunidades.
          </p>
          <Link className="text-link" href="/nosotras">
            Conocé nuestra historia
          </Link>
        </div>
      </section>
      <section className="section section-cream home-members">
        <div className="container">
          <SectionHeading
            title="Conocé a las mujeres que hacen FME"
            description="Elegir sus productos, contratar sus servicios y recomendar su trabajo también es construir comunidad."
          >
            <Link className="text-link" href="/socias">
              Ver todas las emprendedoras
            </Link>
          </SectionHeading>
          <div className="member-grid">
            {members
              .filter((member) => member.active)
              .slice(0, 3)
              .map((m, i) => (
                <MemberCard key={m.slug} member={m} index={i} />
              ))}
          </div>
          <div className="directory-prompt">
            <div>
              <h3>Encontrá un emprendimiento por rubro.</h3>
            </div>
            <Link className="text-link" href="/socias">
              Explorar el directorio
            </Link>
          </div>
          <div className="category-links">
            {categories.map((category, i) => (
              <Link
                href={`/socias?rubro=${encodeURIComponent(category)}#directorio`}
                key={category}
              >
                <span className="category-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section container home-training">
        <SectionHeading
          title="Formación para tu emprendimiento"
          description="Capacitaciones y encuentros para incorporar herramientas, hacer consultas y compartir experiencias."
        >
          <Link className="text-link" href="/capacitaciones">
            Todas las capacitaciones
          </Link>
        </SectionHeading>
        <TrainingCard training={trainings[0]} />
      </section>
      <section className="community-band">
        <div className="container community-layout">
          <div>
            <h2>Una red para compartir experiencias y contactos.</h2>
          </div>
          <div>
            <p>
              Conocer a otras emprendedoras, conversar sobre el trabajo de cada
              una y acercar propuestas. Eso buscamos en los espacios de
              encuentro de la Fundación.
            </p>
            <Link className="text-link light" href="/comunidad">
              Qué significa ser socia
            </Link>
          </div>
        </div>
      </section>
      <section className="section container home-alliances">
        <SectionHeading
          title="Alianzas que acercan oportunidades"
          description="Conectamos con empresas e instituciones para acercar oportunidades a nuestra comunidad."
        >
          <Link className="text-link" href="/alianzas">
            Conocé las alianzas
          </Link>
        </SectionHeading>
        <AllianceStory />
      </section>
      <section className="section section-cream">
        <div className="container contribution-home">
          <div>
            <h2>¿Cómo podés colaborar?</h2>
            <p>
              Con tiempo, conocimientos, servicios o un aporte. Hay distintas
              formas de acompañar el trabajo de FME.
            </p>
            <Link className="text-link" href="/colabora">
              Conocé las opciones
            </Link>
          </div>
          <div className="contribution-list">
            {[
              ["01", "Un aporte mensual", "/colabora"],
              ["02", "Apoyar un proyecto", "/colabora#proyectos"],
              ["03", "Colaborar con un evento", "/contacto"],
              ["04", "Ser una empresa aliada", "/alianzas#propuesta"],
              ["05", "Sumar tu tiempo y talento", "/voluntariado"],
            ].map(([n, t, h]) => (
              <Link href={h} key={n}>
                <span>{n}</span>
                {t}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ContributionCTA />
    </>
  );
}
