# Verificación · FME v6 admin y Colaborá

23 de octubre de 2026.

## Completado localmente

- npm run typecheck: sin errores TypeScript.
- npm run build: correcto en Next.js dinámico. Se generan las rutas públicas, login/admin, biblioteca y upload; no se utiliza output: export.
- npm test: cinco pruebas/suites correctas. Validación de campos, límites, slugs y URLs; optimización real de imágenes con rechazo de SVG/archivos inválidos; schema/seed/RLS en PostgreSQL real en WASM (PGlite).
- SQL/RLS: anónimo no escribe; usuario autenticado no autorizado no escribe ni se concede rol; admin puede crear/editar/archivar en las cinco colecciones; inactivos/borradores/archivados no son públicos; permisos de Storage; revocación del administrador; conflicto de revisión; alias/redirecciones; borrado en cascada; auditoría; seed repetible sin sobreescribir cambios y 14 registros compatibles con el editor.
- npm run verify: 19 páginas públicas, 492 enlaces/anclas y 15 imágenes locales. Nueve rutas privadas exigen login, upload anónimo devuelve 401, login tiene noindex/no-store y slugs inexistentes devuelven 404.
- Navegador: 19 páginas públicas más acceso cerrado del admin a 375, 390, 430, 768, 1024 y 1440 px (120 combinaciones). Sin scroll horizontal global, imágenes rotas ni más de un h1.
- Header móvil: Colaborá presente; apertura/cierre y Escape comprobados.
- Directorio: búsqueda de ejemplo 06 sobre todos los registros y filtro Moda comprobados. Se conservan Mostrar más y filtros por URL.
- Cinco formularios públicos: requeridos, foco en primer error y confirmación DEMO comprobados. Siguen sin envío ni almacenamiento. El formulario de asociación usa rubros dinámicos sin cambiar la validación.
- Home: seis bloques principales; carruseles, videos y galerías v5 conservados. No se añadió una séptima sección.
- Consola del navegador: sin errores/advertencias en la revisión funcional.
- Logo sin cambios: SHA-256 021ACB2CA95D47CDF0F9388C55101D940AC9D502B4C9FF61A4BD14F4619FBB55.
- Los archivos de datos originales, multimedia v5, EditorialCarousel, EditorialVideo y adaptador público de formularios permanecen intactos. Se agrega data/participation.ts para centralizar la nueva comunicación de colaboración.

## Pendiente de activación externa

El usuario confirmó que no existe todavía un proyecto Supabase y pidió preparar configuración y guía. Por tanto:

- No se creó una cuenta ni un proyecto Supabase externo.
- No se probaron login/logout, carga remota a Storage ni CRUD mediante un usuario Supabase real.
- No se hizo una prueba autenticada de los formularios del admin en un teléfono real. Se implementaron estilos y controles adaptables; la revisión de seis anchos cubre público y acceso cerrado.
- No se desplegó v6 en Netlify ni se afirma una migración de producción ya activa. La URL Sites sigue en v5.
- Las pruebas PGlite ejercitan el motor PostgreSQL y políticas con roles equivalentes, pero no reemplazan al servicio Auth/Storage remoto.

SUPABASE-NETLIFY.md contiene la configuración, creación del primer administrador y el checklist de aceptación de extremo a extremo. Sin configuración, admin permanece cerrado; no se agregó ningún bypass, usuario de prueba ni backend simulado a la aplicación.

## Alcance de contenido y seguridad

Los formularios públicos no envían; no se agregaron pagos, donaciones simuladas, estadísticas, testimonios ni nuevos datos institucionales. El seed conserva DEMO y DATO A CONFIRMAR. Las imágenes de Storage están destinadas al sitio público; el panel y los datos no publicados requieren autorización. No se usa service role key en la aplicación ni se incluyen secretos en la entrega.

El ZIP contiene código, assets, configuración, SQL, seed y documentación. Excluye node_modules, .next, out, .git y archivos de entorno locales.
