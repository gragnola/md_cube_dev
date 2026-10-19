# Cube Developments (md_cube_dev)

Static rebuild of [cubedevelopments.com](http://www.cubedevelopments.com) for **dev.cubedevelopments.com**. Plain HTML/CSS/JS built with Vite; one PHP file (`public/contact.php`) handles the contact form with PHP `mail()`.

## Run and build

```bash
npm install
npm run dev      # Vite dev server (contact.php needs a PHP server to test)
npm run build    # Output to dist/
npm run preview  # Serve dist/ locally
```

Pages: `/`, `/cube-home/`, `/residential/`, `/commercial/`, `/social/`, `/our-requirements/`, `/contact/`. Shared header, footer and contact form live in `src/partials/` and are inlined at build time with `<!--#include name -->`.

## Deployment

On push to **`main`**, GitHub Actions (`.github/workflows/deploy.yml`) builds the site, copies `.htaccess` into `dist/` and uploads **only `./dist/`** by FTP. Required repo secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_PATH`.

## Repository layout

| Path | Purpose |
|------|---------|
| `src/` | JS, CSS, HTML partials |
| `public/` | Images and `contact.php`, copied into `dist/` (no private material) |
| `docs/` | Client briefs, correspondence — **never deployed** |
| `project/` | Research, notes — **never deployed** |
| `media/` | Full-resolution originals — **never deployed** |

## Git workflow

- **`main`** — production; pushes trigger deploy.
- **`dev`** — day-to-day work; merge into `main` with a merge commit when asked.

Agent rules: [`AGENTS.md`](AGENTS.md). Change history: [`docs/CHANGELOG.md`](docs/CHANGELOG.md).
