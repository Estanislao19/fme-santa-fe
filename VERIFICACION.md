# Verificación · FME v5 multimedia

Fecha: 22 de octubre de 2026.

- npm run typecheck: correcto, sin errores.
- npm run build: correcto, todas las rutas generadas.
- npm run verify: 20 páginas HTML y 628 enlaces internos, con anclas, imágenes y h1 verificados.
- Navegador: 19 páginas públicas, incluidos los seis perfiles y dos detalles de capacitación, revisadas a 375, 390, 430, 768, 1024 y 1440 px (114 combinaciones). Sin scroll horizontal global, imágenes rotas ni multiplicidad de h1. La página 404 se incluye en el build.
- Home: exactamente seis secciones principales. Multimedia integrada en los bloques existentes. Sin nuevas secciones ni funcionalidades eliminadas.
- Carrusel de socias: avance/retroceso, límites, Inicio/Fin y contador probados. Se verificó el recorte de tres más un avance en desktop y uno más un avance en mobile. Scroll táctil nativo por CSS; no se emularon gestos físicos de un teléfono.
- Galería: desplazamiento, contador y navegación comprobados. Las galerías internas tienen región accesible y foco de teclado.
- Directorio: tres resultados iniciales, ampliación a seis, filtro Moda, búsqueda de ejemplo 06 aun cuando no aparece inicialmente, estado vacío y limpieza comprobados. Filtro por URL preservado.
- Videos: posters, muted, playsInline, carga del segundo clip solo al entrar en pantalla, pausa al salir, reproducción, pausa manual y reanudación comprobados. Sin sonido ni servicios de reproducción externos.
- prefers-reduced-motion y ahorro de datos: rutas de control revisadas en código; conservan poster y requieren reproducción elegida por el usuario. La herramienta de navegador no expone emulación de esas preferencias; no se afirma una prueba de dispositivo físico.
- Menú móvil: apertura, cierre, Escape y bloqueo de scroll comprobados; lógica original de foco intacta.
- Cinco formularios: requeridos, foco en primer error y confirmación DEMO comprobados. Sin envío ni almacenamiento, como en v4.
- Consola: sin errores ni advertencias en la revisión.
- Logo: intacto. SHA-256 021ACB2CA95D47CDF0F9388C55101D940AC9D502B4C9FF61A4BD14F4619FBB55.
- Las definiciones de datos, contratos, formularios, metadata, sitemap, robots y navegación no fueron modificados. Solo data/media.ts incorpora el catálogo de multimedia temporal.

## Performance y entrega

17 assets DEMO locales (13 fotos, dos posters y dos videos), aproximadamente 1,42 MB en total. Los dos videos suman 794.968 bytes y duran ocho segundos. Fotos optimizadas WebP y carga diferida salvo poster principal. No se agregaron dependencias a package.json ni package-lock.json. No se ejecutó una auditoría Lighthouse ni una prueba en iPhone físico.

El ZIP FME-v5-multimedia.zip incluye código, configuración, assets y documentación; excluye node_modules, .next, out, .git y cachés. Se ejecutan los pasos habituales npm install, npm run dev y npm run build.

## Pendientes reales

Material audiovisual definitivo autorizado, perfiles reales, datos de contacto, autoridades, sede, fechas y precios. Los rótulos DEMO, [DATO A CONFIRMAR], estado de integración de formularios y noindex existente permanecen. Ver README y MEDIA-DEMO.md para reemplazar archivos sin tocar varios componentes.
