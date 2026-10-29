# FME · v6 administrador y colaboración

Iteración sobre **FME v5 multimedia**, en el mismo proyecto. Next.js App Router, TypeScript y Tailwind; diseño público Playfair Display + Manrope, paleta y multimedia v5 conservados. La aplicación ahora utiliza **Next.js dinámico + Supabase** y está preparada para **Netlify**. Ya no se exporta a `out/`.

## Estado de esta entrega

El código del administrador, sus controles de acceso, las migraciones y el seed están implementados. FME confirmó que dispone de un proyecto Supabase y un administrador configurados; esta ampliación utiliza esa instalación existente. La migración institucional se aplica por separado, sin resetear la base. **No hay credenciales ni acceso administrador DEMO**. Sin variables de Supabase, `/admin` conduce a un acceso cerrado con instrucciones de configuración. No se reemplazó el sitio v5 publicado en Sites con una exportación que no pueda ejecutar el backend.

Las pruebas locales verifican TypeScript, compilación, validaciones, imágenes, RLS en PostgreSQL/PGlite y acceso anónimo bloqueado. Login/logout, CRUD y Storage contra un proyecto Supabase real y el deploy final de Netlify requieren completar la guía de activación. No se afirma que esa prueba de integración remota ya se haya realizado.

## Ejecutar localmente

Node.js 22 LTS y npm:

```sh
npm install
# Copiar .env.example a .env.local y completar las variables.
npm run dev
```

Abrir http://127.0.0.1:3000. Para compilar y servir Next:

```sh
npm run typecheck
npm test
npm run build
npm run start -- --port 3003
```

En otra terminal, con el servidor iniciado:

```sh
npm run verify
```

`npm run verify` usa `http://127.0.0.1:3003` o `FME_VERIFY_URL` y verifica páginas, enlaces, imágenes, rutas privadas y upload anónimo bloqueado. El verificador estático anterior se conserva como `verify:export:legacy` para referencia histórica; no valida v6.

## Activación y uso del administrador

1. Seguir **[SUPABASE-NETLIFY.md](SUPABASE-NETLIFY.md)**: crear Supabase, aplicar migración/seed, crear y autorizar el primer usuario, configurar variables y desplegar en Netlify.
2. Usar **[ADMINISTRADOR.md](ADMINISTRADOR.md)** para el trabajo diario: guardar, publicar, desactivar, archivar, cargar imágenes y eliminar con confirmación.
3. Ver **[CAMBIOS-V6.md](CAMBIOS-V6.md)** para el resumen completo y **[VERIFICACION.md](VERIFICACION.md)** para resultados y límites.

Variables necesarias (sin valores reales en el repositorio):

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Origen definitivo HTTPS de Netlify o dominio propio, sin barra final; canonical, sitemap y robots |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL de Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública anon/publishable de Supabase, nunca service_role ni secret key |
| `FME_ALLOW_LOCAL_CONTENT` | `true` solo para previsualizar los datos v5 sin Supabase; `false` en Netlify |

No se necesita una service role key en la aplicación. La autorización usa sesión verificada, tabla de administradores y RLS. Las cookies de sesión son HttpOnly y SameSite Lax, Secure en producción. Los administradores se autorizan fuera del panel por una persona responsable de Supabase.

## Datos y arquitectura

- `data/*.ts` conserva **sin cambios** los registros locales v5, rubros, equipo, contactos y contenido institucional. No se borran como parte de la migración.
- `lib/content.ts` es el repositorio de lectura pública: consulta Supabase por petición con `no-store` y RLS; no requiere recompilar para reflejar contenido publicado. Las pestañas abiertas se actualizan al navegar o recargar; no se implementó una suscripción Realtime.
- Sin Supabase y con contenido local permitido, se puede revisar el sitio público usando los datos existentes. **Con Supabase configurado, no se vuelve a datos locales ante un error o una lista vacía.** Así una ficha inactiva no reaparece por fallback.
- `fme_content` almacena documentos JSONB tipados por colección, conservando los nombres de campo actuales; el sobre relacional controla slug, publicación, activo, destacado, orden y revisión. Validación del servidor en `lib/admin/validation.ts`.
- `fme_categories` conserva los nueve rubros y admite nuevos desde Configuración.
- `fme_admins` autoriza cuentas; no admite altas desde el navegador. `fme_slug_aliases` mantiene redirecciones de enlaces anteriores. `fme_audit_log` conserva metadatos de cambios sin copiar historias ni datos personales eliminados.
- `supabase/migrations/202610230001_fme_cms.sql` contiene el schema, funciones, triggers y RLS. `supabase/seed.sql` importa los **14 registros actuales y nueve rubros**, con los mismos slugs y rótulos DEMO. No crea cuentas ni contraseñas.
- `npm run seed:generate` regenera el SQL desde los datos locales. El seed usa `ON CONFLICT DO NOTHING`: sirve para la carga inicial y no sobrescribe ediciones posteriores; no es una sincronización bidireccional con los archivos locales.
- Proyectos, Eventos y Campañas comparten colección, con selector de tipo. Colaboradores y Alianzas tienen pantallas separadas.

## Colaboración y contenido público

La navegación pública y móvil incorpora **Colaborá**. `/colabora` explica apoyo mensual, proyectos, eventos, empresas/instituciones y voluntariado; mantiene las consultas por los canales existentes y no incorpora pagos. “Quienes nos acompañan” se alimenta de alianzas y colaboradores publicados/activos, sin presentar registros DEMO como organizaciones reales.

Home conserva sus seis bloques, el hero, carrusel, videos y galerías. El bloque Alianzas + colaboración incorpora los cinco accesos y el CTA “Conocé cómo colaborar”. Se destaca como máximo una organización en esa composición; el listado completo permanece en las páginas internas.

Socias y capacitaciones publicadas tienen rutas dinámicas. Inactivas, archivadas o borradores no aparecen ni se leen en sus perfiles. Los slugs pueden corregirse; las URL anteriores de estos perfiles redirigen al slug actual mientras el registro siga publicado y activo.

## Cómo reemplazar imágenes y videos demo

Se conserva `data/media.ts` y la carpeta `public/media/demo/` con sus 17 assets v5. Fuentes y licencia: **[MEDIA-DEMO.md](MEDIA-DEMO.md)**. Las personas y escenas DEMO no representan integrantes ni actividades reales de FME.

- Para socias, capacitaciones, alianzas, colaboradores y proyectos: cargar imágenes desde el administrador. Se guardan en Supabase Storage y **tienen prioridad** sobre los respaldos DEMO. No hay que escribir URL de imágenes.
- Una galería real también reemplaza la galería de respaldo. La fotografía real de una capacitación ocupa el espacio visual de Home cuando no se cargó video real.
- Socias/equipo: 800×1000 px, 4:5, WebP/AVIF. Galerías/actividades: 1200–1600 px de ancho, horizontal. El uploader acepta JPG, PNG, WebP y AVIF, optimiza a WebP hasta 1600 px y elimina metadatos EXIF. No admite SVG.
- Se presenta una vista previa al elegir el archivo; hay que **Guardar cambios** para asociarlo a la ficha. Se puede quitar o cambiar la imagen. Biblioteca en Configuración permite borrar definitivamente archivos sin referencias, con confirmación.
- Storage contiene imágenes destinadas al sitio público; los archivos tienen URL pública desde la carga. No usarlo para documentos privados. Archivar un perfil no borra automáticamente sus imágenes; eliminar una ficha tampoco elimina archivos que puedan ser reutilizados.
- Para hero e introducción general, seguir editando las referencias centralizadas en `data/media.ts` hasta ampliar el alcance del CMS. Equipo/contactos/institucionales no están dentro del alcance de este panel.
- Para videos DEMO de hero/formación: reemplazar `src`, `poster`, `label` y `demo` en `data/media.ts`. Los dos clips v5 conservados duran 8 segundos y suman menos de 800 KB; autoplay silencioso, pausa fuera de pantalla, movimiento reducido y ahorro de datos.
- Para video de una capacitación: cargar su imagen principal como poster y completar una URL HTTPS de MP4 autorizado. Para contenido informativo se muestran controles nativos; el componente mantiene soporte de pistas `captions` para una incorporación posterior. No se afirma subtitulado automático.

## Formularios, contacto y SEO

Los cinco formularios públicos conservan validaciones y confirmación, pero **no envían ni guardan datos**. El adaptador continúa en `utils/form-adapter.ts`. La única extensión es que los rubros del formulario de asociación se leen de la misma lista dinámica. Cuando una capacitación tiene un enlace real de inscripción, ese enlace se muestra como tal; no se simula un envío desde el formulario local.

Teléfono, dirección, sede, fechas y precios desconocidos conservan `[DATO A CONFIRMAR]`. No se inventaron datos ni se modificó el logo. `data/site.ts` mantiene contacto/SEO; configurar el dominio definitivo antes de indexar y revisar el contenido DEMO. El sitemap se genera dinámicamente con perfiles visibles y excluye admin; `/admin` y su API tienen noindex/no-store y protección de sesión.

## Entrega

`FME-v6-admin-colabora.zip` incluye código, assets, SQL, seed, configuración de Netlify, documentación y `.env.example`. Excluye `node_modules`, `.next`, `out`, `.git`, cachés y archivos `.env` locales. Se instala con `npm install`; no contiene secretos ni usuarios precreados.

## Contenido institucional oficial

Misión, Visión, síntesis de Home, introducción de Socias y texto de Comunidad se administran desde Configuración. Los valores se agregan, editan, ordenan y desactivan individualmente. Ver [CONTENIDO-INSTITUCIONAL.md](CONTENIDO-INSTITUCIONAL.md) para aplicar **solo la nueva migración 002** en el Supabase existente, sin resetear ni repetir el seed general.


## Netlify sin Proxy

El administrador se protege en Server Components, DAL, Server Actions y RLS. La renovación de cookies se realiza mediante un Route Handler Node, sin `proxy.ts` ni `middleware.ts`. El build utiliza Webpack para evitar un fallo de resolución de fuentes de Turbopack, conservando las tipografías actuales. Archivos, funcionamiento y verificación: [NETLIFY-SIN-PROXY.md](NETLIFY-SIN-PROXY.md).

## Beneficios y convenios de socias

Nueva pantalla `/admin/beneficios` y listado público `/beneficios`, integrado en Socias y enlazado desde Home/footer. Aplicar únicamente `supabase/migrations/202610290003_benefits.sql` una vez en el Supabase existente; no repetir migraciones previas ni resetear. No requiere variables nuevas. Los convenios se editan sin código y sin recompilar. Instalación, archivos y comprobación: [BENEFICIOS.md](BENEFICIOS.md).
