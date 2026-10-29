import {readFileSync,writeFileSync} from "node:fs";
import {benefitCategories,initialBenefits} from "../data/benefits";
const quote=(v:unknown)=>typeof v==="boolean"||typeof v==="number"?String(v):`'${String(v).replaceAll("'","''")}'`;
const fields=Object.keys(initialBenefits[0]).filter(k=>k!=="revision") as (keyof typeof initialBenefits[number])[];
const seed=`-- Convenios oficiales: solo inserta IDs iniciales faltantes; nunca sobrescribe ediciones.\ninsert into public.fme_benefit_categories(name,sort_order) values\n${benefitCategories.map((c,i)=>`(${quote(c)},${i+1})`).join(",\n")}\non conflict(name) do nothing;\ninsert into public.fme_benefits(${fields.join(",")}) values\n${initialBenefits.map(b=>`(${fields.map(f=>quote(b[f])).join(",")})`).join(",\n")}\non conflict(id) do nothing;\n`;
writeFileSync("supabase/benefits-seed.sql",seed);
writeFileSync("supabase/migrations/202610290003_benefits.sql",readFileSync("supabase/benefits-schema.sql","utf8")+"\n"+seed+"commit;\n");
console.log("Migración 003 generada: cinco categorías y quince convenios; sin cambios en tablas existentes.");
