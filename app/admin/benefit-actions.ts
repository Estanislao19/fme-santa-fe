"use server";
import {z} from "zod";
import {revalidatePath} from "next/cache";
import {requireAdmin} from "@/lib/admin/auth";
import {benefitSchema,benefitColumns,type Benefit} from "@/lib/admin/benefit-schema";

export async function saveBenefit(input:unknown):Promise<{error?:string;record?:Benefit}>{
  const {client}=await requireAdmin({writable:true});
  const parsed=benefitSchema.safeParse(input);
  if(!parsed.success)return {error:parsed.error.issues.map(i=>i.message).join(" · ")};
  const {id,revision,...values}=parsed.data;
  try {
    const {data:category,error:categoryError}=await client.from("fme_benefit_categories").select("name").eq("name",values.category).maybeSingle();
    if(categoryError||!category)return {error:"Seleccioná una categoría existente."};
    const query=id?client.from("fme_benefits").update(values).eq("id",id).eq("revision",revision):client.from("fme_benefits").insert(values);
    const {data,error}=await query.select(benefitColumns).maybeSingle();
    if(error)return {error:"No se pudo guardar. Revisá la conexión y los permisos."};
    if(!data)return {error:"Este beneficio cambió en otra sesión. Recargá antes de guardar."};
    revalidatePath("/","layout");return {record:data as Benefit};
  }catch{return {error:"No pudimos conectar. Tu edición se conserva en la pantalla; intentá guardar nuevamente."};}
}
export async function addBenefitCategory(input:unknown):Promise<{error?:string;name?:string}>{
  const {client}=await requireAdmin({writable:true});
  const parsed=z.string().trim().min(1).max(100).safeParse(input);
  if(!parsed.success)return {error:"Escribí un nombre de categoría de hasta 100 caracteres."};
  const {error}=await client.from("fme_benefit_categories").insert({name:parsed.data,sort_order:100});
  if(error)return {error:error.code==="23505"?"La categoría ya existe.":"No se pudo agregar la categoría."};
  revalidatePath("/","layout");return {name:parsed.data};
}
