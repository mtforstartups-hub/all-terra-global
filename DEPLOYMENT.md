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
| Node.js version         | 24.x (the server has nodenv with 24 and 26; minimum 20.9) |
| Application mode        | `production`                                             |
| Application root        | `/httpdocs` (where `package.json` lives)                 |
| Document root           | `/httpdocs/public`                                       |
| Application startup file| `server.js`                                              |
| Package manager         | npm (the server-side scripts use npm, not bun)           |

The repo pins the shell version via `.node-version` (`24`) so nodenv resolves `npm` for
deploy actions and "Run script".

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

That runs on every pull/deploy.

If the deploy log says `nodenv: npm: command not found` / `The 'npm' command exists in these
Node versions: 24 26`, nodenv has no version selected for that shell. Either rely on the
committed `.node-version` (make sure it is present in the deployed checkout), or force it
inline:

```bash
export NODENV_VERSION=24 && npm run plesk:deploy
```

Use the exact version from `nodenv versions --bare` if `24` does not resolve. Setting it
once for the subscription also works: `nodenv global 24`.

Then press **Restart App** on the Node.js tab (or let the post-deploy restart do it).

### Option B — manual (File Manager / SFTP)

1. Upload or `git pull` the repo.
2. Node.js tab → **Run script** → `plesk:deploy`
3. **Restart App**.

### First deploy only: create the tables

`next build` never creates the schema. On a fresh database, `better-auth` logs
`Could not validate the database schema` during the build and auth will fail at runtime.
Run once, after `.env.production` exists:

```bash
npm run db:migrate
```

It reads `DATABASE_URL` from `.env.production`, creates `user`, `session`, `account` and
`verification` (idempotent — safe to re-run). Then rebuild/restart.

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
  time, so a missing `DATABASE_URL` fails the build with `❌ Invalid environment variables`,
  not just runtime.
- **Plesk's "Custom environment variables" only reach the running app, not the build.** The
  deploy action / "Run script" shell does not inherit them. Put a `.env.production` file in
  the application root (next to `package.json`) — Next.js loads it for both `next build` and
  runtime. Start from `.env.production.example`, `chmod 600` it, and never commit it. Real
  `process.env` values (Plesk's) still win over the file.
- **The database must be reachable during the build.** `better-auth` validates its schema
  while Next.js prerenders pages, so the log shows
  `ERROR [Better Auth]: Could not validate the database schema` once per worker. This is a
  warning, not a failure — but on a brand-new database it means the tables do not exist yet.
  Run the migration once (see step 3) and it disappears on the next build.
- **The build needs outbound HTTPS** — `next/font/google` downloads fonts during `next build`.
- **`sharp`** (image optimization) is installed as an optional dependency of Next; it needs
  npm install scripts enabled, which is the default on the server.
- **`package-lock.json` is the server's lockfile** (the repo is developed with bun). After
  adding or removing a dependency, refresh it so the server installs match:
  `npm install --package-lock-only --include=dev`.
- **Never upload** `.next/` or `node_modules/` from a local machine — Plesk's build produces
  them on the server.
- Database tables are not created by the build. Run `npm run db:migrate` once per new
  environment (see above).

## 4. Troubleshooting

| Log | Cause | Fix |
| --- | --- | --- |
| `nodenv: npm: command not found` / `The 'npm' command exists in these Node versions` | no Node version selected for the deploy shell | commit `.node-version`, or `export NODENV_VERSION=24 && npm run plesk:deploy` |
| `❌ Invalid environment variables` | the build shell has no env vars | create `.env.production` in the application root |
| `URIError: URI malformed` at `lib/auth.ts` | raw `%` (or other reserved char) in `DATABASE_URL` | percent-encode the password |
| `ER_ACCESS_DENIED_ERROR` / `Access denied for user` | wrong user, password or encoding in `DATABASE_URL` | see below, then `npm run db:migrate` |
| `Could not validate the database schema` (build log) | tables missing (fresh DB) — non-fatal warning | `npm run db:migrate` |
| `npm warn install-scripts unrs-resolver` | npm skipped an ESLint-only helper's install script | ignore, or `npm install-scripts approve unrs-resolver` |

Checking credentials without exposing them:

```bash
node --env-file=.env.production -e "
const u = new URL(process.env.DATABASE_URL);
console.log({ user: u.username, passLen: u.password.length, host: u.hostname, port: u.port, db: u.pathname.slice(1) });"
```

`new URL()` gives the **decoded** values MySQL actually receives — compare them with
Plesk → Databases → Users. The simplest way to avoid encoding bugs entirely is to rotate the
DB user's password to hex (`openssl rand -hex 24`), which needs no percent-encoding, and
update `.env.production` to match.

## 5. Local development (unchanged)

```bash
bun install
bun dev        # http://localhost:3000
```

`bun run build` is still fine locally as a pre-commit sanity check, but it is not part of
the deployment path.
