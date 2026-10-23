"use client";
import { useState, useTransition, type FormEvent } from "react";
import { institutionalFields, type InstitutionalDocument, type InstitutionalValue } from "@/lib/admin/institutional-schema";
import { saveInstitutional, saveInstitutionalValue } from "@/app/admin/institutional-actions";

function ValueEditor({value,onSave}:{value?:InstitutionalValue;onSave:(value:InstitutionalValue)=>void}) {
  const [busy,startTransition]=useTransition(),[error,setError]=useState(""),[message,setMessage]=useState("");
  function submit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();const form=e.currentTarget;const data=new FormData(form);
    setError("");setMessage("");
    startTransition(async()=>{
    try {
      const result=await saveInstitutionalValue({...(value?{id:value.id}:{}),revision:value?.revision||1,name:data.get("name"),description:data.get("description"),sort_order:Number(data.get("sort_order")),active:data.get("active")==="on"});
      if(result.error) setError(result.error);
      if(result.value){onSave(result.value);setMessage("Valor guardado correctamente.");if(!value)form.reset();}
    } catch {setError("No se pudo guardar. Intentá nuevamente.");}
    });
  }
  return <form className="admin-form institutional-value-form" onSubmit={submit}>
    <label>Nombre<input name="name" required maxLength={150} defaultValue={value?.name}/></label>
    <label>Descripción<textarea name="description" required maxLength={3000} rows={3} defaultValue={value?.description}/></label>
    <label>Orden<input name="sort_order" type="number" min={0} max={100000} required defaultValue={value?.sort_order??100}/></label>
    <label className="admin-check"><input name="active" type="checkbox" defaultChecked={value?.active??true}/>Visible en el sitio</label>
    <button className="button" disabled={busy}>{busy?"Guardando…":value?"Guardar valor":"Agregar valor"}</button>
    {error&&<p role="alert" className="admin-error">{error}</p>}<p role="status" className="admin-success">{message}</p>
  </form>;
}
export default function InstitutionalEditor({initial,initialValues}:{initial:InstitutionalDocument;initialValues:InstitutionalValue[]}) {
  const [content,setContent]=useState(initial),[values,setValues]=useState(initialValues),[busy,startTransition]=useTransition(),[error,setError]=useState(""),[message,setMessage]=useState("");
  function submit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();const data=new FormData(e.currentTarget);setError("");setMessage("");
    startTransition(async()=>{
    try {
      const result=await saveInstitutional({...Object.fromEntries(institutionalFields.map(f=>[f.key,data.get(f.key)])),revision:content.revision});
      if(result.error)setError(result.error);
      if(result.content){setContent(result.content);setMessage("Contenido institucional guardado correctamente.");}
    }catch{setError("No se pudo guardar. Intentá nuevamente.");}
    });
  }
  function update(value:InstitutionalValue){setValues(current=>[...current.filter(v=>v.id!==value.id),value].sort((a,b)=>a.sort_order-b.sort_order||a.name.localeCompare(b.name,"es")));}
  return <section className="admin-institutional"><h2>Contenido institucional</h2><p>Estos textos se publican en Nosotras, Socias, Comunidad y Home. Separá los párrafos con una línea en blanco. La síntesis de Home permite mantener su presentación breve.</p>
    <form className="admin-form" onSubmit={submit}>{institutionalFields.map(f=><label key={f.key}>{f.label}<textarea name={f.key} rows={f.rows} maxLength={f.max} required defaultValue={initial[f.key]}/></label>)}
    <button className="button" disabled={busy}>{busy?"Guardando…":"Guardar contenido institucional"}</button>
    {error&&<p role="alert" className="admin-error">{error}</p>}<p role="status" className="admin-success">{message}</p></form>
    <h3>Valores</h3><p>Un número menor aparece primero. Para retirar un valor sin perderlo, desmarcá «Visible en el sitio» y guardá.</p>
    {values.map(value=><details className="admin-value" key={value.id}><summary>{value.sort_order}. {value.name} · {value.active?"Activo":"Inactivo"}</summary><ValueEditor value={value} onSave={update}/></details>)}
    <details className="admin-value"><summary>Agregar un valor</summary><ValueEditor onSave={update}/></details>
  </section>;
}
