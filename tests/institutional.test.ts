import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { officialInstitutional, officialValues } from "../data/institutional";
import { institutionalSchema, institutionalValueSchema, paragraphs } from "../lib/admin/institutional-schema";

test("Contenido institucional: validación y párrafos sin interpretar HTML",()=>{
  assert.equal(institutionalSchema.parse({...officialInstitutional,revision:1}).mission,officialInstitutional.mission);
  for(const override of [{mission:" "},{home_intro:"a".repeat(601)},{revision:-1},{extra:"x"}]) assert.equal(institutionalSchema.safeParse({...officialInstitutional,revision:1,...override}).success,false);
  assert.equal(institutionalValueSchema.safeParse(officialValues[0]).success,true);
  for(const override of [{name:""},{description:""},{sort_order:-1},{sort_order:1.5},{active:"true"},{id:"no-es-uuid"}]) assert.equal(institutionalValueSchema.safeParse({...officialValues[0],...override}).success,false);
  assert.equal(paragraphs(officialInstitutional.community_text).length,5);
  assert.deepEqual(paragraphs("Primer párrafo\r\n\r\nSegundo"),["Primer párrafo","Segundo"]);
});

test("Migración aditiva: seed oficial, RLS, edición pública, orden, inactivos y concurrencia",async()=>{
  const db=new PGlite();
  try {
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
    await db.exec(`insert into fme_admins(user_id) values('11111111-1111-4111-8111-111111111111');`);
    const before=await db.query(`select * from fme_content order by id`);
    await db.exec(readFileSync("supabase/migrations/202610230002_institutional.sql","utf8"));
    assert.deepEqual((await db.query(`select * from fme_content order by id`)).rows,before.rows,"No se modifica ningún registro existente");
    assert.equal((await db.query(`select * from fme_categories`)).rows.length,9);
    await db.exec(`set role anon;`);
    assert.equal((await db.query<{mission:string}>(`select mission from fme_institutional`)).rows[0].mission,officialInstitutional.mission);
    assert.deepEqual((await db.query(`select name,description from fme_values order by sort_order`)).rows,officialValues.map(({name,description})=>({name,description})));
    await assert.rejects(db.exec(`update fme_institutional set mission='No permitido'`));
    await assert.rejects(db.exec(`insert into fme_values(name,description) values('No','No')`));
    await db.exec(`reset role;set role authenticated;select set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',false);`);
    assert.equal((await db.query(`update fme_institutional set mission='No permitido' returning id`)).rows.length,0);
    assert.equal((await db.query(`update fme_values set active=false returning id`)).rows.length,0);
    await assert.rejects(db.exec(`insert into fme_values(name,description) values('No','No')`));
    await db.exec(`select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false);`);
    const mission=officialInstitutional.mission+"\nPrueba temporal de edición.";
    assert.equal((await db.query<{revision:number}>(`update fme_institutional set mission=$1 where id=1 and revision=1 returning revision`,[mission])).rows[0].revision,2);
    assert.equal((await db.query(`update fme_institutional set mission='Edición obsoleta' where revision=1 returning id`)).rows.length,0);
    const value=officialValues[9];
    await db.query(`update fme_values set description='Edición temporal',sort_order=0 where id=$1 and revision=1`,[value.id]);
    await db.query(`update fme_values set active=false where id=$1`,[officialValues[0].id]);
    await db.exec(`reset role;set role anon;select set_config('request.jwt.claim.sub','',false);`);
    assert.equal((await db.query<{mission:string}>(`select mission from fme_institutional`)).rows[0].mission,mission);
    const publicValues=(await db.query<{id:string;description:string}>(`select id,description from fme_values order by sort_order,name,id`)).rows;
    assert.equal(publicValues.length,9);assert.equal(publicValues[0].id,value.id);assert.equal(publicValues[0].description,"Edición temporal");
    assert.ok(!publicValues.some(v=>v.id===officialValues[0].id));
    await db.exec(`reset role;`);
    await db.exec(readFileSync("supabase/institutional-seed.sql","utf8"));
    assert.equal((await db.query<{mission:string}>(`select mission from fme_institutional`)).rows[0].mission,mission,"El seed no sobrescribe una misión editada");
    assert.equal((await db.query<{active:boolean}>(`select active from fme_values where id=$1`,[officialValues[0].id])).rows[0].active,false);
    await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false);`);
    await db.exec(`update fme_values set active=false;`);
    assert.equal((await db.query(`select * from fme_values`)).rows.length,10,"Admin conserva todos los valores inactivos");
    await assert.rejects(db.exec(`delete from fme_values`));
    await db.exec(`reset role;set role anon;select set_config('request.jwt.claim.sub','',false);`);
    assert.equal((await db.query(`select * from fme_values`)).rows.length,0,"No reaparecen valores desactivados");
    await db.exec(`reset role;delete from fme_admins;set role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false);`);
    assert.equal((await db.query(`update fme_institutional set mission='Cuenta revocada' returning id`)).rows.length,0);
  } finally {await db.close();}
});
