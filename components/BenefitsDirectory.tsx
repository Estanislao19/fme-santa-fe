"use client";
import {useState} from "react";
import type {Benefit} from "@/lib/admin/benefit-schema";
import {safeLink} from "@/lib/admin/validation";
export default function BenefitsDirectory({benefits,categories}:{benefits:Benefit[];categories:string[]}){
  const [category,setCategory]=useState("");
  const visible=benefits.filter(b=>b.active&&!b.archived&&(!category||b.category===category));
  return <div className="benefits-directory">
    <nav className="benefit-filters" aria-label="Filtrar beneficios por categoría">{["",...categories].map(c=><button type="button" key={c} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c||"Todas"}</button>)}</nav>
    <p className="benefit-result" role="status">{visible.length} {visible.length===1?"beneficio disponible":"beneficios disponibles"}</p>
    {!visible.length&&<p>No hay beneficios activos en esta categoría.</p>}
    {categories.filter(c=>visible.some(b=>b.category===c)).map(c=><section className="benefit-category" key={c} aria-label={c}><h2>{c}</h2><div>{visible.filter(b=>b.category===c).map(b=><article className="benefit-entry" key={b.id}>
      {b.logo_url&&safeLink(b.logo_url,true)&&<img className="benefit-logo" src={b.logo_url} alt={`Logo de ${b.business_name}`} loading="lazy" width={120} height={80}/>}
      <div className="benefit-entry-copy"><h3>{b.business_name}</h3>{b.featured&&<span className="benefit-featured">Destacado</span>}<p className="benefit-offer">{b.benefit}</p>
      {b.image_url&&safeLink(b.image_url,true)&&<img className="benefit-photo" src={b.image_url} alt={b.business_name} loading="lazy" width={600} height={400}/>}
      {b.description&&<p className="institutional-text">{b.description}</p>}{b.address&&<p>Dirección: {b.address}</p>}
      {b.terms&&<details className="benefit-terms"><summary>Condiciones y aclaraciones</summary><p className="institutional-text">{b.terms}</p></details>}
      <div className="benefit-links">{b.website&&safeLink(b.website)&&<a href={b.website} target="_blank" rel="noopener noreferrer">Web</a>}{b.instagram&&safeLink(b.instagram)&&<a href={b.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}{b.whatsapp&&/^\+?[\d ()-]{6,40}$/.test(b.whatsapp)&&b.whatsapp.replace(/\D/g,"").length>=6&&<a href={`https://wa.me/${b.whatsapp.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>}</div>
      </div></article>)}</div></section>)}
  </div>;
}
