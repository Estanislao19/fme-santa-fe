import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { createChunks, stringToBase64URL, type CookieOptions } from "@supabase/ssr";
import { readSessionCookie, readOnlyClient, adminReturnPath, sessionCookiesToClear } from "../lib/supabase/session";
import { cookieClient } from "../lib/supabase/cookie-client";
import { verifyAdmin } from "../lib/admin/access";

const url="https://fme-auth-test.supabase.co",key="public-test-key";
const cookieName="sb-fme-auth-test-auth-token";
const adminId="11111111-1111-4111-8111-111111111111";
const ordinaryId="22222222-2222-4222-8222-222222222222";
const jwt=(id:string,exp:number)=>`${Buffer.from('{"alg":"HS256","typ":"JWT"}').toString("base64url")}.${Buffer.from(JSON.stringify({sub:id,exp,role:"authenticated"})).toString("base64url")}.test-signature`;
const user=(id:string)=>({id,aud:"authenticated",role:"authenticated",email:"test@example.invalid",app_metadata:{},user_metadata:{},created_at:"2026-01-01T00:00:00Z"});
const encoded=(data:unknown)=>"base64-"+stringToBase64URL(JSON.stringify(data));

test("No quedan entradas Proxy/Middleware y los retornos de sesión no permiten redirects externos",()=>{
  for(const prefix of ["","src/"]) for(const name of ["proxy","middleware"]) for(const ext of ["ts","js","tsx","jsx","mjs"]) assert.equal(existsSync(`${prefix}${name}.${ext}`),false);
  for(const path of [null,"https://evil.test","//evil.test","/admin/../public","/admin/%2f%2fevil.test","/admin/login/","/admin/\\evil.test","/admin/?next=//evil.test"]){assert.equal(adminReturnPath(path),"/admin/");}
  assert.equal(adminReturnPath("/admin/configuracion/"),"/admin/configuracion/");
});

test("Lee cookies Supabase por fragmentos; la fecha solo decide renovación y no autentica",async()=>{
  const now=Date.now(),token=jwt(adminId,Math.floor(now/1000)+3600);
  const cookies=createChunks(cookieName,encoded({access_token:token,refresh_token:"test-refresh",user:{...user(ordinaryId),role:"fake-admin"}}),100);
  assert.ok(cookies.length>1);
  assert.deepEqual(await readSessionCookie(url,cookies,now),{accessToken:token,needsRefresh:false});
  assert.equal((await readSessionCookie(url,[{name:cookieName,value:encoded({access_token:jwt(adminId,0)})}],now))?.needsRefresh,true);
  assert.equal(await readSessionCookie(url,[{name:cookieName,value:"corrupta"}]),null);
  assert.equal(await readSessionCookie(url,[]),null);
  assert.equal(await readSessionCookie(url,[{name:"sb-otro-auth-token",value:cookies[0].value}]),null);
  assert.deepEqual(sessionCookiesToClear(url,[...cookies,{name:"sb-otro-auth-token",value:"otra-sesion"},{name:cookieName+"-code-verifier",value:"verifier"}]),cookies.map(c=>c.name),"Limpia también fragmentos corruptos, sin eliminar cookies ajenas");
});

test("Auth/RPC con HTTP controlado: admite admin y rechaza usuario común y JWT falso",async()=>{
  const original=globalThis.fetch;const calls:string[]=[];
  const good=jwt(adminId,Math.floor(Date.now()/1000)+3600),ordinary=jwt(ordinaryId,Math.floor(Date.now()/1000)+3600);
  globalThis.fetch=async(input,init)=>{
    const target=String(input),auth=new Headers(init?.headers).get("authorization");calls.push(target);
    assert.equal(init?.cache,"no-store");
    if(target.endsWith("/auth/v1/user")) return auth===`Bearer ${good}`||auth===`Bearer ${ordinary}` ? Response.json(user(auth===`Bearer ${good}`?adminId:ordinaryId)) : Response.json({message:"Invalid JWT",code:"bad_jwt"},{status:401});
    if(target.endsWith("/rest/v1/rpc/is_fme_admin"))return Response.json(auth===`Bearer ${good}`);
    throw new Error("Solicitud inesperada");
  };
  try {
    const allowed=await verifyAdmin(readOnlyClient(url,key,good),good);
    assert.equal(allowed.status,"authorized");if(allowed.status==="authorized")assert.equal(allowed.user.id,adminId);
    assert.equal((await verifyAdmin(readOnlyClient(url,key,ordinary),ordinary)).status,"forbidden");
    assert.equal((await verifyAdmin(readOnlyClient(url,key,"forged"),"forged")).status,"anonymous");
    assert.ok(calls.every(c=>!c.includes("/token")),"Los renders no renuevan ni consumen refresh tokens");
  }finally{globalThis.fetch=original;}
});

test("SDK Supabase: login, renovación y logout persisten cookies HttpOnly sin Proxy",async()=>{
  const original=globalThis.fetch;const jar=new Map<string,string>();const writes:CookieOptions[]=[];const calls:string[]=[];
  const seconds=Math.floor(Date.now()/1000),fresh=jwt(adminId,seconds+3600),expired=jwt(adminId,seconds-100);
  const session=(token:string)=>({access_token:token,refresh_token:"test-refresh",expires_in:3600,token_type:"bearer",user:user(adminId)});
  globalThis.fetch=async(input,init)=>{
    const target=String(input);calls.push(target);
    if(target.includes("/token?grant_type=password")) return Response.json(session(fresh));
    if(target.includes("/token?grant_type=refresh_token")) return Response.json({...session(fresh),refresh_token:"rotated-test-refresh"});
    if(target.endsWith("/user")) return Response.json(user(adminId));
    if(target.endsWith("/rest/v1/rpc/is_fme_admin")) return Response.json(true);
    if(target.includes("/logout?scope=local"))return new Response(null,{status:204});
    throw new Error("Solicitud inesperada");
  };
  const adapter={getAll:()=>[...jar].map(([name,value])=>({name,value})),setAll:(items:{name:string;value:string;options:CookieOptions}[])=>{for(const item of items){writes.push(item.options);if(item.value)jar.set(item.name,item.value);else jar.delete(item.name);}}};
  try {
    const login=cookieClient({url,key},adapter);
    assert.equal((await login.auth.signInWithPassword({email:"test@example.invalid",password:"local-test-only"})).error,null);
    assert.equal((await readSessionCookie(url,adapter.getAll()))?.accessToken,fresh);
    assert.ok(writes.length>0);assert.ok(writes.every(o=>o.httpOnly===true&&o.sameSite==="lax"&&o.path==="/"));
    jar.clear();for(const cookie of createChunks(cookieName,encoded({...session(expired),expires_at:seconds-100})))jar.set(cookie.name,cookie.value);
    assert.equal((await readSessionCookie(url,adapter.getAll()))?.needsRefresh,true);
    const refreshed=cookieClient({url,key},adapter);
    assert.equal((await verifyAdmin(refreshed)).status,"authorized");
    assert.ok(calls.some(c=>c.includes("grant_type=refresh_token")));
    assert.equal((await readSessionCookie(url,adapter.getAll()))?.accessToken,fresh);
    assert.equal((await readSessionCookie(url,adapter.getAll()))?.needsRefresh,false);
    assert.equal((await refreshed.auth.signOut({scope:"local"})).error,null);
    assert.equal(await readSessionCookie(url,adapter.getAll()),null);
    assert.ok(calls.some(c=>c.includes("/logout?scope=local")));
  }finally{globalThis.fetch=original;}
});
