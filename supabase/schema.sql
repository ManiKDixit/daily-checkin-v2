create extension if not exists "pgcrypto";

create table if not exists public.subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  name       text,
  token      uuid unique not null default gen_random_uuid(),
  subscribed boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.checkins (
  id            uuid primary key default gen_random_uuid(),
  subscriber_id uuid references public.subscribers(id) on delete cascade,
  mood          text,
  feeling_text  text,
  gratitude     text,
  intention     text,
  completed_at  timestamptz default now()
);

alter table public.subscribers enable row level security;
alter table public.checkins    enable row level security;

create policy "service role full access subscribers"
  on public.subscribers for all using (true) with check (true);

create policy "service role full access checkins"
  on public.checkins for all using (true) with check (true);
