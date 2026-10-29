-- Convenios oficiales: solo inserta IDs iniciales faltantes; nunca sobrescribe ediciones.
insert into public.fme_benefit_categories(name,sort_order) values
('Salud y bienestar',1),
('Estética y cuidado',2),
('Indumentaria',3),
('Servicios y gastronomía',4),
('Otros',5)
on conflict(name) do nothing;
insert into public.fme_benefits(id,business_name,category,benefit,description,logo_url,image_url,instagram,website,whatsapp,address,terms,active,archived,featured,sort_order) values
('f6b00000-0000-4000-8000-000000000001','WELL UP','Salud y bienestar','50% en funcional y thermobike.','','','','','','','','',true,false,false,1),
('f6b00000-0000-4000-8000-000000000002','WIK espacio de transformación','Salud y bienestar','20% en servicios.','','','','','','','','',true,false,false,2),
('f6b00000-0000-4000-8000-000000000003','Silvina Burtovoy','Salud y bienestar','20% en sesiones de coaching.','','','','','','','','',true,false,false,3),
('f6b00000-0000-4000-8000-000000000004','Sanatorio Santa Fe','Salud y bienestar','Bonificación en primera cuota del plan privado.','','','','','','','','',true,false,false,4),
('f6b00000-0000-4000-8000-000000000005','Elisabeth','Estética y cuidado','20% en servicios de peluquería.','','','','','','','','',true,false,false,5),
('f6b00000-0000-4000-8000-000000000006','Optilent','Estética y cuidado','15% en lentes.','','','','','','','','',true,false,false,6),
('f6b00000-0000-4000-8000-000000000007','Sentires - Fernanda Romero','Estética y cuidado','10% en servicios de uñas.','','','','','','','','',true,false,false,7),
('f6b00000-0000-4000-8000-000000000008','Margo','Indumentaria','15% en carteras y mochilas.','','','','','','','','',true,false,false,8),
('f6b00000-0000-4000-8000-000000000009','Scoop','Indumentaria','15% en ropa deportiva.','','','','','','','','',true,false,false,9),
('f6b00000-0000-4000-8000-000000000010','Rosana Quaranta','Indumentaria','Beneficios en local de ropa.','','','','','','','','',true,false,false,10),
('f6b00000-0000-4000-8000-000000000011','Somos Reales','Indumentaria','30% en cualquier prenda del local.','','','','','','','','',true,false,false,11),
('f6b00000-0000-4000-8000-000000000012','Impredecible','Indumentaria','15% en mayorista y 10% en personalizados.','','','','','','','','',true,false,false,12),
('f6b00000-0000-4000-8000-000000000013','Vinería Baco','Servicios y gastronomía','20% en vinos.','','','','','','','','',true,false,false,13),
('f6b00000-0000-4000-8000-000000000014','Restaurant Costa Litoral','Servicios y gastronomía','10% en la carta.','','','','','','','','',true,false,false,14),
('f6b00000-0000-4000-8000-000000000015','Lava Tapizados Santa Fe','Servicios y gastronomía','20% en limpieza.','','','','','','','','',true,false,false,15)
on conflict(id) do nothing;
