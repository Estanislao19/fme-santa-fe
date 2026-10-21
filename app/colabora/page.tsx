import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/ui";
import { Projects } from "@/components/Institutional";
import { contributionOptions } from "@/data/content";
import { pageMetadata } from "@/utils/metadata";
export const metadata = pageMetadata(
  "Colaborá",
  "Conocé cómo acompañar a FME con tu tiempo, una alianza o un aporte.",
  "/colabora",
);
export default function Page() {
  return (
    <>
      <PageHero
        title="Cada aporte puede abrir una oportunidad."
        description="Hay muchas formas de acompañar a Fundación Mujeres Emprendedoras. Encontrá la que tenga sentido para vos o para tu organización."
      />
      <div className="container">
        <section className="section">
          <SectionHeading
            title="¿Cómo te gustaría colaborar?"
            description="Los medios de aporte y las condiciones se informarán una vez confirmados. Esta web no recibe pagos ni donaciones."
          />
          <div className="contribution-options">
            {contributionOptions.map(([title, copy, href], i) => (
              <Link href={href} key={title}>
                <span className="number">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <Projects />
      </div>
    </>
  );
}
