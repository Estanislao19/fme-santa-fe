import { z } from "zod";
import { safeLink } from "./validation";
const optionalText=(max:number)=>z.string().trim().max(max).default("");
const link=z.string().trim().max(2000).refine(v=>safeLink(v),"Ingresá una URL HTTPS completa o dejá el campo vacío.").default("");
const image=z.string().trim().max(2000).refine(v=>safeLink(v,true),"La imagen no tiene una ruta válida.").default("");
export const benefitSchema=z.object({
  id:z.uuid().optional(),business_name:z.string().trim().min(1,"Completá el nombre.").max(200),
  category:z.string().trim().min(1,"Seleccioná una categoría.").max(100),
  benefit:z.string().trim().min(1,"Completá el beneficio.").max(2000),
  description:optionalText(12000),logo_url:image,image_url:image,instagram:link,website:link,
  whatsapp:z.string().trim().refine(v=>!v||(/^\+?[\d ()-]{6,40}$/.test(v)&&v.replace(/\D/g,"").length>=6),"Usá un teléfono con código de país y área, o dejalo vacío.").default(""),
  address:optionalText(1000),terms:optionalText(12000),
  active:z.boolean(),archived:z.boolean(),featured:z.boolean(),sort_order:z.number().int().min(0).max(100000),revision:z.number().int().min(1),
}).strict().refine(v=>!(v.archived&&v.active),{message:"Un beneficio archivado no puede estar activo.",path:["active"]});
export type Benefit=Omit<z.infer<typeof benefitSchema>,"id">&{id:string};
export const benefitColumns="id,business_name,category,benefit,description,logo_url,image_url,instagram,website,whatsapp,address,terms,active,archived,featured,sort_order,revision";
