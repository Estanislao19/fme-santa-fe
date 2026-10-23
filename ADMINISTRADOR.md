# Administrar FME · Guía de uso

Esta guía se utiliza **después de activar Supabase y Netlify** siguiendo SUPABASE-NETLIFY.md. No hay una cuenta de prueba ni una contraseña predeterminada.

## Entrar y salir

Abrí `/admin` en el dominio de FME e ingresá con el email y la contraseña de tu cuenta autorizada. Si aparece “Configuración pendiente”, la persona que prepara el sitio todavía debe conectar Supabase. Si tu cuenta no está autorizada, pedí que revisen sus permisos en Supabase.

El menú muestra Resumen, Socias, Capacitaciones, Alianzas, Colaboradores, Proyectos / Eventos y Configuración. Desde “Ver sitio público” podés revisar la web en otra pestaña. Al terminar, elegí **Cerrar sesión**, especialmente en un equipo compartido.

## Tres ideas para publicar

- **Borrador:** se guarda para seguir trabajando; no se muestra en la web.
- **Publicado + contenido activo:** se muestra públicamente.
- **Archivado o inactivo:** conserva sus datos en el panel y se retira del sitio, incluso de su perfil individual.

Guardar es necesario para aplicar los cambios del editor. El panel informa si se guardaron o si hubo un error. Al actualizar el contenido publicado, los visitantes ven los cambios al navegar o recargar, sin pedir una recompilación. Si dos personas editan la misma ficha, el panel evita sobrescribir silenciosamente la versión más reciente.

## Agregar una socia

1. Abrí **Socias > Agregar**.
2. Completá nombre, emprendimiento, rubro y descripción breve. Sumá su historia, propuestas, teléfono, WhatsApp e Instagram cuando estén confirmados.
3. Elegí su fotografía principal y, si corresponde, imágenes para la galería. No hace falta copiar direcciones de imágenes.
4. El enlace se genera con el nombre. Podés corregirlo en “Slug”; usar letras minúsculas, números y guiones. Si es un alta con enlace automático y ya existe uno igual, se agrega un número para evitar duplicados.
5. Revisá “Contenido DEMO / REEMPLAZAR”: debe estar desmarcado solo si los datos son reales y autorizados.
6. Para revisarla primero, dejá Borrador. Para publicarla, elegí Publicado y mantené Contenido activo marcado.
7. Podés marcarla como destacada y definir Orden: los números menores aparecen primero; Home prioriza destacados y muestra hasta ocho fichas en el carrusel. El directorio conserva todas las socias publicadas/activas.
8. Elegí **Guardar cambios** y esperá la confirmación.

Para encontrar una ficha, usá búsqueda, rubro/tipo y estado del listado. Los listados del panel muestran 12 registros por página; Anterior/Siguiente permite recorrer todos.

## Si una socia deja de pertenecer

Usá **Desactivar** en el listado, o desmarcá Contenido activo dentro del editor y guardá. Su ficha deja de aparecer públicamente, pero sus datos siguen disponibles en el panel. Otra opción es Archivar.

Para recuperarla, activala y asegurate de que esté Publicada. “Recuperar borrador” retira el archivo del estado Archivado, pero no lo publica automáticamente.

Si realmente necesitás eliminarla, abrí su editor, elegí **Eliminar definitivamente** y escribí el nombre exacto. Confirmá únicamente si ya no necesitás conservar esos datos. La operación no se puede deshacer desde el panel. Sus archivos de imágenes se gestionan por separado para no borrar material reutilizado.

## Cargar, cambiar y quitar imágenes

- Acepta JPG, PNG, WebP y AVIF. Los archivos se optimizan automáticamente a WebP, con un máximo de 1600 px y sin EXIF.
- La selección muestra una vista previa. Esperá a que termine la subida antes de Guardar cambios.
- Para reemplazar la principal: elegí Cambiar imagen. Para quitar una de la ficha: usá Quitar y guardá.
- En galerías podés agregar varias, hasta 20 imágenes. Usá proporciones coherentes; para retratos conviene 4:5.
- Una foto real cargada tiene prioridad sobre los respaldos DEMO. Si se deja vacío un registro DEMO v5 puede volver a verse su imagen ilustrativa identificada; las fichas nuevas sin imagen muestran un espacio reservado.
- Desde **Configuración > Gestionar la biblioteca de imágenes** podés revisar archivos subidos. Solo se permite eliminar definitivamente un archivo sin referencias en ninguna ficha, ni siquiera archivada; siempre se pide confirmación.
- Las imágenes se almacenan como material público desde su carga, incluso antes de publicar la ficha. No subir documentos privados ni fotografías sin autorización.

## Capacitaciones

Entrá a Capacitaciones > Agregar. Completá título, descripción, fecha, horario, lugar, modalidad, docente, duración/cupos y precios confirmados. No inventes datos que todavía falten.

Elegí Próxima o Realizada. Agregá foto/galería. El video es opcional: requiere una URL HTTPS de MP4 autorizado y una imagen principal que funcione como poster. No es un formulario de subida de videos ni acepta enlaces de YouTube como si fueran archivos MP4.

Si existe una inscripción habilitada, pegá su enlace HTTPS. Si no existe, dejalo vacío: el sitio conserva el formulario de demostración que no envía ni guarda datos. No se presenta como una inscripción efectiva.

Publicá y activá la actividad cuando esté confirmada. Home muestra una próxima destacada (o la primera próxima si no se marcó ninguna). La agenda y el detalle reflejan los cambios al navegar/recargar. Marcarla Realizada la mueve a la memoria de actividades sin perder su detalle.

## Alianzas

Usá Alianzas > Agregar. Completá nombre, tipo, descripción y acción/proyecto en conjunto. Subí logo y fotografía y agregá los enlaces confirmados. Marcar una alianza destacada ayuda a priorizar su aparición en Home; se presenta como máximo una organización en ese bloque.

No atribuir a Movify ni a otra empresa fotografías ilustrativas como si fueran un registro real. Los respaldos DEMO siguen identificados hasta incorporar material autorizado.

## Colaboradores

Usá Colaboradores > Agregar para empresas, instituciones o personas que acompañen el trabajo de FME. Completá nombre, tipo y una explicación breve de cómo colaboran; agregá logo/foto y enlaces si existen.

Publicados, activos y sin marca DEMO aparecen en **Quienes nos acompañan** de Alianzas y Colaborá. Los registros de ejemplo se conservan en admin, pero no se presentan como colaboradores reales. Inactivar o archivar retira la organización del sitio.

## Proyectos, eventos y campañas

En Proyectos / Eventos > Agregar elegí el tipo: Proyecto, Evento o Campaña. Completá título, descripción, fecha si corresponde, objetivo e imagen. Podés definir texto de botón y enlace HTTPS. Si el enlace queda vacío, el sitio ofrece una consulta por los canales existentes.

Estas iniciativas publicadas/activas se muestran en Colaborá. No se generan cobros, donaciones ni recaudaciones ficticias.

## Rubros

Configuración permite agregar rubros nuevos. Los existentes se conservan para no dejar socias sin categoría. El nuevo rubro se incorpora a los selectores del admin, al directorio y al formulario de asociación en las siguientes cargas.

## Qué no cambia desde este panel

El hero general, videos DEMO de portada, equipo, contacto y contenido legal conservan su organización en archivos. El panel administra socias, capacitaciones, alianzas, colaboradores, proyectos/eventos/campañas, rubros y contenido institucional.

Los formularios públicos continúan sin conexión de envío. Ante un error de guardado no se muestra una confirmación falsa: conservá la pantalla, revisá la conexión y volvé a intentar. Si se informa una edición en otra sesión, volvé al listado y abrí la ficha actualizada.


## Contenido institucional

En Configuración podés editar Misión, Visión, síntesis de Home, introducción de Socias y texto de Comunidad. Guardá y esperá la confirmación. Cada valor tiene su propio formulario: nombre, descripción, orden y visibilidad. Un orden menor aparece primero. Para retirarlo, desmarcá «Visible en el sitio» y guardá. No se borra el registro. Podés agregar valores sin modificar código. Si se informa que otra sesión editó el contenido, recargá antes de guardar. Activación y verificación: [CONTENIDO-INSTITUCIONAL.md](CONTENIDO-INSTITUCIONAL.md).
