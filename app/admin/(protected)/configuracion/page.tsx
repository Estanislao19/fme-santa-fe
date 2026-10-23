import { requireAdmin } from "@/lib/admin/auth";
import { getCategories } from "@/lib/content";
import CategoryForm from "@/components/admin/CategoryForm";
import Link from "next/link";
import { getInstitutionalAdmin } from "@/lib/institutional";
import InstitutionalEditor from "@/components/admin/InstitutionalEditor";
export default async function Page(){await requireAdmin();const [categories,institutional]=await Promise.all([getCategories(),getInstitutionalAdmin()]);return <><h1>Configuración</h1><InstitutionalEditor initial={institutional.content} initialValues={institutional.values}/><h2>Rubros del directorio</h2><p>Estos rubros se utilizan en el selector de socias y en los filtros públicos. Se conservan los rubros existentes para no dejar perfiles sin categoría.</p><ul className="admin-category-list">{categories.map(c=><li key={c}>{c}</li>)}</ul><CategoryForm/><p><Link className="admin-link" href="/admin/imagenes">Gestionar la biblioteca de imágenes</Link></p><div className="admin-notice"><h2>Acceso y publicación</h2><p>Las cuentas administradoras se autorizan desde Supabase por una persona responsable. Este panel no puede otorgarse permisos a sí mismo.</p><p>Para habilitar nuevas cuentas o cambiar configuración de deploy, consultá SUPABASE-NETLIFY.md. Para el uso diario, consultá ADMINISTRADOR.md.</p><p>Los formularios públicos conservan su estado actual: no envían ni guardan datos.</p></div></>;}

