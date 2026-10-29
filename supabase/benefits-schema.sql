-- Fuente del generador. Ejecutar únicamente la migración completa 202610290003_benefits.sql.
begin;
create table public.fme_benefit_categories (
  name text primary key check(length(trim(name)) between 1 and 100),
  sort_order integer not null default 0 check(sort_order between 0 and 100000)
);
create table public.fme_benefits (
  id uuid primary key default gen_random_uuid(),
  business_name text not null check(length(trim(business_name)) between 1 and 200),
  category text not null references public.fme_benefit_categories(name),
  benefit text not null check(length(trim(benefit)) between 1 and 2000),
  description text not null default '' check(length(description)<=12000),
  logo_url text not null default '' check(length(logo_url)<=2000 and (logo_url='' or logo_url ~ '^https://' or logo_url ~ '^/(images|media)/')),
  image_url text not null default '' check(length(image_url)<=2000 and (image_url='' or image_url ~ '^https://' or image_url ~ '^/(images|media)/')),
  instagram text not null default '' check(length(instagram)<=2000 and (instagram='' or instagram ~ '^https://')),
  website text not null default '' check(length(website)<=2000 and (website='' or website ~ '^https://')),
  whatsapp text not null default '' check(whatsapp='' or whatsapp ~ '^\+?[0-9 ()-]{6,40}$'),
  address text not null default '' check(length(address)<=1000),
  terms text not null default '' check(length(terms)<=12000),
  active boolean not null default false,
  archived boolean not null default false,
  featured boolean not null default false,
  sort_order integer not null default 0 check(sort_order between 0 and 100000),
  revision integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check(not(archived and active))
);
create index fme_benefits_public_order on public.fme_benefits(sort_order,business_name,id) where active and not archived;
alter table public.fme_benefit_categories enable row level security;
alter table public.fme_benefits enable row level security;
revoke all on public.fme_benefit_categories,public.fme_benefits from public,anon,authenticated;
grant select on public.fme_benefit_categories,public.fme_benefits to anon,authenticated;
grant insert,update on public.fme_benefits to authenticated;
grant insert on public.fme_benefit_categories to authenticated;
create policy "benefit categories readable" on public.fme_benefit_categories for select to anon,authenticated using(true);
create policy "admins add benefit categories" on public.fme_benefit_categories for insert to authenticated with check((select public.is_fme_admin()));
create policy "active benefits public" on public.fme_benefits for select to anon,authenticated using(active and not archived);
create policy "admins read benefits" on public.fme_benefits for select to authenticated using((select public.is_fme_admin()));
create policy "admins create benefits" on public.fme_benefits for insert to authenticated with check((select public.is_fme_admin()));
create policy "admins update benefits" on public.fme_benefits for update to authenticated using((select public.is_fme_admin())) with check((select public.is_fme_admin()));
create function public.fme_benefit_revision() returns trigger language plpgsql set search_path='' as $$
begin
  new.revision := old.revision+1;
  new.created_at := old.created_at;
  new.updated_at := now();
  return new;
end;
$$;
create trigger fme_benefits_touch before update on public.fme_benefits for each row execute function public.fme_benefit_revision();
revoke all on function public.fme_benefit_revision() from public,anon,authenticated;
