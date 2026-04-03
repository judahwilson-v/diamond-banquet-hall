create table if not exists public.admin_users (
  email text primary key,
  role text not null default 'staff_admin',
  created_at timestamptz not null default now()
);

create or replace function public.current_admin_role(check_email text default null)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select public.admin_users.role
  from public.admin_users
  where lower(btrim(public.admin_users.email)) = lower(btrim(coalesce(check_email, auth.jwt() ->> 'email')))
  limit 1;
$$;

create or replace function public.is_super_admin(check_email text default null)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_admin_role(check_email) = 'super_admin';
$$;

grant execute on function public.current_admin_role(text) to anon, authenticated;
grant execute on function public.is_super_admin(text) to anon, authenticated;

insert into storage.buckets (id, name, public)
values ('venue-images', 'venue-images', false)
on conflict (id) do nothing;

drop policy if exists "Public read venue gallery images" on storage.objects;
create policy "Public read venue gallery images"
on storage.objects
for select
to public
using (bucket_id = 'venue-images');

drop policy if exists "Super admins upload venue gallery images" on storage.objects;
create policy "Super admins upload venue gallery images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'venue-images'
  and public.is_super_admin(auth.jwt() ->> 'email')
);

drop policy if exists "Super admins update venue gallery images" on storage.objects;
create policy "Super admins update venue gallery images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'venue-images'
  and public.is_super_admin(auth.jwt() ->> 'email')
)
with check (
  bucket_id = 'venue-images'
  and public.is_super_admin(auth.jwt() ->> 'email')
);

drop policy if exists "Super admins delete venue gallery images" on storage.objects;
create policy "Super admins delete venue gallery images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'venue-images'
  and public.is_super_admin(auth.jwt() ->> 'email')
);
