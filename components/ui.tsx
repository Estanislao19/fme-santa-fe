import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
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
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
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
          <div className="photo-frame" aria-hidden="true" />
          <span className="photo-caption">
            {label}
            <small>Fotografía por incorporar</small>
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
