"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset:()=>void }) {
  return <div className="admin-login"><h1>No pudimos abrir el administrador.</h1><p>Revisá la conexión e intentá nuevamente. Si persiste, la persona responsable debe comprobar las variables de Supabase y la migración según SUPABASE-NETLIFY.md.</p><button className="button" onClick={reset}>Volver a intentar</button><p><Link href="/admin/login">Volver al acceso</Link></p></div>;
}
