# Verificación de la primera versión

- `npm install`: completado; auditoría sin vulnerabilidades reportadas.
- `npm run build`: completado sin errores ni advertencias en el build final.
- `npm run typecheck`: TypeScript sin errores.
- `npm run verify`: auditoría de 20 páginas exportadas, 695 enlaces internos, anclas, imágenes y encabezados.
- Navegador: portada, directorio, páginas institucionales, perfiles y capacitaciones revisados a 375, 390, 430, 768, 1024 y 1440 px; sin desbordamiento horizontal observado.
- Directorio: filtro por rubro, búsqueda, estado vacío y limpieza comprobados; los enlaces de rubros de portada preseleccionan la categoría.
- Menú móvil: apertura, navegación y cierre comprobados. Incluye Escape, foco visible, bloqueo del scroll y contención del foco.
- Cinco formularios: validación y confirmación de demostración comprobadas. Primer campo inválido recibe el foco. Sin integración de envío; controles deshabilitados hasta que se hidrata React para impedir envíos HTML nativos accidentales.
- Logo: SHA-256 idéntico al archivo original `021ACB2CA95D47CDF0F9388C55101D940AC9D502B4C9FF61A4BD14F4619FBB55`.

## Pendientes de contenido e integración

Fotografías autorizadas, perfiles reales, datos de contacto, sede, autoridades, fechas, precios y condiciones. Formularios, mapa y WhatsApp necesitan sus datos o integración definitiva. Misión, visión y documentos legales se presentan como propuestas pendientes de validación. El sitio no recibe pagos ni envía información personal. La versión permanece sin indexación hasta configurar un dominio definitivo.

Las fotografías de portada se configuran en `data/media.ts`. Las demás fotografías pertenecen a sus registros en `data/`. Los placeholders no representan fotografías de actividades realizadas.
