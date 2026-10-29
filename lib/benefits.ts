import "server-only";
import {cache} from "react";
import type {SupabaseClient} from "@supabase/supabase-js";
import {publicClient} from "./content";
import {requireAdmin} from "./admin/auth";
import {benefitColumns,type Benefit} from "./admin/benefit-schema";
import {initialBenefits,benefitCategories} from "@/data/benefits";
const missing=(code?:string)=>code==="PGRST205"||code==="42P01";
export async function readBenefits(client:SupabaseClient,admin=false) {
  const benefits:Benefit[]=[];
  for(let from=0;;from+=500){
    let query=client.from("fme_benefits").select(benefitColumns).order("sort_order").order("business_name").order("id").range(from,from+499);
    if(!admin)query=query.eq("active",true).eq("archived",false);
    const {data,error}=await query;
    if(error){if(missing(error.code))return {ready:false,benefits:[],categories:[]};throw new Error("No se pudieron leer los beneficios.");}
    benefits.push(...data as Benefit[]);if(data.length<500)break;
  }
  const {data,error}=await client.from("fme_benefit_categories").select("name").order("sort_order").order("name");
  if(error){if(missing(error.code))return {ready:false,benefits:[],categories:[]};throw new Error("No se pudieron leer las categorías de beneficios.");}
  return {ready:true,benefits,categories:data.map(c=>String(c.name))};
}
export const getBenefits=cache(async()=>{const client=publicClient();return client?readBenefits(client):{ready:true,benefits:initialBenefits,categories:benefitCategories};});
export async function getAdminBenefits(){const {client}=await requireAdmin();return readBenefits(client,true);}

// Incluye inactivos/archivados: no borrar imágenes que se puedan volver a publicar.
export async function benefitImageReferences(client:SupabaseClient){
  const images:string[]=[];
  for(let from=0;;from+=500){
    const {data,error}=await client.from("fme_benefits").select("logo_url,image_url").order("id").range(from,from+499);
    if(error){if(missing(error.code))return [];throw new Error("No se pudo comprobar el uso de imágenes en beneficios.");}
    images.push(...data.flatMap(b=>[b.logo_url,b.image_url]).filter(Boolean));if(data.length<500)break;
  }
  return images;
}
