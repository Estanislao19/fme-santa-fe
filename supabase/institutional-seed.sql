-- Textos oficiales de FME. No sobrescribe ediciones existentes.
insert into public.fme_institutional(id,mission,vision,home_intro,members_intro,community_text) values(1,'Empoderar a mujeres de Santa Fe mediante contención, capacitación, visibilización y redes de colaboración que favorezcan su desarrollo personal y profesional, utilizando el emprendimiento como herramienta para la independencia económica y la transformación social.','Nuestra visión es consolidarnos como un referente provincial en el fortalecimiento del emprendimiento femenino, impulsando una comunidad solidaria, equitativa y sostenible donde cada mujer pueda crecer, elegir libremente y desarrollar su proyecto de vida.','Acompañamos a mujeres de Santa Fe mediante contención, capacitación, visibilización y redes de colaboración, utilizando el emprendimiento como herramienta para la independencia económica y la transformación social.','Las socias son emprendedoras, profesionales, comerciantes, trabajadoras independientes o mujeres con proyectos en desarrollo que encuentran en la Fundación un espacio de formación, acompañamiento, visibilización y construcción de redes.

Participan de capacitaciones, encuentros de networking, beneficios, espacios de difusión y oportunidades. En este acompañamiento recíproco, la Fundación impulsa y conecta; las socias participan, aportan y fortalecen la comunidad.','La Fundación Mujeres Emprendedoras es una organización que trabaja para acompañar, capacitar y generar oportunidades para mujeres que buscan crecer personal y profesionalmente. Gran parte de este trabajo se desarrolla a través de una comunidad de socias que participan activamente de la vida institucional.

Las socias son mujeres emprendedoras, profesionales, comerciantes, trabajadoras independientes o mujeres con proyectos en desarrollo que encuentran en la Fundación un espacio de formación, acompañamiento, visibilización y construcción de redes.

A través de su participación, acceden a capacitaciones, encuentros de networking, beneficios, espacios de difusión y oportunidades generadas por la institución. Pero, al mismo tiempo, forman parte de una comunidad colaborativa donde el compromiso, la participación y el apoyo mutuo son fundamentales para el crecimiento colectivo.

Por este motivo, la relación entre la Fundación y sus socias se basa en un modelo de acompañamiento recíproco: la Fundación impulsa, conecta y genera oportunidades, mientras que las socias participan activamente, aportan a la comunidad y contribuyen al fortalecimiento de la organización.

Comprender el rol de las socias es fundamental ya que muchas de las actividades, eventos, capacitaciones y acciones institucionales tienen como principal objetivo acompañar su desarrollo y fortalecer la comunidad que la Fundación construye día a día.') on conflict(id) do nothing;
-- Carga los diez valores solo cuando la colección todavía no tiene registros.
insert into public.fme_values(id,name,description,sort_order,active) select v.id::uuid,v.name,v.description,v.sort_order,true from (values
('f6e00000-0000-4000-8000-000000000001','Empoderamiento','Creer en la capacidad de cada mujer para transformar su realidad.',1),
('f6e00000-0000-4000-8000-000000000002','Independencia económica','Promover herramientas que permitan mayor libertad y autonomía.',2),
('f6e00000-0000-4000-8000-000000000003','Solidaridad','Acompañar a otras mujeres desde la empatía y la experiencia compartida.',3),
('f6e00000-0000-4000-8000-000000000004','Sororidad','Construir redes de apoyo y colaboración entre mujeres.',4),
('f6e00000-0000-4000-8000-000000000005','Inclusión','Abrir espacios para mujeres de todas las edades, profesiones y realidades sociales.',5),
('f6e00000-0000-4000-8000-000000000006','Capacitación continua','Impulsar el aprendizaje permanente como herramienta de crecimiento.',6),
('f6e00000-0000-4000-8000-000000000007','Resiliencia','Transformar las dificultades en oportunidades.',7),
('f6e00000-0000-4000-8000-000000000008','Compromiso social','Contribuir al desarrollo de comunidades más justas e igualitarias.',8),
('f6e00000-0000-4000-8000-000000000009','Liderazgo','Formar mujeres capaces de influir positivamente en sus entornos.',9),
('f6e00000-0000-4000-8000-000000000010','Trabajo en red','Generar vínculos que potencien proyectos individuales y colectivos.',10)
) as v(id,name,description,sort_order) where not exists(select 1 from public.fme_values);
