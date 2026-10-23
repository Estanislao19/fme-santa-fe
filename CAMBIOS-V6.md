# Cambios · FME v6 admin y Colaborá

23 de octubre de 2026. Trabajo sobre la v5 multimedia existente; sin crear otro proyecto de código ni volver al diseño anterior.

## Estado operativo

Implementación terminada en código, migración, seed y guías. El usuario indicó que aún no existe Supabase y solicitó preparar configuración/guía. No se creó un backend externo ni se configuraron credenciales. El admin queda cerrado hasta esa activación. El despliegue dinámico se prepara para Netlify; la URL publicada de Sites sigue mostrando v5. No se presenta esta entrega como un admin operativo en producción antes de completar SUPABASE-NETLIFY.md.

## 1. Cómo funciona el admin

Ruta privada /admin y login con Supabase Auth (email/contraseña). Solo cuentas incluidas en fme_admins acceden. Cada página, acción y upload revalida identidad y autorización; RLS vuelve a verificar permisos en PostgreSQL/Storage. No hay registro público, acceso DEMO ni comprobaciones de rol basadas únicamente en el navegador. Cookies HttpOnly, SameSite Lax y Secure en producción; noindex/no-store y protección anti-frame en admin.

Panel: Resumen, Socias, Capacitaciones, Alianzas, Colaboradores, Proyectos / Eventos y Configuración. Listados con búsqueda, filtros y paginación. Editor con feedback, publicación, activo/inactivo, archivo, destacado y orden. Revisión optimista evita sobrescribir otra edición. Slugs únicos; las URL anteriores de socias/capacitaciones redirigen al slug actual mientras el registro sea visible.

## 2. Primer administrador

Crear la cuenta real en Authentication > Users de Supabase y agregar su UUID a fme_admins desde SQL Editor. El bloque SQL exacto, sin claves ni contraseñas, está en SUPABASE-NETLIFY.md. El panel no puede otorgarse permisos a sí mismo. No se necesita una service role key en la aplicación.

## 3. Agregar una socia

Socias > Agregar: nombre, emprendimiento, rubro, descripción, historia, propuestas, teléfono, WhatsApp, Instagram, imagen/galería. El slug se genera automáticamente y se puede corregir. Guardar borrador o publicar/activar. Marcar destacada y ordenar si corresponde. Pasos para FME en ADMINISTRADOR.md.

## 4. Quitar / desactivar una socia

Desactivar o archivar conserva sus datos y la retira de directorio, Home y perfil público. Eliminar definitivamente exige escribir el nombre exacto. RLS impide leer públicamente perfiles desactivados, archivados o borradores; no hay fallback que los reponga desde archivos locales.

## 5. Imágenes

Subida con preview sin escribir URL. Optimización en navegador y servidor a WebP, hasta 1600 px, sin EXIF; JPG/PNG/WebP/AVIF, rechazo de SVG y archivos inválidos. Guardado en bucket fme-media con escritura solo administradora. Fotos y galerías reales tienen prioridad sobre DEMO. Quitar/cambiar imagen se aplica al guardar. Biblioteca de Configuración permite eliminar archivos no referenciados, con confirmación; no borra archivos usados por fichas archivadas. Los assets del bucket son públicos y no deben contener documentos privados.

## 6. Capacitaciones

Alta/edición/eliminación/archivo; Próxima o Realizada; información de fecha, docente, modalidad, lugar, precios, imagen/galería, video MP4 opcional y enlace de inscripción. Reflejo dinámico en Home, agenda y detalle. Un enlace real de inscripción se presenta como tal; el formulario local permanece claramente en demostración cuando no existe integración.

## 7. Alianzas

Administra nombre, tipo, logo, fotografía, descripción, acción conjunta, galería, web/Instagram/enlace, destacado y orden. Activar/publicar para mostrar; archivar/desactivar para retirar.

## 8. Colaboradores

Pantalla propia para empresas/instituciones/personas y explicación breve. Quienes nos acompañan se alimenta de alianzas y colaboradores publicados/activos reales. Los cuatro colaboradores DEMO migrados se conservan en admin sin presentarlos como colaboraciones reales.

## 9. Proyectos / eventos

Colección con tipos Proyecto, Evento y Campaña; título, descripción, fecha, objetivo, foto, CTA, publicación y destacado. Aparición dinámica en Colaborá; sin pagos ni recaudación simulada.

## 10. Nueva página Colaborá

Hero Hay muchas formas de ser parte; cinco formas de vincularse: apoyo mensual, proyecto, evento, empresas/instituciones y voluntariado. Bloque breve sobre la importancia de acompañar, énfasis en organizaciones, listado de iniciativas y Quienes nos acompañan. Sin repetir el formulario de voluntariado ni agregar pagos.

Header desktop y menú móvil incluyen Colaborá. Home conserva seis momentos; su bloque de Alianzas + colaboración incorpora Hay muchas formas de acompañar, cinco accesos editoriales y CTA Conocé cómo colaborar. Hero, fuentes, carruseles, videos, galerías y paleta v5 conservados.

## 11. Variables

NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY y FME_ALLOW_LOCAL_CONTENT. .env.example tiene valores vacíos/marcadores, sin secretos. FME_ALLOW_LOCAL_CONTENT=true solo para revisar el público sin backend; false en Netlify. Cuando Supabase está configurado, no existe fallback local ante errores o listas vacías.

## 12. Netlify y migración

Se elimina output: export. Datos por petición no-store y rutas de detalle dinámicas, sin generateStaticParams cerrado. netlify.toml configura npm run build, .next, Node 22 y protección de versiones. Adaptador OpenNext automático de Netlify. Guía de schema/seed/cuenta/variables/deploy en SUPABASE-NETLIFY.md. No se publicó una exportación estática como sustituto del backend.

Schema en supabase/migrations/202610230001_fme_cms.sql; seed inicial de 14 registros y nueve rubros en supabase/seed.sql. Los datos originales permanecen intactos en data/*.ts, incluido data/media.ts. El seed no sobrescribe ediciones posteriores.

## 13. Archivos

- Admin: app/admin/**, app/api/admin/media/route.ts, components/admin/**.
- Backend/DAL: lib/admin/**, lib/supabase/**, lib/content.ts, proxy.ts.
- PostgreSQL: supabase/migrations/202610230001_fme_cms.sql, supabase/seed.sql, scripts/generate-seed.ts.
- Público y comunicación: data/participation.ts, sections/Home.tsx, app/page.tsx, app/colabora/page.tsx, app/alianzas/page.tsx, app/comunidad/page.tsx, app/socias/page.tsx y [slug]/page.tsx, app/capacitaciones/page.tsx y [slug]/page.tsx.
- Componentes públicos: Header, Institutional, MemberDirectory, MemberCard, TrainingCard, Forms y nuevo SiteChrome. Formularios: misma lógica de validación/adaptador; selector de rubros dinámico.
- Configuración: next.config.ts, netlify.toml, .env.example, package.json/package-lock.json, types/index.ts, app/layout.tsx, app/globals.css, app/error.tsx, sitemap.ts y robots.ts. Identidad histórica conservada en .openai/hosting.json, sin la exportación antigua.
- Pruebas: tests/*.test.ts y scripts/verify-dynamic.mjs.
- Documentación: README, ADMINISTRADOR, SUPABASE-NETLIFY, CAMBIOS-V6 y VERIFICACION.

Logo y assets multimedia v5 sin cambios. Tampoco se alteraron los registros locales, los componentes EditorialCarousel/EditorialVideo ni el adaptador de formularios.

## 14. Validación

npm run typecheck y npm run build: correctos. npm test: pruebas de RLS/PostgreSQL, validación de contenido y optimización/rechazo de imágenes. npm run verify: páginas públicas, enlaces/anclas, imágenes, redirección de rutas privadas y upload anónimo bloqueado. Responsive público/acceso cerrado comprobado a 375, 390, 430, 768, 1024 y 1440 px. Detalle y límites en VERIFICACION.md.

Pendiente tras crear Supabase: aceptación de login/logout, CRUD e imágenes con el servicio real y despliegue de Netlify. Se incluye un checklist ejecutable por la persona que lo active; no se afirma haber completado esa integración remota.

