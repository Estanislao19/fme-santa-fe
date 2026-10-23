"use client";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { collections, recordTitle, slugify, type ContentRecord, type PublicationState } from "@/lib/admin/collections";
import { saveRecord, deleteRecord } from "@/app/admin/actions";
import MediaInput from "./MediaInput";
export default function RecordEditor({ collection, initial, categories }: { collection:string;initial:ContentRecord|null;categories:string[] }) {
  const config=collections[collection]; const router=useRouter();const dialog=useRef<HTMLDialogElement>(null);
  const initialData:Record<string,unknown>={demo:false}; config.fields.forEach(f=>{initialData[f.key]=f.type==="gallery"||f.type==="lines"?[]:f.options?.[0]||"";});
  const [record,setRecord]=useState<ContentRecord>(initial||{id:"",kind:config.kind,slug:"",data:initialData,active:true,featured:false,sort_order:0,state:"draft",revision:1});
  const [automatic,setAutomatic]=useState(!initial);const [message,setMessage]=useState("");const [error,setError]=useState("");const [uploads,setUploads]=useState(0);const [confirmation,setConfirmation]=useState("");const [pending,start]=useTransition();
  const savedMessage = {members:"Socia guardada correctamente.",trainings:"Capacitación guardada correctamente.",alliances:"Alianza guardada correctamente.",collaborators:"Colaborador guardado correctamente.",projects:"Proyecto / evento guardado correctamente."}[config.kind];
  function field(key:string,value:unknown){setRecord(previous=>({...previous,slug:automatic&&key===config.nameField?slugify(String(value)):previous.slug,data:{...previous.data,[key]:value}}));setMessage("");}
  function save(event:React.FormEvent){event.preventDefault();setError("");setMessage("");start(async()=>{const result=await saveRecord({id:record.id||undefined,kind:record.kind,slug:record.slug,data:record.data,active:record.active,featured:record.featured,sort_order:record.sort_order,state:record.state,revision:record.revision},automatic&&!record.id);if(result.ok&&result.record){setRecord(result.record);setMessage(`${savedMessage} ${result.record.state==="published"&&result.record.active?"Ya está disponible en el sitio público.":"No aparece en el sitio público."}`);if(!record.id)router.replace(`/admin/${collection}/${result.record.id}`);router.refresh();}else setError(result.error||"No se pudo guardar.");});}
  return <><Link className="admin-link" href={`/admin/${collection}`}>Volver a {config.title.toLowerCase()}</Link><h1>{initial?`Editar ${config.singular.toLowerCase()}`:`Agregar ${config.singular.toLowerCase()}`}</h1>
    <p>Los cambios se aplican al guardar. Para aparecer públicamente, el contenido debe estar activo y publicado.</p>
    <form className="admin-form" onSubmit={save}>
      <div className="admin-editor-fields">{config.fields.map(f=>f.type==="image"||f.type==="gallery"?<MediaInput key={f.key} label={f.label} value={(record.data[f.key] as string|string[])||(f.type==="gallery"?[]:"")} multiple={f.type==="gallery"} onChange={v=>field(f.key,v)} onBusy={delta=>setUploads(n=>n+delta)}/>:<label key={f.key}>{f.label}{f.required?" *":""}
        {f.type==="textarea"||f.type==="lines"?<textarea rows={f.type==="textarea"?5:3} required={f.required} value={f.type==="lines"?(record.data[f.key] as string[]||[]).join("\n"):String(record.data[f.key]||"")} onChange={e=>field(f.key,f.type==="lines"?e.target.value.split("\n"):e.target.value)}/>
        :f.type==="select"?<select required={f.required} value={String(record.data[f.key]||"")} onChange={e=>field(f.key,e.target.value)}><option value="" disabled>Seleccioná una opción</option>{(f.key==="category"?categories:f.options||[]).map(option=><option key={option} value={option}>{option==="upcoming"?"Próxima":option==="past"?"Realizada":option}</option>)}</select>
        :<input type={f.type==="url"?"url":f.type==="tel"?"tel":"text"} required={f.required} maxLength={f.type==="url"?2000:200} placeholder={f.type==="url"?"https://…":undefined} value={String(record.data[f.key]||"")} onChange={e=>field(f.key,e.target.value)}/>}{f.help&&<small>{f.help}</small>}</label>)}</div>
      <fieldset className="admin-publication"><legend>Publicación y orden</legend>
        <label>Estado<select value={record.state} onChange={e=>setRecord({...record,state:e.target.value as PublicationState})}><option value="draft">Borrador</option><option value="published">Publicado</option><option value="archived">Archivado</option></select></label>
        <label className="admin-check"><input type="checkbox" checked={record.active} onChange={e=>setRecord({...record,active:e.target.checked})}/>Contenido activo</label>
        <label className="admin-check"><input type="checkbox" checked={record.featured} onChange={e=>setRecord({...record,featured:e.target.checked})}/>Marcar como destacado</label>
        <label>Orden<input type="number" min={0} max={100000} step={1} value={record.sort_order} onChange={e=>setRecord({...record,sort_order:Number(e.target.value)})}/><small>Los números menores se muestran primero. Home prioriza destacados.</small></label>
        <label className="admin-check"><input type="checkbox" checked={record.data.demo===true} onChange={e=>field("demo",e.target.checked)}/>Contenido DEMO / REEMPLAZAR</label>
      </fieldset>
      <fieldset className="admin-publication"><legend>Enlace público</legend><label className="admin-check"><input type="checkbox" checked={automatic} onChange={e=>{setAutomatic(e.target.checked);if(e.target.checked)setRecord({...record,slug:slugify(String(record.data[config.nameField]||""))});}}/>Generar enlace a partir del nombre / título</label>
        <label>Slug<input required pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={100} value={record.slug} onChange={e=>{setAutomatic(false);setRecord({...record,slug:e.target.value});}}/><small>Letras minúsculas, números y guiones. Los enlaces anteriores de socias y capacitaciones se redirigen al nuevo.</small></label>
      </fieldset>
      {error&&<p role="alert" className="admin-error">{error}</p>}{message&&<p role="status" className="admin-success">{message}</p>}
      <div className="admin-save"><button className="button" disabled={pending||uploads>0}>{pending?"Guardando…":uploads>0?"Esperá a que terminen las imágenes":"Guardar cambios"}</button><Link href={`/admin/${collection}`}>Volver al listado</Link></div>
    </form>
    {record.id&&<div className="admin-danger"><h2>Conservar o eliminar</h2><p>Para retirar una ficha sin perderla, elegí Archivado o desactivala y guardá. La eliminación definitiva no se puede deshacer.</p><button type="button" className="admin-danger-button" onClick={()=>{setError("");dialog.current?.showModal();}}>Eliminar definitivamente</button>
      <dialog ref={dialog} aria-labelledby="delete-title"><h2 id="delete-title">¿Seguro que querés eliminar este contenido?</h2><p>Escribí <strong>{recordTitle(record)}</strong> para confirmar.</p><label>Nombre o título exacto<input value={confirmation} onChange={e=>setConfirmation(e.target.value)}/></label>{error&&<p role="alert">{error}</p>}
      <div className="admin-row-actions"><button onClick={()=>dialog.current?.close()}>Cancelar</button><button className="admin-danger-button" disabled={pending||confirmation!==recordTitle(record)} onClick={()=>start(async()=>{const result=await deleteRecord(record.id,record.revision,confirmation);if(result.ok){dialog.current?.close();router.push(`/admin/${collection}`);router.refresh();}else setError(result.error||"No se pudo eliminar.");})}>Confirmar eliminación</button></div></dialog>
    </div>}
  </>;
}
