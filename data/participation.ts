// Comunicación editorial v6. Los registros institucionales v5 permanecen en sus archivos.
export const participationOptions = [
  { id:"apoyo-mensual", title:"Apoyo mensual", shortTitle:"Aporte mensual", description:"Acompañá regularmente el trabajo de la Fundación. Consultanos por las formas de aportar.", href:"/contacto?motivo=Aporte%20mensual", homeHref:"/colabora#apoyo-mensual" },
  { id:"apoyar-proyecto", title:"Colaborar con un proyecto", shortTitle:"Colaborar con un proyecto", description:"Elegí una iniciativa concreta y conversemos sobre cómo podés acompañarla.", href:"#proyectos", homeHref:"/colabora#proyectos" },
  { id:"eventos", title:"Colaborar con un evento", shortTitle:"Colaborar con un evento", description:"Podés aportar espacios, materiales o servicios para capacitaciones, bazares y encuentros.", href:"/contacto?motivo=Eventos", homeHref:"/colabora#eventos" },
  { id:"empresas", title:"Empresas e instituciones", shortTitle:"Empresas e instituciones", description:"Construyamos una propuesta que conecte los recursos de tu organización con la comunidad.", href:"#organizaciones", homeHref:"/colabora#organizaciones" },
  { id:"voluntariado", title:"Voluntariado", shortTitle:"Voluntariado", description:"Compartí tu tiempo y tus conocimientos en comunicación, diseño, fotografía, administración u organización.", href:"/voluntariado", homeHref:"/voluntariado" },
] as const;
