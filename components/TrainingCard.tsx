import Link from "next/link";
import type { Training } from "@/types";
import { DemoLabel, PhotoPlaceholder } from "./ui";
export default function TrainingCard({ training }: { training: Training }) {
  return (
    <article className="training-card">
      <Link href={`/capacitaciones/${training.slug}`}>
        <PhotoPlaceholder
          label={
            training.status === "past"
              ? "Memoria de nuestros encuentros"
              : "Aprender y compartir"
          }
          image={training.image}
          variant="blue"
        />
      </Link>
      <div className="training-info">
        <div className="eyebrow">
          {training.status === "past"
            ? "MEMORIA INSTITUCIONAL"
            : "PRÓXIMA PROPUESTA"}{" "}
          · {training.modality}
        </div>
        <h3>
          <Link href={`/capacitaciones/${training.slug}`}>
            {training.title}
          </Link>
        </h3>
        <p>{training.description}</p>
        <dl className="compact-details">
          <div>
            <dt>Fecha y horario</dt>
            <dd>
              {training.date} · {training.time}
            </dd>
          </div>
          <div>
            <dt>Lugar</dt>
            <dd>{training.location}</dd>
          </div>
          <div>
            <dt>Valor general</dt>
            <dd>{training.price}</dd>
          </div>
          <div>
            <dt>Beneficio para socias</dt>
            <dd>{training.memberPrice}</dd>
          </div>
        </dl>
        {training.demo && <DemoLabel />}
        <div className="actions">
          <Link className="text-link" href={`/capacitaciones/${training.slug}`}>
            Ver capacitación ↗
          </Link>
          {training.status === "upcoming" && (
            <Link
              className="text-link"
              href={`/capacitaciones/${training.slug}#inscripcion`}
            >
              Inscribirme ↗
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
