"use client";
import Link from "next/link";
import {useState,useTransition,type FormEvent} from "react";
import {useRouter} from "next/navigation";
import MediaInput from "./MediaInput";
import {saveBenefit} from "@/app/admin/benefit-actions";
import type {Benefit} from "@/lib/admin/benefit-schema";
const textFields=[
  {key:"business_name",label:"Comercio, emprendimiento o profesional",required:true,max:200},
  {key:"benefit",label:"Beneficio / descuento",required:true,rows:3,max:2000},
  {key:"description",label:"Descripción (opcional)",rows:4,max:12000},
  {key:"instagram",label:"Instagram (URL HTTPS, opcional)",type:"url",max:2000},
  {key:"website",label:"Web (URL HTTPS, opcional)",type:"url",max:2000},
  {key:"whatsapp",label:"WhatsApp (teléfono con código de país y área, opcional)",type:"tel",max:40},
  {key:"address",label:"Dirección (opcional)",max:1000},
  {key:"terms",label:"Condiciones o aclaraciones (opcional)",rows:4,max:12000},
] as const;
export default function BenefitEditor({initial,categories}:{initial?:Benefit;categories:string[]}){
  const router=useRouter();const [record,setRecord]=useState<Omit<Benefit,"id">&{id?:string}>(initial||{business_name:"",category:categories[0]||"",benefit:"",description:"",logo_url:"",image_url:"",instagram:"",website:"",whatsapp:"",address:"",terms:"",active:false,archived:false,featured:false,sort_order:100,revision:1});
  const [pending,start]=useTransition(),[uploads,setUploads]=useState(0),[message,setMessage]=useState(""),[error,setError]=useState("");
  function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setError("");setMessage("");start(async()=>{try{const result=await saveBenefit(record);if(result.record){setRecord(result.record);setMessage("Beneficio guardado correctamente.");if(!record.id)router.replace(`/admin/beneficios/${result.record.id}`);}else setError(result.error||"No se pudo guardar.");}catch{setError("No se pudo guardar. Intentá nuevamente.");}});}
  return <><Link className="admin-link" href="/admin/beneficios">Volver a beneficios</Link><h1>{record.id?"Editar beneficio":"Agregar beneficio"}</h1><p>Solo el nombre, la categoría y el beneficio son obligatorios. Dejá vacíos los datos que todavía no estén confirmados.</p>
    <form className="admin-form" onSubmit={submit}>
      {textFields.map(field=>{const f=field as typeof field&{rows?:number;required?:boolean;type?:string};return <label key={f.key}>{f.label}{f.rows?<textarea rows={f.rows} required={f.required} maxLength={f.max} value={record[f.key]} onChange={e=>setRecord(r=>({...r,[f.key]:e.target.value}))}/>:<input type={f.type||"text"} required={f.required} maxLength={f.max} value={record[f.key]} onChange={e=>setRecord(r=>({...r,[f.key]:e.target.value}))}/>}</label>;})}
      <label>Categoría<select required value={record.category} onChange={e=>setRecord(r=>({...r,category:e.target.value}))}>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
      <MediaInput label="Logo (opcional)" value={record.logo_url} onChange={v=>setRecord(r=>({...r,logo_url:String(v)}))} onBusy={delta=>setUploads(n=>n+delta)}/>
      <MediaInput label="Imagen (opcional)" value={record.image_url} onChange={v=>setRecord(r=>({...r,image_url:String(v)}))} onBusy={delta=>setUploads(n=>n+delta)}/>
      <div className="admin-publication"><label>Estado<select value={record.archived?"archived":record.active?"active":"inactive"} onChange={e=>setRecord(r=>({...r,active:e.target.value==="active",archived:e.target.value==="archived"}))}><option value="inactive">Inactivo</option><option value="active">Activo · visible públicamente</option><option value="archived">Archivado</option></select></label>
      <label>Orden<input type="number" min={0} max={100000} required value={record.sort_order} onChange={e=>setRecord(r=>({...r,sort_order:e.target.valueAsNumber}))}/></label><label className="admin-check"><input type="checkbox" checked={record.featured} onChange={e=>setRecord(r=>({...r,featured:e.target.checked}))}/>Destacado</label></div>
      {error&&<p role="alert" className="admin-error">{error}</p>}<p role="status" className="admin-success">{message}</p>
      <button className="button" disabled={pending||uploads>0}>{pending?"Guardando…":uploads?"Subiendo imagen…":"Guardar beneficio"}</button>
    </form>
  </>;
}
