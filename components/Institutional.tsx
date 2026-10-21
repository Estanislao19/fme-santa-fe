import Link from "next/link";
import Image from "next/image";
import { alliances } from "@/data/alliances";
import { projects } from "@/data/projects";
import { collaborators } from "@/data/collaborators";
import { DemoLabel, PhotoPlaceholder, SectionHeading, Button } from "./ui";
import type { Alliance } from "@/types";
export function AllianceStory({
  alliance = alliances[0],
}: {
  alliance?: Alliance;
}) {
  return (
    <div className="alliance-story">
      <div className="alliance-mark">
        <span>Alianza con FME</span>
        {alliance.logo ? (
          <Image
            src={alliance.logo}
            alt={alliance.name}
            width={260}
            height={120}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <>
            <strong>{alliance.name}</strong>
            <small>
              Identidad visual de la alianza pendiente de incorporar
            </small>
          </>
        )}
      </div>
      <div>
        <h3>{alliance.name}</h3>
        <p>{alliance.description}</p>
        <p>{alliance.action}</p>
        {alliance.url && (
          <a
            className="text-link"
            href={alliance.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Conocer la organización ↗
          </a>
        )}
        <Link className="text-link" href="/alianzas#propuesta">
          Acercá una propuesta →
        </Link>
      </div>
    </div>
  );
}
export function Collaborators() {
  return (
    <section className="section">
      <SectionHeading
        title="Colaboradores de la Fundación"
        description="Un espacio para reconocer a las empresas, profesionales, instituciones, organizaciones y personas que colaboran con FME."
      />
      <div className="collaborator-grid">
        {collaborators.map((c) => (
          <div key={c.name}>
            <span>{c.kind}</span>
            {c.logo && (
              <Image
                src={c.logo}
                alt={c.name}
                width={180}
                height={90}
                style={{ objectFit: "contain" }}
              />
            )}
            <h3>
              {c.url ? (
                <a href={c.url} target="_blank" rel="noopener noreferrer">
                  {c.name} ↗
                </a>
              ) : (
                c.name
              )}
            </h3>
            {c.demo && <DemoLabel />}
          </div>
        ))}
      </div>
    </section>
  );
}
export function Projects() {
  return (
    <section id="proyectos" className="section">
      <SectionHeading
        title="Proyectos para acompañar"
        description="Las iniciativas se publicarán cuando sus objetivos y formas de colaboración estén confirmados."
      />
      {projects.map((p) => (
        <article className="project-card" key={p.slug}>
          <PhotoPlaceholder
            label="Fotografía del proyecto"
            image={p.image}
            variant="sage"
          />
          <div>
            {p.demo && <DemoLabel />}
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p>Objetivo: {p.objective}</p>
            {p.target !== undefined && p.raised !== undefined && (
              <>
                <progress
                  max={p.target}
                  value={p.raised}
                  aria-label="Avance del proyecto"
                />
                <p>
                  ${p.raised} de ${p.target}
                </p>
              </>
            )}
            <Button href="/contacto?motivo=Proyectos" secondary>
              Consultar cómo colaborar
            </Button>
          </div>
        </article>
      ))}
    </section>
  );
}
export function ContributionCTA() {
  return (
    <section className="final-cta">
      <div className="container">
        <h2>
          Conocé FME.
          <br />
          Encontrá tu lugar.
        </h2>
        <div className="actions">
          <Button href="/comunidad">Quiero ser socia</Button>
          <Button href="/colabora" secondary>
            Quiero colaborar
          </Button>
        </div>
      </div>
    </section>
  );
}
