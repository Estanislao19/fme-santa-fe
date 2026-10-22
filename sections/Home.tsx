import Link from "next/link";
import { Button, DemoLabel, PhotoPlaceholder } from "@/components/ui";
import MemberCard from "@/components/MemberCard";
import { ContributionCTA } from "@/components/Institutional";
import { members } from "@/data/members";
import { trainings } from "@/data/trainings";
import { alliances } from "@/data/alliances";
import { categories } from "@/data/categories";
import { media } from "@/data/media";
import EditorialCarousel from "@/components/EditorialCarousel";
import EditorialVideo from "@/components/EditorialVideo";

export default function Home() {
  const training = trainings.find((item) => item.status === "upcoming");
  const alliance = alliances[0];
  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Mujeres que impulsan a mujeres</p>
            <h1 id="home-title">
              Juntas, hacemos
              <br />
              florecer <em>ideas.</em>
            </h1>
            <p>
              Una comunidad de Santa Fe para conectar, aprender y hacer visible
              el talento de mujeres emprendedoras.
            </p>
            <div className="actions">
              <Button href="/comunidad">Quiero ser parte</Button>
              <Link className="text-link" href="/nosotras">
                Conocé FME
              </Link>
            </div>
            <p className="hero-note">
              De Santa Fe, con una convicción:
              <br />
              <span>cuando una crece, crecemos todas.</span>
            </p>
          </div>
          <div className="hero-visual">
            <EditorialVideo media={media.videos.hero} priority />
            <p className="hero-caption">
              Un lugar para encontrarnos.
              <br />
              <em>Una red para acompañarnos.</em>
            </p>
          </div>
        </div>
      </section>

      <section className="home-introduction" aria-labelledby="home-about-title">
        <div className="container editorial-split">
          <div className="introduction-photo">
            <PhotoPlaceholder
              label="Encuentros de nuestra comunidad"
              variant="sand"
              image={media.introduction}
            />
          </div>
          <div className="editorial-copy">
            <span className="chapter" aria-hidden="true">
              01
            </span>
            <h2 id="home-about-title">
              Detrás de cada idea,
              <br />
              <em>hay una mujer.</em>
            </h2>
            <p>
              Somos Fundación Mujeres Emprendedoras. Acompañamos, conectamos y
              damos visibilidad a mujeres y a sus emprendimientos en Santa Fe.
            </p>
            <p>
              Abrimos espacios para aprender, compartir experiencias y construir
              oportunidades en comunidad.
            </p>
            <Link className="text-link" href="/nosotras">
              Conocé nuestra historia
            </Link>
          </div>
        </div>
      </section>

      <section className="home-members" aria-labelledby="home-members-title">
        <div className="container">
          <div className="editorial-heading">
            <div>
              <span className="chapter" aria-hidden="true">
                02
              </span>
              <h2 id="home-members-title">
                Talento en
                <br />
                <em>nuestra red.</em>
              </h2>
            </div>
            <div>
              <p>
                Detrás de cada producto o servicio hay una emprendedora. Conocé
                su trabajo y su historia.
              </p>
              <Link className="text-link" href="/socias">
                Conocé a todas nuestras socias
              </Link>
            </div>
          </div>
          <EditorialCarousel label="Socias de nuestra red">
            {members
              .filter((member) => member.active)
              .map((member, index) => (
                <MemberCard key={member.slug} member={member} index={index} />
              ))}
          </EditorialCarousel>
          <nav className="home-rubros" aria-label="Explorar socias por rubro">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/socias?rubro=${encodeURIComponent(category)}#directorio`}
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="home-learning" aria-labelledby="home-learning-title">
        <div className="container">
          <div className="editorial-heading">
            <div>
              <span className="chapter" aria-hidden="true">
                03
              </span>
              <h2 id="home-learning-title">
                Aprender,
                <br />
                <em>compartir, crecer.</em>
              </h2>
            </div>
            <div>
              <p>
                Ser parte de FME también es encontrarse con otras mujeres,
                compartir experiencias y sumar herramientas.
              </p>
              <Link className="text-link" href="/comunidad">
                Conocé la comunidad
              </Link>
            </div>
          </div>
          {training && (
            <article className="learning-feature">
              <div className="learning-visual">
                <EditorialVideo media={media.videos.activity} />
                <EditorialCarousel label="Galería ilustrativa de actividades" compact>
                  {media.activities.map(image => <PhotoPlaceholder key={image} image={image} label="DEMO: actividad ilustrativa; no es una actividad de FME" />)}
                </EditorialCarousel>
              </div>
              <div>
                <p className="activity-date">
                  Próxima capacitación · {training.date}
                </p>
                <h3>{training.title}</h3>
                <p>{training.description}</p>
                {training.demo && <DemoLabel />}
                <div className="actions">
                  <Button href={`/capacitaciones/${training.slug}`}>
                    Ver capacitación
                  </Button>
                  <Link
                    className="text-link"
                    href={`/capacitaciones/${training.slug}#inscripcion`}
                  >
                    Inscribirme
                  </Link>
                </div>
              </div>
            </article>
          )}
          <div className="section-end">
            <Link className="text-link" href="/capacitaciones">
              Ver agenda completa
            </Link>
          </div>
        </div>
      </section>

      <section
        className="home-partnerships"
        aria-labelledby="home-partnerships-title"
      >
        <div className="container">
          <div className="editorial-heading">
            <div>
              <span className="chapter" aria-hidden="true">
                04
              </span>
              <h2 id="home-partnerships-title">
                Las oportunidades
                <br />
                <em>también se construyen.</em>
              </h2>
            </div>
            <p>
              Acercamos empresas, instituciones y personas a nuestra comunidad
              para generar nuevas posibilidades.
            </p>
          </div>
          {alliance && (
            <div className="partnership-feature">
              <div className="partnership-name">
                <PhotoPlaceholder image={media.alliance} label="DEMO: colaboración ilustrativa; no muestra a Movify ni a FME" />
                <span>Una alianza de FME</span>
                <h3>{alliance.name}</h3>
              </div>
              <div>
                <p>{alliance.description}</p>
                <Link className="text-link" href="/alianzas">
                Conocer nuestras alianzas
                </Link>
              </div>
            </div>
          )}
          <div className="collaborate-inline">
            <p>También podés acompañar nuestro trabajo.</p>
            <div>
              <Link href="/alianzas#propuesta">Ser empresa aliada</Link>
              <Link href="/colabora">Colaborar</Link>
              <Link href="/voluntariado">Ser voluntaria/o</Link>
            </div>
          </div>
        </div>
      </section>
      <ContributionCTA />
    </>
  );
}
