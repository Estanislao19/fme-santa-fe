// Contenido oficial proporcionado por FME. Base inicial; Supabase es la fuente en producción.
export const officialInstitutional = {
  mission: "Empoderar a mujeres de Santa Fe mediante contención, capacitación, visibilización y redes de colaboración que favorezcan su desarrollo personal y profesional, utilizando el emprendimiento como herramienta para la independencia económica y la transformación social.",
  vision: "Nuestra visión es consolidarnos como un referente provincial en el fortalecimiento del emprendimiento femenino, impulsando una comunidad solidaria, equitativa y sostenible donde cada mujer pueda crecer, elegir libremente y desarrollar su proyecto de vida.",
  home_intro: "Acompañamos a mujeres de Santa Fe mediante contención, capacitación, visibilización y redes de colaboración, utilizando el emprendimiento como herramienta para la independencia económica y la transformación social.",
  members_intro: "Las socias son emprendedoras, profesionales, comerciantes, trabajadoras independientes o mujeres con proyectos en desarrollo que encuentran en la Fundación un espacio de formación, acompañamiento, visibilización y construcción de redes.\n\nParticipan de capacitaciones, encuentros de networking, beneficios, espacios de difusión y oportunidades. En este acompañamiento recíproco, la Fundación impulsa y conecta; las socias participan, aportan y fortalecen la comunidad.",
  community_text: "La Fundación Mujeres Emprendedoras es una organización que trabaja para acompañar, capacitar y generar oportunidades para mujeres que buscan crecer personal y profesionalmente. Gran parte de este trabajo se desarrolla a través de una comunidad de socias que participan activamente de la vida institucional.\n\nLas socias son mujeres emprendedoras, profesionales, comerciantes, trabajadoras independientes o mujeres con proyectos en desarrollo que encuentran en la Fundación un espacio de formación, acompañamiento, visibilización y construcción de redes.\n\nA través de su participación, acceden a capacitaciones, encuentros de networking, beneficios, espacios de difusión y oportunidades generadas por la institución. Pero, al mismo tiempo, forman parte de una comunidad colaborativa donde el compromiso, la participación y el apoyo mutuo son fundamentales para el crecimiento colectivo.\n\nPor este motivo, la relación entre la Fundación y sus socias se basa en un modelo de acompañamiento recíproco: la Fundación impulsa, conecta y genera oportunidades, mientras que las socias participan activamente, aportan a la comunidad y contribuyen al fortalecimiento de la organización.\n\nComprender el rol de las socias es fundamental ya que muchas de las actividades, eventos, capacitaciones y acciones institucionales tienen como principal objetivo acompañar su desarrollo y fortalecer la comunidad que la Fundación construye día a día.",
};

export const officialValues = [
  { name: "Empoderamiento", description: "Creer en la capacidad de cada mujer para transformar su realidad." },
  { name: "Independencia económica", description: "Promover herramientas que permitan mayor libertad y autonomía." },
  { name: "Solidaridad", description: "Acompañar a otras mujeres desde la empatía y la experiencia compartida." },
  { name: "Sororidad", description: "Construir redes de apoyo y colaboración entre mujeres." },
  { name: "Inclusión", description: "Abrir espacios para mujeres de todas las edades, profesiones y realidades sociales." },
  { name: "Capacitación continua", description: "Impulsar el aprendizaje permanente como herramienta de crecimiento." },
  { name: "Resiliencia", description: "Transformar las dificultades en oportunidades." },
  { name: "Compromiso social", description: "Contribuir al desarrollo de comunidades más justas e igualitarias." },
  { name: "Liderazgo", description: "Formar mujeres capaces de influir positivamente en sus entornos." },
  { name: "Trabajo en red", description: "Generar vínculos que potencien proyectos individuales y colectivos." },
].map((value, index) => ({
  id: `f6e00000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
  ...value, sort_order: index + 1, active: true, revision: 1,
}));
