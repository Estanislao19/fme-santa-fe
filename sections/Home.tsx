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
                Conocé a nuestras socias ↗
              </Link>
            </div>
            <div className="hero-footnote">
              <span aria-hidden="true">✳</span> Emprender. Compartir. Crecer
              juntas.
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-label">
              <span>MUJERES QUE HACEN</span>
              <span>SANTA FE, ARGENTINA ↗</span>
            </div>
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
              <span className="hero-caption-star" aria-hidden="true">
                ✳
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="principles-strip">
        <div className="container">
          <span>COMUNIDAD</span>
          <b aria-hidden="true">✳</b>
          <span>VISIBILIDAD</span>
          <b aria-hidden="true">✳</b>
          <span>FORMACIÓN</span>
          <b aria-hidden="true">✳</b>
          <span>OPORTUNIDADES</span>
          <b aria-hidden="true">✳</b>
          <span>ACOMPAÑAMIENTO</span>
        </div>
      </div>
      <section className="section container intro-grid">
        <div className="intro-photo">
          <PhotoPlaceholder
            label="Encuentros que nos acercan"
            variant="sand"
            image={media.introduction}
          />
          <span className="photo-index">01 / NUESTRA COMUNIDAD</span>
        </div>
        <div className="intro-copy">
          <p className="eyebrow">SOMOS FME</p>
          <h2>
            Una comunidad
            <br />
            para crecer juntas.
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
            Conocé nuestra historia ↗
          </Link>
        </div>
      </section>
      <section className="section section-cream">
        <div className="container">
          <SectionHeading
            eyebrow="ELLAS SON PROTAGONISTAS"
            title="Conocé a las mujeres que hacen FME"
            description="Elegir sus productos, contratar sus servicios y recomendar su trabajo también es construir comunidad."
          >
            <Link className="text-link" href="/socias">
              Ver todas las emprendedoras ↗
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
              <span className="eyebrow">ENCONTRÁ LO QUE ESTÁS BUSCANDO</span>
              <h3>Un mundo de emprendimientos, cerca tuyo.</h3>
            </div>
            <Link className="text-link" href="/socias">
              Contratá servicios de nuestras socias ↗
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
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="HERRAMIENTAS PARA EL CAMINO"
          title="Aprender también es emprender"
          description="Un espacio para incorporar conocimientos, compartir experiencias y seguir creciendo."
        >
          <Link className="text-link" href="/capacitaciones">
            Explorá las capacitaciones ↗
          </Link>
        </SectionHeading>
        <TrainingCard training={trainings[0]} />
      </section>
      <section className="community-band">
        <div className="container community-layout">
          <div>
            <p className="eyebrow">EL VALOR DE PERTENECER</p>
            <h2>
              Emprender acompañada
              <br />
              cambia todo.
            </h2>
          </div>
          <div>
            <p>
              Una conversación puede acercar una idea. Un encuentro, abrir una
              puerta. En FME queremos que cada emprendedora encuentre un lugar
              para compartir su camino.
            </p>
            <Button href="/comunidad">Quiero ser parte</Button>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="VÍNCULOS QUE ABREN CAMINOS"
          title="Crecer también es crear alianzas"
          description="Conectamos con empresas e instituciones para acercar oportunidades a nuestra comunidad."
        >
          <Link className="text-link" href="/alianzas">
            Conocé nuestras alianzas ↗
          </Link>
        </SectionHeading>
        <AllianceStory />
      </section>
      <section className="section section-cream">
        <div className="container contribution-home">
          <div>
            <p className="eyebrow">CADA APORTE TIENE UN LUGAR</p>
            <h2>Hay muchas formas de hacer crecer esta comunidad.</h2>
            <Link className="text-link" href="/colabora">
              Quiero colaborar ↗
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
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ContributionCTA />
    </>
  );
}
