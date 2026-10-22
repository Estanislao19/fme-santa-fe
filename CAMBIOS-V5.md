# Cambios · FME v5 multimedia

Iteración sobre FME v4. Misma dirección visual, seis momentos de Home, logo, fuentes, paleta, rutas y estructura de datos. No se agregaron secciones ni dependencias del proyecto.

## Multimedia

- 13 fotografías WebP DEMO: seis encuadres para socias/equipo, un encuentro, un taller, tres detalles de actividades, una colaboración y un encuadre de equipo. Dos posters adicionales WebP.
- Dos videos locales DEMO de ocho segundos: hero y formación/comunidad. MP4 H.264, 24 fps, sin audio, `faststart`; 281.262 y 513.706 bytes. La colección completa ocupa aproximadamente 1,42 MB.
- Rótulos DEMO visibles y textos alternativos aclaran que el material no representa integrantes ni actividades de FME. Fuentes y licencia en MEDIA-DEMO.md.
- Referencias centralizadas en data/media.ts; los campos image/gallery reales conservan prioridad. Instrucciones de reemplazo y proporciones en README.

## Dinamismo y menos scroll

- Home Socias: carrusel horizontal con seis perfiles existentes; desktop tres más un avance, tablet dos, mobile uno más un avance. Swipe nativo, scroll-snap, controles discretos, teclado y contador. Sin rotación automática.
- Formación: un solo encuentro destacado, video y cuatro fotos en un carrusel compacto dentro del mismo bloque. Una alianza destacada con imagen en su composición existente.
- Directorio: tres fichas iniciales y Mostrar más, de tres en tres. Búsqueda y rubros siguen recorriendo todos los registros antes del recorte.
- Galerías internas horizontales, fotografías con encuadre consistente, alturas y espacios de Home ajustados.
- Altura de Home en 390 px: de 7.643 px en v4 a aproximadamente 6.109 px en v5 (20% menos). En 1440 px: de 5.150 a 4.771 px. Medición con la exportación local, sin quitar información de las páginas internas.

## Archivos modificados y agregados

- sections/Home.tsx
- app/globals.css
- data/media.ts
- components/EditorialCarousel.tsx (nuevo)
- components/EditorialVideo.tsx (nuevo)
- components/MemberCard.tsx
- components/MemberDirectory.tsx
- components/TrainingCard.tsx
- components/ui.tsx
- app/nosotras/page.tsx
- app/comunidad/page.tsx
- app/alianzas/page.tsx
- app/socias/[slug]/page.tsx
- app/capacitaciones/[slug]/page.tsx
- public/media/demo/** (17 assets nuevos)
- README.md, MEDIA-DEMO.md (nuevo), CAMBIOS-V5.md (nuevo), VERIFICACION.md

## Conservación funcional

Sin cambios en registros institucionales, tipos, slugs, formularios, validaciones, adaptador de envío, metadata, sitemap, robots, header ni navegación. La única ampliación de datos es el catálogo visual separado data/media.ts. No se inventaron personas, fechas, resultados, precios ni testimonios. Los formularios siguen siendo demostraciones sin envío ni almacenamiento.

## Validación

npm run typecheck y npm run build: correctos. npm run verify: 20 páginas, 628 enlaces internos y sus anclas, imágenes y encabezados. Detalle de revisión y límites en VERIFICACION.md.
