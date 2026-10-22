# FME v4 · Femenina editorial

Se actualizó el proyecto existente, sin crear otro sitio ni cambiar su arquitectura o estructura de datos.

## Dirección visual

La referencia https://peaceful-lebkuchen-3a3176.netlify.app/ se revisó visualmente en navegador antes de implementar. Se retomaron la serif editorial con cursivas, el marfil cálido, el petróleo, los recortes fotográficos curvos, las líneas delicadas y los bloques amplios. No se copió su código ni se reutilizaron sus fotografías ilustrativas.

Playfair Display se combina con Manrope y se sirve localmente mediante `next/font`. El logo original permanece intacto. No se añadieron fotos de stock, personas inventadas, testimonios ni información institucional sin confirmar.

## Home: seis momentos

1. Hero: «Juntas, hacemos florecer ideas.»; dos accesos a comunidad y Nosotras.
2. Quiénes somos: una presentación breve con fotografía y enlace a la historia. Misión, visión y valores completos siguen en Nosotras.
3. Socias: tres perfiles destacados, con rubros integrados como navegación sencilla. El directorio y todos los perfiles siguen disponibles.
4. Formación y comunidad: una sola capacitación destacada junto al contexto de pertenencia. Incluye accesos a inscripción, agenda y comunidad.
5. Alianzas y colaboración: caso real de Autoescuela Movify, con accesos a empresa aliada, colaboración y voluntariado. Las condiciones no confirmadas se mantienen en la página interna.
6. Cierre: «Lo que viene, lo hacemos juntas.» y sus dos CTAs.

Se retiraron como bloques independientes la franja de conceptos, Comunidad y las formas de colaborar. Sus ideas y enlaces se integraron en los seis momentos; no se eliminaron páginas ni funciones.

## Archivos de implementación modificados

- `sections/Home.tsx`: composición y textos breves de los seis momentos.
- `app/globals.css`: lenguaje editorial, curvas, grillas, formularios, fichas y responsive de todo el sitio.
- `app/layout.tsx`: familias tipográficas; metadata intacta.
- `components/Header.tsx`: cuatro entradas principales y CTA. Mismo comportamiento accesible del menú móvil.
- `components/MemberCard.tsx`: ficha ligera; la descripción ampliada se consulta en el perfil.
- `components/Institutional.tsx`: cierre compartido y su texto.
- `app/socias/[slug]/page.tsx`: nombre de la emprendedora al frente, emprendimiento y relato personal. Conserva metadata, galerías y contactos.
- `app/nosotras/page.tsx`: agrupación visual más compacta de sus apartados.

Se actualizaron también `README.md` y `VERIFICACION.md` para documentar la entrega.

## Funcionalidad conservada

Rutas y slugs, datos locales y tipos, búsqueda y filtros, enlaces por rubro, perfiles, próximas capacitaciones y memoria, detalles e inscripción, cinco formularios, validaciones y confirmación de demostración, contacto, voluntariado, colaboración, proyectos, alianzas, colaboradores, SEO, sitemap y robots.

Los formularios continúan sin enviar ni guardar datos. Los contenidos DEMO y `[DATO A CONFIRMAR]` se conservan.

## ZIP

`FME-v4-femenina-editorial.zip` contiene el código, assets, configuración, lockfile y documentación. No incluye `node_modules`, `.next`, `.git` ni el build regenerable `out/`. Para ejecutarlo: `npm install`, `npm run dev`; para producción: `npm run typecheck` y `npm run build`.
