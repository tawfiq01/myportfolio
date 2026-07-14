# Implementation Plan — Portfolio Platform

Phased delivery against [BRD.md](./BRD.md). Each phase ships something visible and working.

## Phase 1 — Public Site Foundation ✅ (current)

Goal: a premium, responsive, SEO-ready public website with placeholder content, structured so every piece of content can later come from the CMS.

- Design system: dark premium theme, typography, spacing (Tailwind 4)
- Site shell: header/nav, footer, mobile menu
- Homepage: hero, featured projects, experience timeline, skills, contact CTA
- Content layer: typed content in `lib/content.ts` — single source that Phase 3 swaps for database queries
- SEO: metadata, sitemap, robots
- Zero TS/ESLint errors, clean production build

## Phase 2 — Database + Auth

- Supabase project (needs owner's credentials/keys)
- Prisma schema: Users, Projects, Experiences, Skills, Certifications, Articles, Media, Messages, SiteSettings, SEO, Testimonials, AuditLogs
- Supabase Auth: owner/admin login, protected `/admin` routes (middleware)

## Phase 3 — Public Site on Live Data

- Swap `lib/content.ts` placeholders for database queries
- Project case study pages, blog (MDX rendering), resume page
- Contact form → Messages table + email notification

## Phase 4 — Admin Panel (CMS)

- shadcn/ui admin shell: dashboard with metrics
- CRUD for all entities, Tiptap rich text editor
- Media library (Supabase Storage), image/PDF/video upload
- Draft/Publish workflow + preview
- Search/filter, audit log, profile management
- Theme, menu, footer, homepage editor; per-page SEO fields

## Phase 5 — Polish + Ship

- Analytics, backup/restore
- Lighthouse >= 95 pass, image optimization audit
- Vercel deployment + GitHub Actions CI/CD
