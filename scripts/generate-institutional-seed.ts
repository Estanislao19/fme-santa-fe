import { writeFileSync, readFileSync } from "node:fs";
import { officialInstitutional, officialValues } from "../data/institutional";
const quote=(value:unknown)=>`'${String(value).replaceAll("'","''")}'`;
const fields=Object.keys(officialInstitutional);
const sql=[
  "-- Textos oficiales de FME. No sobrescribe ediciones existentes.",
  `insert into public.fme_institutional(id,${fields.join(",")}) values(1,${Object.values(officialInstitutional).map(quote).join(",")}) on conflict(id) do nothing;`,
  "-- Carga los diez valores solo cuando la colección todavía no tiene registros.",
  `insert into public.fme_values(id,name,description,sort_order,active) select v.id::uuid,v.name,v.description,v.sort_order,true from (values\n${officialValues.map(v=>`(${quote(v.id)},${quote(v.name)},${quote(v.description)},${v.sort_order})`).join(",\n")}\n) as v(id,name,description,sort_order) where not exists(select 1 from public.fme_values);`,
];
const header=readFileSync("supabase/institutional-schema.sql","utf8");
writeFileSync("supabase/institutional-seed.sql",sql.join("\n")+"\n");
writeFileSync("supabase/migrations/202610230002_institutional.sql",`${header}\n\n${sql.join("\n")}\ncommit;\n`);
console.log("Migración institucional generada: textos oficiales y diez valores, sin modificar datos v6 existentes.");
