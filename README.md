# FME · Fundación Mujeres Emprendedoras

Sitio institucional de Santa Fe desarrollado con Next.js App Router, React, TypeScript y Tailwind CSS. El sitio se exporta como archivos estáticos, sin backend ni autenticación. El logo oficial se copia sin modificaciones en `public/images/logo-fme.png`.

## Instalación y ejecución

Requiere Node.js 22 LTS y npm.

```sh
npm install
npm run dev
```

Abrir http://127.0.0.1:3000. Para producción:

```sh
npm run typecheck
npm run build
```

El build genera `out/`, listo para un servidor estático compatible con rutas de directorio. Para ejecutar Next localmente sin exportación estática, quitar `output: 'export'` de `next.config.ts`, volver a compilar y usar `npm start`. Con exportación estática, servir `out/` desde cualquier servidor HTTP estático.

## Dónde editar el contenido

| Contenido                                                          | Archivo                 |
| ------------------------------------------------------------------ | ----------------------- |
| Socias, historias, contactos, fotografías y estado activo          | `data/members.ts`       |
| Rubros y áreas de voluntariado                                     | `data/categories.ts`    |
| Capacitaciones próximas y realizadas, precios, docentes y galerías | `data/trainings.ts`     |
| Equipo, funciones y fotografías                                    | `data/team.ts`          |
| Alianzas                                                           | `data/alliances.ts`     |
| Colaboradores                                                      | `data/collaborators.ts` |
| Proyectos, objetivos y montos opcionales                           | `data/projects.ts`      |
| Dirección, horario, email, teléfono, WhatsApp, Instagram y dominio | `data/site.ts`          |
| Valores, beneficios y opciones de colaboración                     | `data/content.ts`       |
| Campos y botones de formularios                                    | `data/forms.ts`         |
| Contratos de datos                                                 | `types/index.ts`        |
| Estilos, paleta y responsive                                       | `app/globals.css`       |
| Composición de la portada                                          | `sections/Home.tsx`     |

Los archivos de datos pueden sustituirse por una capa de CMS respetando los tipos. Los perfiles y detalles se generan estáticamente: agregar registros requiere un nuevo build.

## Datos definitivos y fotografías

Los registros `demo: true` están identificados como DEMO / REEMPLAZAR en el código y como demostración en pantalla. No son personas ni actividades reales. Reemplazarlos por contenido autorizado y establecer `demo: false`. Las autoridades, fechas, contactos, precios y proyectos desconocidos usan `[DATO A CONFIRMAR]` o campos vacíos tipados. La misión, visión y los textos legales requieren validación institucional.

Para agregar una foto, colocar su archivo en `public/images/` y completar `image: '/images/archivo.webp'`. Las galerías usan listas de rutas. Se recomienda exportar fotografías en WebP o AVIF, dimensionadas al uso. `next/image` mantiene dimensiones y carga diferida; en hosting estático está desactivada la optimización dinámica, por lo que los archivos deben optimizarse antes. Los espacios editoriales reservados se sustituyen automáticamente cuando reciben una imagen. No se usan fotos de stock ni testimonios ficticios.

El logo original tiene márgenes propios que se respetan: no se recorta ni se altera su transparencia. Para logos autorizados de alianzas y colaboradores, completar `logo`; para webs externas, `url`.

## Formularios e integración

Todos los formularios incluyen validación cliente, mensajes de error asociados a sus campos, foco en el primer error, consentimiento y confirmación accesible. **Actualmente no envían ni guardan datos** y lo indican antes y después de la validación. No hay APIs simuladas ni inscripciones reales.

La integración está aislada en `utils/form-adapter.ts`. Reemplazar `submitForm` por un adaptador real al servicio elegido (email, Sheets, CRM o base de datos). Nunca colocar secretos en el cliente. Al habilitarlo, implementar validación de servidor y protección contra abuso en el receptor, revisar el consentimiento y actualizar la política de privacidad. Solo devolver `status: 'sent'` luego de una recepción confirmada.

## WhatsApp, mapa y SEO

Completar `site.phone` en formato internacional con código de país y área. El acceso flotante se convierte en enlace de WhatsApp automáticamente. Mientras falta el número, conduce a los canales de contacto y no abre un número ficticio. El mensaje inicial se configura en `site.whatsappMessage`.

El mapa es un espacio reservado sin coordenadas inventadas. Reemplazarlo al confirmar la sede.

Copiar `.env.example` a `.env.local` y configurar `NEXT_PUBLIC_SITE_URL` con el origen definitivo. Esto habilita canonical, sitemap y robots indexables. Sin dominio, el sitio queda en `noindex` para evitar indexar la versión de demostración. Revisar también los contenidos DEMO antes de la publicación pública. Las fuentes Manrope y Source Sans 3 se descargan en el build con `next/font` y se sirven localmente.

## Rutas

`/`, `/nosotras`, `/socias`, `/socias/[slug]`, `/capacitaciones`, `/capacitaciones/[slug]`, `/comunidad`, `/voluntariado`, `/colabora`, `/alianzas`, `/contacto`, `/politica-de-privacidad`, `/terminos-y-condiciones`. Colaboradores está integrado en Alianzas. Incluye página 404, `robots.txt` y `sitemap.xml`.

## Identidad y contenido

Paleta: petróleo `#2a606d`, azul profundo `#183f48`, mostaza `#e9ac27`, crema `#f6f5ef` y tonos grisáceos. El archivo PNG oficial es la fuente de identidad y no fue redibujado. Se conserva el Instagram facilitado por FME como referencia; no se extrajeron datos no confirmados.
