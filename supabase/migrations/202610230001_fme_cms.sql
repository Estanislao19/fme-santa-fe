begin;

create table public.fme_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.fme_admins enable row level security;
revoke all on public.fme_admins from anon, authenticated;
grant select on public.fme_admins to authenticated;
create policy "admins see own membership" on public.fme_admins for select to authenticated using (user_id = (select auth.uid()));

create function public.is_fme_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.fme_admins where user_id = (select auth.uid()));
$$;
revoke all on function public.is_fme_admin() from public;
grant execute on function public.is_fme_admin() to anon, authenticated;

-- Documentos tipados por colección; el sobre controla publicación, orden y concurrencia.
create table public.fme_content (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('members','trainings','alliances','collaborators','projects')),
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug) <= 100),
  data jsonb not null check (jsonb_typeof(data) = 'object' and octet_length(data::text) <= 200000),
  active boolean not null default true,
  featured boolean not null default false,
  sort_order integer not null default 0 check (sort_order between 0 and 100000),
  state text not null default 'draft' check (state in ('draft','published','archived')),
  revision integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(kind, slug)
);
create index fme_public_content on public.fme_content(kind, sort_order) where state = 'published' and active;
alter table public.fme_content enable row level security;
grant select on public.fme_content to anon, authenticated;
grant insert, update, delete on public.fme_content to authenticated;
create policy "published active content only" on public.fme_content for select to anon, authenticated using (state = 'published' and active);
create policy "authorized admins manage content" on public.fme_content for all to authenticated using ((select public.is_fme_admin())) with check ((select public.is_fme_admin()));

create table public.fme_categories (
  id uuid primary key default gen_random_uuid(), name text not null unique check(length(trim(name)) between 1 and 100),
  sort_order integer not null default 0 check(sort_order >= 0)
);
create unique index fme_categories_unique_name on public.fme_categories(lower(name));
alter table public.fme_categories enable row level security;
grant select on public.fme_categories to anon, authenticated;
grant insert, update, delete on public.fme_categories to authenticated;
create policy "public categories" on public.fme_categories for select using (true);
create policy "admins manage categories" on public.fme_categories for all to authenticated using ((select public.is_fme_admin())) with check ((select public.is_fme_admin()));

create table public.fme_slug_aliases (
  kind text not null, slug text not null, content_id uuid not null references public.fme_content(id) on delete cascade,
  primary key(kind, slug)
);
alter table public.fme_slug_aliases enable row level security;
grant select on public.fme_slug_aliases to anon, authenticated;
create policy "public aliases only for visible records" on public.fme_slug_aliases for select using (
  exists(select 1 from public.fme_content c where c.id = content_id and c.state = 'published' and c.active)
  or (select public.is_fme_admin())
);

create table public.fme_audit_log (
  id bigint generated always as identity primary key,
  actor uuid references auth.users(id) on delete set null,
  content_id uuid, kind text not null, operation text not null,
  created_at timestamptz not null default now()
);
alter table public.fme_audit_log enable row level security;
grant select on public.fme_audit_log to authenticated;
create policy "admins read audit" on public.fme_audit_log for select to authenticated using ((select public.is_fme_admin()));

create function public.fme_content_before_write() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if exists(select 1 from public.fme_slug_aliases a where a.kind = new.kind and a.slug = new.slug and a.content_id <> new.id) then
    raise unique_violation using message = 'Slug reservado por un enlace anterior';
  end if;
  if TG_OP = 'UPDATE' then
    if new.kind <> old.kind then raise exception 'No se puede cambiar la colección'; end if;
    if new.slug <> old.slug then
      insert into public.fme_slug_aliases(kind,slug,content_id) values(old.kind,old.slug,old.id)
      on conflict(kind,slug) do nothing;
    end if;
    new.revision := old.revision + 1;
    new.updated_at := now();
    new.created_at := old.created_at;
  else
    new.revision := 1;
  end if;
  return new;
end;
$$;
create trigger fme_content_version before insert or update on public.fme_content for each row execute function public.fme_content_before_write();

create function public.fme_content_audit() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if TG_OP = 'DELETE' then
    insert into public.fme_audit_log(actor,content_id,kind,operation) values(auth.uid(),old.id,old.kind,TG_OP);
    return old;
  end if;
  insert into public.fme_audit_log(actor,content_id,kind,operation) values(auth.uid(),new.id,new.kind,TG_OP);
  return new;
end;
$$;
create trigger fme_content_audit after insert or update or delete on public.fme_content for each row execute function public.fme_content_audit();
revoke all on function public.fme_content_before_write(), public.fme_content_audit() from public, anon, authenticated;

-- Solo imágenes destinadas al sitio público. No subir documentos ni datos privados.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('fme-media','fme-media',true,3145728,array['image/webp','image/jpeg','image/png','image/avif'])
on conflict(id) do nothing;
create policy "admin uploads FME media" on storage.objects for insert to authenticated
with check (bucket_id = 'fme-media' and (select public.is_fme_admin()));
create policy "admin reads FME media" on storage.objects for select to authenticated
using (bucket_id = 'fme-media' and (select public.is_fme_admin()));
create policy "admin updates FME media" on storage.objects for update to authenticated
using (bucket_id = 'fme-media' and (select public.is_fme_admin())) with check (bucket_id = 'fme-media' and (select public.is_fme_admin()));
create policy "admin deletes FME media" on storage.objects for delete to authenticated
using (bucket_id = 'fme-media' and (select public.is_fme_admin()));

commit;
