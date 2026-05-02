create extension if not exists "pgcrypto";

create table if not exists public.stores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  store_name text not null,
  category text not null,
  location text not null,
  main_menu text not null,
  average_order_price text not null,
  delivery_apps text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.diagnoses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  store_id uuid not null references public.stores(id) on delete cascade,
  input_data jsonb not null,
  ai_result jsonb not null,
  overall_score integer not null check (overall_score between 0 and 100),
  created_at timestamptz not null default now()
);

create index if not exists stores_user_id_idx on public.stores(user_id);
create index if not exists diagnoses_user_id_idx on public.diagnoses(user_id);
create index if not exists diagnoses_store_id_idx on public.diagnoses(store_id);
create index if not exists diagnoses_created_at_idx on public.diagnoses(created_at desc);

alter table public.stores enable row level security;
alter table public.diagnoses enable row level security;

create policy "Users can view own stores"
on public.stores
for select
using (auth.uid() = user_id);

create policy "Users can insert own stores"
on public.stores
for insert
with check (auth.uid() = user_id);

create policy "Users can update own stores"
on public.stores
for update
using (auth.uid() = user_id);

create policy "Users can delete own stores"
on public.stores
for delete
using (auth.uid() = user_id);

create policy "Users can view own diagnoses"
on public.diagnoses
for select
using (auth.uid() = user_id);

create policy "Users can insert own diagnoses"
on public.diagnoses
for insert
with check (auth.uid() = user_id);

create policy "Users can update own diagnoses"
on public.diagnoses
for update
using (auth.uid() = user_id);

create policy "Users can delete own diagnoses"
on public.diagnoses
for delete
using (auth.uid() = user_id);
