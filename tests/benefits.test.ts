import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {PGlite} from "@electric-sql/pglite";
import {initialBenefits,benefitCategories,membershipBenefits} from "../data/benefits";
import {benefitSchema} from "../lib/admin/benefit-schema";

test("Convenios oficiales: quince registros sin contactos inventados y cuatro áreas institucionales",()=>{
  assert.equal(initialBenefits.length,15);assert.equal(benefitCategories.length,5);assert.equal(membershipBenefits.length,4);
  for(const b of initialBenefits){assert.equal(benefitSchema.safeParse(b).success,true);for(const key of ["logo_url","image_url","website","instagram","whatsapp","address","terms"] as const)assert.equal(b[key],"");}
  for(const patch of [{business_name:""},{category:""},{benefit:""},{website:"javascript:alert(1)"},{instagram:"//evil.test"},{logo_url:"/media/../../private"},{whatsapp:"https://wa.me/123"},{sort_order:-1},{archived:true,active:true},{revision:0},{unexpected:"inject"}])assert.equal(benefitSchema.safeParse({...initialBenefits[0],...patch}).success,false);
});

test("Migración 003 aditiva: RLS, creación, edición, orden, archivo, categorías y seed seguro",async()=>{
  const db=new PGlite();
  try{
    await db.exec(`create role anon;create role authenticated;
      create schema auth;create table auth.users(id uuid primary key);
      create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
      grant usage on schema auth to anon,authenticated;grant execute on function auth.uid() to anon,authenticated;
      create schema storage;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
      create table storage.objects(id uuid default gen_random_uuid(),bucket_id text,name text);alter table storage.objects enable row level security;
      grant usage on schema storage to anon,authenticated;grant all on storage.objects to authenticated;
      insert into auth.users values('11111111-1111-4111-8111-111111111111'),('22222222-2222-4222-8222-222222222222');`);
    await db.exec(readFileSync("supabase/migrations/202610230001_fme_cms.sql","utf8"));
    await db.exec(readFileSync("supabase/seed.sql","utf8"));
    await db.exec(readFileSync("supabase/migrations/202610230002_institutional.sql","utf8"));
    await db.exec(`insert into fme_admins(user_id) values('11111111-1111-4111-8111-111111111111');`);
    const tables=["fme_content","fme_admins","fme_categories","fme_institutional","fme_values"];
    const before=await Promise.all(tables.map(t=>db.query(`select * from ${t} order by 1`)));
    await db.exec(readFileSync("supabase/migrations/202610290003_benefits.sql","utf8"));
    for(let i=0;i<tables.length;i++)assert.deepEqual((await db.query(`select * from ${tables[i]} order by 1`)).rows,before[i].rows,`${tables[i]} permanece intacta`);
    assert.deepEqual((await db.query(`select business_name,category,benefit from fme_benefits order by sort_order`)).rows,initialBenefits.map(({business_name,category,benefit})=>({business_name,category,benefit})));
    await db.exec(`set role anon;`);
    assert.equal((await db.query(`select * from fme_benefits`)).rows.length,15);
    await assert.rejects(db.exec(`insert into fme_benefits(business_name,category,benefit) values('No autorizado','Otros','No')`));
    await assert.rejects(db.exec(`update fme_benefits set active=false`));
    await db.exec(`reset role;set role authenticated;select set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',false);`);
    assert.equal((await db.query(`update fme_benefits set active=false returning id`)).rows.length,0);
    await assert.rejects(db.exec(`insert into fme_benefit_categories(name) values('No autorizada')`));
    await assert.rejects(db.exec(`insert into fme_benefits(business_name,category,benefit) values('No autorizado','Otros','No')`));
    await db.exec(`select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false);`);
    await db.exec(`insert into fme_benefit_categories(name,sort_order) values('Categoría de prueba',100);`);
    const created=(await db.query<{id:string;revision:number}>(`insert into fme_benefits(business_name,category,benefit) values('Prueba local','Otros','Beneficio de prueba') returning id,revision`)).rows[0];
    assert.equal(created.revision,1);
    await db.exec(`reset role;set role anon;select set_config('request.jwt.claim.sub','',false);`);
    assert.equal((await db.query(`select * from fme_benefits where id=$1`,[created.id])).rows.length,0,"Un registro nuevo inactivo no es público");
    await db.exec(`reset role;set role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false);`);
    const edited=(await db.query<{revision:number}>(`update fme_benefits set benefit='Editado',category='Categoría de prueba',active=true,featured=true,sort_order=0,logo_url='https://example.invalid/logo.webp',terms='Condición de prueba' where id=$1 and revision=1 returning revision`,[created.id])).rows[0];
    assert.equal(edited.revision,2);
    assert.equal((await db.query(`update fme_benefits set benefit='Obsoleto' where id=$1 and revision=1 returning id`,[created.id])).rows.length,0);
    await db.query(`update fme_benefits set benefit='Edición conservada',active=false where id=$1`,[initialBenefits[0].id]);
    await db.exec(`reset role;set role anon;select set_config('request.jwt.claim.sub','',false);`);
    const list=(await db.query<{id:string;benefit:string}>(`select id,benefit from fme_benefits order by sort_order,business_name,id`)).rows;
    assert.equal(list[0].id,created.id);assert.equal(list[0].benefit,"Editado");assert.ok(!list.some(b=>b.id===initialBenefits[0].id));
    await db.exec(`reset role;set role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false);`);
    await db.query(`update fme_benefits set archived=true,active=false where id=$1`,[created.id]);
    assert.equal((await db.query<{logo_url:string}>(`select logo_url from fme_benefits where id=$1`,[created.id])).rows[0].logo_url,"https://example.invalid/logo.webp","Archivar conserva también las referencias de imágenes");
    await assert.rejects(db.query(`update fme_benefits set active=true where id=$1`,[created.id]));
    await assert.rejects(db.query(`delete from fme_benefits where id=$1`,[created.id]));
    await db.exec(`reset role;`);
    await db.exec(readFileSync("supabase/benefits-seed.sql","utf8"));
    const preserved=(await db.query<{benefit:string;active:boolean}>(`select benefit,active from fme_benefits where id=$1`,[initialBenefits[0].id])).rows[0];
    assert.deepEqual(preserved,{benefit:"Edición conservada",active:false});assert.equal((await db.query(`select * from fme_benefits`)).rows.length,16);
    await db.exec(`update fme_benefits set active=false;set role anon;`);
    assert.equal((await db.query(`select * from fme_benefits`)).rows.length,0,"Una lista vacía no debe resucitar el seed");
    await db.exec(`reset role;delete from fme_admins;set role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false);`);
    assert.equal((await db.query(`update fme_benefits set active=true where archived=false returning id`)).rows.length,0,"Revocar administradora corta el acceso");
  }finally{await db.close();}
});
