import Link from "next/link";
import { redirect } from "next/navigation";
import { adminAccess } from "@/lib/admin/auth";
import { supabaseConfig } from "@/lib/supabase/config";
import Login from "@/components/admin/Login";
export default async function Page({searchParams}:{searchParams:Promise<{denied?:string}>}) {
  const access=await adminAccess();
  if (access.status === "authorized") redirect("/admin");
  if (access.status === "refresh") redirect("/api/admin/session/?next=/admin/");
  const denied=access.status === "forbidden" || (await searchParams).denied === "1";
  const configured = !!supabaseConfig();
  return <div className="admin-login"><Link href="/" className="text-link">Volver al sitio FME</Link><h1>Administrar FME</h1>
    <p>Acceso exclusivo para las personas autorizadas por la Fundación.</p>
    {denied && <p className="admin-error" role="alert">Esta cuenta no está autorizada para administrar FME. Ingresá con una cuenta administradora.</p>}
    {configured ? <Login /> : <div className="admin-notice" role="status"><h2>Configuración pendiente</h2><p>El acceso está cerrado hasta conectar Supabase y autorizar al primer administrador. No hay un usuario ni una contraseña de demostración.</p><p>La persona que prepara el sitio debe seguir <strong>SUPABASE-NETLIFY.md</strong> y completar las variables de entorno.</p></div>}
  </div>;
}
