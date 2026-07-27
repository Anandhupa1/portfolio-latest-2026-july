-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null,
  company text,
  project_type text,
  source text not null default 'portfolio',
  page_url text,
  user_agent text,
  ip_hash text,
  status text not null default 'new'
);

alter table public.contact_submissions enable row level security;

-- No public policies: inserts go through Next.js using the service role key.
comment on table public.contact_submissions is 'Portfolio contact form submissions';
