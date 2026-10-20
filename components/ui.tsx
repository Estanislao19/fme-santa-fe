import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
export function Button({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      className={`button ${secondary ? "button-secondary" : ""}`}
      href={href}
    >
      {children}
      <Arrow />
    </Link>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {description && <p className="lede">{description}</p>}
      </div>
      {children}
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lede">{description}</p>
        {children}
      </div>
    </section>
  );
}
export function PhotoPlaceholder({
  label,
  variant = "teal",
  image,
  priority = false,
}: {
  label: string;
  variant?: string;
  image?: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo-placeholder ${variant}`}>
      {image ? (
        <Image
          src={image}
          alt={label}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
        />
      ) : (
        <>
          <div className="photo-frame" aria-hidden="true">
            <svg viewBox="0 0 120 90" fill="none">
              <path
                d="M8 70 38 35l23 25 17-17 34 27M16 12h88v66H16z"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="82" cy="29" r="8" stroke="currentColor" />
            </svg>
          </div>
          <span className="photo-caption">
            {label}
            <small>Espacio reservado para fotografía real</small>
          </span>
        </>
      )}
    </div>
  );
}
export function DemoLabel() {
  return <span className="demo-label">Contenido de demostración</span>;
}
export function PhotoGallery({
  images,
  label,
}: {
  images: string[];
  label: string;
}) {
  return (
    <div className="photo-gallery">
      {images.length ? (
        images.map((image, i) => (
          <PhotoPlaceholder
            key={image}
            image={image}
            label={`${label} · ${i + 1}`}
          />
        ))
      ) : (
        <PhotoPlaceholder label={label} variant="sand" />
      )}
    </div>
  );
}
