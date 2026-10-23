# Contenido institucional oficial · FME v6

Esta ampliación conserva las tablas y los registros existentes. No requiere resetear la base, repetir el seed general ni crear otra cuenta administradora.

## Activación sobre el Supabase existente

En el SQL Editor del proyecto FME, ejecutar **una sola vez** el archivo completo `supabase/migrations/202610230002_institutional.sql`. La transacción agrega únicamente `fme_institutional`, `fme_values`, sus políticas RLS y el control de revisiones. Reutiliza `is_fme_admin()` y `fme_admins`. **No ejecutar otra vez la migración 001 ni `supabase/seed.sql` en una instalación existente.**

La migración incluye el contenido oficial: inserta los textos solo si falta la fila y los diez valores solo si su colección está vacía. No sobrescribe ediciones ni reactiva valores retirados. `supabase/institutional-schema.sql` es la fuente del generador, no un paso adicional de instalación.

Mantener las variables existentes en `.env.local` y `FME_ALLOW_LOCAL_CONTENT=false`; reiniciar el servidor después de cambiar variables. No se necesita una clave privada nueva. La clave pública no puede ejecutar DDL: aplicar la migración mediante SQL Editor o el mecanismo autorizado de migraciones, antes de activar este código conectado. Si faltan las tablas, se informa el problema sin ocultarlo con datos locales.

## Uso cotidiano

Ingresar con la cuenta actual en `/admin/configuracion/` > **Contenido institucional**. Editar Misión, Visión, síntesis de Home, introducción de Socias y texto de Comunidad. Guardar y esperar la confirmación. Separar párrafos mediante una línea en blanco; no escribir HTML.

Cada valor se abre y guarda individualmente: nombre, descripción, orden y «Visible en el sitio». Los números menores aparecen primero; los empates se ordenan por nombre. Se pueden agregar valores. Desmarcar visibilidad retira el valor públicamente sin borrarlo; desactivar todos deja la lista pública vacía.

Solo administradoras presentes en `fme_admins` pueden editar o insertar, tanto por las acciones del panel como por RLS en la API. Los visitantes leen los textos y los valores activos. El control de revisiones evita sobrescribir silenciosamente ediciones de otra sesión.

## Distribución pública

- Nosotras: Misión y Visión completas y valores activos ordenados, en columnas y líneas finas. Se retiró la nota de validación pendiente correspondiente. Historia, equipo y sede conservan sus advertencias porque no se recibieron esos datos.
- Home: síntesis breve de misión; conserva seis bloques, hero, multimedia y carrusel.
- Socias: introducción condensada seguida por el buscador, rubros y directorio existentes.
- Comunidad / Quiero ser parte: los cinco párrafos oficiales, acompañamiento recíproco y formulario existente. Se conserva el aviso de que el formulario no envía información y la confirmación pendiente de requisitos/cuota.

`data/institutional.ts` es el contenido inicial oficial para el seed y la previsualización local sin backend. Con Supabase configurado, la web consulta las tablas sin caché persistente; guardar invalida las rutas. Los errores de conexión no activan un respaldo silencioso. Editar el archivo no sobrescribe la base.

## Archivos

Nuevos: `data/institutional.ts`, `lib/institutional.ts`, `lib/admin/institutional-schema.ts`, `app/admin/institutional-actions.ts`, `components/admin/InstitutionalEditor.tsx`, `supabase/institutional-schema.sql`, `supabase/institutional-seed.sql`, `supabase/migrations/202610230002_institutional.sql`, `scripts/generate-institutional-seed.ts`, `tests/institutional.test.ts` y esta guía.

Actualizados: páginas Nosotras, Socias y Comunidad, `sections/Home.tsx`, configuración de admin, estilos públicos/admin, `lib/content.ts` (cliente compartido), `package.json` y documentación. Para regenerar el SQL inicial: `npm run seed:institutional`; no hace falta para la edición habitual.

## Prueba de aceptación en Supabase real

Después de aplicar la migración: guardar temporalmente una modificación de Misión en admin, verla en Nosotras y restaurar el texto oficial. Editar un valor, verificarlo, cambiar su orden y comprobar la posición. Desactivarlo: debe desaparecer públicamente y seguir en admin. Restaurar texto, orden y visibilidad originales. No tocar los registros existentes de otras colecciones.

Las pruebas automatizadas usan PostgreSQL local con RLS y comprueban preservación de registros, contenido oficial, permisos, edición/lectura pública, orden, inactivos, revocación de administradora y conflictos. No sustituyen la aceptación con Supabase Auth real.

## Verificación de esta iteración (23/10/2026)

- `npm run typecheck`: correcto.
- `npm run build`: correcto, con `.env.local` real cargado; Next.js dinámico conservado.
- `npm test`: 7 pruebas correctas, incluidas las dos institucionales.
- Revisión local previa a la conexión real: 19 páginas públicas, 492 enlaces/anclas, 15 imágenes y 9 accesos privados comprobados. Home conserva exactamente seis bloques. Home, Nosotras, Socias y Comunidad sin desbordamiento horizontal en 375, 390, 430, 768, 1024 y 1440 px; buscador, filtro por rubro y menú móvil comprobados. Sin errores de consola en las páginas revisadas.
- Variables locales y lectura del Supabase real comprobadas sin imprimir claves. El backend existente responde; `fme_institutional` y `fme_values` aún devuelven PGRST205 porque falta aplicar la migración 002 manualmente. No se escribió ni alteró ningún registro remoto.
- Pendiente después de ejecutar ese SQL: validar edición de Misión, edición/orden/visibilidad de un Valor desde una sesión administradora real y lectura pública correspondiente. Las pruebas SQL locales de ese recorrido ya pasaron; no se afirma que la prueba autenticada remota se haya realizado.
