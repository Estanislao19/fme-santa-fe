import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/ui";
import { Projects, Collaborators } from "@/components/Institutional";
import { pageMetadata } from "@/utils/metadata";
import { participationOptions } from "@/data/participation";
export const metadata = pageMetadata(
  "Colaborá",
  "Conocé cómo acompañar a FME con tu tiempo, una alianza o un aporte.",
  "/colabora",
);
export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <>
      <PageHero
        title="Hay muchas formas de ser parte."
        description="Personas, empresas e instituciones pueden acompañar nuestros proyectos y ayudarnos a generar más oportunidades para mujeres emprendedoras."
      />
      <div className="container">
        <section className="section">
          <SectionHeading
            title="¿Cómo te gustaría colaborar?"
            description="Los medios de aporte y las condiciones se informarán una vez confirmados. Esta web no recibe pagos ni donaciones."
          />
          <div className="contribution-options">
            {participationOptions.map(({ title, description: copy, href, id }, i) => (
              <Link href={href} key={title} id={id}>
                <span className="number">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="participation-editorial">
          <h2>Por qué es importante acompañar</h2>
          <p>El apoyo nos permite abrir espacios de capacitación, dar visibilidad al trabajo de las emprendedoras y organizar actividades. También ayuda a sostener proyectos y acercar alianzas que generen nuevas oportunidades.</p>
        </section>
        <section className="section participation-organizations" id="organizaciones">
          <div><h2>Tu empresa también puede ser parte.</h2><p>Podés financiar un proyecto, ofrecer becas, brindar un espacio, aportar servicios o acercar beneficios para las socias. También podemos pensar una actividad o una acción conjunta.</p></div>
          <Link className="button" href="/alianzas#propuesta">Quiero vincular mi organización</Link>
        </section>
        <Projects />
        <Collaborators />
        <p className="participation-volunteer">¿Querés aportar tu tiempo y experiencia? <Link className="text-link" href="/voluntariado">Quiero ser voluntaria/o</Link></p>
      </div>
    </>
  );
}
