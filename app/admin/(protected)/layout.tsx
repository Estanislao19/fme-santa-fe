import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { logout } from "@/app/admin/actions";
export default async function Layout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();
  return <div className="admin-shell"><aside className="admin-sidebar"><Link className="admin-brand" href="/admin">FME · Administración</Link>
    <nav aria-label="Administración">{[["Resumen", "/admin"], ["Socias", "/admin/socias"], ["Beneficios", "/admin/beneficios"], ["Capacitaciones", "/admin/capacitaciones"], ["Alianzas", "/admin/alianzas"], ["Colaboradores", "/admin/colaboradores"], ["Proyectos / Eventos", "/admin/proyectos"], ["Configuración", "/admin/configuracion"]].map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav>
    <p className="admin-account">{user.email}</p><form action={logout}><button type="submit" className="admin-link">Cerrar sesión</button></form><Link href="/" target="_blank">Ver sitio público</Link>
  </aside><div className="admin-content">{children}</div></div>;
}
