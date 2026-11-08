# Solcode

Portfolio and business site of **Mehrnoosh**, freelance web developer.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Supabase (PostgreSQL + Auth) · deployed on Vercel.

## Run it locally
Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```
The landing page works without Supabase. Sign-up and profiles need it:

1. Create a project at [supabase.com](https://supabase.com) (pick an EU region, for GDPR).
2. SQL Editor: paste and run `supabase/schema.sql`.
3. Project Settings > API: copy the project URL and the **anon public** key into `.env.local`.
4. Authentication > URL Configuration: set Site URL to `http://localhost:3000` and add `http://localhost:3000/auth/callback` to Redirect URLs (add your real domain later).

> The repository is public. Never commit `.env.local` or the Supabase `service_role` key. Only the anon key belongs in this app.

## Deploy
Import the GitHub repo on [vercel.com](https://vercel.com), add the three environment variables, set `NEXT_PUBLIC_SITE_URL` to your domain, and add the production URL to the Supabase redirect list.

## SEO checklist
- [x] Server-rendered pages, metadata, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt`
- [ ] Register the site in Google Search Console and submit the sitemap
- [ ] Replace placeholder text and projects with real content
- [ ] Add a blog and case studies, a Portuguese version (`hreflang`), a Google Business Profile
- [ ] Check Core Web Vitals with PageSpeed Insights

## Roadmap
- [x] Landing page, sign-up, login, profile
- [ ] Projects pages (from the `projects` table), blog, contact form (`contact_requests`)
- [ ] Profile pictures (Supabase Storage), cookie banner and privacy policy, admin area

## Structure
`app/` pages and routes · `components/` UI pieces · `lib/supabase/` Supabase clients · `middleware.ts` protects `/profile` · `supabase/schema.sql` database
