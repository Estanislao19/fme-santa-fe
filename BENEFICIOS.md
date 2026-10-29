# Beneficios y convenios · FME

Ampliación sobre el proyecto actual. No cambia diseño general, header, datos previos, autenticación ni RLS existentes. No requiere nuevas variables de entorno ni claves. Sigue siendo Next.js dinámico para Netlify, sin Proxy/Middleware.

## Migración nueva e incremental

Archivo único para ejecutar **completo y una sola vez** en el SQL Editor del Supabase existente:

`supabase/migrations/202610290003_benefits.sql`

Si ya se ejecutó con éxito, **no volver a ejecutarlo**. No ejecutar las migraciones 001/002, el seed general ni ningún reset.

La transacción crea únicamente:

- `fme_benefits`: convenios, con los campos solicitados, `archived` para conservar retirados, timestamps y revisión de concurrencia.
- `fme_benefit_categories`: categorías ampliables desde el panel.
- Políticas RLS, índice de orden y trigger de revisión propios de estas tablas.
- Cinco categorías y los 15 convenios oficiales. Logos, fotografías, direcciones, contactos y condiciones no informadas se guardan vacíos.

No cambia `fme_content`, `fme_admins`, Storage, socias, capacitaciones, alianzas, colaboradores, proyectos ni contenido institucional. Reutiliza la función existente `is_fme_admin()` y la autorización actual de `fme_admins`.

La carga inicial usa UUID estables y `ON CONFLICT DO NOTHING`: no sobrescribe descuentos editados, orden, categoría o desactivaciones futuras. `supabase/benefits-schema.sql` y `supabase/benefits-seed.sql` son fuentes del generador, no pasos adicionales de instalación. `npm run seed:benefits` regenera el archivo inicial; no ejecuta SQL remoto y no es necesario para el uso cotidiano.

Aplicar la migración antes de desplegar esta ampliación. Si todavía falta, el admin muestra instrucciones de activación y la página pública muestra un aviso discreto; el resto del sitio sigue funcionando. Un error de conexión no se oculta con datos locales. Con Supabase configurado, los descuentos se leen de la base, no del seed.

## Uso para Vale

1. Ingresar con la cuenta administradora habitual y abrir **Beneficios** en el menú, o `/admin/beneficios/`.
2. Deben aparecer inicialmente 15 convenios. Buscar por comercio/beneficio o filtrar por categoría y estado.
3. **Agregar beneficio** abre `/admin/beneficios/nuevo/`. Solo nombre, categoría y beneficio son obligatorios. El estado inicial es **Inactivo** para poder revisarlo antes de publicarlo.
4. **Editar** permite cambiar textos, categoría, orden, destacado, estado, dirección, condiciones y contactos. Los enlaces de web/Instagram requieren HTTPS completo; WhatsApp acepta teléfono con código de país y área, no una URL. Los datos desconocidos se dejan vacíos.
5. Subir logo/imagen desde el selector existente. Se optimizan y guardan en el mismo Supabase Storage; se muestra vista previa. Esperar la carga y pulsar **Guardar beneficio** para asociar la imagen a la ficha. No se piden URLs de imágenes.
6. Un orden numérico menor aparece antes dentro de su categoría. **Destacado** agrega una indicación discreta, sin cambiar el orden elegido.
7. **Activo** publica; **Desactivar** retira de la vista pública conservando datos; **Archivar** retira y conserva como archivado. **Recuperar inactivo** permite revisar antes de volver a activar. No hay eliminación definitiva en esta ampliación.
8. **Agregar una categoría**, al pie del listado, permite ampliar las cinco iniciales. Luego elegirla al editar un convenio. No se modifican los rubros del directorio de socias.
9. Esperar la confirmación después de guardar. Si otra sesión editó el mismo registro, recargar antes de volver a guardar; no se sobrescribe silenciosamente su edición.

## Lectura pública

- `/socias`: conserva el directorio, buscador y rubros; suma las cuatro áreas oficiales de beneficios y el CTA **Conocé todos los beneficios**.
- `/beneficios`: listado editorial por categorías, filtros y recuento accesible; nombre, descuento, imagen/logo, condiciones y enlaces solo cuando existen. No se fabrican datos de contacto ni condiciones.
- Home: conserva seis bloques. Solo se agrega una mención y un link dentro del bloque Socias.
- Footer: nuevo acceso Beneficios. Header intacto. Sitemap incorpora `/beneficios`.

Las cuatro áreas institucionales se centralizan en `data/benefits.ts`. Los convenios comerciales son administrables desde Supabase y cambian sin recompilar; las páginas son dinámicas y guardar invalida las rutas. Una lista vacía de activos se respeta: no se reponen automáticamente los 15 iniciales.

La biblioteca de imágenes comprueba también beneficios activos, inactivos y archivados. No permite borrar un archivo que todavía esté asociado a alguno. Quitar la imagen de la ficha y guardar antes de eliminar el archivo de la biblioteca.

## Seguridad y prueba de aceptación

Solo `fme_admins` puede crear/editar/cambiar estado o añadir categorías. RLS permite a visitantes leer exclusivamente beneficios activos y no archivados. El admin verifica sesión y permiso en servidor, y cada Server Action los vuelve a comprobar antes de validar o guardar. No usa service role. Se reutiliza el upload protegido existente.

Comprobar con una cuenta autorizada: abrir los 15 registros, editar uno, guardar y ver el cambio en `/beneficios`; cambiar su orden y verificar la posición dentro de su categoría; desactivar y comprobar que desaparezca públicamente pero siga en admin; recuperar/activar y comprobarlo nuevamente. No modificar otras colecciones. Para ampliar convenios, cargar únicamente datos reales confirmados; revisar inicialmente como Inactivo. Si se hace una prueba temporal, restaurar al terminar el texto/estado/orden oficial.

## Archivos modificados

- `app/admin/(protected)/layout.tsx`
- `app/admin/(protected)/imagenes/page.tsx`
- `app/admin/actions.ts`
- `app/socias/page.tsx`
- `app/sitemap.ts`
- `sections/Home.tsx`
- `components/Footer.tsx`
- `app/globals.css`
- `package.json`
- `scripts/verify-dynamic.mjs`
- `README.md`
- `ADMINISTRADOR.md`

## Archivos agregados

- `app/beneficios/page.tsx`
- `app/admin/(protected)/beneficios/page.tsx`
- `app/admin/(protected)/beneficios/[id]/page.tsx`
- `app/admin/benefit-actions.ts`
- `components/MembershipBenefits.tsx`
- `components/BenefitsDirectory.tsx`
- `components/admin/BenefitsAdmin.tsx`
- `components/admin/BenefitEditor.tsx`
- `components/admin/BenefitsMigrationNotice.tsx`
- `data/benefits.ts`
- `lib/benefits.ts`
- `lib/admin/benefit-schema.ts`
- `scripts/generate-benefits-seed.ts`
- `supabase/benefits-schema.sql`
- `supabase/benefits-seed.sql`
- `supabase/migrations/202610290003_benefits.sql`
- `tests/benefits.test.ts`
- `BENEFICIOS.md`

## Verificación del 29/10/2026

- Typecheck correcto y 13 pruebas automatizadas aprobadas. Las pruebas de la migración usan PostgreSQL/PGlite aislado: conservan íntegramente las filas de las tablas anteriores, comprueban permisos anónimos/no administradores, creación, edición, desactivación, archivo, orden, categoría nueva, revisión obsoleta y seed que no sobrescribe ediciones.
- La persona responsable confirmó la aplicación manual y única de la migración 003 en el proyecto real. Se verificaron por API 15 convenios activos y cinco categorías; contactos, condiciones e imágenes no informados siguen vacíos. Un intento anónimo con filtro sin coincidencias devuelve denegación 42501; no alteró filas.
- Navegador con datos reales: filtros Salud 4, Estética 3, Indumentaria 5, Servicios 3, Otros 0 y Todas 15. No se muestran enlaces comerciales inventados.
- Home, Socias y Beneficios sin desbordamiento horizontal en 375, 390, 430, 768, 1024 y 1440 px. Home conserva seis bloques; Socias muestra las cuatro áreas oficiales. Sin errores de consola en las páginas revisadas.
- Verificación HTTP: 20 páginas públicas, 538 enlaces/anclas, 15 imágenes, doce rutas privadas cerradas sin sesión, login público y upload protegido.
- No se hicieron escrituras sobre convenios ni otras colecciones en el Supabase real desde el agente. La prueba autenticada del formulario y uploader depende de una sesión administradora; no se confunde con las pruebas automatizadas de permisos y ciclo de edición en PostgreSQL local.
- `npm run build` final correcto: rutas públicas y admin nuevas dinámicas, sin Proxy/Middleware. No se realizó un deploy productivo desde este cambio; el código actualizado está preparado para desplegarse sobre el sitio Netlify existente.
- Confirmación manual final de la persona responsable: `/admin/beneficios/` carga datos reales de Supabase, muestra categoría, estado, orden y acciones de editar/desactivar/archivar/destacar; paginación comprobada. No modificó contenido existente. Se cierra la aceptación del listado privado; los recorridos de escritura/archivo/orden se probaron en PostgreSQL aislado para no alterar convenios vigentes.
