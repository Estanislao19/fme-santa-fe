import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, join, relative } from "node:path";
const root = resolve("out");
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? files(join(dir, entry.name))
      : [join(dir, entry.name)],
  );
}
const pages = files(root).filter(
  (file) =>
    file.endsWith(".html") &&
    !file.endsWith("404.html") &&
    !file.includes("_not-found"),
);
const failures = [];
let links = 0;
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  if ((html.match(/<h1[ >]/g) || []).length !== 1)
    failures.push(`${relative(root, page)}: debe tener un solo h1`);
  const base = `https://check.local/${relative(root, page)
    .replaceAll("\\", "/")
    .replace(/index\.html$/, "")}`;
  for (const [, raw] of html.matchAll(/href="([^"]+)"/g)) {
    const url = new URL(raw.replaceAll("&amp;", "&"), base);
    if (url.origin !== "https://check.local") continue;
    links++;
    const pathname = decodeURIComponent(url.pathname).replace(/^\//, "");
    const target = join(
      root,
      pathname.endsWith("/") ? `${pathname}index.html` : pathname,
    );
    const actual = existsSync(target)
      ? target
      : join(root, pathname, "index.html");
    if (!existsSync(actual)) {
      failures.push(`${relative(root, page)}: destino ausente ${raw}`);
      continue;
    }
    if (url.hash && actual.endsWith(".html")) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (!readFileSync(actual, "utf8").includes(`id="${id}"`))
        failures.push(`${relative(root, page)}: ancla ausente ${raw}`);
    }
  }
  for (const [, src] of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    if (
      src.startsWith("/") &&
      !existsSync(join(root, decodeURIComponent(src.slice(1))))
    )
      failures.push(`${relative(root, page)}: imagen ausente ${src}`);
  }
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(
  `Verificación correcta: ${pages.length} páginas, ${links} enlaces internos y sus anclas, imágenes y encabezados.`,
);
