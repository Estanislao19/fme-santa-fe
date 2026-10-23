# Netlify: autenticación sin Next.js Proxy

Se eliminó el archivo raíz `proxy.ts`. No se agregó `middleware.ts` ni otra entrada Proxy. No cambia el diseño, el contenido público, las tablas, RLS ni las claves. No se requiere ninguna migración SQL.

## Sesión y permisos

- Los Server Components del administrador usan un cliente de solo lectura, sin sesión persistida. El token de la cookie se envía explícitamente a `auth.getUser()`; después se consulta `is_fme_admin()`, que verifica `fme_admins`. No se usa el usuario declarado en la cookie para autorizar.
- La fecha del JWT se lee únicamente para decidir si renovar. Un JWT manipulado no concede acceso: Auth debe validarlo y la consulta de administradora debe devolver `true`.
- Si falta sesión, las páginas protegidas redirigen a `/admin/login`. Si la cuenta no está autorizada, redirigen a login con un mensaje de acceso denegado. El upload devuelve 401 sin sesión y 403 para una cuenta no administradora.
- Cuando el token necesita renovación, el servidor redirige a `/api/admin/session/`, un Route Handler **Node.js**. Supabase renueva la sesión y escribe las cookies antes de volver al resumen del administrador. Un token de renovación inválido limpia las cookies de sesión de este proyecto y vuelve a login, sin bucles. El parámetro opcional `next` admite únicamente rutas internas del administrador.
- Server Actions y upload usan el cliente SSR con cookies de escritura: pueden renovar durante un guardado sin perder el formulario. Cada operación vuelve a comprobar usuario y permiso, además de RLS. Login y logout también escriben/eliminan cookies del lado servidor.
- Las cookies mantienen HttpOnly, SameSite=Lax, Path=/ y Secure en producción. `/admin/**` y `/api/admin/**` mantienen no-store/noindex mediante la configuración de cabeceras de Next.js, sin middleware.

El build usa la opción oficial `next build --webpack`. Durante la verificación también apareció un fallo reproducible de Turbopack al resolver `next/font/google`; Webpack conserva Manrope y Playfair Display y evita ese fallo sin cambiar las fuentes.

## Archivos exactos de esta corrección

Eliminado:

- `proxy.ts`

Modificados:

- `lib/supabase/server.ts`
- `lib/admin/auth.ts`
- `app/admin/actions.ts` (conserva CRUD y valida con cliente de escritura)
- `app/admin/institutional-actions.ts`
- `app/admin/login/page.tsx`
- `app/api/admin/media/route.ts`
- `next.config.ts`
- `package.json` (solo la opción de compilación en esta corrección)
- `scripts/verify-dynamic.mjs`
- `README.md`

Agregados:

- `lib/supabase/session.ts`
- `lib/supabase/cookie-client.ts`
- `lib/admin/access.ts`
- `app/api/admin/session/route.ts`
- `tests/auth-session.test.ts`
- `NETLIFY-SIN-PROXY.md`

Las carpetas `.next` y `.netlify` son artefactos regenerados, no cambios de código. No se modificaron las migraciones, datos, assets ni estilos.

## Despliegue

Reconstruir antes de desplegar; no reutilizar un artefacto anterior que contenga middleware. El comando habitual es `netlify deploy --prod` con el build habilitado (o `netlify deploy --prod --build` si se había deshabilitado). No hace falta cambiar las variables ni las cuentas existentes.

Comprobar que el resumen de Next.js no muestre `Proxy (Middleware)` y que `.netlify/edge-functions/manifest.json` tenga `functions: []`. El adaptador debe empaquetar únicamente `___netlify-server-handler`.

## Alcance de las pruebas

Las pruebas automatizadas ejercitan el SDK Supabase con respuestas HTTP controladas: usuario autorizado/no autorizado, rechazo de JWT falso, lectura de cookies fragmentadas, login, renovación con rotación y logout. Las pruebas de PostgreSQL/PGlite cubren RLS, CRUD, Storage y edición/orden de valores institucionales. No crean ni alteran cuentas o contenido en el Supabase real.

La aceptación autenticada sobre el servicio real requiere una sesión administradora existente. No se crean cuentas de prueba ni se solicitan contraseñas en el chat. Los resultados y límites de verificación se registran a continuación.


## Resultados de esta corrección

- `npm run typecheck`: correcto.
- `npm test`: 11 pruebas correctas.
- `npm run build`: correcto; no aparece `Proxy (Middleware)`. Los manifiestos de Next no tienen middleware ni Edge Functions y no contienen `/_middleware`.
- `npm run verify` contra el servidor conectado al Supabase real: 19 páginas públicas, 492 enlaces/anclas, 15 imágenes, nueve rutas de admin cerradas sin sesión; login público, upload anónimo 401 y renovación anónima a login, con no-store.
- Comprobación HTTP adicional contra Supabase real: cookie manipulada con rol ficticio rechazada; `/admin` y `/admin/configuracion` vuelven a login y upload responde 401. No se escribió ningún dato remoto.
- `netlify build --offline`: compilación y empaquetado del handler Node correctos; manifiesto Netlify Edge vacío y eliminados los artefactos del antiguo `___netlify-edge-handler-node-middleware`. El paso posterior de publicación estática local falló por `EPERM` al renombrar `.next` a `.netlify/.next` en este entorno Windows. Es un fallo diferente del módulo Turbopack/middleware; no se modificó el plugin para ocultarlo y no se hizo deploy productivo.
- La persona responsable confirmó manualmente el ingreso con su cuenta administradora, la carga del panel con los datos reales, el logout y la redirección de /admin a login después de salir. Esa sesión no estaba compartida con el navegador integrado del agente. Por indicación expresa no se guardó ni modificó contenido existente. CRUD, upload, edición institucional y rechazo de usuario común se verificaron mediante SDK con HTTP controlado y RLS en PostgreSQL local; no se afirma una prueba de escritura remota ni una sesión real de usuario no administrador.

- Verificación final adicional de renovación inválida contra Auth real: /admin redirige al handler Node (307), el handler limpia la cookie y vuelve a login (303), login responde 200 sin bucle. Build, typecheck y las 11 pruebas volvieron a pasar después de esa corrección.
