import { writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { members } from "../data/members";
import { trainings } from "../data/trainings";
import { alliances } from "../data/alliances";
import { collaborators } from "../data/collaborators";
import { projects } from "../data/projects";
import { categories } from "../data/categories";
import { slugify } from "../lib/admin/collections";

const quote = (value: unknown) => `'${String(value).replaceAll("'", "''")}'`;
function id(value: string) { const hex=createHash("sha256").update(`fme-v5:${value}`).digest("hex").slice(0,32).split("");hex[12]="4";hex[16]="8";const v=hex.join("");return `${v.slice(0,8)}-${v.slice(8,12)}-${v.slice(12,16)}-${v.slice(16,20)}-${v.slice(20)}`; }
const groups = { members, trainings, alliances, collaborators, projects };
const lines = ["-- Generado desde data/*.ts de FME v5. No inventa registros ni modifica los existentes.","-- Idempotente: ON CONFLICT DO NOTHING conserva cambios posteriores del administrador.","begin;"];
let count=0;
for(const [kind,items] of Object.entries(groups)) items.forEach((original,index)=>{
  const value=original as unknown as Record<string,unknown>;
  const slug=String(value.slug || slugify(String(value.name || value.title)));
  const {active,slug:_slug,featured:existingFeatured,order:existingOrder,...data}=value;
  if(kind==="projects"&&!data.kind)data.kind="Proyecto";
  const featured=typeof existingFeatured === "boolean" ? existingFeatured : kind==="alliances"||kind==="trainings"&&data.status==="upcoming"||kind==="members"&&index<3;
  const order = typeof existingOrder === "number" ? existingOrder : index;
  lines.push(`insert into public.fme_content(id,kind,slug,data,active,featured,sort_order,state) values(${quote(id(`${kind}:${slug}`))},${quote(kind)},${quote(slug)},${quote(JSON.stringify(data))}::jsonb,${active!==false},${featured},${order},'published') on conflict do nothing;`);
  count++;
});
categories.forEach((name,index)=>lines.push(`insert into public.fme_categories(id,name,sort_order) values(${quote(id(`category:${name}`))},${quote(name)},${index}) on conflict(name) do nothing;`));
lines.push("commit;","");
writeFileSync("supabase/seed.sql",lines.join("\n"));
console.log(`Seed generado: ${count} registros y ${categories.length} rubros. Sin usuarios ni contraseñas.`);

