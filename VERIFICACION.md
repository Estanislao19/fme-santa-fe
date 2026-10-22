# Verificación · FME v4 femenina editorial

Fecha de revisión: 22 de octubre de 2026.

- `npm run typecheck`: correcto, sin errores TypeScript.
- `npm run build`: correcto, sin errores ni advertencias del build.
- `npm run verify`: 20 páginas exportadas y 627 enlaces internos, con revisión de anclas, imágenes y jerarquía de encabezado principal.
- Navegador: todas las rutas y los seis perfiles de socias revisados a 375, 390, 430, 768, 1024 y 1440 px. Sin scroll horizontal ni encabezados recortados. La curva del hero se ajustó para permanecer dentro de su contenedor.
- Home: exactamente seis secciones principales. Formación y comunidad se presentan juntas; alianzas y colaboración también. Rubros integrados en Socias.
- Header: cuatro entradas principales; navegación completa disponible en footer y CTAs.
- Directorio: búsqueda con normalización de acentos, filtro, estado vacío y limpieza comprobados.
- Menú móvil: apertura, navegación, cierre, bloqueo del scroll y Escape comprobados. La lógica de contención de foco se conserva.
- Cinco formularios: campos requeridos, foco en el primer error y confirmación de demostración comprobados. No se envían ni guardan datos.
- Consola del navegador: sin errores ni advertencias en las páginas revisadas.
- Logo: archivo original sin modificaciones. SHA-256 `021ACB2CA95D47CDF0F9388C55101D940AC9D502B4C9FF61A4BD14F4619FBB55`.
- Datos, tipos, slugs, utilidades de metadata, sitemap, robots, adaptador de formularios y lógica de búsqueda/filtros: sin modificaciones.

## Pendientes de contenido e integración

Fotografías autorizadas, perfiles reales, datos de contacto, sede, autoridades, fechas, precios y condiciones. Los textos institucionales propuestos y documentos legales siguen pendientes de aprobación. Formularios, mapa y WhatsApp conservan su estado de integración anterior. Los registros de demostración y `[DATO A CONFIRMAR]` permanecen identificados.

Las fotografías principales se configuran en `data/media.ts`; las demás se asignan a sus registros en `data/`. No se emplearon fotografías ilustrativas de la referencia, stock ni imágenes de personas generadas. La versión sigue sin indexación hasta configurar un dominio definitivo.
