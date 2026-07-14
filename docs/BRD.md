# Enterprise BRD — Personal Portfolio Platform

- **Owner:** Tawfiqul Islam
- **Version:** 2.0
- **Project Type:** Portfolio Website with Headless CMS/Admin Panel

## Vision

Build a premium portfolio platform that showcases professional achievements and allows all content to be managed from a secure admin panel without code changes.

## Business Goals

- Professional branding
- Showcase FinTech project case studies
- Improve recruiter experience
- Maintain all content from CMS
- SEO optimized and high performance

## Modules

- Public Website
- Admin Dashboard
- Projects
- Experience
- Skills
- Certifications
- Articles/Blog
- Resume
- Media Library
- SEO Manager
- Contact Inbox
- Site Settings
- Analytics
- Authentication
- Audit Log

## Admin Panel Requirements

- Secure login (Owner/Admin)
- Dashboard with metrics
- CRUD for all content
- Rich text editor
- Image/PDF/video upload
- Draft/Publish workflow
- Preview before publish
- Search/filter
- Backup & restore
- Activity log
- Profile management
- Theme, menu, footer and homepage editor
- SEO fields for every page
- Email notification for contact messages

## Suggested Tech Stack

- Next.js + TypeScript *(BRD said 15; repo uses Next 16.2.10 — build on installed version)*
- Tailwind CSS + shadcn/ui
- Framer Motion
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage
- Prisma ORM
- MDX/Tiptap Editor
- Vercel Deployment
- GitHub Actions CI/CD

## Database Entities

- Users
- Projects
- Experiences
- Skills
- Certifications
- Articles
- Media
- Messages
- SiteSettings
- SEO
- Testimonials
- AuditLogs

## Acceptance Criteria

- Lighthouse >= 95
- Responsive on all devices
- CMS manages 100% website content
- Zero TypeScript/ESLint errors
- Protected admin routes
- Fast image optimization
