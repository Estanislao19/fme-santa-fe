# Activar FME v6 · Supabase y Netlify

## Estado

FME confirmó posteriormente que el proyecto Supabase y el administrador ya están configurados. Para esa instalación existente, omitir la creación de proyecto, la migración 001 y el seed general: aplicar únicamente la ampliación institucional indicada al final de esta guía. Los pasos iniciales siguientes quedan como referencia para instalaciones nuevas. El sitio v5 actualmente publicado en Sites permanece disponible. V6 necesita un runtime Next.js: no se sube `out/` ni se reemplaza por una SPA estática.

## 1. Crear el proyecto Supabase

En una cuenta de la Fundación, crear un proyecto y conservar sus credenciales en un gestor seguro. Elegir una región adecuada. No pegar contraseñas ni claves secretas en el repositorio, capturas ni ZIP.

En Project Settings > API obtener:

- Project URL → `NEXT_PUBLIC_SUPABASE_URL`.
- Clave pública publishable o anon → `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

**No usar `service_role` ni `sb_secret_…`**. El código utiliza la clave pública y la sesión del usuario; RLS es obligatoria. El build rechaza una service role key reconocible en la variable pública.

## 2. Aplicar schema y seed

En SQL Editor, ejecutar como propietario, una sola vez:

1. El contenido completo de `supabase/migrations/202610230001_fme_cms.sql`.
2. El contenido completo de `supabase/seed.sql`.

El schema crea:

- `fme_admins`: cuentas autorizadas, vinculadas a `auth.users`.
- `fme_content`: socias, capacitaciones, alianzas, colaboradores y proyectos/eventos/campañas.
- `fme_categories`: rubros.
- `fme_slug_aliases`: enlaces anteriores.
- `fme_audit_log`: metadatos de operaciones.
- Bucket `fme-media`: imágenes públicas, escritura/borrado solo para administradores.

Todas las tablas de contenido y autorización tienen RLS. No deshabilitarla. El seed importa seis socias DEMO, dos capacitaciones DEMO, Movify, cuatro colaboradores DEMO y un proyecto DEMO; conserva el contenido existente y los nueve rubros. No declara a colaboradores DEMO como organizaciones reales. `ON CONFLICT DO NOTHING` evita sobreescribir ediciones del administrador.

Si se usa Supabase CLI con un proyecto vinculado, aplicar esta migración con el flujo habitual `supabase db push`; el seed se ejecuta aparte. No usar `db reset` contra producción. Guardar las credenciales de CLI fuera del código.

Comprobación en SQL Editor:

```sql
select kind, count(*) from public.fme_content group by kind order by kind;
select count(*) from public.fme_categories; -- nueve inicialmente
```

## 3. Crear el primer administrador

En Authentication > Users de Supabase, crear una cuenta real para la persona responsable. Completar el email y una contraseña segura desde esa interfaz. No hay alta pública ni contraseñas por defecto en FME.

Después, ejecutar en SQL Editor el siguiente bloque, reemplazando únicamente el email por el de esa cuenta:

```sql
do $$
declare admin_id uuid;
begin
  select id into admin_id from auth.users
    where lower(email) = lower('REEMPLAZAR_POR_EMAIL_REAL');
  if admin_id is null then
    raise exception 'Primero crear la cuenta en Authentication > Users';
  end if;
  insert into public.fme_admins(user_id) values(admin_id)
    on conflict(user_id) do nothing;
end $$;
```

Verificar:

```sql
select a.user_id, u.email
from public.fme_admins a join auth.users u on u.id = a.user_id;
```

No se confía en `user_metadata` ni existe un botón para darse permisos desde el panel. Autenticarse sin figurar en `fme_admins` no concede acceso.

Para quitar acceso administrativo, eliminar su fila de `fme_admins` desde SQL Editor. Las siguientes operaciones dejan de estar autorizadas, aunque conserve una sesión. No se elimina por eso el perfil público de una socia: son entidades diferentes.

En la configuración de Authentication deshabilitar nuevos registros públicos; crear las cuentas por el procedimiento administrativo. Configurar Site URL con el origen definitivo y, si se usan flujos de email de Supabase, sus redirect URLs permitidas. El acceso de FME implementado usa email/contraseña; no hay un flujo de recuperación personalizado dentro de la web. Para una recuperación, la persona responsable gestiona la cuenta desde Supabase.

## 4. Variables locales

Copiar `.env.example` a `.env.local`, que está ignorado por Git. Completar:

```dotenv
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000
NEXT_PUBLIC_SUPABASE_URL=URL_DEL_PROYECTO
NEXT_PUBLIC_SUPABASE_ANON_KEY=CLAVE_PUBLICA
FME_ALLOW_LOCAL_CONTENT=false
```

Los textos son marcadores, no credenciales funcionales. No pegar valores privados en `.env.example`. Ejecutar `npm run dev` y abrir `/admin`.

Para revisar el diseño público sin Supabase, dejar las variables de Supabase vacías y usar `FME_ALLOW_LOCAL_CONTENT=true`. **El administrador no se habilita en ese modo.** Si Supabase está configurado pero falla, se informa el error y nunca se recuperan registros de los archivos locales.

## 5. Netlify

Conectar este mismo repositorio a Netlify. No hace falta crear otro proyecto de código ni volver a exportar el sitio.

- Build command: `npm run build`.
- Publish directory: `.next`.
- Node: 22, establecido en `netlify.toml`.
- Netlify detecta Next.js y aplica automáticamente su adaptador OpenNext. No agregar un redirect `/* /index.html 200`.
- Configurar las cuatro variables del README en los contextos necesarios de Netlify, con alcance de build y Functions cuando corresponda. `NEXT_PUBLIC_SITE_URL` debe ser el origen HTTPS definitivo, sin barra final.
- `FME_ALLOW_LOCAL_CONTENT=false` ya está establecido para Netlify en el TOML: configurar Supabase antes de servir contenido.
- Mantener la protección contra versiones mezcladas (`NETLIFY_NEXT_SKEW_PROTECTION=true`).

Desplegar mediante el flujo Git de Netlify o su CLI autenticada. La aplicación necesita funciones del servidor para admin, sesiones, lectura dinámica y uploads. No usar drag-and-drop de `out/` como despliegue final. Cambiar variables de entorno exige un redeploy; **editar contenido desde admin no lo exige**.

La identidad histórica de Sites se conserva en `.openai/hosting.json` sin declarar la antigua exportación estática. Ese manifest no configura Netlify. No se desplegó esta v6 en el hosting anterior ni se afirmó una publicación nueva.

## 6. Prueba de aceptación con Supabase real

Antes de entregar acceso operativo a FME:

1. Sin sesión: visitar `/admin/socias` y comprobar redirección a login; intentar upload sin sesión y verificar rechazo.
2. Ingresar con el administrador autorizado. Probar otra cuenta autenticada no incluida en `fme_admins`: no debe entrar ni escribir mediante API.
3. Crear una socia de prueba en borrador, subir su imagen y galería, guardar y confirmar que no aparece públicamente.
4. Publicarla y activarla; abrir Home, directorio y perfil en otra ventana. Cambiar nombre/orden/destacado, guardar y comprobar sin recompilar.
5. Corregir el slug y comprobar que el enlace anterior redirige. Desactivar: debe desaparecer del directorio y devolver 404 en su perfil. Recuperar/archivar también.
6. Crear/editar una capacitación próxima; probar imagen, galería y enlace de inscripción. Marcarla realizada; verificar agenda y detalle.
7. Crear/editar una alianza y un colaborador reales; comprobar “Quienes nos acompañan” en `/alianzas` y `/colabora`.
8. Crear un proyecto, un evento y una campaña; publicarlos y comprobar su presentación en Colaborá.
9. Quitar una imagen de la ficha, guardar y comprobar la biblioteca. Un archivo en uso debe resistir la eliminación; uno sin referencias debe eliminarse solo tras confirmar.
10. Probar eliminación de una ficha de prueba, escribiendo el nombre exacto. No probar con contenido real que se necesite conservar.
11. Cerrar sesión y volver a intentar abrir admin. Revisar 375/390/430/768/1024/1440 px, incluido el upload desde un teléfono.
12. Verificar HTTPS, dominio, sitemap, robots y políticas RLS en el proyecto real; ejecutar la política de copias de seguridad que defina la Fundación.

Las pruebas SQL automatizadas de esta entrega se ejecutan en PostgreSQL/PGlite con roles equivalentes; no sustituyen esta prueba de Auth/Storage remoto ni la aceptación del deploy Netlify.

## Referencias oficiales consultadas

- Next.js sobre Netlify: https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- Supabase SSR: https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs
- Storage y políticas: https://supabase.com/docs/guides/storage/security/access-control

## Ampliación institucional sobre una v6 ya configurada

El proyecto Supabase existente se conserva. Aplicar únicamente `supabase/migrations/202610230002_institutional.sql` en SQL Editor antes de activar esta ampliación. **No volver a ejecutar la migración 001, resetear la base ni recargar el seed general.** La nueva migración incluye los textos oficiales y diez valores sin sobrescribir registros previos. Mantener las credenciales públicas y el administrador actuales. Guía: [CONTENIDO-INSTITUCIONAL.md](CONTENIDO-INSTITUCIONAL.md).

