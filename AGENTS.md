# AGENTS.md — All-Terra Global

> Instructions for AI agents and automated tools working on this repository.

---

## Project Overview

**All-Terra Global** is a Next.js 16 (App Router) investor platform for a private credit financing firm focused on structured deals in Africa — specifically Zimbabwe. The site combines a public-facing marketing website with a gated investor dashboard that requires NDA acceptance before access is granted.

---

## Tech Stack

| Layer       | Technology                                                   |
| ----------- | ------------------------------------------------------------ |
| Framework   | Next.js `16.1.6` (App Router, RSC-first)                     |
| Language    | TypeScript (strict)                                          |
| Styling     | Tailwind CSS v4 (via `@tailwindcss/postcss`)                 |
| Auth        | `better-auth` v1.5+ with email/password + email verification |
| Database    | MySQL / MariaDB via `mysql2/promise` connection pool         |
| Email       | Resend (`resend` SDK) — primary transactional email          |
| Animation   | GSAP (`gsap`, `@gsap/react`) + Framer Motion (`motion`)      |
| State       | Zustand (`stores/`)                                          |
| Validation  | Zod v4                                                       |
| PDF         | `pdf-lib`, `pdfjs-dist`, `react-pdf`                         |
| Icons       | Lucide React                                                 |
| Package Mgr | Bun (`bun.lock` present — use `bun` not `npm`)               |

---

## Repository Structure

```text
all-terra-global/
├── app/
│   ├── layout.tsx              # Root layout — fonts (Montserrat, IBM Plex Sans), AuthModalProvider
│   ├── globals.css             # Global CSS + Tailwind import, design tokens, utilities
│   ├── not-found.tsx
│   ├── (main)/                 # Public-facing routes — wrapped with Header + Footer
│   │   ├── layout.tsx          # Injects Header, Footer, ScrollToTop
│   │   ├── page.tsx            # Homepage
│   │   ├── about/
│   │   ├── contact/
│   │   ├── opportunities/      # Three deal sub-routes: _mining, _real-estate, _vendor-financing
│   │   ├── team/
│   │   ├── disclaimer/
│   │   ├── privacy-policy/
│   │   ├── terms-of-service/
│   │   └── reset-password/
│   ├── (dashboard)/            # Authenticated investor area — NO Header/Footer
│   │   ├── layout.tsx          # Uses requireUser() + NdaProtector + Sidebar + DashboardHeader
│   │   └── dashboard/
│   │       ├── page.tsx
│   │       ├── profile/
│   │       ├── deals/
│   │       └── investments/
│   ├── api/
│   │   ├── auth/               # better-auth catch-all handler
│   │   ├── send-op-interest-emails/
│   │   ├── _docusign/          # DocuSign webhook handler
│   │   └── _webhooks/
│   ├── actions/                # Modular server actions
│   │   ├── opportunities.ts
│   │   ├── pdfSign.ts
│   │   └── profile.ts
│   ├── actions.ts              # Contact form + NDA sign server actions
│   └── sign-nda/               # Standalone NDA signing flow
├── components/
│   ├── Header.tsx              # Public site header with auth modal trigger
│   ├── Footer.tsx
│   ├── ScrollProgressBar.tsx
│   ├── ContactForm.tsx
│   ├── shared/
│   │   ├── AuthModal.tsx       # Sign in / sign up modal — uses better-auth client
│   │   ├── PageHero.tsx
│   │   └── PageCta.tsx
│   ├── homepage/               # Section-level components for the landing page
│   ├── dashboard/              # All dashboard UI — DashboardClient, NdaModal, SideBar, etc.
│   ├── about/
│   ├── team/
│   ├── opportunities/
│   └── pdfsigning/
├── lib/
│   ├── auth.ts                 # better-auth config + MySQL pool + Resend + Nodemailer
│   ├── auth-client.ts          # Better-auth browser client
│   ├── session.ts              # requireUser() helper — redirects to / if unauthenticated
│   ├── email-templates.ts      # All HTML email templates
│   └── docusign.ts
├── context/
│   └── AuthModalContext.tsx    # Global open/close state for the auth modal
├── stores/
│   └── SidebarStore.ts         # Zustand store for sidebar collapse state
├── scripts/
│   ├── migrate.ts              # Run once to create DB tables
│   └── clear-users.ts
├── public/                     # Static assets
└── env.ts                      # Validated environment variable access
```

---

## Routing Conventions

- **Route groups** are used to apply different layouts:
  - `(main)` — public pages, includes `<Header>` and `<Footer>`
  - `(dashboard)` — protected investor area, uses its own sidebar layout
- Underscore-prefixed folders (e.g. `_mining`) inside `opportunities/` are **not routable** — they contain sub-page content rendered via the parent `page.tsx`.
- Dashboard access requires: active session **and** `hasSignedNda === true`. Both checks live in `DashboardLayout` and `NdaProtector`.

---

## Authentication

- Powered by `better-auth` — **do not** replace with NextAuth or any other library.
- Email/password with mandatory email verification on sign-up.
- Custom user fields: `hasSignedNda`, `docusignEnvelopeId`, `company`, `phone`, `investmentInterest`, `investmentAmount`.
- **Client-side auth:** import from `@/lib/auth-client`
- **Server-side session:** use `requireUser()` from `@/lib/session` in Server Components / layouts.
- Auth API route lives at `app/api/auth/[...all]/route.ts`.

---

## Email System

- **Primary (production):** Resend SDK via `lib/auth.ts`.
- **Fallback (dev only):** Nodemailer Ethereal for `investorContact` server action (logs preview URL to console).
- All HTML email templates reside in `lib/email-templates.ts`.
- Email from address reads from `process.env.EMAIL_USER`.

---

## Database

- MySQL / MariaDB connection pool via `mysql2/promise`.
- Schema is hand-managed — no ORM. Run `scripts/migrate.ts` to initialise tables.
- Tables: `user`, `session`, `account`, `verification`.
- **Do not** introduce Prisma, Drizzle, or any ORM without explicit instruction.

---

## Design System & Styling

Brand colors defined in `app/globals.css` (CSS custom properties):

| Token                   | Value     | Usage             |
| ----------------------- | --------- | ----------------- |
| `--color-primary`       | `#1C5244` | Deep forest green |
| `--color-accent`        | `#F8AB1D` | Golden amber      |
| `--color-secondary`     | `#333333` | Dark body text    |
| `--color-primary-light` | `#2a7561` | Hover states      |
| `--color-primary-dark`  | `#143d33` | Dark accents      |

- Typography: **Montserrat** (headings), **IBM Plex Sans** (body). Loaded via `next/font/google`.
- Tailwind tokens are mapped from these CSS variables inside `@theme inline`.
- Pre-built utilities: `.btn-primary`, `.btn-secondary`, `.glass`, `.gradient-primary`, `.gradient-accent`, `.animate-fade-in-up`, `.animate-marquee`, etc.
- Dashboard has its own scoped CSS in `components/dashboard/Dashboard.css`.

---

## Key Conventions

### Server Actions

- Live in `app/actions.ts` (legacy, general) or `app/actions/` (modular, per-feature).
- Always use `"use server"` directive.
- Validate all inputs with Zod before any DB/email operations.
- Use `revalidatePath()` after mutations.

### Components

- Prefer `.tsx` for all new components. Legacy `.jsx` files exist but are not the pattern going forward.
- Use `lucide-react` for icons — not heroicons, not react-icons.
- For animation: prefer GSAP for scroll/timeline animations, Framer Motion (`motion`) for component-level transitions.

### State Management

- Server state: React Server Components + Server Actions.
- Client state: Zustand (only use for genuinely global UI state like sidebar collapse).
- Do **not** introduce Redux or TanStack Query.

---

## Environment Variables

Required variables (see `env.ts` for the full validated list):

```bash
DATABASE_URL            # mysql:// connection string
BETTER_AUTH_SECRET      # Random secret for better-auth
BETTER_AUTH_URL         # App base URL
NEXT_PUBLIC_BASE_URL    # Public base URL
EMAIL_USER              # From address (also used as Resend sender)
EMAIL_PASSWORD          # Nodemailer SMTP password (legacy, keep for fallback)
EMAIL_HOST              # SMTP host
RESEND_API_KEY          # Resend API key
ADMIN_EMAIL             # Receives new-user notifications
```

---

## Development Commands

```bash
bun dev            # Start dev server (http://localhost:3000)
bun build          # Production build
bun lint           # ESLint
bun run scripts/migrate.ts   # Run DB migration (once per environment setup)
```

---

## What NOT to Do

- ❌ Do **not** switch from `bun` to `npm` or `yarn`.
- ❌ Do **not** replace `better-auth` with NextAuth/Clerk/Auth.js.
- ❌ Do **not** introduce an ORM (Prisma/Drizzle/etc.).
- ❌ Do **not** add `react-query` or `zustand` selectors for server data — use RSC.
- ❌ Do **not** use `useState` for data fetched on the server — keep it a Server Component.
- ❌ Do **not** hardcode company email addresses — always read from `process.env`.
- ❌ Do **not** commit `.env` or private keys — both are in `.gitignore`.
- ❌ Do **not** add versioned component duplicates (e.g. `ComponentV5.tsx`) — refactor or replace in place.

---

## Testing & Verification

There is no automated test suite currently. When making changes:

1. Run `bun build` to catch TypeScript and build errors before committing.
2. Test auth flows manually: register → email verify → sign in → dashboard access.
3. Test NDA flow: new user without NDA sees the blur/modal; after signing, dashboard is accessible.
4. For email: check the Ethereal preview URL printed to console in dev mode.
