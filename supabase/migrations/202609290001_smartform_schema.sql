create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text,
  email text not null,
  plan text not null default 'Free' check (plan in ('Free', 'Starter', 'Professional')),
  credits integer not null default 3 check (credits >= 0),
  credits_remaining integer not null default 3 check (credits_remaining >= 0),
  extractions_remaining integer not null default 5 check (extractions_remaining >= 0),
  pdfs_generated integer not null default 0 check (pdfs_generated >= 0),
  pdf_extractions integer not null default 0 check (pdf_extractions >= 0),
  usage_period_start date not null default date_trunc('month', now())::date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  file_name text not null,
  status text not null default 'processing' check (status in ('processing', 'completed', 'failed')),
  file_url text,
  error_message text,
  created_at timestamptz not null default now()
);

create index if not exists documents_user_created_at_idx
  on public.documents (user_id, created_at desc);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null check (plan in ('Starter', 'Professional')),
  payment_id text unique,
  status text not null default 'pending' check (status in ('pending', 'active', 'failed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists subscriptions_user_created_at_idx
  on public.subscriptions (user_id, created_at desc);

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id, full_name, email)
  values (
    new.id,
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    coalesce(new.email, '')
  )
  on conflict (user_id) do update
  set email = excluded.email,
      full_name = coalesce(public.profiles.full_name, excluded.full_name);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.create_profile_for_new_user();

alter table public.profiles enable row level security;
alter table public.documents enable row level security;
alter table public.subscriptions enable row level security;

grant select on public.profiles to authenticated;
grant select, insert, update, delete on public.documents to authenticated;
grant select on public.subscriptions to authenticated;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can update own name" on public.profiles;
create policy "Users can update own name"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

revoke update on public.profiles from authenticated;
grant update (full_name) on public.profiles to authenticated;

drop policy if exists "Users can read own documents" on public.documents;
create policy "Users can read own documents"
  on public.documents for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create own documents" on public.documents;
create policy "Users can create own documents"
  on public.documents for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own documents" on public.documents;
create policy "Users can update own documents"
  on public.documents for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own documents" on public.documents;
create policy "Users can delete own documents"
  on public.documents for delete to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can read own subscriptions" on public.subscriptions;
create policy "Users can read own subscriptions"
  on public.subscriptions for select to authenticated
  using ((select auth.uid()) = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('smartform-documents', 'smartform-documents', false, 26214400, array['application/pdf'])
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Users can upload own PDF files" on storage.objects;
create policy "Users can upload own PDF files"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'smartform-documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "Users can read own PDF files" on storage.objects;
create policy "Users can read own PDF files"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'smartform-documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "Users can delete own PDF files" on storage.objects;
create policy "Users can delete own PDF files"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'smartform-documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create or replace function public.consume_profile_credit(p_kind text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_profile public.profiles%rowtype;
  monthly_generations integer;
  monthly_extractions integer;
begin
  if auth.uid() is null or p_kind not in ('generation', 'extraction') then
    raise exception 'Not authorized';
  end if;

  select * into current_profile
  from public.profiles
  where user_id = auth.uid()
  for update;

  if not found then
    raise exception 'Profile not found';
  end if;

  monthly_generations := case current_profile.plan
    when 'Professional' then 200
    when 'Starter' then 50
    else 3
  end;
  monthly_extractions := case current_profile.plan
    when 'Professional' then 500
    when 'Starter' then 100
    else 5
  end;

  if current_profile.usage_period_start < date_trunc('month', now())::date then
    update public.profiles
    set credits = monthly_generations,
        credits_remaining = monthly_generations,
        extractions_remaining = monthly_extractions,
        pdfs_generated = 0,
        pdf_extractions = 0,
        usage_period_start = date_trunc('month', now())::date,
        updated_at = now()
    where user_id = auth.uid()
    returning * into current_profile;
  end if;

  if p_kind = 'generation' and current_profile.credits_remaining > 0 then
    update public.profiles
    set credits_remaining = credits_remaining - 1,
        pdfs_generated = pdfs_generated + 1,
        updated_at = now()
    where user_id = auth.uid()
    returning * into current_profile;
  elsif p_kind = 'extraction' and current_profile.extractions_remaining > 0 then
    update public.profiles
    set extractions_remaining = extractions_remaining - 1,
        pdf_extractions = pdf_extractions + 1,
        updated_at = now()
    where user_id = auth.uid()
    returning * into current_profile;
  else
    return jsonb_build_object('allowed', false);
  end if;

  return jsonb_build_object(
    'allowed', true,
    'credits_remaining', current_profile.credits_remaining,
    'extractions_remaining', current_profile.extractions_remaining,
    'pdfs_generated', current_profile.pdfs_generated,
    'pdf_extractions', current_profile.pdf_extractions
  );
end;
$$;

revoke all on function public.consume_profile_credit(text) from public;
grant execute on function public.consume_profile_credit(text) to authenticated;

create or replace function public.activate_subscription_after_payment(
  p_user_id uuid,
  p_plan text,
  p_payment_id text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  generation_limit integer;
  extraction_limit integer;
begin
  if p_user_id is null
     or p_plan not in ('Starter', 'Professional')
     or nullif(trim(p_payment_id), '') is null then
    raise exception 'Invalid subscription activation';
  end if;

  if exists (select 1 from public.subscriptions where payment_id = p_payment_id) then
    return;
  end if;

  generation_limit := case p_plan when 'Professional' then 200 else 50 end;
  extraction_limit := case p_plan when 'Professional' then 500 else 100 end;

  update public.subscriptions
  set status = 'cancelled'
  where user_id = p_user_id and status = 'active';

  insert into public.subscriptions (user_id, plan, payment_id, status)
  values (p_user_id, p_plan, p_payment_id, 'active');

  update public.profiles
  set plan = p_plan,
      credits = generation_limit,
      credits_remaining = generation_limit,
      extractions_remaining = extraction_limit,
      pdfs_generated = 0,
      pdf_extractions = 0,
      usage_period_start = date_trunc('month', now())::date,
      updated_at = now()
  where user_id = p_user_id;

  if not found then
    raise exception 'Profile not found';
  end if;
end;
$$;

revoke all on function public.activate_subscription_after_payment(uuid, text, text) from public;
revoke all on function public.activate_subscription_after_payment(uuid, text, text) from anon, authenticated;
grant execute on function public.activate_subscription_after_payment(uuid, text, text) to service_role;