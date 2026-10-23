import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { validateRecord } from "../lib/admin/validation";

// PostgreSQL real en WASM. El scaffolding representa roles/esquemas provistos por Supabase.
// No reemplaza la prueba final del servicio Auth/Storage remoto.
test("RLS, estados, Storage, alias, concurrencia y seed preservan límites de acceso",async()=>{
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
    for (const r of (await db.query<Record<string,unknown>>(`select id,kind,slug,data,active,featured,sort_order,state,revision from fme_content`)).rows) assert.doesNotThrow(()=>validateRecord(r), "Todos los registros migrados deben poder editarse sin perder campos.");
    await db.exec(`insert into fme_admins(user_id) values('11111111-1111-4111-8111-111111111111');`);
    const rows=await db.query<{id:string;slug:string;revision:number}>(`select id,slug,revision from fme_content where kind='members' order by sort_order`);assert.equal(rows.rows.length,6);const member=rows.rows[0];
    await db.exec(`set role anon;`);
    assert.equal((await db.query(`select * from fme_content`)).rows.length,14);
    assert.equal((await db.query<{allowed:boolean}>(`select is_fme_admin() as allowed`)).rows[0].allowed,false);
    await assert.rejects(db.exec(`insert into fme_content(kind,slug,data) values('members','sin-permiso','{}')`));
    await db.exec(`reset role;set role authenticated;select set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',false);`);
    await assert.rejects(db.exec(`insert into fme_admins(user_id) values('22222222-2222-4222-8222-222222222222')`));
    await assert.rejects(db.exec(`insert into fme_content(kind,slug,data) values('members','sin-permiso','{}')`));
    await assert.rejects(db.exec(`insert into storage.objects(bucket_id,name) values('fme-media','no-permitido.webp')`));
    assert.equal((await db.query(`update fme_content set active=false returning id`)).rows.length,0);
    await db.exec(`select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false);`);
    assert.equal((await db.query<{allowed:boolean}>(`select is_fme_admin() as allowed`)).rows[0].allowed,true);
    await db.exec(`insert into storage.objects(bucket_id,name) values('fme-media','autorizado.webp');`);
    await assert.rejects(db.exec(`insert into storage.objects(bucket_id,name) values('otro-bucket','no.webp')`));
    await db.query(`update fme_content set active=false where id=$1`,[member.id]);
    await db.exec(`reset role;set role anon;select set_config('request.jwt.claim.sub','',false);`);
    assert.equal((await db.query(`select * from fme_content where id=$1`,[member.id])).rows.length,0);
    await db.exec(`reset role;set role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false);`);
    assert.equal((await db.query(`select * from fme_content where id=$1`,[member.id])).rows.length,1);
    const updated=await db.query<{revision:number}>(`update fme_content set active=true,slug='maria-perez' where id=$1 returning revision`,[member.id]);assert.equal(updated.rows[0].revision,3);
    assert.equal((await db.query(`update fme_content set featured=true where id=$1 and revision=1 returning id`,[member.id])).rows.length,0);
    await assert.rejects(db.query(`insert into fme_content(kind,slug,data) values('members',$1,'{}')`,[member.slug]));
    await db.exec(`reset role;set role anon;select set_config('request.jwt.claim.sub','',false);`);
    assert.equal((await db.query(`select * from fme_slug_aliases where slug=$1`,[member.slug])).rows.length,1);
    await db.exec(`reset role;set role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false);`);
    await db.query(`update fme_content set state='draft' where id=$1`,[member.id]);
    await db.exec(`reset role;set role anon;select set_config('request.jwt.claim.sub','',false);`);
    assert.equal((await db.query(`select * from fme_slug_aliases where slug=$1`,[member.slug])).rows.length,0);
    assert.equal((await db.query(`select * from fme_content where id=$1`,[member.id])).rows.length,0);
    await db.exec(`reset role;`);
    await db.exec(readFileSync("supabase/seed.sql","utf8"));
    assert.equal((await db.query(`select * from fme_content`)).rows.length,14);
    assert.equal((await db.query<{slug:string}>(`select slug from fme_content where id=$1`,[member.id])).rows[0].slug,"maria-perez");
    await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false);`);
    await db.query(`delete from fme_content where id=$1`,[member.id]);
    assert.equal((await db.query(`select * from fme_slug_aliases where content_id=$1`,[member.id])).rows.length,0);
    assert.ok((await db.query(`select * from fme_audit_log where operation='DELETE'`)).rows.length>0);
    // Las demás colecciones siguen la misma autorización y publicación, incluidos eventos.
    for (const kind of ['trainings','alliances','collaborators','projects']) {
      const r=await db.query<{id:string}>(`insert into fme_content(kind,slug,data,state) values($1,'prueba-autorizada','{"title":"Prueba","kind":"Evento"}','published') returning id`,[kind]);
      await db.query(`update fme_content set data=data||'{"description":"Cambio guardado"}'::jsonb where id=$1`,[r.rows[0].id]);
      await db.exec(`reset role;set role anon;select set_config('request.jwt.claim.sub','',false);`);
      assert.equal((await db.query<{data:{description:string}}>(`select data from fme_content where id=$1`,[r.rows[0].id])).rows[0].data.description,'Cambio guardado');
      await db.exec(`reset role;set role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false);`);
      await db.query(`update fme_content set state='archived' where id=$1`,[r.rows[0].id]);
      await db.exec(`reset role;set role anon;select set_config('request.jwt.claim.sub','',false);`);
      assert.equal((await db.query(`select * from fme_content where id=$1`,[r.rows[0].id])).rows.length,0);
      await db.exec(`reset role;set role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false);`);
    }
    await db.exec(`reset role;delete from fme_admins where user_id='11111111-1111-4111-8111-111111111111';set role authenticated;`);
    assert.equal((await db.query<{allowed:boolean}>(`select is_fme_admin() as allowed`)).rows[0].allowed,false);
    await assert.rejects(db.exec(`insert into fme_content(kind,slug,data) values('projects','revocado','{}')`));
  } finally { await db.close(); }
});
