-- Run in Supabase: SQL Editor > New query > paste > Run.

-- Profiles: one row per user, created automatically at sign-up.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  bio text,
  avatar_url text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "read own profile" on public.profiles for select using (auth.uid() = id);
create policy "update own profile" on public.profiles for update using (auth.uid() = id);

create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name) values (new.id, split_part(new.email, '@', 1));
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Portfolio projects: visitors can read published ones. Add rows yourself in the dashboard.
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  url text,
  tags text[] not null default '{}',
  published boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.projects enable row level security;
create policy "read published projects" on public.projects for select using (published);

-- Contact requests: anyone can send one, nobody can read them through the public API.
create table public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null check (char_length(message) <= 2000),
  created_at timestamptz not null default now()
);
alter table public.contact_requests enable row level security;
create policy "anyone can send a request" on public.contact_requests for insert with check (true);
