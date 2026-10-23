import Link from "next/link";
import Image from "next/image";
import { getPublicContent } from "@/lib/content";
import { DemoLabel, PhotoPlaceholder, SectionHeading, Button } from "./ui";
import type { Alliance } from "@/types";
export function AllianceStory({
  alliance,
}: {
  alliance: Alliance;
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
          Acercá una propuesta
        </Link>
      </div>
    </div>
  );
}
export async function Collaborators() {
  const [collaborators, alliances] = await Promise.all([getPublicContent("collaborators"), getPublicContent("alliances")]);
  const companions = [...alliances.filter(a=>!a.demo), ...collaborators.filter(c=>!c.demo)].sort((a,b)=>Number(!!b.featured)-Number(!!a.featured));
  if (!companions.length) return null;
  return (
    <section className="section">
      <SectionHeading
        title="Quienes nos acompañan"
        description="Empresas, instituciones y personas que acompañan el trabajo de la Fundación."
      />
      <div className="collaborator-grid companion-list">
        {companions.map((c) => (
          <div key={`${"action" in c ? "alliance" : "collaborator"}-${c.slug || c.name}`}>
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
            {c.description && <p>{c.description}</p>}
            {c.demo && <DemoLabel />}
          </div>
        ))}
      </div>
    </section>
  );
}
export async function Projects() {
  const projects = [...await getPublicContent("projects")].sort((a,b)=>Number(!!b.featured)-Number(!!a.featured));
  return (
    <section id="proyectos" className="section">
      <SectionHeading
        title="Proyectos, eventos y campañas"
        description="Conocé las iniciativas que necesitan colaboración. Sus objetivos y condiciones se comunican cuando están confirmados."
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
            <small>{p.kind || "Proyecto"}{p.date ? ` · ${p.date}` : ""}</small>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            {p.objective && <p>Objetivo: {p.objective}</p>}
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
            <Button href={p.ctaUrl || `/contacto?motivo=${encodeURIComponent(p.title)}`} secondary>
              {p.cta || "Consultar cómo colaborar"}
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
          Lo que viene,
          <br />
          <em>lo hacemos juntas.</em>
        </h2>
        <p>Traé tu idea, tu experiencia y tus ganas de formar parte.</p>
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
