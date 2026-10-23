import Link from "next/link";
import { adminRecords } from "@/lib/admin/data";
import { collections } from "@/lib/admin/collections";
export default async function Page() {
  const records = await adminRecords();
  return <><h1>Un lugar para administrar FME.</h1><p>Creá un borrador, revisá el contenido y publicalo cuando esté listo. Los cambios publicados aparecen en el sitio al volver a cargar la página.</p>
    <div className="admin-summary">{Object.entries(collections).map(([path,c]) => <Link href={`/admin/${path}`} key={path}><strong>{records.filter(r=>r.kind===c.kind).length}</strong><span>{c.title}</span></Link>)}</div>
    <div className="admin-notice"><h2>Antes de publicar</h2><p>Usá información confirmada y fotografías autorizadas. Una ficha solo aparece en el sitio cuando está publicada y activa. Archivar conserva los datos y retira la publicación.</p></div>
    <h2>Últimos cambios</h2><ul className="admin-activity">{[...records].sort((a,b)=>(b.updated_at||"").localeCompare(a.updated_at||"")).slice(0,5).map(r=><li key={r.id}>{String(r.data.name||r.data.title)} <small>{r.state === "published" ? "Publicado" : r.state === "archived" ? "Archivado" : "Borrador"}</small></li>)}</ul>
  </>;
}
