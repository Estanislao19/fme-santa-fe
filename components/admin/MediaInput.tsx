"use client";
import { useState } from "react";
async function optimize(file: File) {
  if (!["image/jpeg","image/png","image/webp","image/avif"].includes(file.type) || file.size > 20*1024*1024) throw new Error("Elegí una imagen JPG, PNG, WebP o AVIF de hasta 20 MB.");
  const bitmap = await createImageBitmap(file);
  try {
    if (bitmap.width * bitmap.height > 40_000_000) throw new Error("La imagen es demasiado grande. Exportala con menos de 40 megapíxeles.");
    const ratio = Math.min(1,1600/Math.max(bitmap.width,bitmap.height));
    const canvas = document.createElement("canvas"); canvas.width=Math.round(bitmap.width*ratio);canvas.height=Math.round(bitmap.height*ratio);
    const context = canvas.getContext("2d"); if(!context)throw new Error("No pudimos preparar esta imagen.");
    context.drawImage(bitmap,0,0,canvas.width,canvas.height);
    const blob=await new Promise<Blob|null>(resolve=>canvas.toBlob(resolve,"image/webp",.84));
    if(!blob||blob.size>3*1024*1024)throw new Error("La imagen optimizada supera 3 MB. Usá un archivo más pequeño.");
    return new File([blob],"imagen.webp",{type:"image/webp"});
  } finally { bitmap.close(); }
}
export default function MediaInput({ label, value, multiple=false, onChange, onBusy }: { label:string;value:string|string[];multiple?:boolean;onChange:(value:string|string[])=>void;onBusy:(delta:number)=>void }) {
  const [error,setError]=useState(""); const [previews,setPreviews]=useState<string[]>([]);const [busy,setBusy]=useState(false);
  const images=Array.isArray(value)?value:value?[value]:[];
  async function upload(files:File[]) {
    if(!files.length)return;
    if(multiple&&images.length+files.length>20){setError("Podés agregar hasta 20 imágenes en la galería.");return;}
    const urls=files.map(f=>URL.createObjectURL(f));setPreviews(urls);setError("");setBusy(true);onBusy(1);
    const added:string[]=[];
    try { for(const original of files){const file=await optimize(original);const body=new FormData();body.set("file",file);
      const response=await fetch("/api/admin/media",{method:"POST",body});const result=await response.json();
      if(!response.ok||!result.url)throw new Error(result.error||"No se pudo subir la imagen.");added.push(result.url);
    }}catch(e){setError(e instanceof Error?e.message:"No se pudo subir la imagen.");}
    finally {if(added.length)onChange(multiple?[...images,...added]:added[0]);urls.forEach(u=>URL.revokeObjectURL(u));setPreviews([]);setBusy(false);onBusy(-1);}
  }
  return <fieldset className="admin-media"><legend>{label}</legend><p>Elegí un archivo. Lo optimizamos y subimos a Supabase. Guardá la ficha para asociarlo al contenido.</p>
    <div className="admin-media-previews">{images.map((url,i)=><div key={`${url}-${i}`}><img src={url} alt={`${label} ${i+1}`} width={140} height={120}/><button type="button" disabled={busy} aria-label={`Quitar ${label.toLowerCase()} ${i+1}`} onClick={()=>onChange(multiple?images.filter((_,index)=>index!==i):"")}>Quitar</button></div>)}{previews.map(url=><img key={url} src={url} alt="Vista previa antes de guardar" width={140} height={120}/>)}</div>
    <label className="admin-file-label">{images.length&&!multiple?"Cambiar imagen":"Subir imagen"}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple={multiple} disabled={busy} onChange={e=>{void upload(Array.from(e.target.files||[]));e.target.value="";}}/></label>
    {busy&&<p role="status">Preparando y subiendo…</p>}{error&&<p role="alert" className="admin-error">{error}</p>}
  </fieldset>;
}
