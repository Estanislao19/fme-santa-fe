-- Fuente de la migración institucional. Aplicar migrations/202610230002_institutional.sql.
-- Solo tablas nuevas; reutiliza la autorización is_fme_admin() existente.
begin;
create table public.fme_institutional (
  id integer primary key default 1 check(id = 1),
  mission text not null check(length(trim(mission)) between 1 and 16000),
  vision text not null check(length(trim(vision)) between 1 and 16000),
  home_intro text not null check(length(trim(home_intro)) between 1 and 600),
  members_intro text not null check(length(trim(members_intro)) between 1 and 12000),
  community_text text not null check(length(trim(community_text)) between 1 and 30000),
  revision integer not null default 1,
  updated_at timestamptz not null default now()
);
create table public.fme_values (
  id uuid primary key default gen_random_uuid(),
  name text not null check(length(trim(name)) between 1 and 150),
  description text not null check(length(trim(description)) between 1 and 3000),
  sort_order integer not null default 0 check(sort_order between 0 and 100000),
  active boolean not null default true,
  revision integer not null default 1,
  updated_at timestamptz not null default now()
);
alter table public.fme_institutional enable row level security;
alter table public.fme_values enable row level security;
revoke all on public.fme_institutional, public.fme_values from anon, authenticated;
grant select on public.fme_institutional, public.fme_values to anon, authenticated;
grant insert,update on public.fme_institutional, public.fme_values to authenticated;
create policy "public institutional content" on public.fme_institutional for select to anon,authenticated using (true);
create policy "admins insert institutional content" on public.fme_institutional for insert to authenticated with check ((select public.is_fme_admin()));
create policy "admins edit institutional content" on public.fme_institutional for update to authenticated using ((select public.is_fme_admin())) with check ((select public.is_fme_admin()));
create policy "public active institutional values" on public.fme_values for select to anon,authenticated using(active);
create policy "admins read all institutional values" on public.fme_values for select to authenticated using ((select public.is_fme_admin()));
create policy "admins add institutional values" on public.fme_values for insert to authenticated with check ((select public.is_fme_admin()));
create policy "admins edit institutional values" on public.fme_values for update to authenticated using ((select public.is_fme_admin())) with check ((select public.is_fme_admin()));

create function public.fme_institutional_revision() returns trigger language plpgsql set search_path = '' as $$
begin
  new.revision := old.revision + 1;
  new.updated_at := now();
  return new;
end;
$$;
create trigger fme_institutional_touch before update on public.fme_institutional for each row execute function public.fme_institutional_revision();
create trigger fme_value_touch before update on public.fme_values for each row execute function public.fme_institutional_revision();
revoke all on function public.fme_institutional_revision() from public, anon, authenticated;
