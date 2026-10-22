"use client";
import { Children, useId, useRef, useState, type ReactNode } from "react";

// Desplazamiento nativo: swipe, foco y lectura sin JavaScript siguen disponibles.
export default function EditorialCarousel({ children, label, compact = false }: {
  children: ReactNode; label: string; compact?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const id = useId();
  const slides = Children.toArray(children);
  const [position, setPosition] = useState({ index: 0, end: false });
  function move(direction: number) {
    const node = track.current;
    if (!node) return;
    const slide = node.firstElementChild as HTMLElement | null;
    const step = (slide?.offsetWidth || node.clientWidth) + parseFloat(getComputedStyle(node).gap || "0");
    node.scrollBy({ left: direction * step, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <div className={`editorial-carousel ${compact ? "carousel-compact" : ""}`} role="region" aria-roledescription="carrusel" aria-label={label}>
    <div className="carousel-track" ref={track} id={id} tabIndex={0}
      aria-label={`${label}. Usá las flechas del teclado o deslizá para explorar.`}
      onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
        if (event.key === "Home" || event.key === "End") { event.preventDefault(); event.currentTarget.scrollTo({left: event.key === "Home" ? 0 : event.currentTarget.scrollWidth, behavior: "instant"}); }
      }}
      onScroll={event => {
        const node = event.currentTarget;
        const first = node.firstElementChild as HTMLElement | null;
        const step = (first?.offsetWidth || 1) + parseFloat(getComputedStyle(node).gap || "0");
        setPosition({ index: Math.round(node.scrollLeft / step), end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 3 });
      }}>
      {slides.map((child, i) => <div className="carousel-slide" key={i} role="group" aria-roledescription="diapositiva" aria-label={`${i + 1} de ${slides.length}`}>{child}</div>)}
    </div>
    <div className="carousel-navigation">
      <span className="carousel-hint">Deslizá para descubrir</span>
      <span className="carousel-count" aria-live="polite" aria-atomic="true">{String(position.index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
      <div className="carousel-buttons">
        <button type="button" aria-label={`Anterior: ${label}`} aria-controls={id} disabled={position.index === 0} onClick={() => move(-1)}>←</button>
        <button type="button" aria-label={`Siguiente: ${label}`} aria-controls={id} disabled={position.end} onClick={() => move(1)}>→</button>
      </div>
    </div>
  </div>;
}
