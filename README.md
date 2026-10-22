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

Para agregar una foto definitiva, colocar su archivo en `public/images/` y completar `image: '/images/archivo.webp'`. Las galerías usan listas de rutas. `next/image` mantiene dimensiones y carga diferida; en hosting estático está desactivada la optimización dinámica, por lo que los archivos deben optimizarse antes. Desde v5 se incluyen fotos y clips de stock **exclusivamente DEMO**, identificados en pantalla y separados de los datos institucionales. No hay testimonios ficticios.

El logo original tiene márgenes propios que se respetan: no se recorta ni se altera su transparencia. Para logos autorizados de alianzas y colaboradores, completar `logo`; para webs externas, `url`.

## Formularios e integración

Todos los formularios incluyen validación cliente, mensajes de error asociados a sus campos, foco en el primer error, consentimiento y confirmación accesible. **Actualmente no envían ni guardan datos** y lo indican antes y después de la validación. No hay APIs simuladas ni inscripciones reales.

La integración está aislada en `utils/form-adapter.ts`. Reemplazar `submitForm` por un adaptador real al servicio elegido (email, Sheets, CRM o base de datos). Nunca colocar secretos en el cliente. Al habilitarlo, implementar validación de servidor y protección contra abuso en el receptor, revisar el consentimiento y actualizar la política de privacidad. Solo devolver `status: 'sent'` luego de una recepción confirmada.

## WhatsApp, mapa y SEO

Completar `site.phone` en formato internacional con código de país y área. El acceso flotante se convierte en enlace de WhatsApp automáticamente. Mientras falta el número, conduce a los canales de contacto y no abre un número ficticio. El mensaje inicial se configura en `site.whatsappMessage`.

El mapa es un espacio reservado sin coordenadas inventadas. Reemplazarlo al confirmar la sede.

Copiar `.env.example` a `.env.local` y configurar `NEXT_PUBLIC_SITE_URL` con el origen definitivo. Esto habilita canonical, sitemap y robots indexables. Sin dominio, el sitio queda en `noindex` para evitar indexar la versión de demostración. Revisar también los contenidos DEMO antes de la publicación pública. Las fuentes Playfair Display (normal y cursiva) y Manrope se descargan en el build con `next/font` y se sirven localmente.

## Rutas

`/`, `/nosotras`, `/socias`, `/socias/[slug]`, `/capacitaciones`, `/capacitaciones/[slug]`, `/comunidad`, `/voluntariado`, `/colabora`, `/alianzas`, `/contacto`, `/politica-de-privacidad`, `/terminos-y-condiciones`. Colaboradores está integrado en Alianzas. Incluye página 404, `robots.txt` y `sitemap.xml`.

## Identidad y contenido

Paleta v4: petróleo `#285b62`, azul profundo `#244c50`, dorado suave `#dfb656`, marfil `#f9f7f1`, arena y salvia. El archivo PNG oficial es la fuente de identidad y no fue redibujado. Se conserva el Instagram facilitado por FME como referencia; no se extrajeron datos no confirmados.

## Versión v4 · femenina editorial

La Home está organizada en seis momentos: hero, presentación, socias (con rubros integrados), formación + comunidad, alianzas + colaboración y cierre. La navegación principal muestra Nosotras, Socias, Capacitaciones y Alianzas; la navegación completa sigue en el footer. Todas las rutas y formularios permanecen disponibles.

La dirección visual v4 se conserva en v5: Playfair Display + Manrope, marfil, petróleo, mostaza, líneas finas y curvas. Los espacios curvos se adaptan al incorporar imágenes reales autorizadas.

Ver `CAMBIOS-V5.md`, `MEDIA-DEMO.md` y `VERIFICACION.md` para esta entrega; `CAMBIOS-V4.md` conserva la referencia de la iteración anterior.

## Cómo reemplazar imágenes y videos demo

Los archivos temporales están en `public/media/demo/`, separados en `socias/`, `capacitaciones/`, `comunidad/`, `alianzas/`, `equipo/` y `videos/`. **Todas las referencias DEMO están centralizadas en `data/media.ts`**. No representan integrantes, autoridades, eventos ni alianzas fotografiadas de FME; la imagen junto a Movify tampoco representa a esa empresa.

| Uso | Tamaño recomendado | Proporción / formato |
| --- | --- | --- |
| Socias y equipo | 800 × 1000 px | 4:5, WebP/AVIF, idealmente menos de 180 KB |
| Encuentros y galerías | 1200–1600 × 750–1000 px | Horizontal, WebP/AVIF, menos de 250 KB |
| Video hero | 640 × 800 o 1080 × 1350 px | Retrato, MP4 H.264, sin audio, poster WebP |
| Video formación | 960 × 600 o 1920 × 1080 px | Horizontal, MP4 H.264, poster WebP |

1. Copiar el material real autorizado a `public/media/fme/` (crear la carpeta). Por ejemplo `socias/maria-gomez.webp`.
2. Cambiar la ruta en `data/media.ts` a `/media/fme/socias/maria-gomez.webp`. La misma referencia alimenta Home, directorio y perfil. Alternativamente, completar `image` en el registro de la socia: ese dato tiene prioridad. Los slugs y nombres no dependen del nombre del archivo.
3. Para el equipo, completar `image` en `data/team.ts`; la imagen DEMO solo funciona como respaldo. En capacitaciones, completar `image` y `gallery` en `data/trainings.ts`. Las galerías reales también tienen prioridad en perfiles y alianzas.
4. Reemplazar `media.videos.hero` y/o `media.videos.activity` con sus rutas `src` y `poster`, un `label` fiel al contenido y `demo: false`. Preparar clips cortos de 6–12 segundos, con `faststart`, menos de 2 MB si es posible. Los demos actuales duran 8 segundos y suman menos de 800 KB. No se descarga el segundo video antes de entrar en pantalla.
5. Las fotos ubicadas fuera de `/media/demo/` dejan de mostrar automáticamente el rótulo DEMO. Actualizar el texto alternativo mediante el `label` correspondiente y retirar avisos de demostración de los perfiles solo después de confirmar sus datos. Los textos `[DATO A CONFIRMAR]` se mantienen hasta contar con información real.
6. Para videos informativos, usar `informative: true` y `captions: { src: '/media/fme/subtitulos.vtt', language: 'es', label: 'Español' }`. Se habilitan controles nativos y pista de subtítulos; adaptar también el contenido textual que explica el video. Los clips decorativos se mantienen sin sonido.
7. Ejecutar `npm run typecheck`, `npm run build` y `npm run verify` después de reemplazar archivos. Los assets se sirven localmente; no dependen de Pexels durante la navegación.

### Carruseles y contenido progresivo

`components/EditorialCarousel.tsx` usa React y CSS scroll-snap, sin librerías adicionales: swipe nativo, flechas anterior/siguiente, teclado (flechas, Inicio/Fin al enfocar el carrusel), foco visible y contador discreto. No rota automáticamente: deja tiempo para leer y evita movimiento no solicitado. El desplazamiento suave respeta `prefers-reduced-motion`. En desktop se ven tres perfiles y parte del siguiente; en tablet dos y en celular uno más un avance.

`/socias` muestra inicialmente tres resultados y permite ampliar de tres en tres con “Mostrar más socias”. Búsqueda y rubros se aplican **antes** del recorte sobre todos los registros activos. El contador informa el total y cuántos se muestran. No se elimina ningún perfil.

Los videos tienen poster permanente de respaldo, carga al entrar en pantalla, pausa al salir o al ocultar la pestaña, botón de pausa/reproducción y respeto de movimiento reducido/ahorro de datos. En esos modos se presenta el poster y la reproducción queda a elección del visitante.

