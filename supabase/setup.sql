create extension if not exists pgcrypto;
create extension if not exists moddatetime schema extensions;

create table if not exists public.site_settings (
  id integer primary key,
  hall_name text not null default 'Diamond Banquet Hall',
  contact_number text not null default '9947681202',
  instagram_handle text not null default '@diamondhallallapra',
  google_maps_link text not null default 'https://maps.app.goo.gl/vZWrqc6f6b9hvNj88'
);

alter table if exists public.site_settings
  add column if not exists whatsapp_number text,
  add column if not exists is_hall_open boolean not null default true,
  add column if not exists hall_price integer not null default 30000,
  add column if not exists room_price integer not null default 1500,
  add column if not exists hall_price_4hrs numeric default 30000,
  add column if not exists room_price_night numeric default 1500,
  add column if not exists room_count integer not null default 4,
  add column if not exists location_label text not null default 'Allapra, Perumbavoor',
  add column if not exists address_line_1 text not null default 'First Floor, Diamond Arcade, Allapra P.O,',
  add column if not exists address_line_2 text not null default 'Perumbavoor, Ernakulam, Kerala 683556',
  add column if not exists map_label text not null default 'Diamond Arcade, Allapra P.O, Perumbavoor',
  add column if not exists inquiry_hours text not null default 'Open for inquiries 9 AM – 9 PM, all days',
  add column if not exists seo_description text default 'Luxury AC banquet hall in Allapra, Perumbavoor.',
  add column if not exists seo_keywords text default 'banquet hall perumbavoor, wedding hall allapra';

insert into public.site_settings (
  id,
  hall_name,
  contact_number,
  instagram_handle,
  google_maps_link,
  whatsapp_number,
  hall_price,
  room_price,
  room_count,
  location_label,
  address_line_1,
  address_line_2,
  map_label,
  inquiry_hours
)
values (
  1,
  'Diamond Banquet Hall',
  '9947681202',
  '@diamondhallallapra',
  'https://maps.app.goo.gl/vZWrqc6f6b9hvNj88',
  '919947681202',
  30000,
  1500,
  4,
  'Allapra, Perumbavoor',
  'First Floor, Diamond Arcade, Allapra P.O,',
  'Perumbavoor, Ernakulam, Kerala 683556',
  'Diamond Arcade, Allapra P.O, Perumbavoor',
  'Open for inquiries 9 AM – 9 PM, all days'
)
on conflict (id) do nothing;

update public.site_settings
set
  hall_name = coalesce(hall_name, 'Diamond Banquet Hall'),
  contact_number = coalesce(contact_number, '9947681202'),
  instagram_handle = coalesce(instagram_handle, '@diamondhallallapra'),
  google_maps_link = coalesce(google_maps_link, 'https://maps.app.goo.gl/vZWrqc6f6b9hvNj88'),
  whatsapp_number = coalesce(whatsapp_number, '919947681202'),
  is_hall_open = coalesce(is_hall_open, true),
  hall_price = coalesce(hall_price, 30000),
  room_price = coalesce(room_price, 1500),
  hall_price_4hrs = coalesce(hall_price_4hrs, hall_price, 30000),
  room_price_night = coalesce(room_price_night, room_price, 1500),
  room_count = coalesce(room_count, 4),
  location_label = coalesce(location_label, 'Allapra, Perumbavoor'),
  address_line_1 = coalesce(address_line_1, 'First Floor, Diamond Arcade, Allapra P.O,'),
  address_line_2 = coalesce(address_line_2, 'Perumbavoor, Ernakulam, Kerala 683556'),
  map_label = coalesce(map_label, 'Diamond Arcade, Allapra P.O, Perumbavoor'),
  inquiry_hours = coalesce(inquiry_hours, 'Open for inquiries 9 AM – 9 PM, all days'),
  seo_description = coalesce(seo_description, 'Luxury AC banquet hall in Allapra, Perumbavoor.'),
  seo_keywords = coalesce(seo_keywords, 'banquet hall perumbavoor, wedding hall allapra')
where id = 1;

create table if not exists public.admin_users (
  email text primary key,
  role text not null default 'staff_admin',
  created_at timestamptz not null default now()
);

update public.admin_users
set role = case
  when role in ('owner', 'admin', 'super_admin') then 'super_admin'
  when role in ('staff', 'staff_admin') then 'staff_admin'
  else 'staff_admin'
end;

update public.admin_users
set email = btrim(email)
where email is distinct from btrim(email);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'admin_users_role_check'
      and conrelid = 'public.admin_users'::regclass
  ) then
    alter table public.admin_users
      add constraint admin_users_role_check
      check (role in ('super_admin', 'staff_admin'))
      not valid;

    alter table public.admin_users
      validate constraint admin_users_role_check;
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_indexes
    where schemaname = 'public'
      and indexname = 'admin_users_email_ci_key'
  ) then
    if exists (
      select 1
      from (
        select lower(btrim(email))
        from public.admin_users
        group by lower(btrim(email))
        having count(*) > 1
      ) as duplicate_emails
    ) then
      raise notice 'Skipping admin_users_email_ci_key because duplicate case-insensitive admin emails already exist.';
    else
      create unique index admin_users_email_ci_key
      on public.admin_users (lower(btrim(email)));
    end if;
  end if;
end
$$;

insert into public.admin_users (email, role)
values
  ('judah@diamond.com', 'super_admin'),
  ('empl@diamond.com', 'staff_admin')
on conflict (email) do update
set role = excluded.role;

create or replace function public.is_admin_user(check_email text default null)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where lower(btrim(email)) = lower(btrim(coalesce(check_email, auth.jwt() ->> 'email')))
  );
$$;

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

grant execute on function public.is_admin_user(text) to anon, authenticated;
grant execute on function public.current_admin_role(text) to anon, authenticated;
grant execute on function public.is_super_admin(text) to anon, authenticated;

do $$
begin
  if exists (
    select 1
    from information_schema.tables
    where table_schema = 'public'
      and table_name = 'bookings'
  )
  and exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'bookings'
      and column_name = 'booked_date'
  )
  and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'bookings'
      and column_name = 'customer_name'
  )
  and not exists (
    select 1
    from information_schema.tables
    where table_schema = 'public'
      and table_name = 'bookings_legacy'
  ) then
    alter table public.bookings rename to bookings_legacy;
  end if;
end
$$;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text,
  event_date date not null,
  guest_count integer,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_status_check'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_status_check
      check (status in ('pending', 'confirmed', 'cancelled'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_guest_count_check'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_guest_count_check
      check (guest_count is null or guest_count > 0);
  end if;
end
$$;

create index if not exists bookings_event_date_idx
on public.bookings (event_date asc);

create index if not exists bookings_status_event_date_idx
on public.bookings (status, event_date asc);

create index if not exists bookings_created_at_idx
on public.bookings (created_at desc);

create unique index if not exists bookings_one_confirmed_per_date_idx
on public.bookings (event_date)
where status = 'confirmed';

do $$
begin
  if exists (
    select 1
    from information_schema.tables
    where table_schema = 'public'
      and table_name = 'bookings_legacy'
  ) then
    insert into public.bookings (
      customer_name,
      customer_email,
      event_date,
      guest_count,
      status,
      created_at
    )
    select
      'Migrated legacy booking',
      null,
      legacy.booked_date,
      null,
      'confirmed',
      coalesce(legacy.created_at, now())
    from (
      select distinct on (booked_date)
        booked_date,
        created_at
      from public.bookings_legacy
      where status = 'booked'
      order by booked_date, created_at asc nulls last
    ) as legacy
    where not exists (
      select 1
      from public.bookings current_bookings
      where current_bookings.event_date = legacy.booked_date
        and current_bookings.status = 'confirmed'
    );
  end if;
end
$$;

create or replace function public.enforce_booking_status_rules()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.customer_name is null or btrim(new.customer_name) = '' then
    raise exception 'Customer name is required.';
  end if;

  if new.guest_count is not null and new.guest_count < 1 then
    raise exception 'Guest count must be at least 1.';
  end if;

  if new.status = 'pending'
    and exists (
      select 1
      from public.bookings existing
      where existing.event_date = new.event_date
        and existing.status = 'confirmed'
        and existing.id <> coalesce(new.id, '00000000-0000-0000-0000-000000000000'::uuid)
    ) then
    raise exception 'This date is no longer available.';
  end if;

  if new.status = 'confirmed'
    and exists (
      select 1
      from public.bookings existing
      where existing.event_date = new.event_date
        and existing.status = 'confirmed'
        and existing.id <> coalesce(new.id, '00000000-0000-0000-0000-000000000000'::uuid)
    ) then
    raise exception 'A confirmed booking already exists for this date.';
  end if;

  return new;
end;
$$;

drop trigger if exists enforce_booking_status_rules on public.bookings;

create trigger enforce_booking_status_rules
before insert or update on public.bookings
for each row
execute function public.enforce_booking_status_rules();

create or replace function public.get_public_booked_dates(
  p_start_date date default null,
  p_end_date date default null
)
returns table (event_date date)
language sql
stable
security definer
set search_path = public
as $$
  select bookings.event_date
  from public.bookings
  where bookings.status = 'confirmed'
    and (p_start_date is null or bookings.event_date >= p_start_date)
    and (p_end_date is null or bookings.event_date <= p_end_date)
  order by bookings.event_date asc;
$$;

grant execute on function public.get_public_booked_dates(date, date) to anon, authenticated;

create or replace function public.create_booking_request(
  p_booking_id uuid,
  p_customer_name text,
  p_customer_email text,
  p_customer_phone text,
  p_event_date date,
  p_guest_count integer,
  p_organisation text default null,
  p_event_type text default 'Other',
  p_notes text default null,
  p_enquiry_message text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_booking_id uuid := coalesce(p_booking_id, gen_random_uuid());
  v_customer_name text := btrim(coalesce(p_customer_name, ''));
  v_customer_email text := nullif(btrim(coalesce(p_customer_email, '')), '');
  v_customer_phone text := regexp_replace(coalesce(p_customer_phone, ''), '\D', '', 'g');
  v_organisation text := nullif(btrim(coalesce(p_organisation, '')), '');
  v_event_type text := coalesce(nullif(btrim(coalesce(p_event_type, '')), ''), 'Other');
  v_notes text := nullif(btrim(coalesce(p_notes, '')), '');
  v_enquiry_message text := nullif(btrim(coalesce(p_enquiry_message, '')), '');
begin
  if v_customer_name = '' then
    raise exception 'Please enter your name.';
  end if;

  if p_event_date is null then
    raise exception 'Please choose a valid booking date.';
  end if;

  if p_guest_count is null or p_guest_count < 1 then
    raise exception 'Guest count must be at least 1.';
  end if;

  if v_customer_phone = '' or length(v_customer_phone) not in (10, 12) then
    raise exception 'Please enter a valid phone number.';
  end if;

  insert into public.bookings (
    id,
    customer_name,
    customer_email,
    event_date,
    guest_count,
    status
  )
  values (
    v_booking_id,
    v_customer_name,
    v_customer_email,
    p_event_date,
    p_guest_count,
    'pending'
  );

  insert into public.booking_requests (
    booking_id,
    event_date,
    start_time,
    end_time,
    customer_name,
    customer_phone,
    customer_email,
    organisation,
    event_type,
    attendee_count,
    notes,
    status
  )
  values (
    v_booking_id,
    p_event_date,
    '06:00',
    '12:00',
    v_customer_name,
    v_customer_phone,
    v_customer_email,
    v_organisation,
    v_event_type,
    p_guest_count,
    v_notes,
    'pending'
  );

  insert into public.enquiries (
    customer_name,
    customer_phone,
    event_date,
    message,
    status
  )
  values (
    v_customer_name,
    v_customer_phone,
    p_event_date,
    v_enquiry_message,
    'new'
  );

  return jsonb_build_object(
    'id', v_booking_id,
    'event_date', to_char(p_event_date, 'YYYY-MM-DD'),
    'status', 'pending'
  );
end;
$$;

grant execute on function public.create_booking_request(uuid, text, text, text, date, integer, text, text, text, text)
to anon, authenticated;

create table if not exists public.reviews (
  id bigint generated by default as identity primary key,
  name text not null,
  reviewer_name text,
  event_type text not null,
  date_label text not null,
  event_date text,
  review_text text not null,
  is_visible boolean default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table if exists public.reviews
  add column if not exists reviewer_name text,
  add column if not exists event_date text,
  add column if not exists is_visible boolean default true,
  add column if not exists updated_at timestamptz not null default timezone('utc', now());

update public.reviews
set
  reviewer_name = coalesce(reviewer_name, name),
  event_date = coalesce(event_date, date_label),
  is_visible = coalesce(is_visible, true),
  updated_at = coalesce(updated_at, created_at, timezone('utc', now()));

insert into public.reviews (name, event_type, date_label, review_text)
select seed.name, seed.event_type, seed.date_label, seed.review_text
from (
  values
    ('Rajan & Priya', 'Wedding', 'March 2025', 'The hall was stunning and the staff were so helpful throughout. Our wedding day was perfect. Highly recommend Diamond Banquet Hall to everyone in Perumbavoor.'),
    ('Suresh Nair', 'Reception', 'January 2025', 'Excellent venue, very well maintained and spacious. The valet parking was smooth and all our guests were impressed. Will definitely book again.'),
    ('Anjali Thomas', 'Engagement', 'November 2024', 'Beautiful hall, affordable price, and wonderful service. The rooms were clean and comfortable for our out-of-town guests. Truly a premium experience.'),
    ('Mohammed Rashid', 'Birthday Celebration', 'October 2024', 'Booked for my daughter''s birthday. The team was cooperative and flexible. Decor came out beautifully in this space. Very happy with the overall experience.'),
    ('Lekha & Arun', 'Wedding', 'September 2024', 'From the first enquiry to the final day, everything was seamless. The hall looked absolutely royal. Our guests could not stop complimenting the venue.')
) as seed(name, event_type, date_label, review_text)
where not exists (
  select 1
  from public.reviews existing
  where existing.name = seed.name
    and existing.event_type = seed.event_type
    and existing.date_label = seed.date_label
    and existing.review_text = seed.review_text
);

drop trigger if exists handle_reviews_updated_at on public.reviews;

create trigger handle_reviews_updated_at
before update on public.reviews
for each row
execute procedure extensions.moddatetime(updated_at);

create table if not exists public.enquiries (
  id bigint generated by default as identity primary key,
  customer_name text not null,
  customer_phone text not null,
  event_date date,
  message text,
  status text default 'new' check (status in ('new', 'contacted', 'booked', 'cancelled')),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.booking_requests (
  id bigint generated by default as identity primary key,
  booking_id uuid,
  event_date date not null,
  start_time time not null,
  end_time time not null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  organisation text,
  event_type text not null,
  attendee_count integer not null,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'booked', 'cancelled')),
  created_at timestamptz not null default timezone('utc', now())
);

alter table if exists public.booking_requests
  add column if not exists booking_id uuid;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'booking_requests_booking_id_fkey'
      and conrelid = 'public.booking_requests'::regclass
  ) then
    alter table public.booking_requests
      add constraint booking_requests_booking_id_fkey
      foreign key (booking_id)
      references public.bookings(id)
      on delete cascade;
  end if;
end
$$;

create unique index if not exists booking_requests_booking_id_key
on public.booking_requests (booking_id)
where booking_id is not null;

do $$
declare
  request_row record;
  v_booking_id uuid;
  v_status text;
begin
  if exists (
    select 1
    from information_schema.tables
    where table_schema = 'public'
      and table_name = 'booking_requests'
  ) then
    for request_row in
      select
        booking_requests.id,
        booking_requests.booking_id,
        booking_requests.event_date,
        booking_requests.customer_name,
        booking_requests.customer_email,
        booking_requests.attendee_count,
        booking_requests.status,
        booking_requests.created_at
      from public.booking_requests
      left join public.bookings
        on public.bookings.id = public.booking_requests.booking_id
      where public.booking_requests.booking_id is null
         or public.bookings.id is null
      order by public.booking_requests.created_at asc nulls last, public.booking_requests.id asc
    loop
      v_status := case
        when request_row.status = 'booked' then 'confirmed'
        when request_row.status = 'cancelled' then 'cancelled'
        else 'pending'
      end;

      if v_status = 'confirmed'
        and exists (
          select 1
          from public.bookings existing
          where existing.event_date = request_row.event_date
            and existing.status = 'confirmed'
        ) then
        v_status := 'cancelled';
      end if;

      insert into public.bookings (
        customer_name,
        customer_email,
        event_date,
        guest_count,
        status,
        created_at
      )
      values (
        coalesce(nullif(btrim(coalesce(request_row.customer_name, '')), ''), 'Unknown customer'),
        nullif(btrim(coalesce(request_row.customer_email, '')), ''),
        request_row.event_date,
        request_row.attendee_count,
        v_status,
        coalesce(request_row.created_at, now())
      )
      returning public.bookings.id into v_booking_id;

      update public.booking_requests
      set booking_id = v_booking_id
      where public.booking_requests.id = request_row.id;
    end loop;
  end if;
end
$$;

create or replace function public.enforce_booking_admin_write_rules()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text := public.current_admin_role();
begin
  if tg_op <> 'UPDATE' then
    return new;
  end if;

  if auth.role() = 'authenticated' and public.is_admin_user() and v_role = 'staff_admin' then
    if new.id is distinct from old.id
      or new.created_at is distinct from old.created_at
      or new.customer_name is distinct from old.customer_name
      or coalesce(new.customer_email, '') is distinct from coalesce(old.customer_email, '') then
      raise exception 'Staff admins cannot edit protected customer fields.';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists enforce_booking_admin_write_rules on public.bookings;

create trigger enforce_booking_admin_write_rules
before update on public.bookings
for each row
execute function public.enforce_booking_admin_write_rules();

create or replace function public.sync_booking_request_from_booking()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.booking_requests
  set
    customer_name = new.customer_name,
    customer_email = new.customer_email,
    event_date = new.event_date,
    attendee_count = coalesce(new.guest_count, attendee_count),
    status = case
      when new.status = 'confirmed' then 'booked'
      when new.status = 'cancelled' then 'cancelled'
      else 'pending'
    end
  where public.booking_requests.booking_id = new.id;

  return new;
end;
$$;

drop trigger if exists sync_booking_request_from_booking on public.bookings;

create trigger sync_booking_request_from_booking
after update on public.bookings
for each row
execute function public.sync_booking_request_from_booking();

create or replace function public.enforce_site_settings_write_rules()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text := public.current_admin_role();
begin
  if tg_op <> 'UPDATE' then
    return new;
  end if;

  if auth.role() = 'authenticated' and public.is_admin_user() and v_role = 'staff_admin' then
    if new.id is distinct from old.id
      or new.hall_name is distinct from old.hall_name
      or new.contact_number is distinct from old.contact_number
      or new.instagram_handle is distinct from old.instagram_handle
      or new.google_maps_link is distinct from old.google_maps_link
      or coalesce(new.whatsapp_number, '') is distinct from coalesce(old.whatsapp_number, '')
      or new.is_hall_open is distinct from old.is_hall_open
      or new.location_label is distinct from old.location_label
      or new.address_line_1 is distinct from old.address_line_1
      or new.address_line_2 is distinct from old.address_line_2
      or new.map_label is distinct from old.map_label
      or new.inquiry_hours is distinct from old.inquiry_hours
      or coalesce(new.seo_description, '') is distinct from coalesce(old.seo_description, '')
      or coalesce(new.seo_keywords, '') is distinct from coalesce(old.seo_keywords, '') then
      raise exception 'Staff admins can update pricing only.';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists enforce_site_settings_write_rules on public.site_settings;

create trigger enforce_site_settings_write_rules
before update on public.site_settings
for each row
execute function public.enforce_site_settings_write_rules();

drop function if exists public.confirm_booking(uuid, boolean);
drop function if exists public.admin_save_booking(bigint, text, text, date, integer, text, boolean);
drop function if exists public.admin_save_booking(uuid, text, text, date, integer, text, boolean);

create or replace function public.admin_save_booking(
  p_booking_id uuid,
  p_customer_name text default null,
  p_customer_email text default null,
  p_event_date date default null,
  p_guest_count integer default null,
  p_status text default null,
  p_override_conflict boolean default false
)
returns public.bookings
language plpgsql
security definer
set search_path = public
as $$
declare
  v_existing public.bookings%rowtype;
  v_conflict public.bookings%rowtype;
  v_customer_name text;
  v_customer_email text;
  v_event_date date;
  v_guest_count integer;
  v_status text;
  v_result public.bookings%rowtype;
begin
  if auth.role() <> 'authenticated' or not public.is_admin_user() then
    raise exception 'Access denied.';
  end if;

  select *
  into v_existing
  from public.bookings
  where public.bookings.id = p_booking_id
  for update;

  if not found then
    raise exception 'Booking not found.';
  end if;

  v_customer_name := coalesce(nullif(btrim(coalesce(p_customer_name, '')), ''), v_existing.customer_name);
  v_customer_email := case
    when p_customer_email is null then v_existing.customer_email
    else nullif(lower(btrim(p_customer_email)), '')
  end;
  v_event_date := coalesce(p_event_date, v_existing.event_date);
  v_guest_count := coalesce(p_guest_count, v_existing.guest_count);
  v_status := case
    when p_status is null or btrim(p_status) = '' then v_existing.status
    else lower(btrim(p_status))
  end;

  if v_customer_name is null or v_customer_name = '' then
    raise exception 'Customer name is required.';
  end if;

  if v_event_date is null then
    raise exception 'Event date is required.';
  end if;

  if v_guest_count is not null and v_guest_count < 1 then
    raise exception 'Guest count must be at least 1.';
  end if;

  if v_status not in ('pending', 'confirmed', 'cancelled') then
    raise exception 'Booking status is invalid.';
  end if;

  if v_status = 'confirmed' then
    select *
    into v_conflict
    from public.bookings
    where public.bookings.id <> p_booking_id
      and public.bookings.event_date = v_event_date
      and public.bookings.status = 'confirmed'
    limit 1
    for update;

    if found then
      if not coalesce(p_override_conflict, false) then
        raise exception 'A confirmed booking already exists for this date.';
      end if;

      if not public.is_super_admin() then
        raise exception 'Only the super admin can override booking conflicts.';
      end if;

      update public.bookings
      set status = 'cancelled'
      where public.bookings.id = v_conflict.id;
    end if;
  end if;

  update public.bookings
  set
    event_date = v_event_date,
    customer_name = v_customer_name,
    customer_email = v_customer_email,
    guest_count = v_guest_count,
    status = v_status
  where public.bookings.id = p_booking_id
  returning * into v_result;

  return v_result;
end;
$$;

create or replace function public.confirm_booking(
  p_booking_id uuid,
  p_override_conflict boolean default false
)
returns public.bookings
language sql
security definer
set search_path = public
as $$
  select *
  from public.admin_save_booking(
    p_booking_id,
    null,
    null,
    null,
    null,
    'confirmed',
    p_override_conflict
  );
$$;

grant execute on function public.admin_save_booking(uuid, text, text, date, integer, text, boolean)
to authenticated;

grant execute on function public.confirm_booking(uuid, boolean)
to authenticated;

alter table public.admin_users enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_requests enable row level security;
alter table public.enquiries enable row level security;
alter table public.reviews enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Authenticated users can view their own admin record" on public.admin_users;
create policy "Authenticated users can view their own admin record"
on public.admin_users
for select
to authenticated
using (lower(email) = lower(auth.jwt() ->> 'email'));

drop policy if exists "Public create pending bookings" on public.bookings;
create policy "Public create pending bookings"
on public.bookings
for insert
to anon, authenticated
with check (status = 'pending');

drop policy if exists "Admins can view bookings" on public.bookings;
create policy "Admins can view bookings"
on public.bookings
for select
to authenticated
using (public.is_admin_user());

drop policy if exists "Admins can update bookings" on public.bookings;
create policy "Admins can update bookings"
on public.bookings
for update
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Admins can delete bookings" on public.bookings;
create policy "Admins can delete bookings"
on public.bookings
for delete
to authenticated
using (public.is_super_admin());

drop policy if exists "Public read site settings" on public.site_settings;
create policy "Public read site settings"
on public.site_settings
for select
to anon, authenticated
using (true);

drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings"
on public.site_settings
for update
to authenticated
using (public.is_admin_user() and id = 1)
with check (public.is_admin_user() and id = 1);

drop policy if exists "Public read reviews" on public.reviews;
create policy "Public read reviews"
on public.reviews
for select
to anon, authenticated
using (is_visible is distinct from false);

drop policy if exists "Admins manage reviews" on public.reviews;
create policy "Admins manage reviews"
on public.reviews
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Public can submit enquiries" on public.enquiries;
create policy "Public can submit enquiries"
on public.enquiries
for insert
to anon, authenticated
with check (status = 'new');

drop policy if exists "Admins manage enquiries" on public.enquiries;
create policy "Admins manage enquiries"
on public.enquiries
for all
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

drop policy if exists "Public submit booking requests" on public.booking_requests;
create policy "Public submit booking requests"
on public.booking_requests
for insert
to anon, authenticated
with check (status = 'pending');

drop policy if exists "Admins manage booking requests" on public.booking_requests;
create policy "Admins manage booking requests"
on public.booking_requests
for all
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

do $$
begin
  begin
    alter publication supabase_realtime add table public.bookings;
  exception
    when duplicate_object then null;
    when undefined_object then null;
  end;

  begin
    alter publication supabase_realtime add table public.reviews;
  exception
    when duplicate_object then null;
    when undefined_object then null;
  end;

  begin
    alter publication supabase_realtime add table public.site_settings;
  exception
    when duplicate_object then null;
    when undefined_object then null;
  end;

  begin
    alter publication supabase_realtime add table public.enquiries;
  exception
    when duplicate_object then null;
    when undefined_object then null;
  end;
end
$$;
