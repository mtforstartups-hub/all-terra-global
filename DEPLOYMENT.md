# Deployment — Plesk (server-side build)

The site is hosted as a Node.js app in Plesk and **built on the server**. There is no
CI build and no build output in the repo.

```
Git push  →  Plesk Git pulls the repo  →  npm run plesk:deploy (on server)  →  Plesk restarts app
                                              install → clean .next → next build
```

Plesk's Node.js extension runs apps through Phusion Passenger, which cannot execute
`next start` directly. `server.js` exists for that reason: Passenger boots it, and it
starts Next.js on the port Plesk provides.

---

## 1. One-time Plesk setup

**Websites & Domains → your domain → Node.js**

| Setting                 | Value                                                    |
| ----------------------- | -------------------------------------------------------- |
| Node.js version         | 22.x (minimum 20.9 — required by Next.js 16)             |
| Application mode        | `production`                                             |
| Application root        | `/httpdocs` (where `package.json` lives)                 |
| Document root           | `/httpdocs/public`                                       |
| Application startup file| `server.js`                                              |
| Package manager         | npm (the server-side scripts use npm, not bun)           |

**Custom environment variables** — add every variable listed in `env.ts` / `AGENTS.md`:
`DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`,
`NEXT_PUBLIC_BASE_URL`, `ADMIN_EMAIL`, `EMAIL_USER`, `EMAIL_PROVIDER`, `RESEND_API_KEY`
(`EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_PASSWORD` when `EMAIL_PROVIDER=smtp`).

`BETTER_AUTH_URL` / `NEXT_PUBLIC_BASE_URL` must be the public `https://` URL — auth links
and cookies are generated from them.

## 2. Deploying

### Option A — Plesk Git (automated)

Git → your repository → **Additional deployment actions**:

```bash
npm run plesk:deploy
```

That runs on every pull/deploy. If the deploy log says `npm: command not found`, prefix the
Plesk Node path (version must match the one selected in the Node.js tab):

```bash
export PATH=/opt/plesk/node/22/bin:$PATH && npm run plesk:deploy
```

Then press **Restart App** on the Node.js tab (or let the post-deploy restart do it).

### Option B — manual (File Manager / SFTP)

1. Upload or `git pull` the repo.
2. Node.js tab → **Run script** → `plesk:deploy`
3. **Restart App**.

### What `plesk:deploy` does

| Script           | Command                                              | Why                                    |
| ---------------- | ---------------------------------------------------- | -------------------------------------- |
| `plesk:install`  | `npm install --include=dev`                          | build needs TypeScript, Tailwind, ESLint |
| `plesk:clean`    | deletes `.next`                                      | avoids stale build artifacts           |
| `plesk:build`    | `next build`                                         | produces the production build          |

## 3. Requirements and gotchas

- **`next build` needs ~1.5–2 GB of free RAM.** On a 1 GB VPS the build is usually killed
  (log ends abruptly / "Killed"). Fix by adding swap in Plesk or sizing the VPS up.
- **Environment variables must be set before the first build.** `env.ts` validates at import
  time, so a missing `DATABASE_URL` fails the build, not just runtime. Plesk's custom
  variables are available to "Run script"/deploy actions; if they are not, put a
  `.env.production` file in the application root (never commit it).
- **The database must be reachable during the build.** `better-auth` validates its schema
  while Next.js prerenders pages (`Could not validate the database schema` in the log).
  This is non-fatal, but a wrong `DATABASE_URL` should be fixed before relying on the build.
- **The build needs outbound HTTPS** — `next/font/google` downloads fonts during `next build`.
- **`sharp`** (image optimization) is installed as an optional dependency of Next; it needs
  npm install scripts enabled, which is the default on the server.
- **`package-lock.json` is the server's lockfile** (the repo is developed with bun). After
  adding or removing a dependency, refresh it so the server installs match:
  `npm install --package-lock-only --include=dev`.
- **Never upload** `.next/` or `node_modules/` from a local machine — Plesk's build produces
  them on the server.
- Database tables are not created by the build. Run `scripts/migrate.ts` once per new
  environment (see `AGENTS.md`).

## 4. Local development (unchanged)

```bash
bun install
bun dev        # http://localhost:3000
```

`bun run build` is still fine locally as a pre-commit sanity check, but it is not part of
the deployment path.
