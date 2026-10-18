-- SHAHI AGRO FARM starter schema
-- Run in Supabase SQL Editor after creating a new project.
-- IMPORTANT: Admin users must be explicitly added to public.admin_users by a trusted project owner.
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  customer_name text not null,
  phone text not null,
  address text not null,
  area text not null,
  payment_method text not null check (payment_method in ('cod','bkash','nagad','upay','rocket')),
  transaction_id text,
  payment_status text not null default 'cash_on_delivery'
    check (payment_status in ('cash_on_delivery','awaiting_verification','paid','failed','refunded')),
  note text,
  items jsonb not null,
  subtotal numeric(12,2) not null check (subtotal >= 0),
  delivery_fee numeric(12,2) not null check (delivery_fee >= 0),
  total numeric(12,2) not null check (total >= 0),
  status text not null default 'pending'
    check (status in ('pending','confirmed','processing','dispatched','delivered','cancelled')),
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.orders enable row level security;

-- Anonymous customers can submit orders. They can only see orders they created
-- if you later add a customer auth/user_id column and matching policies.
-- Public tracking should ideally use a server/Edge Function that verifies a
-- reference plus phone rather than exposing the entire orders table.
create policy "Public can create orders"
on public.orders for insert
to anon, authenticated
with check (
  length(customer_name) between 1 and 120
  and length(phone) between 6 and 30
  and length(address) between 5 and 500
  and subtotal >= 0 and delivery_fee >= 0 and total = subtotal + delivery_fee
);

create policy "Admins can read all orders"
on public.orders for select
to authenticated
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

create policy "Admins can update orders"
on public.orders for update
to authenticated
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

create policy "Admins can read their own admin record"
on public.admin_users for select
to authenticated
using (user_id = auth.uid());

-- To grant admin access after creating the user in Supabase Authentication:
-- insert into public.admin_users (user_id) values ('PASTE-AUTH-USER-UUID-HERE');
-- Do not enable public select access to orders; public tracking needs a secure RPC/Edge Function.
