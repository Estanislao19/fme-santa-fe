import { test } from "node:test";
import assert from "node:assert/strict";
import { validateRecord, safeLink } from "../lib/admin/validation";
import { slugify } from "../lib/admin/collections";

const member = {kind:"members",slug:"maria-perez",active:true,featured:false,sort_order:0,state:"draft",revision:1,data:{name:"María Pérez",business:"Dulce María",category:"Gastronomía",description:"Descripción autorizada"}};
test("normaliza nombres sin alterar los slugs existentes al editar",()=>{
  assert.equal(slugify(" María Pérez & su emprendimiento "),"maria-perez-su-emprendimiento");
  assert.equal(validateRecord({...member,slug:"enlace-anterior"}).slug,"enlace-anterior");
});
test("rechaza enlaces ejecutables, rutas ambiguas y campos inyectados",()=>{
  for(const url of ["javascript:alert(1)","data:image/svg+xml,x","//evil.test/x","https://user:pass@evil.test","http://example.com"]){assert.equal(safeLink(url),false);assert.throws(()=>validateRecord({...member,data:{...member.data,instagram:url}}));}
  assert.equal(safeLink("/media/demo/socias/foto-demo-01.webp",true),true);
  assert.equal(safeLink("/media/../../private",true),false);
  assert.throws(()=>validateRecord({...member,data:{...member.data,role:"admin"}}));
  assert.throws(()=>validateRecord({...member,role:"admin"}));
});
test("valida publicación, límites, obligatorios y tipos de colección",()=>{
  assert.equal(validateRecord(member).state,"draft");
  assert.throws(()=>validateRecord({...member,state:"public"}));
  assert.throws(()=>validateRecord({...member,sort_order:-1}));
  assert.throws(()=>validateRecord({...member,data:{...member.data,name:" "}}));
  assert.throws(()=>validateRecord({...member,data:{...member.data,gallery:Array(21).fill("https://example.com/foto.webp")}}));
  assert.throws(()=>validateRecord({...member,kind:"admins"}));
});
