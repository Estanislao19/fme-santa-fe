"use client";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { saveRecord } from "@/app/admin/actions";
import { recordTitle, type ContentRecord } from "@/lib/admin/collections";
export default function RecordList({ initial, collection, title }: { initial: ContentRecord[]; collection: string; title: string }) {
  const [records, setRecords] = useState(initial);
  const [search, setSearch] = useState(""); const [state, setState] = useState("all"); const [category, setCategory] = useState("");
  const [page, setPage] = useState(0); const [message, setMessage] = useState(""); const [pending, start] = useTransition();
  const choices = [...new Set(records.map(r=>String(r.data.category||r.data.kind||"")).filter(Boolean))];
  const filtered = useMemo(()=>records.filter(r=> `${recordTitle(r)} ${r.data.business||""}`.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().includes(search.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()) && (state==="all" || (state==="inactive" ? !r.active : r.state===state)) && (!category || r.data.category===category || r.data.kind===category)),[records,search,state,category]);
  function change(record: ContentRecord, patch: Partial<ContentRecord>) { start(async()=>{const result=await saveRecord({id:record.id,kind:record.kind,slug:record.slug,data:record.data,active:record.active,featured:record.featured,sort_order:record.sort_order,state:record.state,revision:record.revision,...patch});if(result.ok&&result.record){setRecords(previous=>previous.map(r=>r.id===record.id?result.record!:r));setMessage("Cambio guardado correctamente.");}else setMessage(result.error||"No se pudo guardar.");}); }
  return <><div className="admin-page-heading"><h1>{title}</h1><Link className="button" href={`/admin/${collection}/nuevo`}>Agregar</Link></div>
    <div className="admin-filters"><label>Buscar<input type="search" value={search} onChange={e=>{setSearch(e.target.value);setPage(0);}} placeholder="Nombre, título o emprendimiento" /></label>
    <label>Estado<select value={state} onChange={e=>{setState(e.target.value);setPage(0);}}><option value="all">Todos</option><option value="published">Publicados</option><option value="draft">Borradores</option><option value="archived">Archivados</option><option value="inactive">Inactivos</option></select></label>
    {choices.length>0&&<label>Rubro / tipo<select value={category} onChange={e=>{setCategory(e.target.value);setPage(0);}}><option value="">Todos</option>{choices.map(c=><option key={c}>{c}</option>)}</select></label>}</div>
    <p role="status">{message||`${filtered.length} registros`}</p><div className="admin-record-list">{filtered.slice(page*12,page*12+12).map(r=><article key={r.id}>
      <div><h2><Link href={`/admin/${collection}/${r.id}`}>{recordTitle(r)}</Link></h2><p>{String(r.data.business||r.data.description||"").slice(0,120)}</p><small>{r.state==="published"?"Publicado":r.state==="archived"?"Archivado":"Borrador"} · {r.active?"Activo":"Inactivo"}{r.featured?" · Destacado":""} · Orden {r.sort_order}</small></div>
      <div className="admin-row-actions"><Link href={`/admin/${collection}/${r.id}`}>Editar</Link><button disabled={pending} onClick={()=>change(r,{active:!r.active})}>{r.active?"Desactivar":"Activar"}</button><button disabled={pending} onClick={()=>change(r,{state:r.state==="archived"?"draft":"archived"})}>{r.state==="archived"?"Recuperar borrador":"Archivar"}</button></div>
    </article>)}</div>{!filtered.length&&<p>No hay registros que coincidan. Probá otro filtro o agregá contenido nuevo.</p>}
    <div className="admin-pagination"><button disabled={page===0} onClick={()=>setPage(p=>p-1)}>Anterior</button><span>Página {page+1} de {Math.max(1,Math.ceil(filtered.length/12))}</span><button disabled={(page+1)*12>=filtered.length} onClick={()=>setPage(p=>p+1)}>Siguiente</button></div>
  </>;
}
