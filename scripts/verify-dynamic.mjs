import assert from "node:assert/strict";
const origin=process.env.FME_VERIFY_URL||"http://127.0.0.1:3003";
const queue=["/"];const checked=new Map();const links=[];const images=new Set();
while(queue.length){
  const path=queue.shift();if(checked.has(path))continue;
  const response=await fetch(new URL(path,origin));assert.equal(response.status,200,`${path}: HTTP ${response.status}`);
  const html=(await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,"");checked.set(path,html);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${path}: h1`);
  if(path==="/")assert.equal((html.match(/<section[ >]/g)||[]).length,6,"La Home debe conservar seis momentos.");
  for(const[,raw]of html.matchAll(/href="([^"]+)"/g)){
    const url=new URL(raw.replaceAll("&amp;","&"),new URL(path,origin));if(url.origin!==origin||url.pathname.startsWith("/_next/")||/\.(png|webp|ico|css|woff2)$/.test(url.pathname))continue;
    links.push({from:path,to:url.pathname,hash:url.hash});
    if(!checked.has(url.pathname)&&!queue.includes(url.pathname))queue.push(url.pathname);
  }
  for(const[,src]of html.matchAll(/<img[^>]*src="([^"]+)"/g))if(src.startsWith("/"))images.add(src);
  assert.ok(checked.size<100,"Demasiadas rutas inesperadas.");
}
for(const l of links)if(l.hash)assert.ok(checked.get(l.to)?.includes(`id="${decodeURIComponent(l.hash.slice(1))}"`),`${l.from}: ancla ausente ${l.to}${l.hash}`);
for(const src of images)assert.equal((await fetch(new URL(src,origin),{method:"HEAD"})).status,200,`Imagen ausente: ${src}`);
for(const path of ["/admin/","/admin/socias/","/admin/socias/nuevo/","/admin/capacitaciones/","/admin/alianzas/","/admin/colaboradores/","/admin/proyectos/","/admin/configuracion/","/admin/imagenes/","/admin/beneficios/","/admin/beneficios/nuevo/","/admin/beneficios/00000000-0000-4000-8000-000000000001/"]){
 const r=await fetch(new URL(path,origin),{redirect:"manual"});assert.ok([307,308].includes(r.status),`${path}: debe exigir login`);assert.match(r.headers.get("location")||"",/\/admin\/login\/?$/);assert.match(r.headers.get("cache-control")||"",/no-store/);
}
const login=await fetch(new URL("/admin/login/",origin));assert.equal(login.status,200);assert.match(await login.text(),/noindex/);
const upload=await fetch(new URL("/api/admin/media/",origin),{method:"POST"});assert.equal(upload.status,401,"Upload anónimo bloqueado");
assert.match(upload.headers.get("cache-control")||"",/no-store/);
const renewal=await fetch(new URL("/api/admin/session/?next=https://example.invalid",origin),{redirect:"manual"});
assert.equal(renewal.status,303);assert.equal(new URL(renewal.headers.get("location"),origin).pathname,"/admin/login/");
assert.match(renewal.headers.get("cache-control")||"",/no-store/);
for(const path of ["/socias/no-existe/","/capacitaciones/no-existe/"])assert.equal((await fetch(new URL(path,origin))).status,404,path);
console.log(`Verificación dinámica correcta: ${checked.size} páginas públicas, ${links.length} enlaces/anclas, ${images.size} imágenes, 12 rutas privadas, login y upload anónimo bloqueado.`);
