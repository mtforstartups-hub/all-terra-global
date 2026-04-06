# gemini.md — All-Terra Global

> Gemini-specific context, behavioral guidelines, and coding conventions for this project.
> Read this before every session. It supplements `AGENTS.md`.

---

## Project Identity

**All-Terra Global** is a premium investor platform for a private credit financing firm operating in Africa (primarily Zimbabwe). The product serves accredited investors who register, sign an NDA, and then gain access to a gated dashboard showing deal information.

The brand is professional, corporate, and premium — every UI change should reflect that.

---

## First-Principles for Every Task

1. **Read before you write.** Always inspect the relevant file(s) before editing — never assume structure.
2. **Respect the monolith.** This is a full-stack Next.js app. Changes to one layer (auth, DB, email) ripple across servers and the client.
3. **Prefer small, targeted edits.** Avoid whole-file rewrites unless explicitly asked.
4. **Use `bun`, not `npm` or `yarn`** — the lockfile is `bun.lock`.
5. **TypeScript is strict.** Eliminate type errors before presenting a solution.
6. **Embrace your capabilities.** If you need to search or view files before taking action, do so. Use the tools available to you.
7. **No unused imports.** Always clean up and remove any unused imports in files you edit.

---

## Where Things Live (Quick Reference)

| What you need                     | Where to look                                       |
|-----------------------------------|-----------------------------------------------------|
| Auth config (better-auth)         | `lib/auth.ts`                                       |
| Auth client (browser)             | `lib/auth-client.ts`                                |
| Server-side session guard         | `lib/session.ts` → `requireUser()`                 |
| All email templates               | `lib/email-templates.ts`                            |
| Global design tokens + utilities  | `app/globals.css`                                   |
| Root layout (fonts, providers)    | `app/layout.tsx`                                    |
| Public pages layout               | `app/(main)/layout.tsx`                             |
| Dashboard layout (auth-guarded)   | `app/(dashboard)/layout.tsx`                        |
| Contact form + NDA sign actions   | `app/actions.ts`                                    |
| Per-feature server actions        | `app/actions/opportunities.ts`, `pdfSign.ts`, `profile.ts` |
| Dashboard UI components           | `components/dashboard/`                             |
| Homepage section components       | `components/homepage/`                              |
| Shared UI (PageHero, AuthModal)   | `components/shared/`                                |
| Auth modal state                  | `context/AuthModalContext.tsx`                      |
| Sidebar collapse state            | `stores/SidebarStore.ts`                            |
| DB migration script               | `scripts/migrate.ts`                                |

---

## Coding Conventions

### TypeScript
- Target `strict` mode in `tsconfig.json`.
- **Never use `any`**. Always create proper interfaces and types.
- Use explicit return types on server actions and API route handlers.
- Use `z.infer<typeof schema>` for form/input types — do not hand-write Zod output types.

### Server Actions
- While handling forms, prefer server actions with `useActionState` over fully controlled React forms.

```ts
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

const schema = z.object({ /* ... */ });

export async function myAction(_state: unknown, formData: FormData) {
  const result = schema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { success: false, message: result.error.issues[0]?.message };
  }
  // ... DB / email / etc.
  revalidatePath("/your-path");
  return { success: true, message: "Done." };
}
```

### React Components
- Default to **React Server Components** (RSC). Only add `"use client"` when you need hooks, browser APIs, or event handlers.
- Use `lucide-react` for every icon. No heroicons or react-icons.
- New files: `.tsx` only. Legacy `.jsx` files exist — do not create new `.jsx` files.
- When you need to name a component, do **not** append version numbers (no `ComponentV2.tsx`). Edit in place or replace.

### Styling
- Tailwind CSS v4. Use the design tokens from `@theme inline` in `globals.css`.
- Use utility classes as the default. Reserve `@layer components` for genuinely reusable, multi-element patterns.
- Dashboard-scoped styles live in `components/dashboard/Dashboard.css` — add dashboard-only rules there, not in `globals.css`.
- Do **not** introduce CSS Modules or styled-components.

### Animation
- **GSAP** — scroll-triggered, timeline animations, complex sequences.
- **Framer Motion (`motion`)** — component-level mount/unmount transitions.
- Keep animations subtle and professional; this is a finance platform, not a portfolio site.

---

## Authentication Rules

- **Never bypass `requireUser()`** in dashboard routes or any protected Server Component.
- **Never hardcode credentials or emails** — all sensitive values should be accessed through `env.ts` (e.g., `env.EMAIL_USER`).
- Custom user fields on `better-auth` (stored in the `user` DB table):
  - `hasSignedNda` (boolean)
  - `docusignEnvelopeId` (string)
  - `company` (string)
  - `phone` (string)
  - `investmentInterest` (string)
  - `investmentAmount` (string)
- To read auth session on the **server**: `import { auth } from "@/lib/auth"` → `auth.api.getSession(...)`.
- To read auth session on the **client**: `import { authClient } from "@/lib/auth-client"` → `authClient.useSession()`.

---

## Environment Variables

- **Always use `env.ts`** instead of accessing `process.env` directly. This ensures environment variables are checked for availability and type-safety at runtime/buildtime.

---

## Email Rules

- All production email goes through **Resend** (`resend` package).
- **Ethereal/Nodemailer will not be used in the future** — always default to using Resend for new email logic.
- HTML templates are centralized in `lib/email-templates.ts` — add new templates there.
- The sender address is always accessed via `env.EMAIL_USER` — never a hardcoded string.

---

## Database Rules

- Raw SQL via `mysql2/promise`. No ORM.
- Reuse the existing connection pool from `lib/auth.ts` (`export const connection`).
- Schema changes: update `scripts/migrate.ts` and document them in this file.
- Current tables: `user`, `session`, `account`, `verification`.

### Schema Snapshot (as of April 2026)

```sql
-- user
id VARCHAR(191) PK | name TEXT | email VARCHAR(191) UNIQUE
emailVerified BOOLEAN | image TEXT | createdAt | updatedAt
hasSignedNda BOOLEAN DEFAULT FALSE
docusignEnvelopeId TEXT | company TEXT | phone TEXT
investmentInterest TEXT | investmentAmount TEXT

-- session
id VARCHAR(191) PK | userId FK→user.id | token VARCHAR(191) UNIQUE
expiresAt | ipAddress | userAgent | createdAt | updatedAt

-- account
id VARCHAR(191) PK | userId FK→user.id | accountId | providerId
accessToken | refreshToken | accessTokenExpiresAt | refreshTokenExpiresAt
scope | idToken | password | createdAt | updatedAt

-- verification
id VARCHAR(191) PK | identifier TEXT | value TEXT | expiresAt | createdAt | updatedAt
```

---

## NDA Flow (Critical — Do Not Break)

1. User registers → email verification sent via Resend.
2. User verifies email → `autoSignInAfterVerification: true` → session created.
3. User navigates to `/dashboard` → `requireUser()` passes (session exists).
4. `NdaProtector` checks `user.hasSignedNda` — if `false`, shows the NDA modal (blur overlay).
5. User signs NDA in `NdaModal` (name + signature + address fields) → calls `signUserNda()` server action.
6. `signUserNda()` sets `hasSignedNda = true` in DB → calls `revalidatePath("/dashboard")`.
7. Dashboard is now fully accessible.

**Never remove the NdaProtector from the dashboard layout.**

---

## Common Pitfalls & Gotchas

### Component Versioning Clutter
The `components/homepage/` directory contains multiple versioned files (e.g. `InvestmentJourneyV2.tsx`, `InvestmentJourneyV3.tsx`, `OurEdgeV2.tsx`) and legacy `.jsx` files (`Dashboard.jsx`, `design.jsx`, etc.). These are **dead code** from iterative design — do not add more. The active imports are in `app/(main)/page.tsx`.

### Ethereal vs. Resend
- **Ethereal/Nodemailer will not be used in the future.** Any existing code using Ethereal (like `investorContact`) should be migrated to Resend.
- All `better-auth` hooks (`sendVerificationEmail`, `sendResetPassword`) already use Resend.

### Contact Form Email TODO
In `app/actions.ts` line ~185, the contact form currently sends to a hardcoded recipient. Replace it with `env.ADMIN_EMAIL` before production.

### `investmentAmount` is Required
The `better-auth` config marks `investmentAmount` as `required: true`. The sign-up form must include this field or registration will fail silently.

### Images Remote Patterns
`next.config.ts` allows images only from `images.unsplash.com`. Add other hostnames to `remotePatterns` if new image sources are introduced.

---

## Design Principles

- **Premium corporate aesthetic** — deep forest green (`#1C5244`) + golden amber (`#F8AB1D`) palette.
- Typographic hierarchy: Montserrat for headings, IBM Plex Sans for body.
- Subtle micro-animations are encouraged (GSAP/Framer Motion).
- Mobile-responsive layouts are non-negotiable.
- Never use placeholder images — generate or source real assets.

---

## Vercel / Deployment Notes

- `@vercel/functions` is a dependency — `waitUntil()` is used for non-blocking email sends.
- `NEXT_PUBLIC_BASE_URL` and `BETTER_AUTH_URL` must be set to the deployed URL in production env vars.
- `DATABASE_URL` must point to a MySQL/MariaDB instance accessible from Vercel's Node.js/serverless functions.
- Keep DB-backed routes and server actions on the Node.js runtime.

---

## Quick Dev Workflow

```bash
# 1. Start dev server
bun dev

# 2. (First-time or new environment) Run DB migration
bun run scripts/migrate.ts

# 3. Verify no TypeScript or build errors
bun build

# 4. Lint
bun lint
```
