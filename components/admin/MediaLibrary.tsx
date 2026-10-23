"use client";
import { useState,useTransition } from "react";
import { deleteMedia } from "@/app/admin/actions";
export default function MediaLibrary({ files }: { files: {name:string;url:string;referenced:boolean}[] }) {
  const [items,setItems]=useState(files);const[message,setMessage]=useState("");const[pending,start]=useTransition();
  return <><p>Las imágenes usadas por una ficha, incluso archivada, se conservan. Para quitar una imagen de una ficha, editá esa ficha y guardá primero. Eliminá aquí únicamente archivos que ya no necesites.</p><p role="status">{message}</p><div className="admin-library">{items.map(file=><article key={file.url}><img src={file.url} alt="Archivo de la biblioteca" width={180} height={140}/><small>{file.name}</small><span>{file.referenced?"En uso por una ficha":"Sin referencias"}</span><button disabled={pending||file.referenced} onClick={()=>{
      if(!window.confirm("¿Eliminar este archivo definitivamente de Storage? Esta acción no se puede deshacer."))return;
      start(async()=>{const result=await deleteMedia(file.url);if(result.ok){setItems(previous=>previous.filter(item=>item.url!==file.url));setMessage("Archivo eliminado correctamente.");}else setMessage(result.error||"No se pudo eliminar.");});
    }}>Eliminar archivo</button></article>)}</div>{!items.length&&<p>Todavía no hay imágenes subidas desde el administrador.</p>}</>;
}
