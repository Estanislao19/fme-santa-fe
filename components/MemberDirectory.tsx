"use client";
import { useEffect, useMemo, useState } from "react";
import { members } from "@/data/members";
import { categories } from "@/data/categories";
import MemberCard from "./MemberCard";
function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
export default function MemberDirectory() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [visibleCount, setVisibleCount] = useState(3);
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("rubro");
    if (requested && categories.some((item) => item === requested))
      setCategory(requested);
  }, []);
  const filtered = useMemo(
    () =>
      members.filter(
        (m) =>
          m.active &&
          (category === "Todas" || category === m.category) &&
          normalize(
            `${m.name} ${m.business} ${m.description} ${m.category} ${m.offers.join(" ")}`,
          ).includes(normalize(search)),
      ),
    [search, category],
  );
  return (
    <>
      <div className="directory-controls">
        <label className="search-label" htmlFor="member-search">
          Encontrá un emprendimiento
        </label>
        <div className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            id="member-search"
            type="search"
            placeholder="Buscar por nombre, servicio o emprendimiento…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setVisibleCount(3); }}
          />
        </div>
        <div className="filters" role="group" aria-label="Filtrar por rubro">
          {["Todas", ...categories].map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => { setCategory(c); setVisibleCount(3); }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <p className="results-count" role="status">
        {filtered.length}{" "}
        {filtered.length === 1 ? "emprendimiento" : "emprendimientos"}
        {filtered.some((member) => member.demo) &&
          " · Perfiles y fotografías DEMO; no representan socias reales de FME"}
      </p>
      {filtered.length ? (
        <div className="member-grid">
          {filtered.slice(0, visibleCount).map((m, i) => (
            <MemberCard key={m.slug} member={m} index={i} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No encontramos coincidencias</h2>
          <p>Probá otro término o explorá todos los rubros.</p>
          <button
            className="button"
            onClick={() => {
              setSearch("");
              setCategory("Todas");
            }}
          >
            Limpiar búsqueda
          </button>
        </div>
      )}
      {filtered.length > 0 && <div className="directory-more">
        <p role="status">Mostrando {Math.min(visibleCount, filtered.length)} de {filtered.length}</p>
        {visibleCount < filtered.length && <button type="button" className="button button-secondary" onClick={() => setVisibleCount(count => count + 3)}>Mostrar más socias</button>}
      </div>}
    </>
  );
}
