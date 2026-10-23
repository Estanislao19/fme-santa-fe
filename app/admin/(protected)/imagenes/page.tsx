import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { adminRecords } from "@/lib/admin/data";
import MediaLibrary from "@/components/admin/MediaLibrary";
export default async function Page() {
  const {client}=await requireAdmin();const records=await adminRecords();const references=JSON.stringify(records.map(r=>r.data));
  const files:{name:string;url:string;referenced:boolean}[]=[];
  for(let offset=0;;offset+=100){
    const {data:folders,error}=await client.storage.from("fme-media").list("",{limit:100,offset,sortBy:{column:"name",order:"asc"}});
    if(error)throw new Error("No se pudo abrir la biblioteca de imágenes.");
    for(const folder of folders){if(folder.id)continue;for(let start=0;;start+=100){
      const {data:entries,error:failed}=await client.storage.from("fme-media").list(folder.name,{limit:100,offset:start,sortBy:{column:"name",order:"asc"}});
      if(failed)throw new Error("No se pudieron leer las imágenes.");
      for(const entry of entries){if(!entry.id)continue;const {data}=client.storage.from("fme-media").getPublicUrl(`${folder.name}/${entry.name}`);files.push({name:entry.name,url:data.publicUrl,referenced:references.includes(data.publicUrl)});}
      if(entries.length<100)break;
    }}
    if(folders.length<100)break;
  }
  return <><Link className="admin-link" href="/admin/configuracion">Volver a configuración</Link><h1>Biblioteca de imágenes</h1><MediaLibrary files={files}/></>;
}
