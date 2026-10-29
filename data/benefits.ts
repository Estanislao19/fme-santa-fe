// Contenido oficial aportado por FME. Fuente inicial del seed; luego manda Supabase.
export const benefitCategories = ["Salud y bienestar", "Estética y cuidado", "Indumentaria", "Servicios y gastronomía", "Otros"];
export const membershipBenefits = [
  { title:"Formación y crecimiento", items:["Capacitaciones gratuitas exclusivas para socias.","Descuentos especiales en cursos y programas formativos.","Espacios de aprendizaje orientados al fortalecimiento emprendedor."] },
  { title:"Networking y comunidad", items:["Networking mensual.","Ingreso al grupo de WhatsApp para acceder a información exclusiva.","Espacios de intercambio y acompañamiento emprendedor."] },
  { title:"Visibilización y oportunidades", items:["Difusión de emprendimientos en la página web de la Fundación.","Oportunidades de participación en eventos institucionales y oportunidades gestionadas por la Fundación, como ExpoCon, Santa Fe Se Muestra, EmprendeFest, etc.","Prioridad en becas y alianzas con instituciones."] },
  { title:"Beneficios operativos", items:["Descuento en alquiler del espacio de la Fundación.","Beneficios y descuentos en emprendimientos y locales aliados.","Beneficio en transporte con empresa Paraná Medio."] },
];
export const initialBenefits = [
  ["WELL UP",0,"50% en funcional y thermobike."],
  ["WIK espacio de transformación",0,"20% en servicios."],
  ["Silvina Burtovoy",0,"20% en sesiones de coaching."],
  ["Sanatorio Santa Fe",0,"Bonificación en primera cuota del plan privado."],
  ["Elisabeth",1,"20% en servicios de peluquería."],
  ["Optilent",1,"15% en lentes."],
  ["Sentires - Fernanda Romero",1,"10% en servicios de uñas."],
  ["Margo",2,"15% en carteras y mochilas."],
  ["Scoop",2,"15% en ropa deportiva."],
  ["Rosana Quaranta",2,"Beneficios en local de ropa."],
  ["Somos Reales",2,"30% en cualquier prenda del local."],
  ["Impredecible",2,"15% en mayorista y 10% en personalizados."],
  ["Vinería Baco",3,"20% en vinos."],
  ["Restaurant Costa Litoral",3,"10% en la carta."],
  ["Lava Tapizados Santa Fe",3,"20% en limpieza."],
].map(([business_name,category,benefit],i)=>({
  id:`f6b00000-0000-4000-8000-${String(i+1).padStart(12,"0")}`,
  business_name:String(business_name),category:benefitCategories[Number(category)],benefit:String(benefit),
  description:"",logo_url:"",image_url:"",instagram:"",website:"",whatsapp:"",address:"",terms:"",
  active:true,archived:false,featured:false,sort_order:i+1,revision:1,
}));
