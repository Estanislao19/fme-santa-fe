"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <div className="container section"><h1>No pudimos cargar este contenido.</h1><p>Intentá nuevamente en unos minutos.</p><button className="button" onClick={reset}>Volver a intentar</button></div>;
}
