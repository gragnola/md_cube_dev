# Agent Instructions

At the start of every session, read docs/CHANGELOG.md; after any change, add a dated entry.

## Standing rules

### Purpose

Static rebuild of **Cube Developments** ([cubedevelopments.com](http://www.cubedevelopments.com), a property development company, Woodford Green, Essex). The live site is WordPress (Salient theme); this repo replaces it with clean static HTML/CSS/JS built by Vite. Live domain: **cubedevelopments.com** (was staged on dev.cubedevelopments.com until 2026-10-26; deploy target set by repo secrets). **Paul** and **Mark** maintain the repo via AI assistants and do not work on it at the same time.

### Repository layout

| Area | Role |
|------|------|
| `index.html`, `<page>/index.html` | One Vite entry per page (clean URLs: `/residential/` etc.) |
| `src/` | `main.js`, `style.css`, `partials/` (header, footer, form — inlined at build via `<!--#include name -->`) |
| `public/` | Static files copied into `dist/` (images, `contact.php`) — **no private material here** |
| `.htaccess` | Apache config, copied into `dist/` by the deploy workflow |
| `dist/` | **Only this folder is deployed** (`npm run build` produces it) |
| `docs/` | Client briefs and correspondence — **never deployed** |
| `project/` | Research and working notes — **never deployed** |
| `media/` | Full-resolution originals and usage-rights notes — **never deployed** |

The deploy workflow (`.github/workflows/deploy.yml`) runs `npm run build` on push to `main` and uploads **`./dist/`** only, using repo secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_PATH`.

### DeleteMe archive

Redundant files are moved with `git mv`, never deleted, into a top-level folder named **two months ahead** (e.g. `DeleteMeDec26` when working in October 2026). Add a `README.md` there listing what moved and why. That folder is never deployed. **Paul** deletes it after review.

### Release flow

- Day-to-day work happens on **`dev`**.
- Merge **`dev`** into **`main`** with a **merge commit** only when Paul or Mark asks — pushing to `main` triggers deploy.
- After a release, sync **`main`** back into **`dev`**.
- Use a single shared **`dev` → `main`** pull request when needed.

### Email

Assistants may **draft** email copy only; they must **never send** email.

### Facts and figures

Do not invent facts, figures, or contact details. Content comes from the live site (survey of 19/10/2026); leave gaps blank and cite the source.

### Cloud agents

Cloud agents run on **composer-2.5** only: no subagents, browser/computer-use helpers, or Cursor Automations. Assistants ask Paul or Mark before launching a cloud agent.

### Secrets

Passwords, tokens, and credentials never belong in chat or the repository.

## Project conventions

- **Auto-Versioning:** Increment the version and update the Last Updated timestamp in `src/partials/footer.html` and `package.json` in **Italian local time (Europe/Rome)**, format `dd/mm/yyyy HH:mm`, whenever making changes.
- **Documentation Immutability:** Do not change the date/version in `AGENTS.md` or `PROJECT_BLUEPRINT.md` unless asked to amend them.
- **No WordPress / Salient code**, no CMS, no Node on the server. Plain HTML/CSS/JS; PHP only where server-side behaviour is needed.
- **Language & Spelling:** UK English for all UI text, code comments and documentation.
