"use client";
import Link from "next/link";
import {useState,useTransition,type FormEvent} from "react";
import {saveBenefit,addBenefitCategory} from "@/app/admin/benefit-actions";
import type {Benefit} from "@/lib/admin/benefit-schema";
const normalize=(v:string)=>v.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
export default function BenefitsAdmin({initial,categories:initialCategories}:{initial:Benefit[];categories:string[]}){
  const [records,setRecords]=useState(initial),[categories,setCategories]=useState(initialCategories),[search,setSearch]=useState(""),[category,setCategory]=useState(""),[state,setState]=useState("all"),[page,setPage]=useState(0),[message,setMessage]=useState(""),[error,setError]=useState(""),[pending,start]=useTransition();
  const filtered=records.filter(b=>normalize(`${b.business_name} ${b.benefit}`).includes(normalize(search))&&(!category||b.category===category)&&(state==="all"||state==="active"&&b.active||state==="inactive"&&!b.active&&!b.archived||state==="archived"&&b.archived)).sort((a,b)=>a.sort_order-b.sort_order||a.business_name.localeCompare(b.business_name,"es"));
  function change(record:Benefit,patch:Partial<Benefit>){start(async()=>{setMessage("");setError("");try{const result=await saveBenefit({...record,...patch});if(result.record){setRecords(current=>current.map(b=>b.id===record.id?result.record!:b));setPage(0);setMessage("Beneficio actualizado correctamente.");}else setError(result.error||"No se pudo guardar.");}catch{setError("No se pudo guardar. Intentá nuevamente.");}});}
  function addCategory(e:FormEvent<HTMLFormElement>){e.preventDefault();const form=e.currentTarget;const name=new FormData(form).get("name");start(async()=>{setError("");setMessage("");try{const result=await addBenefitCategory(name);if(result.name){setCategories(current=>[...current,result.name!]);setMessage("Categoría agregada correctamente.");form.reset();}else setError(result.error||"No se pudo agregar.");}catch{setError("No se pudo agregar. Intentá nuevamente.");}});}
  return <><div className="admin-page-heading"><h1>Beneficios</h1><Link className="button" href="/admin/beneficios/nuevo">Agregar beneficio</Link></div>
    <p>Activá un convenio para publicarlo. Desactivar o archivar lo retira de la web y conserva sus datos.</p>
    <div className="admin-filters"><label>Buscar beneficio<input type="search" value={search} onChange={e=>{setSearch(e.target.value);setPage(0);}}/></label>
      <label>Categoría<select value={category} onChange={e=>{setCategory(e.target.value);setPage(0);}}><option value="">Todas</option>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
      <label>Estado<select value={state} onChange={e=>{setState(e.target.value);setPage(0);}}><option value="all">Todos</option><option value="active">Activos</option><option value="inactive">Inactivos</option><option value="archived">Archivados</option></select></label></div>
    {error&&<p className="admin-error" role="alert">{error}</p>}<p role="status">{message||`${filtered.length} beneficios`}</p>
    <div className="admin-record-list">{filtered.slice(page*12,page*12+12).map(b=><article key={b.id}><div><h2><Link href={`/admin/beneficios/${b.id}`}>{b.business_name}</Link></h2><p>{b.benefit}</p><small>{b.category} · {b.archived?"Archivado":b.active?"Activo":"Inactivo"}{b.featured?" · Destacado":""} · Orden {b.sort_order}</small></div><div className="admin-row-actions">
      <Link href={`/admin/beneficios/${b.id}`}>Editar</Link><button disabled={pending} onClick={()=>change(b,{active:!b.active,archived:false})}>{b.active?"Desactivar":"Activar"}</button>
      <button disabled={pending} onClick={()=>change(b,{archived:!b.archived,active:false})}>{b.archived?"Recuperar inactivo":"Archivar"}</button>
      <button disabled={pending} onClick={()=>change(b,{featured:!b.featured})}>{b.featured?"Quitar destacado":"Destacar"}</button>
    </div></article>)}</div>
    {!filtered.length&&<p>No hay beneficios que coincidan con estos filtros.</p>}
    <div className="admin-pagination"><button disabled={!page} onClick={()=>setPage(p=>p-1)}>Anterior</button><span>Página {page+1} de {Math.max(1,Math.ceil(filtered.length/12))}</span><button disabled={(page+1)*12>=filtered.length} onClick={()=>setPage(p=>p+1)}>Siguiente</button></div>
    <details className="admin-value"><summary>Agregar una categoría</summary><form className="admin-form" onSubmit={addCategory}><label>Nombre de categoría<input name="name" required maxLength={100}/></label><button className="button" disabled={pending}>Agregar categoría</button></form></details>
  </>;
}

